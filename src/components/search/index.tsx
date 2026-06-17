import React from 'react';
import { TextInput, View } from 'react-native';
import { Styles } from './style';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
}

export function SearchBar({
    value,
    onChangeText,
}: Props) {
    return (
        <View style={Styles.container}>
            <TextInput
                placeholder="Buscar Pokémon..."
                placeholderTextColor="#999"
                style={Styles.input}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}
