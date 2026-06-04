import { View, Image, Text, StyleSheet } from 'react-native';

type Props = {
  nome: string;
  imagem: string;
};

export function TeamPokemon({
  nome,
  imagem,
}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imagem }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {nome}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 100,
    margin: 10,
  },

  image: {
    width: 80,
    height: 80,
  },

  name: {
    color: '#FFF',
  },
});