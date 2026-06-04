import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Styles } from './style';

type Props = TouchableOpacityProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  title,
  style,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[Styles.button, style]}
      {...rest}
    >
      <View style={Styles.pokeballLine} />

      <Text style={Styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}