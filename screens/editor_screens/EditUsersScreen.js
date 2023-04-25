import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function EditUsersScreen({ route, navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const { token } = route.params;

    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
        console.log(token)
        getUsers(token);
    }, []);

    const getUsers = (token) => {
        fetch(global.URL + 'users/getAll', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(response => response.json())
            .then(data => {
                setUsers(data)
            })
            .catch(error => console.error(error));
    };

    const renderEvents = (i) => {
        if (users == null || i >= users.length) { }
        else {
            var role = ""
            if (i.role === 'SPORTSMEN') role = "Спортсмен"
            else role = "Тренер"
            return (
                <TouchableOpacity
                    style={styles.userBtnTile}
                    onPress={() => { navigation.navigate("EditUserPage", { token: token, id: i.id, email: i.email }) }}>
                    <View style={styles.userTile}>
                        <View>
                            <Text style={tls.btnNewsTextBold}>{role}</Text>
                            <Text style={tls.btnNewsText}>{i.surname} {i.name}</Text>
                        </View>
                        <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddUserPage", { token: token })}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Пользователи</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Text>Добавить +</Text>
                </TouchableOpacity> */}
                <Text>{"\n"}</Text>
                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={users}
                    inverted
                    renderItem={({ item }) => renderEvents(item)}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />

                <Text>{"\n"}</Text>

                <Text style={tls.btnAllNewsText}>МЫ В СОЦСЕТЯХ</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                    <Image style={s.netsImage} source={require('../../images/vk.png')} />
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
    }
})