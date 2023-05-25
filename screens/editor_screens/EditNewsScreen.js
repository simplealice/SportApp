import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import XDate from 'xdate';

export default function EditNewsScreen({ navigation }) {

    const s = require('../../styles/styles');
    const hms = require('../../styles/horiz_menu_styles');
    const tls = require('../../styles/tiles_list_styles');

    const [news, setNews] = React.useState([]);
    const [count, setCount] = useState(0);

    React.useEffect(() => {       
        getNews();
        setTimeout(() => {
            setCount(count + 1);
        }, 5000);
    }, [count])

    const getNews = async () => {
        await fetch(global.URL + 'news/getAll', {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setNews(data)
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
        if (news == null || i >= news.length) { }
        else {
            const MAXLENGTH = 40; 
            return (
                // <TouchableOpacity
                //     style={styles.userBtnTile}
                //     onPress={() => { navigation.navigate("EditUserPage", { token: token, id: i.id, email: i.email }) }}>
                //     <View style={styles.userTile}>
                //         <View>
                //             <Text style={tls.btnNewsTextBold}>{role}</Text>
                //             <Text style={tls.btnNewsText}>{i.surname} {i.name}</Text>
                //         </View>
                //         <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
                //     </View>
                // </TouchableOpacity>

                <TouchableOpacity
                    style={styles.NewsTile}
                    onPress={() => { navigation.navigate("EditNewsPage", { id: i.id }) }}>
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
                    <TouchableOpacity style={s.OpacityBell} onPress={() => navigation.navigate("AddNewsPage")}>
                        <Image style={styles.plusImage} source={require('../../images/plus.png')} />
                    </TouchableOpacity>
                    <Image
                        style={styles.imageIcon}
                        source={require("../../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Text style={s.iconText}>{'\u25C0'} Новости</Text>
                    </TouchableOpacity>
                    <View style={hms.menuView}></View>
                </ImageBackground>

                <Text>{"\n"}</Text>
                <FlatList style={tls.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={news}
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
        width: '70%'
    },
})