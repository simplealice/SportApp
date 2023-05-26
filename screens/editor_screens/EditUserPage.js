import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function EditUserPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');
    const ams = require('../../styles/admin_mode_styles');

    const { token, id, email } = route.params;

    const [role, setRole] = useState('');
    const [surname, setSurame] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = React.useState(new XDate());
    const [kuDan, setKuDan] = useState('');
    const [category, setCategory] = useState('');
    const [major, setMajor] = useState('');
    const [team, setTeam] = useState('');
    const [medals, setMedals] = useState('');
    const [groupSc, setGroupSc] = useState('');
    const [score, setScore] = useState('');

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

    React.useEffect(() => {
        getUser();
    }, [])

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

        if (birthday === '') {
            if (birthday === '' || birthday.getFullYear() >= 2019 || birthday.getFullYear() <= 1950) {
                return showError('Недопустимая дата рождения', setError)
            }
        }

        return 1;
    }

    const getUser = () => {
        fetch(global.URL + `users/get/${email}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => response.json())
            .then(data => {
                setRole(data.role)
                setSurame(data.surname)
                setName(data.name)
                setBirthday(data.birthDate)
                setCategory(data.category)
                setKuDan(data.kuDan)
                setMajor(data.major)
                setTeam(data.team)
                setMedals(data.medals)
                setGroupSc(data.groupSc)
                setScore(data.scores)
            })
            .catch(error => console.error(error));
    };

    const editUser = () => {
        if (checkIfValid() == 1) {
            fetch(global.URL + `users/edit/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newSurname: surname,
                    newName: name,
                    newBirthDate: birthday,
                    newCategory: category,
                    newKuDan: kuDan,
                    newMajor: major,
                    newTeam: team,
                    newMedals: medals,
                    newGroupSc: groupSc,
                    newScores: score
                }),
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigation.navigate("EditUsersScreen", { token: token })
                })
                .catch(error => console.error(error));
        }
    };

    const deleteUser = () => {
        fetch(global.URL + `users/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(() => {
                navigation.navigate("EditUsersScreen", { token: token })
            })
            .catch(error => console.log('error', error));
    };

    const retDate = (e) => {
        var dt = new XDate(e);
        return dt.toString("dd.MM.yyyy");
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => deleteUser()}>
                        <Image style={s.bellImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {surname} {name}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={ams.menuView}>
                    <Text style={ams.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>

                    {error ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null}
                    <Text style={styles.titleText}>Фамилия</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setSurame}
                        value={surname}
                        placeholder="Фамилия"
                    />

                    <Text style={styles.titleText}>Имя</Text>
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

                    <Text style={styles.titleText}>Кю/дан</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setKuDan}
                        value={kuDan}
                        placeholder="6 кю (красный пояс)"
                    />

                    <Text style={styles.titleText}>Категория</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setCategory}
                        value={category}
                        placeholder="12-13 лет"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Направление</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setMajor}
                        value={major}
                        placeholder="ката"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Членство в сборной</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setTeam}
                        value={team}
                        placeholder="да"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Количество медалей</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={100}
                        placeholder="1 золото, 2 серебро, 3 бронза"
                        onChangeText={text => setMedals(text)}
                        value={medals}
                        style={styles.textField}
                    />

                    <Text style={styles.titleText}>Баллы</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setScore}
                        value={score}
                        placeholder="20"
                        keyboardType="numeric"
                    />

                    <Text style={styles.titleText}>Группа</Text>
                    <TextInput
                        style={ams.input}
                        onChangeText={setGroupSc}
                        value={groupSc}
                        placeholder="1"
                        autoCapitalize='none'
                    />

                    <TouchableOpacity style={ams.btnWrite} onPress={() => editUser()}>
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
    newsImage: {
        width: 85,
        height: 85,
    },
    titleText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold'
    },
    textField: {
        height: 100,
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