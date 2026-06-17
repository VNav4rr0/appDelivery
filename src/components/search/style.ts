import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const Styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    input: {
        backgroundColor: Colors.surfaceHighlight,
        color: Colors.white,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 16,
        fontSize: 16,
        borderWidth: 1.5,
        borderColor: Colors.whiteAlpha['12'],
    },
});
