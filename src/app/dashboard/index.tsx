import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const router = useRouter();

    const [userName, setUserName] = useState('Entregador Parceiro');
    const [stats, setStats] = useState({
        ganhos: 'R$ 150,20',
        entregas: 8,
        disponivel: true
    });

    const handleLogout = () => {
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#007A2E" />

            {/* HEADER / CABEÇALHO */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Olá,</Text>
                    <Text style={styles.userName}>{userName} 🇧🇷</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
   
                <View style={styles.mainCard}>
                    <Text style={styles.cardLabel}>Ganhos de Hoje</Text>
                    <Text style={styles.cardValue}>{stats.ganhos}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Meta 80% Concluída</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.miniCard, { backgroundColor: '#fff' }]}>
                        <Text style={styles.miniLabel}>Entregas Feitas</Text>
                        <Text style={styles.miniValue}>{stats.entregas}</Text>
                    </View>
                    <View style={[styles.miniCard, { backgroundColor: '#fff' }]}>
                        <Text style={styles.miniLabel}>Status</Text>
                        <Text style={[styles.miniValue, { color: '#009C3B', fontSize: 18 }]}>● Online</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Próximas Entregas</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Fundo claro para contrastar melhor e não cansar a vista
    },
    header: {
        backgroundColor: '#009C3B', // Verde Bandeira clássico no topo
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 16,
        opacity: 0.8,
    },
    userName: {
        color: '#FFDF00', // Amarelo no nome para destaque
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    logoutText: {
        color: '#FFF',
        fontWeight: '600',
    },
    content: {
        padding: 24,
        gap: 20,
    },
    mainCard: {
        backgroundColor: '#009C3B',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
        marginBottom: 5,
    },
    cardValue: {
        color: '#FFDF00',
        fontSize: 36,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginTop: 10,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    miniCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    miniLabel: {
        color: '#666',
        fontSize: 12,
        marginBottom: 5,
    },
    miniValue: {
        color: '#333',
        fontSize: 22,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    deliveryCardInside: {
        padding: 4,
    },
    deliveryOrder: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    deliveryAddress: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    acceptButton: {
        backgroundColor: '#009C3B',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    }
});