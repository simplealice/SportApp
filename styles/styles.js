import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // Header
    imageBack: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OpacityBell: {
        marginTop: 40,
        marginRight: 20,
        alignSelf: 'flex-end'
    },
    bellImage: {
        width: 20,
        height: 25,
        tintColor: 'white'
    },
    imageIcon: {
        marginTop: 20,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },
    iconText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold'
    },

    // Tile
    btnView: {
        alignItems: 'center',
        paddingTop: 15
    },

    // Text-btn red go to
    AllTouchableOpacity: {
        width: '90%',
        marginTop: 10,
        paddingVertical: 5,
    },
    btnAllText: {
        fontSize: 15,
        color: '#E3241D',
        fontWeight: 'bold'
    },
    textAllView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        width: '72%',
        backgroundColor: '#E3241D',
        height: 2,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 5
    },

    netsImage: {
        width: 60,
        height: 60,
        margin: 10
    }
});