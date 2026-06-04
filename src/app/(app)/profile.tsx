import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { TrainerCard } from '@/components/trainer/trainerCard';
import { TrainerStats } from '@/components/trainer/trainerStats';

import { useTeam } from '@/context/TeamContext';

export default function Profile() {
    const { team } = useTeam();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backButtonText}>
                    ← Voltar
                </Text>
            </TouchableOpacity>

            <TrainerCard
                name="Kleber"
                avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkh7jor5MG_2zbO9y-U3eqwa-MnDLHeMKBfA&s"
            />

            <Text>
                Pokémons capturados: {team.length}
            </Text>

            <TrainerStats
                wins={35}
                losses={12}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        justifyContent: 'center',
    },
    avatar: {
        width: 160,
        height: 160,

        borderRadius: 80,

        alignSelf: 'center',

        borderWidth: 4,
        borderColor: '#FFCB05',

        backgroundColor: '#1E1E1E',

        marginBottom: 20,

        shadowColor: '#FFCB05',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,

        elevation: 10,
    },
    backButton: {
        alignSelf: 'flex-start',

        backgroundColor: '#FFCB05',

        paddingHorizontal: 16,
        paddingVertical: 10,

        borderRadius: 12,

        marginBottom: 20,
    },

    backButtonText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16,
    },
});