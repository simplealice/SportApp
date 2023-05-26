import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';

export default function PrizesScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

    const [awards, setAwards] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    React.useEffect(() => {
        const getAwards = async () => {
            const resp = await fetch(URL + "awards/getAll");
            const data = await resp.json();
            setAwards(data);
        }
        getAwards();
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
        } else if (e == 'Инфо') {
            navigation.navigate("About")
        } else if (e == 'Тренерский состав') {
            navigation.navigate("Coaches")
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
        } else if (e == 'Награды клуба') {
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
        if (e == 'Награды клуба') {
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

    const findImage = (i) => {
        if (i == null) { }
        else {
            var ImageURL = { uri: i.image };
            return ImageURL;
        }
    }

    const renderAwards = (i) => {
        if (awards == null || i >= awards.length) { }
        else {
            return (
                <View style={styles.awardContainer}>
                    <Image style={styles.awardImage} source={findImage(i)} />
                    <Text style={styles.awardBoldText}>{i.name}</Text>
                    <Text style={styles.awardText}>{i.description}</Text>
                </View>
            )
        }
    }

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
                    data={awards}
                    renderItem={({ item }) => renderAwards(item)}
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
    subMenuView: {
        width: '100%',
        paddingBottom: 20
    },
    awardImage: {
        width: '100%',
        height: 150,
        width: 150,
        aspectRatio: 1,
    },
    awardContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    awardBoldText: {
        fontWeight: 'bold'
    }
})