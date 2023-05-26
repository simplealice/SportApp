import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';
import SelectDropdown from 'react-native-select-dropdown'

const roles = ['Спортсмен', 'Тренер']

export default function AddUserPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { token } = route.params;

    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = React.useState(new XDate());
    const [surname, setSurname] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');

    const [datePickerVisible1, setDatePickerVisible1] = React.useState(false);
    const showDatePicker1 = () => {
        setDatePickerVisible1(true);
    };
    const hideDatePicker1 = () => {
        setDatePickerVisible1(false);
    };
    const handleConfirmBirthday = (birthday) => {
        setBirthday(birthday);
        hideDatePicker1();
    };

    const addUser = () => {
        console.log(global.URL + `auth/register?role=${role}`)
        if (checkIfValid() == 1) {
            fetch(global.URL + `auth/register?role=${role}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    surname: surname,
                    name: name,
                    birthDate: birthday,
                    category: category,
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditUsersScreen", { token: token })
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

        if (!role.trim()) return showError('Необходимо выбрать роль пользователя', setError)

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.trim() || !re.test(email)) return showError('Неверный формат почты', setError)

        if (!password.trim() || password.length < 5) return showError('Пароль должен содержать не менее 5 символов', setError)

        if (!surname.trim() || surname.length < 2) return showError('Фамилия должна содержать не менее 2 символов', setError)

        if (!name.trim() || name.length < 2) return showError('Имя должно содержать не менее 2 символов', setError)

        if (global.birthday === '') {
            if (birthday === '' || birthday.getFullYear() >= 2019 || birthday.getFullYear() <= 1950) {
                return showError('Недопустимая дата рождения', setError)
            }
        }

        return 1;
    }

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

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ</Text>
                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                    <SelectDropdown
                        buttonStyle={ams.selectDropdown}
                        buttonTextStyle={ams.selectDropdownText}
                        data={roles}
                        defaultButtonText='Выберите роль...'
                        onSelect={(selectedItem) => {
                            if (selectedItem === 'Спортсмен') {
                                setRole('SPORTSMEN')
                            }
                            else if (selectedItem === 'Тренер') {
                                setRole('COACH')
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
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Эл. почта"
                    />
                    <TextInput
                        style={ams.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Пароль"
                    />
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
                    <View style={styles.containerDate}>
                        <Text style={styles.dateText}>
                            {birthday ? retDate(birthday) : 'Дата выбрана'}
                        </Text>
                        <TouchableOpacity style={ams.btnWrite} onPress={showDatePicker1}>
                            <Text style={ams.writeText}>Дата рождения</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={datePickerVisible1}
                            mode="date"
                            value={birthday}
                            onConfirm={handleConfirmBirthday}
                            onCancel={hideDatePicker1}
                        />
                    </View>
                    <TextInput
                        style={ams.input}
                        onChangeText={setCategory}
                        value={category}
                        placeholder="Категория"
                        autoCapitalize='none'
                    />
                    <TouchableOpacity style={ams.btnWrite} onPress={() => addUser()}>
                        <Text style={ams.writeText}>Добавить</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dateEventContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 15,
        alignItems: 'center',
        marginBottom: 15
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