import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function EditTimeSignInScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const [timeSignIn, setTimeSignIn] = React.useState([]);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        getTimeSignIn();
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const getTimeSignIn = async () => {
        await fetch(global.URL + 'timeSignIn/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setTimeSignIn(data)
            })
            .catch(error => console.error(error));
    };

    const renderTimeSignIn = (i) => {
        if (timeSignIn == null || i >= timeSignIn.length) { }
        else {
            return (
                <View style={styles.TextContainer}>
                    <Text style={styles.btnNewsTextBold}>{i.signDate} {i.timeFromTo}</Text>
                    <TouchableOpacity onPress={() => deleteUser()}>
                        <Image style={styles.binImage} source={require('../../images/bin.png')} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddTimeSignInPage")}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Время записи</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>
                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={timeSignIn}
                    inverted
                    renderItem={({ item }) => renderTimeSignIn(item)}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
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
    TextContainer: {
        width: '90%',
        backgroundColor: 'red',
        alignSelf: 'center',
        height: 60,
        shadowColor: 'black',
        elevation: 6,
        borderRadius: 20,
        backgroundColor: 'white',     
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    binImage: {
        width: 20,
        height: 25,
        tintColor: 'red'
    }
})