import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function EditCoachPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

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
            // headers: {
            //     "Authorization": `Bearer ${token}`,
            // }
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
                    // "Authorization": `Bearer ${token}`,
                    // Accept: 'application/json',
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

    // const deleteUser = () => {
    //     fetch('https://example.com/api/resource', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // Добавьте сюда необходимые заголовки
    //         },
    //         body: JSON.stringify({
    //             // Добавьте сюда необходимые данные для запроса
    //         }),
    //     }).then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         }).then(data => {
    //             console.log(data);
    //             navigation.navigate("EditUsersScreen", { token: token })
    //         }).catch(error => {
    //             console.error('There was a problem with the fetch operation:', error);
    //         });
    // };

    const retDate = (e) => {
        var dt = new XDate(e);
        return dt.toString("dd.MM.yyyy");
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        {/* <Image style={s.bellImage} source={require('../../images/bin.png')} /> */}
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {surname} {name}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.menuView}>
                    <Text style={styles.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                    <Text style={styles.titleText}>Фамилия</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSurame}
                        value={surname}
                        placeholder="Фамилия"
                    />

                    <Text style={styles.titleText}>Имя</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />

                    <Text style={styles.titleText}>Должность</Text>
                    <TextInput
                        style={styles.input}
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
                        style={styles.input}
                        onChangeText={setPhoto}
                        value={photo}
                        placeholder="http://"
                    />

                    <TouchableOpacity style={styles.btnWrite} onPress={() => editUser()}>
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
        height: 100,
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