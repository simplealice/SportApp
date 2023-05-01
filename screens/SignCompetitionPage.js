import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function SignCompetitionPage({ route, navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');
    const tls = require('../styles/tiles_list_styles');

    const [email, setEmail] = React.useState('');
    const [person, setPerson] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
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
    const [category, setCategory] = React.useState('');
    
    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        console.log(error)
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }
  
    const { id } = route.params;

    const checkIfValid = () => {
        // if (!isValidField(userInfo)) return showError('Необходимо заполнить все поля', setError)

        if (!person.trim() || person.length < 3) return showError('ФИО должно содержать не менее 3 символов', setError)

        if (!email.trim()) return showError('Необходимо ввести почту', setError)
 
        if (birthday === '' || birthday.getFullYear() >= 2019) {
            return showError('Недопустимая дата рождения', setError)
        }

        return 1;
    }

    const handleSubmit = async () => {
        var i = checkIfValid()
        console.log(checkIfValid())
        if (i == 1) {
            try {
                const response = await fetch(global.URL + 'eventSignIn/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        eventId: id,
                        email: email,
                        person: person,
                        birthDate: birthday,
                        category: category
                    }),
                });
                const statusCode = response.status;
                const data = response.json();
                const res = { statusCode, data };
                console.log("reponse :", res);
                console.log("status code :", res.statusCode);
                if (statusCode == '200') {
                    // navigation.navigate("Main")
                    navigation.goBack();
                }
            } catch (error) {
                console.error(error);
                return { name: "network error", description: "" };
            }
        }
    }

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

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={styles.imageBack} source={require("../images/back2.jpg")}>
                    <Text style={styles.iconText}>Спортивный клуб каратэ "ВОИН"</Text>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={styles.iconText}>{'\u25C0'} Запись на мероприятие</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                        <TextInput
                            style={styles.input}
                            onChangeText={setPerson}
                            value={person}
                            placeholder="ФИО"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Эл. почта"
                            autoCapitalize='none'
                        />
                        <View style={styles.containerDate}>
                            <Text style={styles.dateText}>
                                {birthday ? formatDate(birthday) : 'Дата не выбрана'}
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
                            placeholder="Разряд"
                            autoCapitalize='none'
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
    }
})