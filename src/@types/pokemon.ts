export interface Poder {
    nome: string;
    forca: number;
}

export interface Pokemon {
    id: number;
    index: string;
    nome: string;
    imagem: string;
    imagemShiny?: string;
    isShiny?: boolean;
    tipos: string[];
    poderes: Poder[];
    altura: number;
    peso: number;
}

export type TeamPokemon = {
  id: number;
  nome: string;
  imagem: string;
};