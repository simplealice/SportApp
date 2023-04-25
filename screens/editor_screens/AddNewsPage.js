import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function AddNewsPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

    // const { token } = route.params;

    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState(new XDate());
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [datePickerVisible1, setDatePickerVisible1] = React.useState(false);
    const showDatePicker1 = () => {
        setDatePickerVisible1(true);
    };
    const hideDatePicker1 = () => {
        setDatePickerVisible1(false);
    };
    const handleConfirmBirthday = (date) => {
        setDate(date);
        hideDatePicker1();
    };

    const addNews = () => {
        fetch(global.URL + 'news/add', {
            method: 'POST',
            // headers: {
            //     "Authorization": `Bearer ${token}`,
            // },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                image: image,
            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigation.goBack();
            })
            .catch(error => console.error(error));
    };

    const retDate = (e) => {
        var dt = new XDate(e);
        return dt.toString("dd.MM.yyyy");
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
                    <Text style={styles.btnFeedbackText}>ДОБАВЛЕНИЕ НОВОСТИ</Text>
                    
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Название"
                    />

                    <View style={styles.containerDate}>
                        <Text style={styles.dateText}>
                            {date ? retDate(date) : 'Дата выбрана'}
                        </Text>
                        <TouchableOpacity style={styles.btnWrite} onPress={showDatePicker1}>
                            <Text style={styles.writeText}>Дата</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            // date={birthday}
                            isVisible={datePickerVisible1}
                            mode="date"
                            value={date}
                            onConfirm={handleConfirmBirthday}
                            onCancel={hideDatePicker1}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setImage}
                        value={image}
                        placeholder="Изображение"
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

                    <TouchableOpacity style={styles.btnWrite} onPress={() => addNews()}>
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