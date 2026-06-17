import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const Styles = StyleSheet.create({
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
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
});
