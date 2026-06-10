import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { TrainerCard } from '@/components/trainer/trainerCard';
import { TrainerStats } from '@/components/trainer/trainerStats';

import { useTeam } from '@/context/TeamContext';

export default function Profile() {
    const { team, wins, losses } = useTeam();

    const totalBattles = (wins || 0) + (losses || 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>
                        ← Voltar
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Perfil do Treinador</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.cardWrapper}>
                    <TrainerCard
                        name="Kleber"
                        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkh7jor5MG_2zbO9y-U3eqwa-MnDLHeMKBfA&s"
                    />
                </View>

                <View style={styles.summaryContainer}>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryValue}>{team.length}</Text>
                        <Text style={styles.summaryLabel}>Capturados</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryValue}>{totalBattles}</Text>
                        <Text style={styles.summaryLabel}>Batalhas</Text>
                    </View>
                </View>

                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>Histórico de Combate</Text>

                    <TrainerStats
                        wins={wins || 0}
                        losses={losses || 0}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080808',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        minHeight: 48,
    },

    backButton: {
        position: 'absolute',
        left: 5,
        zIndex: 10,

        backgroundColor: '#FFCB05',

        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },

    backButtonText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16,
    },

    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    cardWrapper: {
        alignItems: 'center',
        marginBottom: 30,
    },
    summaryContainer: {
        flexDirection: 'row',
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#1C1C1C',
        marginBottom: 30,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    summaryBox: {
        alignItems: 'center',
        flex: 1,
    },
    summaryValue: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: '900',
    },
    summaryLabel: {
        color: '#999999',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 4,
        letterSpacing: 1,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#333333',
    },
    statsSection: {
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1C1C1C',
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: 'center',
    },
});