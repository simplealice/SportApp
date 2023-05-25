import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function EditEventsScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const [events, setEvents] = React.useState(null);
    const [count, setCount] = useState(0);

    // React.useEffect(() => {
    //     getEvents();
    // }, []);

    React.useEffect(() => {
        getEvents();
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const getEvents = () => {
        fetch(global.URL + 'events/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setEvents(data)
            })
            .catch(error => console.error(error));
    };

    // This func returns an image URL from the object's param image
    const findImage = (e) => {
        var ImageURL = { uri: e.image };
        return ImageURL;
    }

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    const renderEvents = (i) => {
        if (events == null || i >= events.length) { }
        else {
            const MAXLENGTH = 40; 
            return (

                <TouchableOpacity
                    style={styles.NewsTile}
                    onPress={() => { navigation.navigate("EditEventPage", { id: i.id }) }}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.btnNewsTextGray}>{retDate(i)}</Text>
                        <Text style={styles.btnNewsTextBold}>{i.title}</Text>
                        <Text style={styles.btnNewsText} numberOfLines={2} ellipsizeMode="tail">
                            {i.description.slice(0, MAXLENGTH)}{(i.description.length > MAXLENGTH) ? '...' : ''}
                        </Text>
                    </View>
                    <Image style={styles.newsImage} source={findImage(i)} />
                </TouchableOpacity>
            )
        }
    }

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
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} События</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>
                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={events}
                    inverted
                    renderItem={({ item }) => renderEvents(item)}
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
        height: 140,
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
})