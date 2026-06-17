import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const Styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        minHeight: 180,
        elevation: 4,
        borderWidth: 1.5,
        shadowOffset: { width: 0, height: 0 },
    },
    index: {
        alignSelf: 'flex-end',
        color: Colors.whiteAlpha['55'],
        fontWeight: 'bold',
    },
    shinyBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    shinyText: {
        color: Colors.black,
        fontSize: 10,
        fontWeight: 'bold',
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    name: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
        textTransform: 'capitalize',
    },
    types: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    info: {
        color: Colors.whiteAlpha['65'],
        textAlign: 'center',
        fontSize: 12,
    },
});
