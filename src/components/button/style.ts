import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 56,

    backgroundColor: '#EE1515',

    borderWidth: 3,
    borderColor: '#222',

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    elevation: 6,
  },

  pokeballLine: {
    position: 'absolute',

    width: '100%',
    height: 6,

    backgroundColor: '#222',
  },

  title: {
    color: '#FFF',

    fontSize: 16,
    fontWeight: 'bold',

    letterSpacing: 1,

    textTransform: 'uppercase',
  },
});