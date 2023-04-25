import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';
import SelectDropdown from 'react-native-select-dropdown'

// const data = [
//     {label: 'Спортсмен', value: 'SPORTSMEN'},
//     {label: 'Тренер', value: 'COACH'},
// ];

const roles = ['Спортсмен', 'Тренер']

export default function AddUserPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

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
        fetch(global.URL + `auth/register?role=${role}`, {
            method: 'POST',
            // headers: {
            //     "Authorization": `Bearer ${token}`,
            // },
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
                    <Text style={styles.btnFeedbackText}>ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ</Text>
                    <SelectDropdown
                        buttonStyle={styles.selectDropdown}
                        buttonTextStyle={styles.selectDropdownText}
                        data={roles}
                        defaultButtonText='Выберите роль...'
                        // renderDropdownIcon={isOpened => {
                        //     return <Text name={isOpened ? String.fromCharCode(9650) : String.fromCharCode(9660)} color={'#444'} size={18}></Text>;
                        // }}
                        // dropdownIconPosition={'right'}
                        onSelect={(selectedItem, index) => {
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
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Эл. почта"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Пароль"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSurname}
                        value={surname}
                        placeholder="Фамилия"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Имя"
                    />
                    {/* birthday */}
                    <View style={styles.containerDate}>
                        <Text style={styles.dateText}>
                            {birthday ? retDate(birthday) : 'Дата выбрана'}
                        </Text>
                        <TouchableOpacity style={styles.btnWrite} onPress={showDatePicker1}>
                            <Text style={styles.writeText}>Дата рождения</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            // date={birthday}
                            isVisible={datePickerVisible1}
                            mode="date"
                            value={birthday}
                            onConfirm={handleConfirmBirthday}
                            onCancel={hideDatePicker1}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCategory}
                        value={category}
                        placeholder="Категория"
                        autoCapitalize='none'
                    />
                    <TouchableOpacity style={styles.btnWrite} onPress={() => addUser()}>
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