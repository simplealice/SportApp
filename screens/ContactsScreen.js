import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking, TextInput } from 'react-native';
import * as React from 'react';
// import XDate from 'xdate';
import MapView, { Marker } from 'react-native-maps';

export default function ContactsScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [comment, setComment] = React.useState('');


    const [error, setError] = React.useState('');

    const showError = (error, state) => {
        console.log(error)
        state(error)
        setTimeout(() => {
            state('')
        }, 5500)
    }

    const checkIfValid = () => {
        if (!name.trim() || name.length < 3) return showError('ФИО должно содержать не менее 3 символов', setError)

        if (!mail.trim() && !phone.trim()) return showError('Необходимо ввести почту или номер телефона', setError)

        if (!comment.trim() || comment.length < 3) return showError('Комментарий должно содержать не менее 3 символов', setError)
        return 1;
    }

    const handleSubmit = async () => {
        var i = checkIfValid()
        console.log(checkIfValid())
        if (i == 1) {
            try {
                const response = await fetch(global.URL + 'feedback/add', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                        email: mail,
                        comment: comment
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

    // This func asks for the navigation (for the top horizontal menu)
    const handleClick = (e) => {
        if (e == 'Новости') {
            navigation.navigate("News")
        } else if (e == 'Пробное занятие') {
            navigation.navigate("Trial")
        } else if (e == 'Семинары') {
            navigation.navigate("Seminars")
        } else if (e == 'Турниры') {
            navigation.navigate("Competitions")
        } else if (e == 'Статистика') {
            navigation.navigate("Statistics")
        } else if (e == 'Галерея') {
            navigation.navigate("Galery")
        } else if (e == 'Документы') {
            navigation.navigate("Documents")
        } else if (e == 'Контакты') {
            navigation.navigate("Contacts")
        } else if (e == 'О клубе') {
            navigation.navigate("About")
        }
    }

    // This func returns the icon path (for the top horizontal menu)
    const drawIcon = (e) => {
        if (e == 'Новости') {
            return require('../images/news.png')
        } else if (e == 'Пробное занятие') {
            return require('../images/clock.png')
        } else if (e == 'Семинары') {
            return require('../images/seminar.png')
        } else if (e == 'Турниры') {
            return require('../images/competition.png')
        } else if (e == 'Статистика') {
            return require('../images/statistics.jpg')
        } else if (e == 'Галерея') {
            return require('../images/photo.png')
        } else if (e == 'Документы') {
            return require('../images/document.png')
        } else if (e == 'Контакты') {
            return require('../images/contacts.png')
        } else if (e == 'О клубе') {
            return require('../images/info.png')
        }
    }

    // This func returns the icon style (for the top horizontal menu)
    const iconStyle = (e) => {
        if (e == 'Контакты') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4,
                tintColor: '#E3241D'
            }
        } else if (e == 'Галерея') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4
            }
        } else if (e == 'Документы') {
            return {
                width: 30,
                height: 40,
                opacity: 0.4
            }
        } else {
            return {
                width: 40,
                height: 40,
                opacity: 0.4
            }
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>

                    {/* !!!!!!!!!!!!!!!!TODO: LINK TO NOTIFICATIONS!!!!!!!!!!!!!!!! */}
                    <TouchableOpacity style={s.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        <Image style={s.bellImage} source={require('../images/bell.png')} />
                    </TouchableOpacity>
                    <Image
                        style={s.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <Text style={s.iconText}>{'\u25C0'} Контакты</Text>

                    <View style={hms.menuView}>
                        <FlatList style={hms.flatMenu}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={[
                                { key: 'Новости' },
                                { key: 'Пробное занятие' },
                                { key: 'Семинары' },
                                { key: 'Турниры' },
                                { key: 'Статистика' },
                                { key: 'Галерея' },
                                { key: 'Контакты' },
                                { key: 'О клубе' },]}
                            renderItem={({ item }) => <TouchableOpacity
                                style={hms.MenuTile}
                                onPress={() => { handleClick(item.key) }}>
                                <View style={s.btnView}>
                                    <Image
                                        style={iconStyle(item.key)}
                                        source={drawIcon(item.key)}
                                    />
                                    <Text style={hms.btnMenuText}>{item.key}</Text>
                                </View>
                            </TouchableOpacity>}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        />
                    </View>
                </ImageBackground>

                <View style={styles.dateEventContainer}>
                    <Image style={styles.eventsImage} source={require('../images/calendar.png')} />
                    <Text style={styles.eventText}>Адрес: г. Владимир. проспект Строителей, д. 16 В{"\n"}
                        г. Владимир. ул. Батурина, д. 28 (филиал)</Text>
                </View>
                <View style={styles.dateEventContainer}>
                    <Image style={styles.eventsImage} source={require('../images/phone.png')} />
                    <Text style={styles.eventText}>Телефон: +7 910 182 56 56</Text>
                </View>

                <MapView
                    style={styles.mapStyle}
                    region={{
                        latitude: 56.142435,
                        longitude: 40.366911,
                        latitudeDelta: 0.001663,
                        longitudeDelta: 0.002001,
                    }}
                >
                    <Marker coordinate={{ latitude: 56.142435, longitude: 40.366911 }}>
                    </Marker>
                </MapView>

                <View style={styles.networkContainer}>
                    <Text style={s.btnAllText}>МЫ В СОЦСЕТЯХ</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        <Image style={styles.netsImage} source={require('../images/vk.png')} />
                    </TouchableOpacity>
                </View>


                <View style={styles.menuView}>
                    <Text style={styles.btnFeedbackText}>ФОРМА ОБРАТНОЙ СВЯЗИ</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="ФИО"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhone}
                        // onChangeText={(value) => handleOnChangeText(value, 'phone')}
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
    eventsImage: {
        width: 20,
        height: 20,
        tintColor: '#E3241D'
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
    photo: {
        width: 180,
        height: 180
    },
    netsImage: {
        width: 60,
        height: 60,
        margin: 10
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
})