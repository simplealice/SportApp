import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function EditPrizesScreen({ route, navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const { token } = route.params;

    const [prizes, setPrizes] = React.useState(null);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        getUsers(token);
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const getUsers = (token) => {
        fetch(global.URL + 'awards/getAll', {
            method: 'GET',
            // headers: {
            //     "Authorization": `Bearer ${token}`,
            // }
        }).then(response => response.json())
            .then(data => {
                setPrizes(data)
            })
            .catch(error => console.error(error));
    };

    const renderEvents = (i) => {
        if (prizes == null || i >= prizes.length) { }
        else {
            const MAXLENGTH = 35;
            return (
                <TouchableOpacity
                    style={styles.userBtnTile}
                    onPress={() => { navigation.navigate("EditPrizePage", { token: token, id: i.id }) }}>
                    <View style={styles.userTile}>
                        <View>
                            <Text style={tls.btnNewsTextBold}>{i.name}</Text>
                            <Text style={tls.btnNewsText} numberOfLines={2} ellipsizeMode="tail">
                                {i.description.slice(0, MAXLENGTH)}{(i.description.length > MAXLENGTH) ? '...' : ''}
                            </Text>
                        </View>
                        <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
                    </View>
                    {/* {FilterUsers()} */}
                </TouchableOpacity>
            )
        }
    }

    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../../images/back.jpg")}>
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddPrizePage", { token: token })}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Награды</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>


                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={prizes}
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
        height: 100,
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