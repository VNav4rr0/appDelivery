import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  name: string;
  avatar: string;
};

export function TrainerCard({ name, avatar }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />

      <Text style={styles.name}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  name: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
});