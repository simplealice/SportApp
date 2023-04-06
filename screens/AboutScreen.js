import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';

export default function AboutScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

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
        } else if (e == 'Тренерский состав') {
            navigation.navigate("Coaches")
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
        } else if (e == 'Инфо') {
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
        if (e == 'Инфо') {
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

                <Image
                    style={styles.infoPhoto}
                    source={require("../images/infoPhoto.jpg")} />

                <View style={styles.infoPhotoView}>
                    <Text style={styles.infoPhotoBoldText}>Владимирская региональная физкультурно-спортивная
                        общественная организация "Спортивный клуб каратэ "ВОИН"</Text>
                    <Text style={styles.infoPhotoText}>Сокращенное наименование: ВРФСОО "СКК "ВОИН"</Text>
                </View>

                <Text style={styles.infoText}>В нашей секции каратэ шотокан во Владимире мы улучшаем 
                физическое состояние Ваших детей. Способствуем реализации ряда задач нравственного, эстетического
                    и трудового воспитания. Стимулируем психологические и волевые качества юных каратистов.
                    Позаботьтесь о физическом воспитании своего ребенка уже сегодня!{"\n"}
                    Каратэ шотокан (Сетокан каратэ) –один из основных стилей каратэ, разработанный
                    Гитином Фунакоси и являющийся ныне одним из наиболее распространенных в мире. Название
                    происходит от литературного псевдонима Фунакоси Гитина — «Сёто», что значит
                    «качающиеся сосны», а «кан» значит «зал».
                </Text>

                <View style={styles.insideInfoView}>
                    <Text style={styles.infoBoldRedText}>В программу обучения входит:</Text>
                    <Text style={styles.insideInfoText}>✓специальная и спортивная подготовка {"\n"}
                    ✓ искусство ведения поединка {"\n"}
                    ✓ участия в спортивных соревнованиях и турнирах {"\n"}
                    ✓ участия в семинарах и аттестационных экзаменах</Text>
                </View>
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
    infoPhoto: {
        width: '100%',
        height: 250,
    },
    infoPhotoView: {
        width: '95%',
        backgroundColor: '#E3241D',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5,
        marginTop: -10,
        shadowColor: 'black',
        elevation: 6,
    },
    infoPhotoText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    infoPhotoBoldText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    infoText: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'justify',
        margin: 15,

    },
    insideInfoView: {
        width: '95%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowColor: 'black',
        elevation: 6,
        marginBottom: 20
    },
    infoBoldRedText: {
        fontSize: 14,
        color: '#E3241D',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
    insideInfoText: {
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10
    }
})