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
    Switch,
} from 'react-native';
import { getPokemon } from '@/integration/pokemonIntegration';
import { Pokemon } from '@/@types/pokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { SearchBar } from '@/components/search';
import { Colors } from '@/constants/colors';

export default function Pokedex() {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState('');
    const [showShinies, setShowShinies] = useState(false);

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
                <ActivityIndicator size="large" color={Colors.btnPrimary} />
                <Text style={styles.loadingText}>Carregando Pokédex...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>

            <SearchBar value={search} onChangeText={setSearch} />

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>✨ Mostrar Shinies</Text>
                <Switch
                    value={showShinies}
                    onValueChange={setShowShinies}
                    trackColor={{ false: Colors.surfaceHighlight, true: Colors.btnPrimary }}
                    thumbColor={showShinies ? Colors.white : Colors.gray[500]}
                />
            </View>

            <FlatList
                data={filteredPokemons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PokemonCard pokemon={item} isShiny={showShinies} />}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.surfaceHighlight,
    },
    toggleLabel: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    loading: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.white,
        marginTop: 12,
        fontSize: 16,
    },
});