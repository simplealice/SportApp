import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import XDate from 'xdate';

export default function EditNewsPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { id } = route.params;

    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState(new XDate());
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        getNews()
    }, []);

    const getNews = () => {
        fetch(global.URL + `news/get/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                setTitle(data.title)
                setDate(data.date)
                setDescription(data.description)
                setImage(data.image)
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

        if (!title.trim() || title.length < 5) return showError('Название должно содержать не менее 5 символов', setError)

        if (!description.trim() || description.length < 10) return showError('Описание должно содержать не менее 10 символов', setError)

        return 1;
    }

    const editNews = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + `news/edit/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newTitle: title,
                    newDate: date,
                    newDescription: description,
                    newImage: image
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditNewsScreen")
                })
                .catch(error => console.error(error));
        }
    };

    const deleteNews = () => {
        fetch(global.URL + `news/delete/${id}`)
            .then(response => {
                response.json()
                navigation.navigate("EditNewsScreen")
            }).catch(error => console.error(error));
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => deleteNews()}>
                        <Image style={s.bellImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {title}</Text>
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

                    <Text style={styles.titleText}>Изображение</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setImage}
                        value={image}
                        placeholder="http://..."
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
                    <TouchableOpacity style={ams.btnWrite} onPress={() => editNews()}>
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