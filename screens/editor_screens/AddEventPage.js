import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';
import SelectDropdown from 'react-native-select-dropdown';

export default function AddEventPage({ navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const roles = ['Турнир', 'Семинар']
    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState(new XDate());
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('seminar');
    const [discipline, setDiscipline] = useState('');

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
        console.log(type)
        if (checkIfValid() == 1) {
            fetch(global.URL + 'events/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: date.toString("yyyy-MM-dd"),
                    title: title,
                    city: city,
                    description: description,
                    type: type,
                    discipline: discipline,
                    image: image,
                }),
            }).then(response => {
                response.json()
            })
                .then(() => {
                    navigation.navigate("EditEventsScreen")
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
            || (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() <= new Date().getDate())
        ) {
            return showError('Недопустимая дата', setError)
        }

        if (!city.trim() || city.length < 3) return showError('Место проведения должно содержать не менее 3 символов', setError)

        if (type == 'competition') {
            if (!discipline.trim() || discipline.length < 2) return showError('Дисциплина должна содержать не менее 2 символов', setError)
        }

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
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ СОБЫТИЯ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}

                    <SelectDropdown
                        buttonStyle={ams.selectDropdown}
                        buttonTextStyle={ams.selectDropdownText}
                        data={roles}
                        defaultButtonText='Выберите тип...'
                        onSelect={(selectedItem, index) => {
                            if (selectedItem === 'Турнир') {
                                setType('competition')
                            }
                            else if (selectedItem === 'Семинар') {
                                setType('seminar')
                            }
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />

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
                        onChangeText={setCity}
                        value={city}
                        placeholder="Место проведения"
                    />

                    <TextInput
                        style={ams.input}
                        onChangeText={setDiscipline}
                        value={discipline}
                        placeholder="Дисциплина (для турниров)"
                    />

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