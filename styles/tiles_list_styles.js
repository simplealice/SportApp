import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    NewsTile: {
        marginTop: 10,
        height: 160,
        width: '90%',
        paddingHorizontal: 15,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    dateEventContainer1: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateEventContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    eventsImage: {
        width: 20,
        height: 20,
        tintColor: '#E3241D',
        marginRight: 10
    },
    btnNewsText: {
        fontSize: 14,
        color: 'black'
    },
    btnNewsTextBold: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10,
    },
    btnNewsTextRed: {
        fontSize: 14,
        color: '#E3241D',
        fontWeight: 'bold',
    },

    btnAllNewsText: {
        fontSize: 15,
        color: '#E3241D',
        fontWeight: 'bold'
    },
    flatNews: {
        width: "100%",
        marginBottom: 10
    },
});