import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box: {
    alignItems: 'center',
  },
  number: {
    fontSize: 28,
    color: Colors.white,
    fontWeight: 'bold',
  },
  label: {
    color: Colors.whiteAlpha['50'],
  },
});
