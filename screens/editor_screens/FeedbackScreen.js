import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';
import SelectDropdown from 'react-native-select-dropdown';

export default function FeedbackScreen({ route, navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const { token } = route.params;

    const [feedback, setFeedback] = React.useState(null);

    React.useEffect(() => {
        getFeedback(token);
    });

    const getFeedback = (token) => {
        fetch(global.URL + 'feedback/getAll', {
            method: 'GET',
            // headers: {
            //     "Authorization": `Bearer ${token}`,
            // }
        }).then(response => response.json())
            .then(data => {
                setFeedback(data)
            })
            .catch(error => console.error(error));
    };

    const renderEvents = (i) => {
        if (feedback == null || i >= feedback.length) { }
        else {
            const MAXLENGTH = 40; 
            return (
                <TouchableOpacity
                    style={styles.userBtnTile}
                    onPress={() => { navigation.navigate("FeedbackPage", { token: token, id: i.id }) }}>
                    <View style={styles.userTile}>
                        <View>
                            <Text style={tls.btnNewsText} numberOfLines={2} ellipsizeMode="tail">
                                {i.comment.slice(0, MAXLENGTH)}{(i.comment.length > MAXLENGTH) ? '...' : ''}
                            </Text>
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
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Обратная связь</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>

                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={feedback}
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
        height: 90,
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