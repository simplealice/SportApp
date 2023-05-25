import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function CoachesScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

    const [coaches, setCoaches] = React.useState(null);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        const getCoaches = async () => {
            const resp = await fetch(URL + "coaches/getAll"); // EDIT ON START
            const data = await resp.json();
            setCoaches(data);
        }
        getCoaches();
        setTimeout(() => {
            setCount(count + 1);
        }, 10000);
    }, [count])

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
        } else if (e == 'Инфо') {
            navigation.navigate("About")
        } else if (e == 'Награды клуба') {
            navigation.navigate("Prizes")
        }
    }

    const iconStyle = (e) => {
        if (e == 'О клубе') {
            return {
                width: 40,
                height: 40,
                opacity: 0.4,
                tintColor: '#E3241D'
            }
        } else if (e == 'Галерея' || e == 'Контакты') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4
            }
        } else if (e == 'Документы' || e == 'Семинары') {
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

    const textStyle = (e) => {
        if (e == 'О клубе') {
            return {
                fontSize: 15,
                color: '#E3241D',
                paddingTop: 5,
                textAlign: 'center',
            }
        } else if (e == 'Тренерский состав') {
            return {
                fontSize: 15,
                color: 'white',
                paddingTop: 5,
                textAlign: 'center'
            }
        } else {
            return {
                fontSize: 15,
                color: 'black',
                paddingTop: 5,
                textAlign: 'center'
            }
        }
    }

    const subMenuStyle = (e) => {
        if (e == 'Тренерский состав') {
            return {
                marginTop: 12,
                height: 55,
                width: 125,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: '#E3241D'
            }
        } else {
            return {
                marginTop: 12,
                height: 55,
                width: 125,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                backgroundColor: 'gainsboro'
            }
        }
    }

    const findImg = (e) => {
        var base64Image = 'data:image/png;base64,' + e;
        return base64Image
    }

    const renderCoaches = (i) => {
        if (coaches == null || i >= coaches.length) { }
        else {
            return (
                <View style={styles.coachContainer}>
                    {/* { i.filebyte === '' ? <Image style={styles.coachImage} source={ require('../images/coach.png')} /> :
                    <Image style={styles.coachImage} source={{uri: findImg(i.filebyte)}}/> } */}
                    <Image style={styles.coachImage} source={ require('../images/coach.png')} />
                    <Text style={styles.coachText}>{i.position}</Text>
                    <Text style={styles.coachBoldText}>{i.surname} {i.name}</Text>
                    <Text style={styles.coachText}>{i.description}</Text>
                </View>
            )
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <Image
                        style={styles.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={s.iconText}>{'\u25C0'} О клубе</Text>
                    </TouchableOpacity>
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
                                    <Text style={textStyle(item.key)}>{item.key}</Text>
                                </View>
                            </TouchableOpacity>}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        />
                    </View>
                </ImageBackground>

                <View style={styles.subMenuView}>
                    <FlatList style={styles.flatSubMenu}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={[
                            { key: 'Инфо' },
                            { key: 'Тренерский состав' },
                            { key: 'Награды клуба' },]}
                        renderItem={({ item }) => <TouchableOpacity
                            style={subMenuStyle(item.key)}
                            onPress={() => { handleClick(item.key) }}>
                            <View>
                                <Text style={textStyle(item.key)}>{item.key}</Text>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>

                <FlatList style={styles.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={coaches}
                    renderItem={({ item }) => renderCoaches(item)}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },
    flatSubMenu: {
        alignSelf: 'center'
    },
    SubMenuTile: {
        marginTop: 12,
        height: 55,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'gainsboro'
    },
    subMenuView: {
        width: '100%',
        paddingBottom: 20
    },
    coachImage: {
        width: '100%',
        height: 130,
        width: 130,
        aspectRatio: 1,
        borderRadius: 65
    },
    coachContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20
    },
    coachBoldText: {
        fontWeight: 'bold'
    },
    coachText: {
        textAlign: 'center'
    }
})