import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function AddNewsPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

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
        if (checkIfValid() == 1) {
            fetch(global.URL + 'news/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    date: date.toString("yyyy-MM-dd"),
                    description: description,
                    image: image,
                }),
            }).then(response => {
                response.json()
            })
                .then(data => {
                    navigation.navigate("EditNewsScreen")
                })
                .catch(error => console.error(error));
        }
    };

    const retDate = (e) => {
        var dt = new XDate(e);
        return dt.toString("dd.MM.yyyy");
    }

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

        if (date === '' || date.getFullYear() < new Date().getFullYear()
            || (date.getFullYear() === new Date().getFullYear() && date.getMonth() < new Date().getMonth())
            || (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() !== new Date().getDate())
        ) {
            return showError('Недопустимая дата', setError)
        }

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
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ НОВОСТИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <TextInput
                        style={ams.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Название"
                    />

                    <View style={styles.containerDate}>
                        <Text style={styles.dateText}>
                            {date ? retDate(date) : 'Дата выбрана'}
                        </Text>
                        <TouchableOpacity style={ams.btnWrite} onPress={showDatePicker1}>
                            <Text style={ams.writeText}>Дата</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={datePickerVisible1}
                            mode="date"
                            value={date}
                            onConfirm={handleConfirmBirthday}
                            onCancel={hideDatePicker1}
                        />
                    </View>
                    <TextInput
                        style={ams.input}
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

                    <TouchableOpacity style={ams.btnWrite} onPress={() => addNews()}>
                        <Text style={ams.writeText}>Добавить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textField: {
        height: 250,
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
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