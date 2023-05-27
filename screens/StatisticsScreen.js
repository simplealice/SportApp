import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import React from 'react';

export default function StatisticsScreen({ navigation }) {

    const s = require('../styles/styles');
    const hms = require('../styles/horiz_menu_styles');

    const [users, setUsers] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    React.useEffect(() => {
        getUsers();
    }, [refreshing])

    const getUsers = () => {
        fetch(global.URL + 'users/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                const filteredSportsmen = data.filter(sportsman => sportsman.role === 'SPORTSMEN');
                const sortedSportsmen = filteredSportsmen.sort((a, b) => b.scores - a.scores);
                setUsers(sortedSportsmen)
            })
            .catch(error => console.error(error));
    };

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
        if (e == 'Статистика') {
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
        if (e == 'Статистика') {
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

    const renderCoaches = (i) => {
        if (users == null || i >= users.length) { }
        else {
            return (
                <View style={styles.coachContainer}>
                    <Text style={styles.coachBoldText}>{i.surname} {i.name[0]}.</Text>
                    <Text style={styles.coachText}>{i.birthDate}</Text>
                    <Text style={styles.coachText}>{i.category}</Text>
                    <Text style={styles.coachText}>{i.kuDan}</Text>
                    <Text style={styles.coachText}>{i.scores}</Text>
                </View>
            )
        }
    }

    const renderTableItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCellB}>{item.surname} {item.name[0]}.</Text>
            <Text style={styles.tableCell}>{item.category}</Text>
            <Text style={styles.tableCell}>{item.kuDan}</Text>
            <Text style={styles.tableCell}>{item.scores}</Text>
        </View>
    )

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
                        <Text style={s.iconText}>{'\u25C0'} Статистика</Text>
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

                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCellB, styles.headerCell]}>ФИО</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Разряд</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Кю/дан</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Очки</Text>
                </View>
                <View style={styles.tableHeader}>
                    <FlatList
                        data={users}
                        renderItem={renderTableItem}
                        keyExtractor={(item, index) => `item-${index}`}
                    />
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
    coachImage: {
        width: '100%',
        height: 130,
        width: 130,
        aspectRatio: 1,
        borderRadius: 65
    },
    coachContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    coachBoldText: {
        fontWeight: 'bold'
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5'
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },
    tableCellB: {
        flex: 2,
        padding: 10,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: 'gainsboro'
    }
})