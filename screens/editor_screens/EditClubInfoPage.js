import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import XDate from 'xdate';

export default function EditClubInfoPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = React.useState('');
    const [phoneClub, setPhoneClub] = React.useState('');

    React.useEffect(() => {
        const getEvents = async () => {
            const resp = await fetch(URL + "club/get");
            const data = await resp.json();
            setTitle(data.title);
            setDescription(data.description)
            setPhoneClub(data.setPhoneClub)
            setAddress(data.address)
        }
        getEvents();
    }, []);

    const editNews = () => {
        fetch(global.URL + 'club/edit', {
            method: 'PUT',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newTitle: title,
                newDescription: description,
                newPhone: phoneClub,
                newAddress: address
            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigation.navigate("Profile")
            })
            .catch(error => console.error(error));
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} Инфо о клубе</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.menuView}>
                    <Text style={styles.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>
                    <Text style={styles.titleText}>Название</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Название"
                    />

                    <Text style={styles.titleText}>Описание</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={30}
                        maxLength={700}
                        placeholder="Описание"
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.textField}
                    />

                    <Text style={styles.titleText}>Адрес</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder="г. Владимир"
                    />
                    <Text style={styles.titleText}>Номер телефона</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneClub}
                        value={phoneClub}
                        placeholder="+7 XXX XXX XX XX"
                    />
                    <TouchableOpacity style={styles.btnWrite} onPress={() => editNews()}>
                        <Text style={styles.writeText}>Отправить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    flatNews: {
        width: "100%",
    },
    NewsTile: {
        marginTop: 10,
        height: 110,
        width: '90%',
        paddingHorizontal: 20,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnNewsText: {
        fontSize: 15,
        color: 'black'
    },
    btnNewsTextBold: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    btnNewsTextGray: {
        fontSize: 15,
        color: 'gray'
    },
    mapStyle: {
        width: '100%',
        height: 200
    },
    newsImage: {
        width: 85,
        height: 85,
    },

    btnFeedbackText: {
        alignSelf: 'center',
        fontSize: 15,
        color: '#E3241D',
        fontWeight: 'bold'
    },
    eventText: {
        fontSize: 14,
        marginLeft: 15,
        paddingRight: 10
    },
    titleText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold'
    },

    dateEventContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 15,
        alignItems: 'center',
        marginBottom: 15
    },


    networkContainer: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: 'gainsboro'
    },

    menuView: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingBottom: 20,
        paddingTop: 20
    },
    input: {
        height: 40,
        margin: 12,
        marginTop: 0,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: 10,
    },
    textField: {
        height: 400,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
    btnWrite: {
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#E3241D',
        width: 150,
        borderRadius: 20,
    },
    writeText: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        color: 'white'
    },
    containerDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 30
    }
})