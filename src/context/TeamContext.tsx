import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pokemon } from '@/@types/pokemon';

type TeamContextData = {
  team: Pokemon[];
  wins: number;
  losses: number;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  clearTeam: () => void;
  registerWin: () => void;
  registerLoss: () => void;
};

const TeamContext = createContext({} as TeamContextData);

export function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    const storageTeam = await AsyncStorage.getItem('@Team:pokemons');
    const storageWins = await AsyncStorage.getItem('@Team:wins');
    const storageLosses = await AsyncStorage.getItem('@Team:losses');

    if (storageTeam) setTeam(JSON.parse(storageTeam));
    if (storageWins) setWins(Number(storageWins));
    if (storageLosses) setLosses(Number(storageLosses));
  }

  async function registerWin() {
    const newWins = wins + 1;
    setWins(newWins);
    await AsyncStorage.setItem('@Team:wins', String(newWins));
  }

  async function registerLoss() {
    const newLosses = losses + 1;
    setLosses(newLosses);
    await AsyncStorage.setItem('@Team:losses', String(newLosses));
  }

  async function saveTeam(
    updatedTeam: Pokemon[]
  ) {
    setTeam(updatedTeam);

    await AsyncStorage.setItem(
      '@Team:pokemons',
      JSON.stringify(updatedTeam)
    );
  }

  async function addPokemon(
    pokemon: Pokemon
  ) {
    const alreadyExists = team.some(
      (item) => item.id === pokemon.id
    );

    if (alreadyExists) return;

    if (team.length >= 6) return;

    const updatedTeam = [...team, pokemon];

    await saveTeam(updatedTeam);
  }

  async function removePokemon(
    id: number
  ) {
    const updatedTeam = team.filter(
      (pokemon) => pokemon.id !== id
    );

    await saveTeam(updatedTeam);
  }

  async function clearTeam() {
    setTeam([]);

    await AsyncStorage.removeItem(
      '@Team:pokemons'
    );
  }

  return (
    <TeamContext.Provider
      value={{
        team,
        addPokemon,
        removePokemon,
        clearTeam,
        registerWin,
        registerLoss,
        wins,
        losses,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}