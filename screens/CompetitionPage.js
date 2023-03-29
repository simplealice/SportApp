import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function CompetitionPage({ route, navigation }) {

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

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    const returnCompetitionDate = () => {
        if (data == null) { }
        else {
            return retDate(data[id])
        }
    }

    const findImage = () => {
        if (data == null) { }
        else {
            var ImageURL = { uri: data[id].image };
            return ImageURL;
        }
    }

    const returnCompetitionTitle = () => {
        if (data == null) { }
        else {
            return data[id].title
        }
    }

    const returnCompetitionDescription = () => {
        if (data == null) { }
        else {
            return data[id].description
        }
    }

    const returnCompetitionCity = () => {
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
                        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                            <Text style={eps.iconText}>{'\u25C0'} {returnCompetitionTitle()}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <Image source={findImage()} style={eps.photo} />

                <View style={eps.viewSem}>
                    <View style={eps.dateEventContainer1}>
                        <Image style={eps.eventsImage} source={require('../images/doc.png')} />
                        <Text style={eps.btnTitleText}>{returnCompetitionTitle()}</Text>
                    </View>
                    <View style={eps.dateEventContainer2}>
                        <Image style={eps.eventsImage} source={require('../images/calendar.png')} />
                        <Text style={eps.btnNewsTextRed}>{returnCompetitionDate()}</Text>
                    </View>
                    <View style={eps.dateEventContainer2}>
                        <Image style={eps.eventsImage} source={require('../images/locate.png')} />
                        <Text style={eps.btnNewsText}>{returnCompetitionCity()}</Text>
                    </View>
                    <Text style={eps.btnNewsTextDesc}>{returnCompetitionDescription()}</Text>
                    <TouchableOpacity style={eps.btnWrite} onPress={() => { navigation.navigate("Main") }}>
                        <Text style={eps.writeText}>Записаться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};