import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    OpacityBell: {
        marginTop: 40,
        marginRight: 20,
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    iconText: {
        fontSize: 14,
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    menuView: {
        width: '100%',
        backgroundColor: 'gainsboro',
        opacity: 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    photo: {
        marginTop: 20,
        width: 280,
        height: 300,
        resizeMode: 'contain',
    },
    btnTitleText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 40,
        marginTop: 20
    },
    btnNewsTextRed: {
        fontSize: 15,
        color: '#E3241D',
        marginBottom: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 20
    },
    btnNewsText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 30
    },
    btnNewsTextDesc: {
        fontSize: 15,
        marginTop: 30,
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 12
    },
    viewSem: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    writeText: {
        fontSize: 14,
        marginTop: 20,
        marginBottom: 20,
    },

    eventsImage: {
        width: 20,
        height: 20,
        tintColor: '#E3241D',
    },
    dateEventContainer1: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginLeft: 20
    },
    dateEventContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20
    },
    btnWrite: {
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        width: 150,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
    },
});