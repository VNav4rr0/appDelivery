import { View, Text, StyleSheet } from 'react-native';
import { getColor } from '@/constants/colors';

interface Props {
    type: string;
}

export function PokemonType({ type }: Props) {
    const theme = getColor([type]);
    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: theme.bg,
                    borderColor: theme.accent,
                },
            ]}
        >
            <Text style={[styles.text, { color: theme.accent }]}>
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
        borderWidth: 1.5,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});