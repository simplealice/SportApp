import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddPrizePage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

    // const { token } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const addPrize = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + 'awards/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: name,
                    description: description,
                    image: image,
                }),
            }).then(response => {
                response.json()
            })
                .then(data => {
                    navigation.navigate("EditPrizesScreen")
                })
                .catch(error => console.error(error));
        }
    };

    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        // console.log(error)
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

                <View style={styles.menuView}>
                    <Text style={styles.btnFeedbackText}>ДОБАВЛЕНИЕ НАГРАДЫ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setImage}
                        value={image}
                        placeholder="Ссылка на изображение"
                        autoCapitalize='none'
                    />
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

                    <TouchableOpacity style={styles.btnWrite} onPress={() => addPrize()}>
                        <Text style={styles.writeText}>Добавить</Text>
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
    selectDropdown: {
        width: '100%',
        marginTop: 20,
        alignSelf: 'center',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    selectDropdownText: {
        fontSize: 14
    },

    btnFeedbackText: {
        alignSelf: 'center',
        fontSize: 15,
        color: '#E3241D',
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
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: 10,
    },
    textField: {
        height: 250,
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