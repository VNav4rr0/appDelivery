import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import Button from '@/components/button';
import { Input } from '@/components/input';
import { Pokeball } from '@/components/pokeball';
import { PokeballLoading } from '@/components/pokeball-loading';
import { Colors } from '@/constants/colors';

export default function Register() {
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
    });

    const { signUp } = useAuth();

    async function handleRegister() {
        if (!name.trim() || !senha.trim() || !confirmarSenha.trim()) {
            setAlertData({
                title: 'Campos obrigatórios',
                message: 'Por favor, preencha todos os campos.',
                type: 'warning',
            });
            setIsAlertVisible(true);
            return;
        }

        if (senha !== confirmarSenha) {
            setAlertData({
                title: 'Senhas divergentes',
                message: 'A confirmação de senha não confere.',
                type: 'error',
            });
            setIsAlertVisible(true);
            return;
        }

        setIsLoading(true);
        setIsAlertVisible(false);
        const result = await signUp(name, senha);

        setIsLoading(false);
        if (result.success) {
            setAlertData({
                title: 'Sucesso',
                message: 'Usuário cadastrado com sucesso! Redirecionando para login...',
                type: 'success',
            });
            setIsAlertVisible(true);
            setTimeout(() => {
                router.replace('/');
            }, 2000);
        } else {
            setAlertData({
                title: 'Erro no cadastro',
                message: result.message || 'Não foi possível cadastrar o usuário.',
                type: 'error',
            });
            setIsAlertVisible(true);
        }
    }

    if (isLoading) {
        return <PokeballLoading />;
    }

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled">
                {Platform.OS === 'web' && (
                    <>
                        <View style={styles.orbBlue} />
                        <View style={styles.orbOrange} />
                    </>
                )}

                <View style={styles.header}>
                    <View style={styles.logoRow}>
                        <Pokeball size={Platform.OS === 'web' ? 28 : 22} />
                        <Text style={styles.logoText}>PokeBattle</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        Cadastre-se para iniciar a sua jornada Pokémon
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Novo Cadastro</Text>

                    {isAlertVisible && (
                        <View style={[styles.alertContainer, { backgroundColor: Colors.semantic[alertData.type].bg, borderColor: Colors.semantic[alertData.type].border }]}>
                            <Text style={[styles.alertText, { color: Colors.semantic[alertData.type].text }]}>{alertData.message}</Text>
                        </View>
                    )}

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Nome de Usuário</Text>
                        <Input
                            placeholder="Escolha seu nome de treinador"
                            onChangeText={setName}
                            value={name}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <Input
                            placeholder="Crie uma senha"
                            secureTextEntry
                            onChangeText={setSenha}
                            value={senha}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Confirmar Senha</Text>
                        <Input
                            placeholder="Confirme sua senha"
                            secureTextEntry
                            onChangeText={setConfirmarSenha}
                            value={confirmarSenha}
                        />
                    </View>

                    <Button title="Cadastrar" onPress={handleRegister} style={{ marginTop: 8 }} />

                    <TouchableOpacity onPress={() => router.push('/')} style={styles.loginLink}>
                        <Text style={styles.loginText}>Já tem uma conta? Faça Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: Colors.background },
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: isWeb ? 32 : 24,
        minHeight: '100%' as any,
        gap: 24,
        position: 'relative',
    },
    orbBlue: {
        position: 'absolute', width: 500, height: 500, borderRadius: 250,
        backgroundColor: Colors.semantic.info.border, top: -200, left: -200, opacity: 0.06,
        ...Platform.select({ web: { filter: 'blur(80px)' } as any }),
    },
    orbOrange: {
        position: 'absolute', width: 400, height: 400, borderRadius: 200,
        backgroundColor: Colors.btnPrimary, bottom: -100, right: -150, opacity: 0.06,
        ...Platform.select({ web: { filter: 'blur(80px)' } as any }),
    },
    header: { alignItems: 'center', gap: 8, width: '100%', maxWidth: isWeb ? 440 : undefined },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    logoText: {
        color: Colors.white, fontSize: isWeb ? 22 : 18, fontWeight: '900', letterSpacing: 2,
        fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : undefined,
    },
    subtitle: {
        color: Colors.whiteAlpha['40'], fontSize: isWeb ? 13 : 12,
        textAlign: 'center', lineHeight: 20, maxWidth: 300,
    },
    card: {
        width: '100%', maxWidth: isWeb ? 440 : undefined,
        backgroundColor: Colors.surface, borderRadius: isWeb ? 20 : 16,
        borderWidth: 1.5, borderColor: Colors.primaryAlpha['30'],
        padding: isWeb ? 28 : 20, gap: 16,
        ...Platform.select({
            web: { boxShadow: '0 0 40px rgba(255,107,53,0.15), 0 0 80px rgba(0,0,0,0.6)' } as any,
            default: {
                shadowColor: Colors.btnPrimary, shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2, shadowRadius: 12, elevation: 8,
            },
        }),
    },
    cardTitle: {
        color: Colors.btnPrimary, fontSize: isWeb ? 11 : 10, fontWeight: '800',
        letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4,
        fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : undefined,
    },
    fieldGroup: { gap: 6 },
    label: {
        color: Colors.whiteAlpha['50'], fontSize: 12,
        fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase',
    },
    alertContainer: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 8,
    },
    alertText: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    loginLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    loginText: {
        color: Colors.whiteAlpha['40'],
        fontSize: 13,
        textDecorationLine: 'underline',
    },
});
