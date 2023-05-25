import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function MainScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

    const [news, setNews] = React.useState(null);
    const [events, setEvents] = React.useState(null);
    const [photos, setPhotos] = React.useState(null);
    const [count, setCount] = useState(0);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // Set news
    React.useEffect(() => {
        const getNews = async () => {
            const resp = await fetch(URL + "news/getAll");
            const data = await resp.json();
            setNews(data);
        }
        getNews();
        // setTimeout(() => {
        //     setCount(count + 1);
        // }, 10000);
    }, [refreshing])

    // Set events
    React.useEffect(() => {
        const getEvents = async () => {
            const resp = await fetch(URL + "events/getAll");
            const data = await resp.json();
            setEvents(data);
        }
        getEvents();
    }, [refreshing]);

    // Set photos
    React.useEffect(() => {
        const getPhotos = async () => {
            const resp = await fetch(URL + "photos/getAll");
            const data = await resp.json();
            setPhotos(data);
        }
        getPhotos();
    }, [refreshing]);

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
        } else {
            return {
                width: 40,
                height: 40,
                opacity: 0.4
            }
        }
    }

    // This func returns an image URL from the object's param image
    const findImage = (e) => {
        var ImageURL = { uri: e.image };
        return ImageURL;
    }

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    // This func returns a news tile and render it on the screen
    const renderNews = (i) => {
        if (news == null || i >= news.length) { }
        else {
            var index = news.length - i - 1;
            const MAXLENGTH = 40;
            var dt = new XDate(news[index].date);
            return (
                <TouchableOpacity
                    style={styles.NewsTile}
                    onPress={() => { navigation.navigate("Newsone", { id: news[index].id }) }}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.btnNewsTextGray}>{retDate(news[index])}</Text>
                        <Text style={styles.btnNewsTextBold}>{news[index].title}</Text>
                        <Text style={styles.btnNewsText} numberOfLines={2} ellipsizeMode="tail">
                            {news[index].description.slice(0, MAXLENGTH)}{(news[index].description.length > MAXLENGTH) ? '...' : ''}
                        </Text>
                    </View>
                    {news[index].image ? <Image style={styles.newsImage} source={findImage(news[index])} /> : <View />}
                    {/* <Image style={styles.newsImage} source={findImage(news[index])} /> */}
                </TouchableOpacity>
            )
        }
    }

    // This func returns a list of 3 last added events
    const showThreeLastEvents = () => {
        var dataNew = [];
        if (events == null) { }
        else {
            if (events.length == 1) {
                dataNew[0] = events[0];
            } else if (events.length == 2) {
                dataNew[0] = events[1];
                dataNew[1] = events[0];
            } else if (events.length == 3) {
                dataNew[0] = events[2];
                dataNew[1] = events[1];
                dataNew[2] = events[0];
            } else {
                dataNew[0] = events[events.length - 1];
                dataNew[1] = events[events.length - 2];
                dataNew[2] = events[events.length - 3];
            }
            return dataNew;
        }
    }

    // This func returns a list of 5 last added photos
    const showFiveLastPhotos = () => {
        var dataNew = [];
        if (photos == null) { }
        else {
            if (photos.length == 1) {
                dataNew[0] = photos[0];
            } else if (photos.length == 2) {
                dataNew[0] = photos[1];
                dataNew[1] = photos[0];
            } else if (photos.length == 3) {
                dataNew[0] = photos[2];
                dataNew[1] = photos[1];
                dataNew[2] = photos[0];
            } else if (photos.length == 4) {
                dataNew[0] = photos[3];
                dataNew[1] = photos[2];
                dataNew[2] = photos[1];
                dataNew[3] = photos[0];
            } else {
                dataNew[0] = photos[events.length - 1];
                dataNew[1] = photos[events.length - 2];
                dataNew[2] = photos[events.length - 3];
                dataNew[3] = photos[events.length - 4];
                dataNew[4] = photos[events.length - 5];
            }
            return dataNew;
        }
    }

    const sliceData = (e) => {
        if (e == null) { }
        else if (e.length == 1) {
            return e.slice(0, 1)
        } else if (e.length == 2) {
            return e.slice(0, 2)
        } else if (e.length >= 3) {
            return e.slice(0, 3)
        }
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>

                    {/* !!!!!!!!!!!!!!!!TODO: LINK TO NOTIFICATIONS!!!!!!!!!!!!!!!! */}
                    <TouchableOpacity style={s.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        <Image style={s.bellImage} source={require('../images/bell.png')} />
                    </TouchableOpacity>
                    <Image
                        style={s.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <Text style={s.iconText}>Спортивный клуб каратэ "ВОИН"</Text>

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

                <TouchableOpacity
                    style={s.AllTouchableOpacity}
                    onPress={() => { navigation.navigate("News") }}>
                    <View style={s.textAllView}>
                        <Text style={s.btnAllText}>НОВОСТИ</Text>
                        <Text style={s.btnAllText}>все</Text>
                    </View>
                </TouchableOpacity>
                <View style={s.line}></View>

                {renderNews(0)}
                {renderNews(1)}
                {renderNews(2)}

                <TouchableOpacity
                    style={s.AllTouchableOpacity}
                    onPress={() => { navigation.navigate("Events") }}>
                    <View style={s.textAllView}>
                        <Text style={s.btnAllText}>СОБЫТИЯ</Text>
                        <Text style={s.btnAllText}>все</Text>
                    </View>
                </TouchableOpacity>
                <View style={s.line}></View>

                <FlatList style={styles.flatEvents}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={showThreeLastEvents()}
                    renderItem={({ item }) => <TouchableOpacity
                        style={styles.EventTile}
                        onPress={() => { navigation.navigate("Event", { id: item.id }) }}>
                        <View style={s.btnView}>
                            <View style={styles.upPartView}>
                                <Text style={styles.eventTitleText}>{item.title}</Text>
                            </View>
                            <View style={styles.downPartView}>
                                <View style={styles.dateEventContainer}>
                                    <Image style={styles.eventsImage} source={require('../images/calendar.png')} />
                                    <Text style={styles.eventText}>{retDate(item)}</Text>
                                </View>
                                <View style={styles.dateEventContainer}>
                                    <Image style={styles.eventsImage} source={require('../images/locate.png')} />
                                    <Text style={styles.eventText}>{item.city}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />

                <View style={styles.lineFull}></View>

                <FlatList style={styles.flatEvents}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={showFiveLastPhotos()}
                    renderItem={({ item }) => <TouchableOpacity
                        onPress={() => { handleClick(item.key) }}>
                        <View style={s.btnView}>
                            <Image style={styles.photo} source={findImage(item)} />
                        </View>
                    </TouchableOpacity>}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />

                <View style={styles.lineFull}></View>
                <Text style={s.btnAllText}>МЫ В СОЦСЕТЯХ</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                    <Image style={styles.netsImage} source={require('../images/vk.png')} />
                </TouchableOpacity>
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
    TextContainer: {
        width: '70%'
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
    newsImage: {
        width: 85,
        height: 85,
    },

    flatEvents: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
    },
    EventTile: {
        height: 160,
        width: 180,
        marginBottom: 50
    },
    upPartView: {
        backgroundColor: '#E3241D',
        shadowColor: 'black',
        elevation: 6,
        width: '100%',
        height: '65%',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    eventTitleText: {
        marginTop: 10,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 8,
        paddingRight: 8
    },
    downPartView: {
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 6,
        width: '100%',
        height: '50%',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    eventText: {
        fontSize: 12,
        marginLeft: 15,
        paddingRight: 10
    },
    eventsImage: {
        width: 25,
        height: 25,
        tintColor: '#E3241D'
    },
    dateEventContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 15,
        alignItems: 'center',
    },

    lineFull: {
        width: '100%',
        backgroundColor: '#E3241D',
        height: 2,
        marginBottom: 5
    },

    photo: {
        width: 180,
        height: 180
    },
    netsImage: {
        width: 60,
        height: 60,
        margin: 10
    }
})