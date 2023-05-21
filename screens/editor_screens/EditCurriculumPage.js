import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';
import axios from 'axios';

export default function EditCurriculumPage({ route, navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const { groupNumber, coach, curriculum } = route.params;

    const [gr, setGr] = React.useState(groupNumber);
    const [co, setCo] = React.useState(coach);
    const [cur, setCur] = React.useState(curriculum);

    const [z, setZ] = React.useState(null);
    // React.useEffect(() => {
    //     getCurriculum();
    // });

    // const getCurriculum = () => {

    //     fetch(global.URL + "curriculum/get", {
    //         method: 'GET',
    //         body: "",
    //         redirect: 'follow'
    //     }).then(response => response.text())
    //         .then(result => {
    //             console.log(result)
    //             setCurriculum(result)
    //         })
    //         .catch(error => console.log('error', error));
    // };

    // This func returns an image URL from the object's param image
    const findImage = (e) => {
        var ImageURL = { uri: e.image };
        return ImageURL;
    }

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    // const [groups, setGroups] = useState([]);

    // useEffect(() => {
    //     axios.get(global.URL + "curriculum/get")
    //         .then(response => {
    //             const data = response.data;
    //             const groups = data.reduce((result, item) => {
    //                 const group = result.find(g => g.groupNumber === item.groupNumber & g.coach === item.coach);
    //                 if (group) {
    //                     group.items.push(item);
    //                 } else {
    //                     result.push({
    //                         groupNumber: item.groupNumber,
    //                         coach: item.coach,
    //                         items: [item],
    //                     });
    //                 }
    //                 return result;
    //             }, []);
    //             setGroups(groups);
    //             console.log(groups)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        console.log(cur)
    }, [])

    const renderGroup = ({ item }) => (
        <View style={styles.NewsTile}>
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

    function changeState(item, value) {
        // cur[item].dayOfWeek = value
        console.log(cur[item].dayOfWeek)
        console.log(value)
    };

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddEventPage")}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("EditCurriculumScreen")}>
                        <Text style={s.iconText}>{'\u25C0'} Расписание {groupNumber}</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setGr}
                    value={gr}
                    placeholder="Группа"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setCo}
                    value={co}
                    placeholder="Тренер"
                />

                <FlatList style={{ width: '90%' }}
                    data={cur}
                    renderItem={({ item }) => (
                        <View style={styles.timeContainer}>
                            <TextInput
                                style={styles.input}
                                // onChangeText={() => {cur[item] = item.dayOfWeek}}
                                // onChangeText={changeState(item)}
                                onChangeText={setZ}
                                value={item.dayOfWeek}
                                placeholder="День недели"
                            />
                            <TextInput
                                style={styles.input}
                                // onChangeText={setCo}
                                value={item.timeFromTo}
                                placeholder="Время"
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />

                {/* <FlatList style={{ width: '90%' }}
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={item => item.groupNumber.toString()}
                /> */}

                <Text>{"\n"}</Text>

                <TouchableOpacity style={styles.btnWrite} onPress={() => addUser()}>
                    <Text style={styles.writeText}>Изменить</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    plusImage: {
        width: 30,
        height: 35,
        tintColor: 'white'
    },
    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },
    userTile: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userBtnTile: {
        marginTop: 5,
        height: 60,
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
    input: {
        height: 40,
        margin: 12,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        padding: 10,
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
    btnNewsText: {
        fontSize: 14,
        color: 'black'
    },
    btnNewsTextGray: {
        fontSize: 15,
        color: 'gray'
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
    TextContainer: {
        width: '70%'
    },
    btnWrite: {
        marginBottom: 20,
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