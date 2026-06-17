import { View, Text, Image } from 'react-native';
import { Styles } from './style';

type Props = {
  name: string;
  avatar: string;
};

export function TrainerCard({ name, avatar }: Props) {
  return (
    <View style={Styles.container}>
      <Image source={{ uri: avatar }} style={Styles.image} />

      <Text style={Styles.name}>
        {name}
      </Text>
    </View>
  );
}
