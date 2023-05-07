import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function EditUserPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

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
    }, []);

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
            })
            .catch(error => console.error(error));
    };

    const editUser = () => {
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
                newMedals: medals
            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigation.navigate("EditUsersScreen", { token: token })
            })
            .catch(error => console.error(error));
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

                    <Text style={styles.titleText}>Кю/дан</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setKuDan}
                        value={kuDan}
                        placeholder="6 кю (красный пояс)"
                    />

                    <Text style={styles.titleText}>Категория</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCategory}
                        value={category}
                        placeholder="12-13 лет"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Направление</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMajor}
                        value={major}
                        placeholder="ката"
                        autoCapitalize='none'
                    />

                    <Text style={styles.titleText}>Членство в сборной</Text>
                    <TextInput
                        style={styles.input}
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