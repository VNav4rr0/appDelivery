import { View, Text } from 'react-native';
import { Styles } from './style';

type Props = {
  wins: number;
  losses: number;
};

export function TrainerStats({
  wins,
  losses,
}: Props) {
  return (
    <View style={Styles.container}>
      <View style={Styles.box}>
        <Text style={Styles.number}>{wins}</Text>
        <Text style={Styles.label}>Vitórias</Text>
      </View>

      <View style={Styles.box}>
        <Text style={Styles.number}>{losses}</Text>
        <Text style={Styles.label}>Derrotas</Text>
      </View>
    </View>
  );
}
