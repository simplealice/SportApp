import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState } from 'react';

export default function EditTimeSignInScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');
    const ams = require('../../styles/admin_mode_styles');

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

    const deleteTimeSignIn = (id) => {
        fetch(global.URL + `timeSignIn/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(() => {})
            .catch(error => console.log('error', error));
    };

    const renderTimeSignIn = (i) => {
        if (timeSignIn == null || i >= timeSignIn.length) { }
        else {
            return (
                <View style={styles.TextContainer}>
                    <Text style={styles.btnNewsTextBold}>{i.signDate} {i.timeFromTo}</Text>
                    <TouchableOpacity onPress={() => deleteTimeSignIn(i.id)}>
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
    btnNewsTextBold: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10,
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