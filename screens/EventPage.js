import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';

export default function EventPage({ route, navigation }) {

    const s = require('../styles/styles');
    const eps = require('../styles/event_page_styles');

    const { id } = route.params;

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const getData = async () => {
            const resp = await fetch(URL + "events/getAll");
            const data = await resp.json();
            setData(data);
        }
        getData();
    }, []);

    const returnEventDate = () => {
        if (data == null) { }
        else {
            return data[id].date
        }
    }

    const findImage = () => {
        if (data == null) { }
        else {
            var ImageURL = { uri: data[id].image };
            return ImageURL;
        }
    }

    const returnEventTitle = () => {
        if (data == null) { }
        else {
            return data[id].title
        }
    }

    const returnEventDescription = () => {
        if (data == null) { }
        else {
            return data[id].description
        }
    }

    const returnEventCity = () => {
        if (data == null) { }
        else {
            return data[id].city
        }
    }


    return (
        <ScrollView>
            <View style={s.container}>
                <ImageBackground style={s.imageBack} source={require("../images/back.jpg")}>
                    <TouchableOpacity style={eps.OpacityBell} onPress={() => Linking.openURL('https://vk.com/public151614553')}>
                        <Image style={s.bellImage} source={require('../images/bell.png')} />
                    </TouchableOpacity>
                    
                    <View style={eps.menuView}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Events") }}>
                            <Text style={eps.iconText}>{'\u25C0'} {returnEventTitle()}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <Image source={findImage()} style={eps.photo} />

                <View style={eps.viewSem}>
                    <View style={eps.dateEventContainer1}>
                        <Image style={eps.eventsImage} source={require('../images/doc.png')} />
                        <Text style={eps.btnTitleText}>{returnEventTitle()}</Text>
                    </View>
                    <View style={eps.dateEventContainer2}>
                        <Image style={eps.eventsImage} source={require('../images/calendar.png')} />
                        <Text style={eps.btnNewsTextRed}>{returnEventDate()}</Text>
                    </View>
                    <View style={eps.dateEventContainer2}>
                        <Image style={eps.eventsImage} source={require('../images/locate.png')} />
                        <Text style={eps.btnNewsText}>{returnEventCity()}</Text>
                    </View>
                    <Text style={eps.btnNewsTextDesc}>{returnEventDescription()}</Text>
                    <TouchableOpacity style={eps.btnWrite} onPress={() => { navigation.navigate("Main") }}>
                        <Text style={eps.writeText}>Записаться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
