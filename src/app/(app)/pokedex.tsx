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
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/button';

import { getPokemon } from '@/integration/pokemonintegration';
import { Pokemon } from '@/@types/pokemon';
import { useTeam } from '@/context/TeamContext';
import { getColor } from '@/constants/colors';
import { PokemonCard } from '@/components/card/pokemonCard';
import { SearchBar } from '@/components/search/searchBar';

export default function Pokedex() {
    const { team, addPokemon, registerWin, registerLoss } = useTeam();

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState('');

    const [inBattle, setInBattle] = useState(false);
    const [wildPokemon, setWildPokemon] = useState<Pokemon | null>(null);
    const [playerHp, setPlayerHp] = useState(100);
    const [wildHp, setWildHp] = useState(100);
    const [battleLog, setBattleLog] = useState('');
    const [battleStatus, setBattleStatus] = useState<'playing' | 'won' | 'lost'>('playing');

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

    const starters = useMemo(() => {
        return pokemons.filter(p => p.id === 1 || p.id === 4 || p.id === 7);
    }, [pokemons]);

    function handleStartBattle() {
        if (team.length === 0) return;

        const randomIndex = Math.floor(Math.random() * pokemons.length);
        const randomWild = pokemons[randomIndex];

        const wildHpStat = randomWild.poderes.find(p => p.nome === 'hp')?.forca || 100;
        const playerHpStat = team[0].poderes.find(p => p.nome === 'hp')?.forca || 100;

        setWildPokemon(randomWild);
        setWildHp(wildHpStat);
        setPlayerHp(playerHpStat);
        setBattleLog(`Um ${randomWild.nome.toUpperCase()} selvagem apareceu!`);
        setBattleStatus('playing');
        setInBattle(true);
    }

    function handleAttack() {
        if (!wildPokemon || battleStatus !== 'playing') return;

        const playerAttackStat = team[0].poderes.find(p => p.nome === 'attack')?.forca || 50;
        const playerDamage = Math.floor(Math.random() * (playerAttackStat / 3)) + 5;
        const newWildHp = Math.max(0, wildHp - playerDamage);

        let log = `Seu ${team[0].nome.toUpperCase()} causou ${playerDamage} de dano! `;

        if (newWildHp <= 0) {
            setWildHp(0);
            setBattleLog(log + `O ${wildPokemon.nome.toUpperCase()} desmaiou! Você venceu!`);
            setBattleStatus('won');
            registerWin();
            return;
        }

        setWildHp(newWildHp);

        const wildAttackStat = wildPokemon.poderes.find(p => p.nome === 'attack')?.forca || 50;
        const wildDamage = Math.floor(Math.random() * (wildAttackStat / 3)) + 5;
        const newPlayerHp = Math.max(0, playerHp - wildDamage);

        log += `\nO ${wildPokemon.nome.toUpperCase()} selvagem respondeu com ${wildDamage} de dano!`;

        if (newPlayerHp <= 0) {
            setPlayerHp(0);
            setBattleLog(log + `\nSeu ${team[0].nome.toUpperCase()} desmaiou! Você perdeu.`);
            setBattleStatus('lost');
            registerLoss();
            return;
        }

        setPlayerHp(newPlayerHp);
        setBattleLog(log);
    }

    async function handleCapture() {
        if (wildPokemon) {
            await addPokemon(wildPokemon);
            setInBattle(false);
            setWildPokemon(null);
        }
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={styles.loadingText}>Carregando Jogos e Pokédex...</Text>
            </View>
        );
    }

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

    if (team.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.starterTitle}>Escolha seu Inicial</Text>
                <Text style={styles.starterSubtitle}>
                    Selecione um parceiro para começar a sua jornada!
                </Text>

                {/* Trocamos o ScrollView por uma View centralizada */}
                <View style={styles.starterContainer}>
                    {starters.map((pokemon) => {
                        const translatedTypes = pokemon.tipos.map(translateType);
                        const theme = getColor(translatedTypes);

                        return (
                            <View
                                key={pokemon.id}
                                style={[
                                    styles.starterCard,
                                    {
                                        backgroundColor: theme.bg,
                                        borderColor: theme.accent,
                                        shadowColor: theme.accent,
                                    }
                                ]}
                            >
                                <Image source={{ uri: pokemon.imagem }} style={styles.starterImage} />

                                {/* Encurtei o nome caso a tela seja muito pequena */}
                                <Text style={styles.starterName} numberOfLines={1}>
                                    {pokemon.nome}
                                </Text>

                                <View style={styles.typeBadgeContainer}>
                                    {translatedTypes.map(tipo => {
                                        const badgeTheme = getColor([tipo]);
                                        return (
                                            <View
                                                key={tipo}
                                                style={[styles.typeBadge, { backgroundColor: badgeTheme.accent }]}
                                            >
                                                <Text style={styles.typeBadgeText}>{tipo}</Text>
                                            </View>
                                        );
                                    })}
                                </View>

                                <TouchableOpacity
                                    style={[styles.chooseButton, { backgroundColor: theme.accent }]}
                                    onPress={() => addPokemon(pokemon)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.chooseButtonText}>Escolho você!</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }

    if (inBattle && wildPokemon) {
        return (
            <View style={styles.battleContainer}>
                <Text style={styles.battleHeader}>💥 MODO DE BATALHA 💥</Text>

                <View style={styles.pokemonStage}>
                    <Image source={{ uri: wildPokemon.imagem }} style={styles.battleImage} />
                    <View style={styles.infoBox}>
                        <Text style={styles.battlePokemonName}>{wildPokemon.nome}</Text>
                        <Text style={styles.hpText}>HP: {wildHp}</Text>
                    </View>
                </View>

                <Text style={styles.versus}>VS</Text>

                <View style={[styles.pokemonStage, { flexDirection: 'row-reverse' }]}>
                    <Image source={{ uri: team[0].imagem }} style={styles.battleImage} />
                    <View style={[styles.infoBox, { alignItems: 'flex-end' }]}>
                        <Text style={styles.battlePokemonName}>{team[0].nome} (Seu)</Text>
                        <Text style={styles.hpText}>HP: {playerHp}</Text>
                    </View>
                </View>

                <View style={styles.logBox}>
                    <Text style={styles.logText}>{battleLog}</Text>
                </View>

                <View style={styles.battleActions}>
                    {battleStatus === 'playing' && (
                        <Button title="Atacar" onPress={handleAttack} />
                    )}

                    {battleStatus === 'won' && (
                        <Button title="Capturar Pokémon" onPress={handleCapture} />
                    )}

                    {(battleStatus === 'lost' || battleStatus === 'won') && (
                        <Button
                            title="Fugir / Voltar"
                            style={{ backgroundColor: '#555', marginTop: 10 }}
                            onPress={() => setInBattle(false)}
                        />
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>

            <SearchBar value={search} onChangeText={setSearch} />

            <View style={styles.headerButtons}>
                <View style={styles.buttonWrapper}>
                    <Button title="Perfil" onPress={() => router.push('/profile')} />
                </View>

                <View style={styles.buttonWrapper}>
                    <Button title="Meu Time" onPress={() => router.push('/team')} />
                </View>
            </View>

            <TouchableOpacity style={styles.huntButton} onPress={handleStartBattle}>
                <Text style={styles.huntButtonText}>🌿 Explorar Grama Alta (Batalhar)</Text>
            </TouchableOpacity>

            <FlatList
                data={filteredPokemons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    buttonWrapper: {
        flex: 1,
    },
    huntButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    huntButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    starterTitle: {
        color: '#FFCB05',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
    },
    starterSubtitle: {
        color: '#AAA',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    starterWrapper: {
        height: 350,
        marginTop: 20,
    },
    starterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 16,
        alignItems: 'center',
    },
    starterCard: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    starterImage: {
        width: 100,
        height: 100,
    },
    starterName: {
        color: '#FFF',
        marginTop: 8,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
    },
    typeBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 6,
        marginVertical: 12,
    },
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    chooseButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 'auto',
    },
    chooseButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    battleContainer: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    battleHeader: {
        color: '#FFCB05',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    pokemonStage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#262626',
        padding: 15,
        borderRadius: 16,
        justifyContent: 'space-between',
    },
    battleImage: {
        width: 100,
        height: 100,
    },
    infoBox: {
        flex: 1,
        paddingHorizontal: 15,
    },
    battlePokemonName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    hpText: {
        color: '#FF5252',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    versus: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    logBox: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 12,
        height: 100,
        marginVertical: 25,
        justifyContent: 'center',
    },
    logText: {
        color: '#00FF00',
        fontSize: 14,
        fontFamily: 'monospace',
    },
    battleActions: {
        marginTop: 'auto',
        marginBottom: 40,
    },
});