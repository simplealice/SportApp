import { Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import * as React from 'react';
import XDate from 'xdate';

export default function CompetitionPage({ route, navigation }) {

    const s = require('../styles/styles');
    const eps = require('../styles/event_page_styles');

    const { id } = route.params;

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(URL + `events/get/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    const retDate = (e) => {
        var dt = new XDate(e.date);
        return dt.toString("dd.MM.yyyy");
    }

    const returnCompetitionDate = () => {
        if (data == null) { }
        else {
            return retDate(data)
        }
    }

    const findImage = () => {
        if (data == null) { }
        else {
            var ImageURL = { uri: data.image };
            return ImageURL;
        }
    }

    const returnCompetitionTitle = () => {
        if (data == null) { }
        else {
            return data.title
        }
    }

    const returnCompetitionDescription = () => {
        if (data == null) { }
        else {
            return data.description
        }
    }

    const returnCompetitionCity = () => {
        if (data == null) { }
        else {
            return data.city
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
                    <TouchableOpacity style={eps.btnWrite} onPress={() => { navigation.navigate("SignInCompetition", { id: id }) }}>
                        <Text style={eps.writeText}>Записаться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};