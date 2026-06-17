import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface UserData {
    userId: string;
    username: string;
    level: number;
    vitorias: number;
    derrotas: number;
}

type AuthContextData = {
    isAuthenticated: boolean;
    user: string | null;
    userData: UserData | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<boolean>;
    signUp: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signOut: () => Promise<void>;
    updateStats: (vitorias: number, derrotas: number, level: number) => Promise<boolean>;
};

const API_BASE = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storedUserData = await AsyncStorage.getItem('@Auth:user_data');
                if (storedUserData) {
                    const parsed = JSON.parse(storedUserData) as UserData;
                    setUserData(parsed);
                    setUser(parsed.username);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do storage:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadStorageData();
    }, []);

    async function signIn(username: string, password: string): Promise<boolean> {
        try {
            const loginRes = await axios.post(`${API_BASE}/auth/v1/login`, {
                username: username.trim(),
                password: password.trim(),
            });

            if (loginRes.data && loginRes.data.userId) {
                const userId = loginRes.data.userId;

                const statsRes = await axios.get(`${API_BASE}/auth/v1/stats/${userId}`);
                const statsData = statsRes.data as UserData;

                const fullUserData: UserData = {
                    userId: statsData.userId || userId,
                    username: statsData.username || username.trim(),
                    level: statsData.level ?? 1,
                    vitorias: statsData.vitorias ?? 0,
                    derrotas: statsData.derrotas ?? 0,
                };

                setUserData(fullUserData);
                setUser(fullUserData.username);
                setIsAuthenticated(true);

                await AsyncStorage.setItem('@Auth:user_data', JSON.stringify(fullUserData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false;
        }
    }

    async function signUp(username: string, password: string): Promise<{ success: boolean; message?: string }> {
        try {
            const registerRes = await axios.post(`${API_BASE}/auth/v1/register`, {
                username: username.trim(),
                password: password.trim(),
            });

            if (registerRes.data && registerRes.data.userId) {
                return { success: true };
            }
            return { success: false, message: 'Não foi possível registrar o usuário.' };
        } catch (error: any) {
            console.error('Erro ao cadastrar:', error);
            const errMsg = error.response?.data?.message || 'Erro de conexão com o servidor.';
            return { success: false, message: errMsg };
        }
    }

    async function updateStats(vitorias: number, derrotas: number, level: number): Promise<boolean> {
        if (!userData) return false;
        try {
            const updateRes = await axios.put(`${API_BASE}/auth/v1/stats/${userData.userId}`, {
                username: userData.username,
                level,
                vitorias,
                derrotas,
            });

            if (updateRes.data) {
                const updatedData: UserData = {
                    ...userData,
                    level,
                    vitorias,
                    derrotas,
                };
                setUserData(updatedData);
                await AsyncStorage.setItem('@Auth:user_data', JSON.stringify(updatedData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao atualizar estatísticas:', error);
            return false;
        }
    }

    async function signOut() {
        setUser(null);
        setUserData(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('@Auth:user_data');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, userData, signIn, signUp, signOut, updateStats, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);