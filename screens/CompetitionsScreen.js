import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function CompetitionsScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');
    const tls = require('../styles/tiles_list_styles');

    const findImage = (e) => {
        var ImageURL = { uri: e.image };
        return ImageURL;
    }

    const [competitions, setCompetitions] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            const resp = await fetch(URL + "events/getAll");
            const data = await resp.json();
            setCompetitions(data);
        }
        getData();
    }, []);

    const iconStyle = (e) => {
        if (e == 'Галерея' || e == 'Контакты') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4
                // tintColor: 'white'
            }
        } else if (e == 'Документы') {
            return {
                width: 30,
                height: 40,
                opacity: 0.4
                // tintColor: 'white'
            }
        } else if (e == 'Турниры') {
            return {
                width: 40,
                height: 40,
                opacity: 0.4,
                tintColor: '#E3241D'
            }
        } else {
            return {
                width: 40,
                height: 40,
                opacity: 0.4
                // tintColor: 'white'
            }
        }
    }

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
        if (e == 'Турниры') {
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

    const renderCompetitions = (i) => {
        if (competitions == null || i >= competitions.length) { }
        else {
            if (i.type === 'competition')
                return (
                    <TouchableOpacity
                        style={tls.NewsTile}
                        onPress={() => { navigation.navigate("Competition", { id: i.id }) }}>
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
                                <Image style={tls.eventsImage} source={require('../images/competition.png')} />
                                <Text style={tls.btnNewsText}>{i.discipline}</Text>
                            </View>
                            <View style={tls.dateEventContainer2}>
                                <Image style={tls.eventsImage} source={require('../images/locate.png')} />
                                <Text style={tls.btnNewsText}>{i.city}</Text>
                            </View>
                        </View>
                        {/* <Image source={findImage(i)} style={styles.newsImage} /> */}
                    </TouchableOpacity>
                )
        }
    }


    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        <Image style={s.bellImage} source={require('../images/bell.png')} />
                    </TouchableOpacity>
                    <Image
                        style={s.imageIcon}
                        source={require("../images/icon.jpg")} />

                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={s.iconText}>{'\u25C0'} Турниры</Text>
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
                    data={competitions}
                    inverted
                    renderItem={({ item }) => renderCompetitions(item)}
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

const styles = StyleSheet.create({
    btnNewsTextGray: {
        fontSize: 15,
        color: 'gray'
    },
    newsImage: {
        width: 95,
        height: 115,
    },
})