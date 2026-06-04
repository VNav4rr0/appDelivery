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
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  clearTeam: () => void;
};

const TeamContext = createContext({} as TeamContextData);

export function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [team, setTeam] = useState<Pokemon[]>([]);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    const storageTeam =
      await AsyncStorage.getItem('@Team:pokemons');

    if (storageTeam) {
      setTeam(JSON.parse(storageTeam));
    }
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
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}