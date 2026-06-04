import { View, Text, Image } from 'react-native';

import Button from '../button';
import { Input } from '../input'

import { styles } from './style';

interface CardProps {
  usuario: string;
  senha: string;
  setUsuario: (value: string) => void;
  setSenha: (value: string) => void;
  entrar: () => void;
}

export const Card = ({
  usuario,
  senha,
  setUsuario,
  setSenha,
  entrar,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://www.cbf.com.br/_next/image?url=https%3A%2F%2Fstcbfsiteprdimgbrs.blob.core.windows.net%2Fimg-site%2Fcdn%2Fance_h_d9bcc37982.jpg&w=3840&q=70',
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Login do Brasil</Text>

      <Input
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button
        title="Entrar"
        onPress={entrar}
      />
    </View>
  );
};