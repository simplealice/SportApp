import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';

export default function TrialPage({ navigation }) {

    const s = require('../styles/styles');

    const [name, setName] = React.useState(global.name);
    const [birthday, setBirthday] = React.useState(global.birthday);
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
    const [phone, setPhone] = React.useState(global.phone);
    const [mail, setMail] = React.useState(global.email);

    const [date, setDate] = React.useState('');

    const [comment, setComment] = React.useState('');

    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }

    const checkIfValid = () => {
        if (!name.trim() || name.length < 3) return showError('ФИО должно содержать не менее 3 символов', setError)

        if (!mail.trim() && !phone.trim()) return showError('Необходимо ввести почту или номер телефона', setError)

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mail.trim() && !re.test(mail)) return showError('Неверный формат почты', setError)

        var pattern = new RegExp(/^[0-9\b]+$/);
        if (phone.trim() && (!pattern.test(phone) || phone.length !== 11)) return showError('Неверный формат номера телефона', setError)

        if (global.birthday === '') {
            if (birthday === '' || birthday.getFullYear() >= 2019 || birthday.getFullYear() <= 1950) {
                return showError('Недопустимая дата рождения', setError)
            }
        }

        return 1;
    }

    const handleSubmit = async () => {
        var i = checkIfValid()
        console.log(checkIfValid())
        if (i == 1) {
            try {
                const response = await fetch(global.URL + 'trialClasses/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        birthday: birthday,
                        phone: phone,
                        mail: mail,
                        date: date,
                        comment: comment
                    }),
                });
                const statusCode = response.status;
                const data = response.json();
                const res = { statusCode, data };
                console.log("reponse :", res);
                console.log("status code :", res.statusCode);
                if (statusCode == '200') {
                    navigation.goBack();
                }
            } catch (error) {
                console.error(error);
                return { name: "network error", description: "" };
            }
        }
    }

    const [timeSignIn, setTimeSignIn] = React.useState([]);
    const [options, setOptions] = React.useState(['1', '2']);
    const getTimeSignIn = async () => {
        await fetch(global.URL + 'timeSignIn/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setTimeSignIn(data)
                console.log(timeSignIn)
                const options1 = data.map((item) => `${item.signDate} - ${item.timeFromTo}`);
                setOptions(options1)
                console.log(options)
            })
            .catch(error => console.error(error));
    };

    React.useEffect(() => {
        getTimeSignIn();
    }, [])

    const formatDate = (data) => {
        let day = ""
        let month = ""
        if (data.getDate() < 10) {
            day = "0" + data.getDate()
        } else day = data.getDate()
        if (data.getMonth() + 1 < 10) {
            month = "0" + (data.getMonth() + 1)
        } else month = data.getMonth() + 1
        let dateTimeString = day + '.' + month + '.' + data.getFullYear();
        return dateTimeString;
    };

    const formatDateBirth = (data) => {
        let day = data[8]
        day += data[9]
        let month = data[5]
        month += data[6]
        let year = data[0]
        year += data[1]
        year += data[2]
        year += data[3]
        let str = day
        str += '.'
        str += month
        str += '.'
        str += year
        return str;
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={styles.imageBack} source={require("../images/back2.jpg")}>
                    <Text style={styles.iconText}>Спортивный клуб каратэ "ВОИН"</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={styles.iconText}>{'\u25C0'} Запись на пробное занятие</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="ФИО"
                        />
                        {global.birthday === '' ?
                            <View style={styles.containerDate}>
                                <Text style={styles.dateText}>
                                    {birthday ? formatDate(birthday) : 'Дата не выбрана'}
                                </Text>
                                <TouchableOpacity style={styles.btnWrite} onPress={showDatePicker1}>
                                    <Text style={styles.writeText}>Дата рождения</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={datePickerVisible1}
                                    mode="date"
                                    value={birthday}
                                    onConfirm={handleConfirmBirthday}
                                    onCancel={hideDatePicker1}
                                />
                            </View> : <Text style={styles.input}>
                                {formatDateBirth(global.birthday)}
                            </Text>
                        }
                        <TextInput
                            style={styles.input}
                            onChangeText={setPhone}
                            value={phone}
                            placeholder="Номер телефона"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setMail}
                            value={mail}
                            placeholder="Эл. почта"
                            autoCapitalize='none'
                        />

                        <SelectDropdown
                            buttonStyle={styles.selectDropdown}
                            buttonTextStyle={styles.selectDropdownText}
                            data={options}
                            defaultButtonText='Выберите дату посещения...'
                            onSelect={(selectedItem, index) => {
                                setDate(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />

                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={100}
                            placeholder="Комментарий"
                            onChangeText={text => setComment(text)}
                            value={comment}
                            style={styles.textField}
                        />
                        <TouchableOpacity style={styles.btnWrite} onPress={() => handleSubmit()}>
                            <Text style={styles.writeText}>Записаться</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageBack: {
        flex: 1,
        width: "100%",
        height: 1000,
        paddingTop: 40
    },
    iconText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
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
        margin: 12,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
    },
    btnWrite: {
        marginTop: 30,
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
    },
    selectDropdown: {
        width: '93%',
        marginTop: 20,
        alignSelf: 'center',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    selectDropdownText: {
        fontSize: 14
    },
})