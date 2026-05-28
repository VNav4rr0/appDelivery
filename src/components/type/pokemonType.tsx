import { View, Text, StyleSheet } from 'react-native';
import { pokemonTypeColors } from '@/utils/pokemonColors';

interface Props {
    type: string;
}

export function PokemonType({ type }: Props) {
    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor:
                        pokemonTypeColors[type] || '#777',
                },
            ]}
        >
            <Text style={styles.text}>
                {type.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },

    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});