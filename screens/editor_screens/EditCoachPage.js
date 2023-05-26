import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function EditCoachPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { token, id } = route.params;

    const [surname, setSurame] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');

    React.useEffect(() => {
        getCoach();
    }, []);

    const getCoach = () => {
        fetch(global.URL + `coaches/get/${id}`, {
            method: 'POST',
        }).then(response => response.json())
            .then(data => {
                setSurame(data.surname)
                setName(data.name)
                setPosition(data.position)
                setDescription(data.description)
                setPhoto(data.image)
            })
            .catch(error => console.error(error));
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

    const editUser = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + `coaches/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newSurname: surname,
                    newName: name,
                    newPosition: position,
                    newDescription: description,
                    newImage: photo,
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditCoachesScreen", { token: token })
                })
                .catch(error => console.error(error));
        }
    };

    const deleteCoach = () => {
        fetch(global.URL + `coaches/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(result => {
                navigation.navigate("EditCoachesScreen", { token: token })
            })
            .catch(error => console.log('error', error));
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => deleteCoach()}>
                        <Image style={s.bellImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {surname} {name}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                    <Text style={styles.titleText}>Фамилия</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setSurame}
                        value={surname}
                        placeholder="Фамилия"
                    />

                    <Text style={styles.titleText}>Имя</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />

                    <Text style={styles.titleText}>Должность</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setPosition}
                        value={position}
                        placeholder="Тренер"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Описание</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={5}
                        maxLength={200}
                        placeholder="Описание..."
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.textField}
                    />

                    <Text style={styles.titleText}>Фото</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setPhoto}
                        value={photo}
                        placeholder="http://"
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => editUser()}>
                        <Text style={ams.writeText}>Отправить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: 200
    },
    newsImage: {
        width: 85,
        height: 85,
    },
    titleText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    textField: {
        height: 100,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
})