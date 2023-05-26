import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function EditPrizePage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { token, id } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    React.useEffect(() => {
        getPrize();
    }, [])

    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }

    const checkIfValid = () => {

        if (!name.trim() || name.length < 2) return showError('Имя должно содержать не менее 2 символов', setError)

        if (!description.trim() || description.length < 5) return showError('Описание должно содержать не менее 5 символов', setError)

        return 1;
    }

    const getPrize = () => {
        fetch(global.URL + `awards/get/${id}`, {
            method: 'POST',
        }).then(response => response.json())
            .then(data => {
                setName(data.name)
                setDescription(data.description)
                setImage(data.image)
            })
            .catch(error => console.error(error));
    };

    const editPrize = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + `awards/edit/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newName: name,
                    newDescription: description,
                    newImage: image
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditPrizesScreen", { token: token })
                })
                .catch(error => console.error(error));
        }
    };

    const deleteUser = () => {
        fetch(global.URL + `awards/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(() => {
                navigation.navigate("EditPrizesScreen", { token: token })
            })
            .catch(error => console.log('error', error));
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => deleteUser()}>
                        <Image style={s.bellImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} НАГРАДЫ</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <Text style={styles.titleText}>Имя</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />

                    <Text style={styles.titleText}>Описание</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={10}
                        maxLength={160}
                        placeholder="Описание..."
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.textField}
                    />

                    <Text style={styles.titleText}>Изображение</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setImage}
                        value={image}
                        placeholder="http://..."
                        autoCapitalize='none'
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => editPrize()}>
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
        height: 250,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
})