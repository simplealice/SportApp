import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function NewsScreen({ navigation }) {

    // var URL = "http://192.168.31.11:8080/"

    const [events, setEvents] = React.useState(null);

    React.useEffect(() => {
        const getEvents = async () => {
            const resp = await fetch(global.URL + "news/getAll"); // EDIT ON START
            const data = await resp.json();
            setEvents(data);
        }
        getEvents();
    }, []);

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
        } else if (e == 'Документы' || e == 'Семинары') {
            return {
                width: 30,
                height: 40,
                opacity: 0.4
            }
        } else if (e == 'Новости') {
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
        if (e == 'Новости') {
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

        // This func returns an image URL from the object's param image
        const findImage = (e) => {
            var ImageURL = { uri: e.image };
            return ImageURL;
        }

    const renderEvents = (i) => {
        if (events == null || i >= events.length) { }
        else {
            const MAXLENGTH = 40; 
                return (
                    <TouchableOpacity
                        style={styles.NewsTile}
                        onPress={() => { navigation.navigate("Newsone", { id: i.id - 1 }) }}>
                        <View style={styles.TextContainer}>
                        <Text style={styles.btnNewsTextGray}>{retDate(i)}</Text>
                        <Text style={styles.btnNewsTextBold}>{i.title}</Text>
                        <Text style={styles.btnNewsText} numberOfLines={2} ellipsizeMode="tail">
                            {i.description.slice(0, MAXLENGTH)}{(i.description.length > MAXLENGTH) ? '...' : ''}
                        </Text>
                    </View>
                    <Image style={styles.newsImage} source={findImage(i)} />
                    </TouchableOpacity>
                )
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <Image
                        style={styles.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={styles.iconText}>{'\u25C0'} Новости</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        <FlatList style={styles.flatMenu}
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
                                style={styles.MenuTile}
                                onPress={() => { handleClick(item.key) }}>
                                <View style={styles.btnView}>
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

                <FlatList style={styles.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={events}
                    inverted
                    renderItem={({ item }) => renderEvents(item)}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />

                <Text style={styles.btnAllNewsText}>МЫ В СОЦСЕТЯХ</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                    <Image style={styles.netsImage} source={require('../images/vk.png')} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBack: {
        width: '100%',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },
    iconText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold'
    },

    menuView: {
        width: '100%',
        backgroundColor: 'gainsboro',
        opacity: 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    flatMenu: {
        // flexGrow: 0.1
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    TouchableOpacity: {
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        // paddingVertical: 5,
        backgroundColor: '#930'
    },
    TouchableOpacityNews: {
        width: '90%',
        // alignItems: 'flex-end',
        marginTop: 10,
        paddingVertical: 5,
    },
    MenuTile: {
        marginTop: 12,
        height: 105,
        width: 105,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    icon: {
        width: 20,
        height: 30,
        // tintColor: 'white'
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

    btnAllNewsText: {
        fontSize: 15,
        color: '#E3241D',
        fontWeight: 'bold'
    },
    btnView: {
        alignItems: 'center',
        paddingTop: 15
    },
    textNewsAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    flatNews: {
        width: "100%",
        marginBottom: 10
    },
    NewsTile: {
        marginTop: 10,
        height: 110,
        width: '90%',
        paddingHorizontal: 15,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    btnNewsText: {
        fontSize: 14,
        color: 'black'
    },
    btnNewsTextBold: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10,
    },
    btnNewsTextRed: {
        fontSize: 14,
        color: '#E3241D',
        fontWeight: 'bold',
    },
    newsImage: {
        width: 85,
        height: 85,
    },

    eventsImage: {
        width: 20,
        height: 20,
        tintColor: '#E3241D',
        marginRight: 10
    },
    dateEventContainer1: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateEventContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    lineFull: {
        width: '100%',
        backgroundColor: '#E3241D',
        height: 2,
        marginBottom: 5
    },
    netsImage: {
        width: 60,
        height: 60,
        margin: 10
    }
})