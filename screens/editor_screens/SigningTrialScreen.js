import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function SigningTrialScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const [signing, setSigning] = React.useState(null);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        getFeedback();
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const getFeedback = () => {
        fetch(global.URL + 'trialClasses/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setSigning(data)
            })
            .catch(error => console.error(error));
    };

    const deleteTrial = (id) => {
        fetch(global.URL + `trialClasses/delete/${id}`, { method: 'GET' })
            .then(response => response.text())
            .then(result => {})
            .catch(error => console.log('error', error));
    };

    const renderEvents = (i) => {
        if (signing == null || i >= signing.length) { }
        else {
            return (
                <View style={styles.userBtnTile}>
                    <View>
                        <Text style={tls.btnNewsText}>{i.date}</Text>
                        <Text style={tls.btnNewsText}>{i.name}</Text>
                        {i.phone ? <Text style={tls.btnNewsText}>{i.phone}</Text> : <></>}
                        {i.mail ? <Text style={tls.btnNewsText}>{i.mail}</Text> : <></>}
                        {i.comment ? <Text style={tls.btnNewsText}>{i.comment}</Text> : <></>}
                    </View>
                    <TouchableOpacity onPress={() => deleteTrial(i.id)}>
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
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Записи</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>

                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={signing}
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
        marginTop: 10,
        height: 120,
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
    binImage: {
        width: 20,
        height: 25,
        tintColor: 'red'
    }
})