import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { Card } from '../components/card';

export default function Index() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Text style={styles.title}>
                🇧🇷 Brasil Login 🇧🇷
            </Text>

            <Card />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009C3B',
        justifyContent: 'center',
        padding: 24,
        gap: 20,
    },

    title: {
        color: '#FFDF00',
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});