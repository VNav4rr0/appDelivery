import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import { TrainerCard } from '@/components/trainer-card';
import { TrainerStats } from '@/components/trainer-stats';
import { useAuth } from '@/context/AuthContext';
import { useTeam } from '@/context/TeamContext';
import { Colors } from '@/constants/colors';

export default function Profile() {
    const { userData } = useAuth();
    const { team, capturedReservoir } = useTeam();

    const username = userData?.username || 'Treinador';
    const wins = userData?.vitorias || 0;
    const losses = userData?.derrotas || 0;
    const level = userData?.level || 1;

    const totalBattles = wins + losses;
    const totalCaptured = team.length + (capturedReservoir?.length || 0);
    const currentXpProgress = wins % 5;
    const winsToNextLevel = 5 - currentXpProgress;
    const progressPercent = (currentXpProgress / 5) * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Perfil do Treinador</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.cardWrapper}>
                    <TrainerCard
                        name={username}
                        avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkh7jor5MG_2zbO9y-U3eqwa-MnDLHeMKBfA&s"
                    />
                </View>

                <View style={styles.levelCard}>
                    <View style={styles.levelHeader}>
                        <Text style={styles.levelLabel}>NÍVEL DO TREINADOR</Text>
                        <Text style={styles.levelValue}>{level}</Text>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>

                    <Text style={styles.xpMessage}>
                        {winsToNextLevel === 5 
                            ? 'Subiu de nível! Falta(m) 5 vitórias para o próximo nível.'
                            : `Falta(m) ${winsToNextLevel} vitória(s) para o nível ${level + 1}`}
                    </Text>
                </View>

                <View style={styles.summaryContainer}>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryValue}>{team.length}</Text>
                        <Text style={styles.summaryLabel}>Time Ativo</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryValue}>{totalCaptured}</Text>
                        <Text style={styles.summaryLabel}>Total Capturas</Text>
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
                        wins={wins}
                        losses={losses}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 24,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    cardWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    levelCard: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.primaryAlpha['30'],
        padding: 20,
        marginBottom: 20,
        gap: 12,
        ...Platform.select({
            web: { boxShadow: '0 0 20px rgba(255,107,53,0.1)' } as any,
        }),
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    levelLabel: {
        color: Colors.whiteAlpha['50'],
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },
    levelValue: {
        color: Colors.btnPrimary,
        fontSize: 28,
        fontWeight: '900',
        fontFamily: isWeb ? "'Press Start 2P', monospace" : undefined,
    },
    progressBarBg: {
        height: 12,
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 6,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.btnPrimary,
        borderRadius: 6,
    },
    xpMessage: {
        color: Colors.whiteAlpha['65'],
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    summaryContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1.5,
        borderColor: Colors.whiteAlpha['12'],
        marginBottom: 20,
    },
    summaryBox: {
        alignItems: 'center',
        flex: 1,
    },
    summaryValue: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: '900',
    },
    summaryLabel: {
        color: Colors.whiteAlpha['50'],
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        marginTop: 4,
        letterSpacing: 1,
    },
    divider: {
        width: 1.5,
        height: 40,
        backgroundColor: Colors.whiteAlpha['12'],
    },
    statsSection: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1.5,
        borderColor: Colors.whiteAlpha['12'],
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: 'center',
    },
});