import { View, Text, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import Button from '../button';
import Input from '../input';

import { styles } from './style';

export const Card = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    
    const router = useRouter();

    function handleLogin() {
        if (user === 'Neyma' && password === 'vaiBrasil') {
            alert('Bem-vindo, campeão!');
            
            router.push('/dashboard'); 
        } else {
            alert('Usuário ou senha inválidos');
        }
    }

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://www.cbf.com.br/_next/image?url=https%3A%2F%2Fstcbfsiteprdimgbrs.blob.core.windows.net%2Fimg-site%2Fcdn%2Fance_h_d9bcc37982.jpg&w=3840&q=70' }}
                style={styles.image}
            />

            <Text style={styles.title}>Login do Brasil</Text>

            <Input
                placeholder="Usuário"
                value={user}
                onChangeText={setUser}
            />

            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title="Entrar"
                onPress={handleLogin}
            />
        </View>
    );
};