import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function AddTimeSignInPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const [signDate, setSignDate] = useState('');
    const [timeFromTo, setTimeFromTo] = useState('');

    const addTimeSignIn = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + 'timeSignIn/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    signDate: signDate,
                    timeFromTo: timeFromTo,
                }),
            }).then(response => {
                response.json()
            })
                .then(() => {
                    navigation.navigate("EditTimeSignInScreen")
                })
                .catch(error => console.error(error));
        }
    };

    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }

    const checkIfValid = () => {

        if (!signDate.trim() || signDate.length < 10) return showError('Дата должна содержать 10 символов', setError)

        if (!timeFromTo.trim()) return showError('Время должно быть заполнено', setError)

        return 1;
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <Text>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} Добавление</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ ВРЕМЕНИ ЗАПИСИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <TextInput
                        style={ams.input}
                        onChangeText={setSignDate}
                        value={signDate}
                        placeholder="Дата возможного занятия"
                    />

                    <TextInput
                        style={ams.input}
                        onChangeText={setTimeFromTo}
                        value={timeFromTo}
                        placeholder="Время возможного занятия"
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => addTimeSignIn()}>
                        <Text style={ams.writeText}>Добавить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};