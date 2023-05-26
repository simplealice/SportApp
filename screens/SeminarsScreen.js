import { Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import XDate from 'xdate';

export default function SeminarsScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');
    const tls = require('../styles/tiles_list_styles');

    const [events, setEvents] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    React.useEffect(() => {
        const getEvents = async () => {
            const resp = await fetch(URL + "events/getAll");
            const data = await resp.json();
            setEvents(data);
        }
        getEvents();
    }, [refreshing])

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

    const iconStyle = (e) => {
        if (e == 'Галерея' || e == 'Контакты') {
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
        } else if (e == 'Семинары') {
            return {
                width: 30,
                height: 40,
                opacity: 0.4,
                tintColor: '#E3241D'
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
        if (e == 'Семинары') {
            return {
                fontSize: 15,
                color: '#E3241D',
                paddingTop: 5,
                textAlign: 'center',
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

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    const renderEvents = (i) => {
        if (events == null || i >= events.length) { }
        else {
            if (i.type === 'seminar')
                return (
                    <TouchableOpacity
                        style={tls.NewsTile}
                        onPress={() => { navigation.navigate("Seminar", { id: i.id }) }}>
                        <View>
                            <View style={tls.dateEventContainer1}>
                                <Image style={tls.eventsImage} source={require('../images/doc.png')} />
                                <Text style={tls.btnNewsTextBold}>{i.title}</Text>
                            </View>
                            <View style={tls.dateEventContainer2}>
                                <Image style={tls.eventsImage} source={require('../images/calendar.png')} />
                                <Text style={tls.btnNewsTextRed}>{retDate(i)}</Text>
                            </View>
                            <View style={tls.dateEventContainer2}>
                                <Image style={tls.eventsImage} source={require('../images/locate.png')} />
                                <Text style={tls.btnNewsText}>{i.city}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
        }
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')} />
                    <Image
                        style={s.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={s.iconText}>{'\u25C0'} Семинары</Text>
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

                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={events}
                    inverted
                    renderItem={({ item }) => renderEvents(item)}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />

                <Text style={tls.btnAllNewsText}>МЫ В СОЦСЕТЯХ</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                    <Image style={s.netsImage} source={require('../images/vk.png')} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};