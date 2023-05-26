import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function EditClubInfoPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

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

    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }

    const checkIfValid = () => {

        if (!title.trim() || title.length < 2) return showError('Фамилия должна содержать не менее 2 символов', setError)

        if (!description.trim() || description.length < 40) return showError('Описание должно содержать не менее 40 символов', setError)

        if (!address.trim() || address.length < 2) return showError('Адрес должен содержать не менее 2 символов', setError)

        if (!phoneClub.trim() || phoneClub.length < 10) return showError('Номер телефона должен содержать не менее 10 символов', setError)

        return 1;
    }

    const editNews = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + 'club/edit', {
                method: 'PUT',
                headers: {
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
        }
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

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                    <Text style={styles.titleText}>Название</Text>
                    <TextInput
                        style={ams.input}
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
                        style={ams.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder="г. Владимир"
                    />
                    <Text style={styles.titleText}>Номер телефона</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setPhoneClub}
                        value={phoneClub}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={ams.btnWrite} onPress={() => editNews()}>
                        <Text style={ams.writeText}>Отправить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    textField: {
        height: 400,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
})