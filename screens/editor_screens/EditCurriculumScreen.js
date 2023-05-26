import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditCurriculumScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');
    const ams = require('../../styles/admin_mode_styles');

    const [groups, setGroups] = useState([]);
    const [count, setCount] = useState(0);

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
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const deleteCurriculum = (id) => {
        fetch(global.URL + `curriculum/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(result => { })
            .catch(error => console.log('error', error));
    };

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
                        <TouchableOpacity onPress={() => deleteCurriculum(item.id)}>
                            <Image style={styles.binImage} source={require('../../images/bin.png')} />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddCurriculumPage")}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Расписание</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>
                <FlatList style={{ width: '90%' }}
                    data={groups}
                    renderItem={renderGroup}
                    keyExtractor={item => item.groupNumber.toString()}
                />

                <Text>{"\n"}</Text>

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
    NewsTile: {
        height: 220,
        width: '98%',
        margin: 10,
        paddingHorizontal: 20,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20
    },
    timeContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    btnNewsTextRed: {
        fontSize: 14,
        color: '#E3241D',
        fontWeight: 'bold',
    },
    binImage: {
        width: 20,
        height: 25,
        tintColor: 'red'
    }
})