import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function FeedbackPage({ route, navigation }) {

    const { token, id } = route.params;

    const [data, setData] = React.useState(null);

    React.useEffect(() => {

        fetch(URL + `feedback/get/${id}`, {
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

    const returnFeedbackName = () => {
        if (data == null) { }
        else {
            return data.name
        }
    }

    const returnFeedbackPhone = () => {
        if (data == null) { }
        else {
            return data.phone
        }
    }

    const returnFeedbackEmail = () => {
        if (data == null) { }
        else {
            return data.email
        }
    }

    const returnFeedbackComment = () => {
        if (data == null) { }
        else {
            return data.comment
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBack} source={require("../../images/back.jpg")}>
                    <Image style={styles.imageIcon} />
                    <View style={styles.menuView}>
                        <TouchableOpacity onPress={() => { navigation.navigate("FeedbackScreen", { token: token }) }}>
                            <Text style={styles.iconText}>{'\u25C0'} Отзыв</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* {data[id].image ? <Image style={styles.photo} source={findImage()} /> : <View />}  */}

                <View style={styles.viewSem}>
                    <View style={styles.dateEventContainer1}>
                        <Image style={styles.eventsImageId} source={require('../../images/contacts.png')} />
                        <Text style={styles.btnNewsText}>ФИО: {returnFeedbackName()}</Text>
                    </View>
                    <View style={styles.dateEventContainer2}>
                        <Image style={styles.eventsImage} source={require('../../images/phone.png')} />
                        <Text style={styles.btnNewsText}>Номер телефона: {returnFeedbackPhone()}</Text>
                    </View>
                    <View style={styles.dateEventContainer2}>
                        <Image style={styles.eventsImage} source={require('../../images/doc.png')} />
                        <Text style={styles.btnNewsText}>Эл. почта: {returnFeedbackEmail()}</Text>
                    </View>

                    <Text style={styles.btnNewsText}>Комментарий: {returnFeedbackComment()}</Text>
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 180,
        height: 100,
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
    btnNewsText: {
        fontSize: 15,
        color: 'black',
        marginBottom: 30,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginRight: 30
    },
    viewSem: {
        paddingBottom: 300,
    },

    eventsImage: {
        width: 20,
        height: 20,
        tintColor: '#E3241D',
    },
    eventsImageId: {
        width: 25,
        height: 20,
        tintColor: '#E3241D',
    },
    dateEventContainer1: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 40
    },
    dateEventContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        // marginTop: 30
    },

})