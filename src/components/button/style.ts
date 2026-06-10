import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 56,
    backgroundColor: '#E5E5E5',
    borderWidth: 3,
    borderColor: '#222',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },

  topHalf: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#B31010',
  },

  pokeballLine: {
    position: 'absolute',
    width: '100%',
    height: 6,
    backgroundColor: '#222',
    top: '50%',
    marginTop: -3,
  },

  pokeballCenter: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#E5E5E5',
    borderWidth: 3,
    borderColor: '#222',
    borderRadius: 10,
    top: '50%',
    marginTop: -10,
  },

  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    zIndex: 1, 
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  titleContainer: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  paddingHorizontal: 16,
  paddingVertical: 4,
  borderRadius: 12,
  zIndex: 1,
}
});