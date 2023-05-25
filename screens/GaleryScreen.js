import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function GaleryScreen({ navigation }) {

    const [photos, setPhotos] = React.useState(null);
    const [count, setCount] = useState(0);

    // const [hovered, setHovered] = useState(false)

    // const onEnter = () => {
    //     console.log(hovered)
    //     setHovered(true)
    // }
    // const onExit = () => {
    //     setHovered(false)
    // }

    // const openPhoto = (e) => {
    //     return (
    //         <Image style = {{width: 100}} source = { findImage(e) } />
    //     )
    // }


    // Set photos
    React.useEffect(() => {
        const getPhotos = async () => {
            const resp = await fetch(URL + "photos/getAll");
            const data = await resp.json();
            setPhotos(data);
        }
        getPhotos();
        setTimeout(() => {
            setCount(count + 1);
        }, 15000);
    }, [count])

    const handleClick = (e) => {
        if (e == 'Новости') {
            navigation.navigate("News")
        } else if (e == 'Пробное занятие') {
            navigation.navigate("Trial")
        } else if (e == 'Семинары') {
            navigation.navigate("Seminars")
        } else if (e == 'Турниры') {
            navigation.navigate("Competitions")
        } else if (e == 'Статистика') {
            navigation.navigate("Statistics")
        } else if (e == 'Галерея') {
            navigation.navigate("Galery")
        } else if (e == 'Документы') {
            navigation.navigate("Documents")
        } else if (e == 'Контакты') {
            navigation.navigate("Contacts")
        } else if (e == 'О клубе') {
            navigation.navigate("About")
        }
    }

    const iconStyle = (e) => {
        if (e == 'Галерея') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4,
                tintColor: '#E3241D'
            }
        } else if (e == 'Контакты') {
            return {
                width: 50,
                height: 40,
                opacity: 0.4
            }
        } else if (e == 'Документы' || e == 'Семинары') {
            return {
                width: 30,
                height: 40,
                opacity: 0.4
            }
        } else {
            return {
                width: 40,
                height: 40,
                opacity: 0.4
            }
        }
    }

    const drawIcon = (e) => {
        if (e == 'Новости') {
            return require('../images/news.png')
        } else if (e == 'Пробное занятие') {
            return require('../images/clock.png')
        } else if (e == 'Семинары') {
            return require('../images/seminar.png')
        } else if (e == 'Турниры') {
            return require('../images/competition.png')
        } else if (e == 'Статистика') {
            return require('../images/statistics.jpg')
        } else if (e == 'Галерея') {
            return require('../images/photo.png')
        } else if (e == 'Документы') {
            return require('../images/document.png')
        } else if (e == 'Контакты') {
            return require('../images/contacts.png')
        } else if (e == 'О клубе') {
            return require('../images/info.png')
        }
    }

    const textStyle = (e) => {
        if (e == 'Галерея') {
            return {
                fontSize: 15,
                color: '#E3241D',
                paddingTop: 5,
                textAlign: 'center',
            }
        } else {
            return {
                fontSize: 15,
                color: 'black',
                paddingTop: 5,
                textAlign: 'center'
            }
        }
    }

    // This func returns an image URL from the object's param image
    const findImage = (e) => {
        var ImageURL = { uri: e.image };
        return ImageURL;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground style={styles.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
                    <Image
                        style={styles.imageIcon}
                        source={require("../images/icon.jpg")} />
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Text style={styles.iconText}>{'\u25C0'} Галерея</Text>
                    </TouchableOpacity>
                    <View style={styles.menuView}>
                        <FlatList style={styles.flatMenu}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={[
                                { key: 'Новости' },
                                { key: 'Пробное занятие' },
                                { key: 'Семинары' },
                                { key: 'Турниры' },
                                { key: 'Статистика' },
                                { key: 'Галерея' },
                                { key: 'Контакты' },
                                { key: 'О клубе' },]}
                            renderItem={({ item }) => <TouchableOpacity
                                style={styles.MenuTile}
                                onPress={() => { handleClick(item.key) }}>
                                <View style={styles.btnView}>
                                    <Image
                                        style={iconStyle(item.key)}
                                        source={drawIcon(item.key)}
                                    />
                                    <Text style={textStyle(item.key)}>{item.key}</Text>
                                </View>
                            </TouchableOpacity>}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        />
                    </View>
                </ImageBackground>

                <FlatList style={styles.flatNews}
                    showsHorizontalScrollIndicator={false}
                    data={photos}
                    inverted
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ marginLeft: 10, marginRight: 10 }}
                    renderItem={({ item }) =>
                    // <View>
                    //     <TouchableOpacity onPress={() => onEnter()}>
                            <Image
                                style={styles.photo}
                                source={findImage(item)}
                            />
                        // </TouchableOpacity>
                        //</ScrollView>{hovered && <Image style = {{width: 500}} source = { findImage(item) } />}
                        //</View>
                    }
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />


                <Text style={styles.btnAllNewsText}>МЫ В СОЦСЕТЯХ</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                    <Image style={styles.netsImage} source={require('../images/vk.png')} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBack: {
        width: '100%',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        marginTop: 60,
        marginBottom: 10,
        width: 110,
        height: 110,
        borderRadius: 10
    },
    iconText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    photo: {
        width: '30%',
        // height: 250,
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: 20
    },


    menuView: {
        width: '100%',
        backgroundColor: 'gainsboro',
        opacity: 0.7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    flatMenu: {
        // flexGrow: 0.1
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15
    },
    TouchableOpacity: {
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        // paddingVertical: 5,
        backgroundColor: '#930'
    },
    MenuTile: {
        marginTop: 12,
        height: 105,
        width: 105,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    icon: {
        width: 20,
        height: 30,
        // tintColor: 'white'
    },

    btnAllNewsText: {
        fontSize: 15,
        color: '#E3241D',
        fontWeight: 'bold'
    },
    btnView: {
        alignItems: 'center',
        paddingTop: 15
    },
    flatNews: {
        width: "100%",
        marginBottom: 10,
    },
    netsImage: {
        width: 60,
        height: 60,
        margin: 10
    }
})