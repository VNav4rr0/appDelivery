import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#002776',
        borderRadius: 24,
        padding: 24,
        gap: 16,
        borderWidth: 4,
        borderColor: '#FFDF00',
    },

    title: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },

    image: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 8,
        alignSelf: 'center',
    },
});