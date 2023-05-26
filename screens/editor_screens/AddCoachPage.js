import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function AddCoachPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { token } = route.params;

    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');

    const addCoach = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + 'coaches/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    surname: surname,
                    name: name,
                    position: position,
                    description: description,
                    image: photo
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditCoachesScreen", { token: token })
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

        if (!surname.trim() || surname.length < 2) return showError('Фамилия должна содержать не менее 2 символов', setError)

        if (!name.trim() || name.length < 2) return showError('Имя должно содержать не менее 2 символов', setError)

        if (!position.trim() || position.length < 5) return showError('Должность должна содержать не менее 5 символов', setError)

        if (!description.trim() || description.length < 5) return showError('Описание должно содержать не менее 5 символов', setError)

        return 1;
    }


    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} Добавление</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ ТРЕНЕРА</Text>
                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <TextInput
                        style={ams.input}
                        onChangeText={setSurname}
                        value={surname}
                        placeholder="Фамилия"
                    />
                    <TextInput
                        style={ams.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />
                    <TextInput
                        style={ams.input}
                        onChangeText={setPosition}
                        value={position}
                        placeholder="Должность"
                    />
                    <TextInput
                        editable
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        placeholder="Описание"
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.textField}
                    />
                    <TextInput
                        style={ams.input}
                        onChangeText={setPhoto}
                        value={photo}
                        placeholder="Ссылка на изображение"
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => addCoach()}>
                        <Text style={ams.writeText}>Добавить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textField: {
        height: 150,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
})