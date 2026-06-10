import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

import { useTeam } from '@/context/TeamContext';
import { getColor } from '@/constants/colors';

const translateType = (type: string) => {
    const translation: Record<string, string> = {
        fire: 'fogo', water: 'água', grass: 'grama', electric: 'elétrico',
        psychic: 'psíquico', ice: 'gelo', dragon: 'dragão', dark: 'trevas',
        fairy: 'fada', fighting: 'lutador', poison: 'veneno', ground: 'terra',
        rock: 'pedra', bug: 'inseto', ghost: 'fantasma', steel: 'aço',
        flying: 'voador', normal: 'normal'
    };
    return translation[type] || 'normal';
};

export default function Team() {
    const { team, removePokemon } = useTeam();

    const slots = [...team];

    while (slots.length < 6) {
        slots.push(null as any);
    }

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

            <Text style={styles.title}>
                Meu Time
            </Text>

            <Text style={styles.subtitle}>
                {team.length}/6 Pokémon
            </Text>

            <FlatList
                data={slots}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    if (!item) {
                        return (
                            <View style={styles.emptyCard}>
                                <Text style={styles.pokeball}>
                                    ⚪
                                </Text>

                                <Text style={styles.emptyText}>
                                    Slot vazio
                                </Text>
                            </View>
                        );
                    }

                    const translatedTypes = item.tipos.map(translateType);
                    const theme = getColor(translatedTypes);

                    return (
                        <TouchableOpacity
                            style={[
                                styles.card,
                                {
                                    backgroundColor: theme.bg,
                                    borderColor: theme.accent,
                                    shadowColor: theme.accent,
                                }
                            ]}
                            onPress={() => removePokemon(item.id)}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={{ uri: item.imagem }}
                                style={styles.image}
                            />

                            <Text style={styles.name}>
                                {item.nome}
                            </Text>

                            <Text style={styles.remove}>
                                Toque para remover
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 60,
        paddingHorizontal: 16,
    },

    title: {
        color: '#FFCB05',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subtitle: {
        color: '#AAA',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
    },

    list: {
        paddingBottom: 30,
    },

    row: {
        justifyContent: 'space-between',
    },

    card: {
        width: '48%',
        borderRadius: 18,
        borderWidth: 2,
        alignItems: 'center',
        padding: 15,
        marginBottom: 16,
        shadowOpacity: 0.6, 
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
    },

    image: {
        width: 100,
        height: 100,
    },

    name: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        textTransform: 'capitalize',
    },

    remove: {
        color: '#F44336',
        fontSize: 11,
        marginTop: 6,
    },

    emptyCard: {
        width: '48%',
        height: 180,
        backgroundColor: '#1A1A1A',
        borderRadius: 18,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },

    pokeball: {
        fontSize: 48,
        opacity: 0.4,
    },

    emptyText: {
        color: '#777',
        marginTop: 10,
        fontSize: 14,
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