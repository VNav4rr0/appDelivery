import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useTeam } from '@/context/TeamContext';
import { Pokemon } from '@/@types/pokemon';

import { PokemonType } from '@/components/type/pokemonType';
import { pokemonTypeColors } from '@/utils/pokemonColors';

interface Props {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
    const primaryType = pokemon.tipos[0] || 'normal';
    const backgroundColor = pokemonTypeColors[primaryType] || '#A8A77A';
    const { addPokemon } = useTeam();

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor }]}>
            <Text style={styles.index}>
                #{pokemon.index}
            </Text>

            <Image
                source={{ uri: pokemon.imagem }}
                style={styles.image}
            />

            <Text style={styles.name}>
                {pokemon.nome}
            </Text>

            <View style={styles.types}>
                {pokemon.tipos.map((type) => (
                    <PokemonType
                        key={type}
                        type={type}
                    />
                ))}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>
                    Altura: {pokemon.altura}
                </Text>

                <Text style={styles.info}>
                    Peso: {pokemon.peso}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => addPokemon(pokemon)}
            >
                <Text style={styles.addButtonText}>
                    + Adicionar ao Time
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        minHeight: 180,
        elevation: 4,
    },

    index: {
        alignSelf: 'flex-end',
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'bold',
    },

    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },

    name: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        textTransform: 'capitalize',
    },

    types: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    typeBorder: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },

    infoContainer: {
        marginTop: 16,
        width: '100%',
    },

    info: {
        color: '#000',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#FFCB05',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },

    addButtonText: {
        color: '#121212',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});