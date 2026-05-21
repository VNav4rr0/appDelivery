import {
  TextInput,
  TextInputProps,
} from 'react-native';

import { styles } from './style';

type Props = TextInputProps & {
  value: string;
};

export default function Input({
  value,
  ...rest
}: Props) {
  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholderTextColor="#666"
      {...rest}
    />
  );
}