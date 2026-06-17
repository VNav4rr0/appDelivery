import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Pokemon } from '@/@types/pokemon';
import { useAuth } from './AuthContext';
import { translateType } from '@/constants/colors';

type TeamContextData = {
  team: Pokemon[];
  capturedReservoir: Pokemon[];
  isLoadingTeam: boolean;
  loadTeam: () => Promise<void>;
  capturePokemon: (pokemonId: number) => Promise<Pokemon | null>;
  swapPokemon: (removedId: number, newId: number) => Promise<boolean>;
  clearTeam: () => void;
};

const API_BASE = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon';

const TeamContext = createContext({} as TeamContextData);

function mapAwsToPokemon(awsItem: any): Pokemon {
  const id = parseInt(awsItem.index) || 0;
  return {
    id,
    index: awsItem.index.toString().padStart(3, '0'),
    nome: awsItem.name,
    imagem: awsItem.image,
    tipos: (awsItem.types || []).map(translateType),
    poderes: (awsItem.abilities || []).map((a: any) => ({
      nome: a.name,
      forca: a.strength,
    })),
    altura: 0,
    peso: 0,
  };
}

export function TeamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, userData } = useAuth();
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [capturedReservoir, setCapturedReservoir] = useState<Pokemon[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userData?.userId) {
      loadTeam();
    } else {
      setTeam([]);
      setCapturedReservoir([]);
    }
  }, [isAuthenticated, userData]);

  async function loadTeam() {
    if (!userData?.userId) return;
    setIsLoadingTeam(true);
    try {
      const response = await axios.get(`${API_BASE}/pokemon/v1/team?user-id=${userData.userId}`);
      if (response.data) {
        const awsTeam = response.data.team || [];
        const awsCapture = response.data.capture || [];

        setTeam(awsTeam.map(mapAwsToPokemon));
        setCapturedReservoir(awsCapture.map(mapAwsToPokemon));
      }
    } catch (error) {
      console.error('Erro ao buscar time da AWS:', error);
    } finally {
      setIsLoadingTeam(false);
    }
  }

  async function capturePokemon(pokemonId: number): Promise<Pokemon | null> {
    if (!userData?.userId) return null;
    try {
      const response = await axios.put(
        `${API_BASE}/pokemon/v1/captured?user-id=${userData.userId}&pokemon-id=${pokemonId}`,
        {}
      );
      if (response.data) {
        await loadTeam();
        
        return {
          id: pokemonId,
          index: pokemonId.toString().padStart(3, '0'),
          nome: `Pokemon #${pokemonId}`,
          imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          tipos: [],
          poderes: [],
          altura: 0,
          peso: 0,
        };
      }
      return null;
    } catch (error) {
      console.error('Erro ao capturar pokémon na AWS:', error);
      return null;
    }
  }

  async function swapPokemon(removedId: number, newId: number): Promise<boolean> {
    if (!userData?.userId) return false;
    try {
      const response = await axios.put(
        `${API_BASE}/pokemon/v1/team?user-id=${userData.userId}&removed-pokemon=${removedId}&new-pokemon=${newId}`,
        {
          removedPokemon: removedId,
          newPokemon: newId,
        }
      );
      
      if (response.data) {
        const oldTeamIds = team.map(p => p.id.toString());
        const newTeamOrder = oldTeamIds.map(id => id === removedId.toString() ? newId.toString() : id);

        const orderRes = await axios.put(
          `${API_BASE}/pokemon/v1/team?user-id=${userData.userId}`,
          {
            teamOrder: newTeamOrder,
          }
        );

        if (orderRes.data) {
          await loadTeam();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao substituir e reordenar pokémon na AWS:', error);
      return false;
    }
  }

  function clearTeam() {
    setTeam([]);
    setCapturedReservoir([]);
  }

  return (
    <TeamContext.Provider
      value={{
        team,
        capturedReservoir,
        isLoadingTeam,
        loadTeam,
        capturePokemon,
        swapPokemon,
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