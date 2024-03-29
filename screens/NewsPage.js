import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function NewsPage({ route, navigation }) {

    const { id } = route.params;

    const [data, setData] = React.useState(null);

    React.useEffect(() => {

        fetch(URL + `news/get/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    const returnSeminarDate = () => {
        if (data == null) { }
        else {
            return retDate(data)
        }
    }

    const findImage = () => {
        if (data == null) { }
        else {
            var ImageURL = { uri: data.image };
            return ImageURL;
        }
    }

    const returnSeminarTitle = () => {
        if (data == null) { }
        else {
            return data.title
        }
    }

    const returnSeminarDescription = () => {
        if (data == null) { }
        else {
            return data.description
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBack} source={require("../images/back.jpg")}>
                    <Image style={styles.imageIcon} />
                    <View style={styles.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={styles.iconText}>{'\u25C0'} {returnSeminarTitle()}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <Image source={findImage()} style={styles.photo} />

                <View style={styles.viewSem}>
                    <View style={styles.dateEventContainer1}>
                        <Image style={styles.eventsImage} source={require('../images/doc.png')} />
                        <Text style={styles.btnTitleText}>{returnSeminarTitle()}</Text>
                    </View>
                    <View style={styles.dateEventContainer2}>
                        <Image style={styles.eventsImage} source={require('../images/calendar.png')} />
                        <Text style={styles.btnNewsTextRed}>{returnSeminarDate()}</Text>
                    </View>
                    <Text style={styles.btnNewsText}>{returnSeminarDescription()}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBack: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 180,
        height: 180,
        borderRadius: 10
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
        width: '60%',
        height: '40%',
        resizeMode: 'contain',
    },
    btnTitleText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 40
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
        color: 'black',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 30
    },
    viewSem: {
        paddingBottom: 200,
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
        marginLeft: 20
    },
    dateEventContainer1: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    dateEventContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    btnWrite: {
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        width: 150,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20
      },
})