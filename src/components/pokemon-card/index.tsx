import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import { PokemonType } from '@/components/type/pokemonType';
import { getColor, translateType } from '@/constants/colors';
import { Styles } from './style';

interface Props {
    pokemon: Pokemon;
    isShiny?: boolean;
}

export function PokemonCard({ pokemon, isShiny }: Props) {
    const showShiny = isShiny || pokemon.isShiny;
    const imageUrl = (showShiny && pokemon.imagemShiny) ? pokemon.imagemShiny : pokemon.imagem;
    const translatedTypes = pokemon.tipos.map(translateType);
    const theme = getColor(translatedTypes);

    return (
        <TouchableOpacity style={[
            Styles.card,
            {
                backgroundColor: theme.bg,
                borderColor: theme.accent,
                shadowColor: theme.accent,
                shadowOpacity: showShiny ? 0.8 : 0.3,
                shadowRadius: showShiny ? 10 : 4,
                elevation: showShiny ? 8 : 4,
            }
        ]}>
            {showShiny && (
                <View style={[Styles.shinyBadge, { backgroundColor: theme.accent }]}>
                    <Text style={Styles.shinyText}>✨ Shiny</Text>
                </View>
            )}
            <Text style={Styles.index}>
                #{pokemon.index}
            </Text>

            <Image
                source={{ uri: imageUrl }}
                style={Styles.image}
            />

            <Text style={Styles.name}>
                {pokemon.nome}
            </Text>

            <View style={Styles.types}>
                {pokemon.tipos.map((type) => (
                    <PokemonType
                        key={type}
                        type={type}
                    />
                ))}
            </View>
            <View style={Styles.infoContainer}>
                <Text style={Styles.info}>
                    Altura: {pokemon.altura}
                </Text>

                <Text style={Styles.info}>
                    Peso: {pokemon.peso}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
