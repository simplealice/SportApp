import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function AddCurriculumPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const [groupNumber, setGroupNumber] = useState('');
    const [coach, setCoach] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [timeFromTo, setTimeFromTo] = useState('');

    const addCurriculum = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + 'curriculum/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupNumber: groupNumber,
                    coach: coach,
                    dayOfWeek: dayOfWeek,
                    timeFromTo: timeFromTo,
                }),
            }).then(response => {
                response.json()
            })
                .then(() => {
                    navigation.navigate("EditCurriculumScreen")
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

        if (!groupNumber.trim()) return showError('Необходимо ввести номер группы', setError)

        if (!coach.trim()) return showError('Необходимо ввести тренера', setError)

        if (!dayOfWeek.trim()) return showError('Необходимо задать день недели', setError)

        if (!timeFromTo.trim()) return showError('Необходимо задать время тренировки', setError)

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
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ РАСПИСАНИЯ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <TextInput
                        style={ams.input}
                        onChangeText={setGroupNumber}
                        value={groupNumber}
                        placeholder="Номер группы"
                    />

                    <TextInput
                        style={ams.input}
                        onChangeText={setCoach}
                        value={coach}
                        placeholder="Тренер"
                    />

                    <TextInput
                        style={ams.input}
                        onChangeText={setDayOfWeek}
                        value={dayOfWeek}
                        placeholder="День недели"
                    />

                    <TextInput
                        style={ams.input}
                        onChangeText={setTimeFromTo}
                        value={timeFromTo}
                        placeholder="Время тренировки (с - до)"
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => addCurriculum()}>
                        <Text style={ams.writeText}>Добавить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};