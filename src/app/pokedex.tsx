import React, {
    useEffect,
    useState,
    useMemo,
} from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { getPokemon } from '@/integration/pokemonintegration';

import { Pokemon } from '@/@types/pokemon';

import { PokemonCard } from '@/components/card/pokemonCard';

import { SearchBar } from '@/components/search/searchBar';

export default function Pokedex() {
    const [loading, setLoading] =
        useState(true);

    const [pokemons, setPokemons] =
        useState<Pokemon[]>([]);

    const [search, setSearch] =
        useState('');

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getPokemon(151);

                setPokemons(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const filteredPokemons = useMemo(() => {
        return pokemons.filter((pokemon) =>
            pokemon.nome
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, pokemons]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    size="large"
                    color="#FF0000"
                />

                <Text style={styles.loadingText}>
                    Carregando Pokédex...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Pokédex
            </Text>

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredPokemons}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 40,
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
        paddingHorizontal: 10,
    },

    title: {
        color: '#FFF',
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    loading: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        color: '#FFF',
        marginTop: 12,
        fontSize: 18,
    },
});