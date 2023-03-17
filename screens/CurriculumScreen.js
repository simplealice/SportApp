import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking, SectionList } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurriculumScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');
    const tls = require('../styles/tiles_list_styles');

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get(global.URL + "curriculum/get")
            .then(response => {
                const data = response.data;
                const groups = data.reduce((result, item) => {
                    const group = result.find(g => g.groupNumber === item.groupNumber & g.coach === item.coach);
                    if (group) {
                        group.items.push(item);
                    } else {
                        result.push({
                            groupNumber: item.groupNumber,
                            coach: item.coach,
                            items: [item],
                        });
                    }
                    return result;
                }, []);
                setGroups(groups);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const renderGroup = ({ item }) => (
        <View style={styles.NewsTile}>
            <View style={styles.timeContainer}>
                <Text style={tls.btnNewsTextRed}>{item.groupNumber}</Text>
                <Text style={tls.btnNewsTextRed}>{item.coach}</Text>
            </View>
            <View style={styles.lineFull}></View>
            <FlatList
                data={item.items}
                renderItem={({ item }) => (
                    <View style={styles.timeContainer}>
                        <Text>{item.dayOfWeek}</Text>
                        <Text>{item.timeFromTo}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );

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
        return {
            fontSize: 15,
            color: 'black',
            paddingTop: 5,
            textAlign: 'center'
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <Image
                        style={styles.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => { navigation.navigate("Main") }}>
                        <Text style={s.iconText}>{'\u25C0'} Новости</Text>
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

                <FlatList style={{ width: '90%' }}
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={item => item.groupNumber.toString()}
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

    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },

    item: {
        padding: 10,
        fontSize: 18,
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
    icon: {
        width: 20,
        height: 30,
        // tintColor: 'white'
    },

    btnView: {
        alignItems: 'center',
        paddingTop: 15
    },


    NewsTile: {
        height: 130,
        width: '98%',
        margin: 10,
        paddingHorizontal: 20,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    timeContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    lineFull: {
        backgroundColor: 'gainsboro',
        height: 1,
        marginBottom: 10,
        marginTop: 5
    },
})