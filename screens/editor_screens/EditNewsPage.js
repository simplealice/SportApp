import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import XDate from 'xdate';

export default function EditNewsPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const eps = require('../../styles/event_page_styles');

    const { id } = route.params;

    const [title, setTitle] = useState('');
    const [date, setDate] = React.useState(new XDate());
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

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

    // const [data, setData] = React.useState(null);

    React.useEffect(() => {
        getNews()
        // fetch(URL + `news/get/${id}`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => setData(data))
        //     .catch(error => console.error(error));

    }, []);

    const getNews = () => {
        fetch(global.URL + `news/get/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                setTitle(data.title)
                setDate(data.date)
                setDescription(data.description)
                setImage(data.image)
            })
            .catch(error => console.error(error));
    };


    // const returnSeminarDate = () => {
    //     if (data == null) { }
    //     else {
    //         // setDate(retDate(data[id]))
    //         return retDate(data)
    //     }
    // }

    const findImage = () => {
        if (image == null) { }
        else {
            var ImageURL = { uri: image };
            // setImage(ImageURL);
            return ImageURL
        }
    }

    const editNews = () => {
        fetch(global.URL + `news/edit/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newTitle: title,
                newDate: date,
                newDescription: description,
                newImage: image
            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                navigation.navigate("EditNewsScreen")
            })
            .catch(error => console.error(error));
    };

    const deleteNews = () => {
        fetch(global.URL + `news/delete/${id}`)
        .then(response => {
            response.json()
            navigation.navigate("EditNewsScreen")
        }).catch(error => console.error(error));
    };

    const retDate = (e) => {
        var dt = new XDate(e);
        return dt.toString("dd.MM.yyyy");
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => deleteNews()}>
                        <Image style={s.bellImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{'\n'}{'\n'}{'\n'}</Text>

                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {title}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.menuView}>
                    <Text style={styles.btnFeedbackText}>РЕДАКТИРОВАНИЕ ИНФОРМАЦИИ</Text>
                    <Text style={styles.titleText}>Название</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Название"
                    />

                    {/* birthday */}
                    {/* <View style={styles.containerDate}>
                        <Text style={styles.dateText}>
                            {returnSeminarDate() ? returnSeminarDate() : 'Дата выбрана'}
                        </Text>
                        <TouchableOpacity style={styles.btnWrite} onPress={showDatePicker1}>
                            <Text style={styles.writeText}>Дата</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            // date={birthday}
                            isVisible={datePickerVisible1}
                            mode="date"
                            value={returnSeminarDate()}
                            onConfirm={handleConfirmBirthday}
                            onCancel={hideDatePicker1}
                        />
                    </View> */}

                    <Text style={styles.titleText}>Изображение</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setImage}
                        value={image}
                        placeholder="http://..."
                    />

                    <Text style={styles.titleText}>Описание</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={30}
                        maxLength={700}
                        placeholder="Описание"
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.textField}
                    />
                    <TouchableOpacity style={styles.btnWrite} onPress={() => editNews()}>
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
        height: 400,
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