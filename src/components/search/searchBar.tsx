import React from 'react';

import {
    TextInput,
    StyleSheet,
    View,
} from 'react-native';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
}

export function SearchBar({
    value,
    onChangeText,
}: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar Pokémon..."
                placeholderTextColor="#999"
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    input: {
        backgroundColor: '#1F1F1F',

        color: '#FFF',

        paddingVertical: 14,

        paddingHorizontal: 18,

        borderRadius: 16,

        fontSize: 16,

        borderWidth: 1,

        borderColor: '#333',
    },
});