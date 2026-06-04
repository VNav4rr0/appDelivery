import { View, Text, StyleSheet } from 'react-native';

type Props = {
  wins: number;
  losses: number;
};

export function TrainerStats({
  wins,
  losses,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.number}>{wins}</Text>
        <Text style={styles.label}>Vitórias</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.number}>{losses}</Text>
        <Text style={styles.label}>Derrotas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  box: {
    alignItems: 'center',
  },

  number: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },

  label: {
    color: '#AAA',
  },
});