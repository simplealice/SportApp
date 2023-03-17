import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    menuView: {
        width: '100%',
        backgroundColor: 'gainsboro',
        opacity: 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20
    },
    flatMenu: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    MenuTile: {
        marginTop: 12,
        height: 105,
        width: 105,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    btnMenuText: {
        fontSize: 15,
        color: 'black',
        paddingTop: 5,
        textAlign: 'center'
    },
});