import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as React from 'react';

export default function ProfileScreen({ navigation }) {

    const [data, setData] = React.useState(null);

    // const currentUser = AuthService.getCurrentUser();

    // const doc = 'Bearer ' + currentUser.accessToken;

    // const getDoctors = () => {
    //     try {
    //       var config = {
    //         method: 'get',
    //         url: 'https://telesfor-noauth.herokuapp.com/api/users/doctors',
    //         headers: {
    //           'Authorization': doc,
    //           'Content-Type': 'application/json'
    //         }
    //       };
    
    //       axios(config)
    //         .then((response) => {
    //           console.log(response.data);
    //           setDoctors(response.data);
    //         });
    //       setLoading(true);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    React.useEffect(() => {
        const getData = async () => {
            const resp = await fetch("http://192.168.31.10:8080/curriculum/get");
            const data = await resp.json();
            setData(data);
        }
        getData();
    }, []);

    const handleClick = (e) => {
        if (e == 'Новости') {
            navigation.navigate("News")
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
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                // data={data}
                // keyExtractor={item => item.id}
                //contentContainerStyle={{paddingBottom: 10, paddingTop: 8}}
                horizontal={true}
                data={[
                    { key: 'Новости' },
                    { key: 'Семинары' },
                    { key: 'Турниры' },
                    { key: 'Статистика' },
                    { key: 'Галерея' },
                    { key: 'Документы' },
                    { key: 'Контакты' },]}
                renderItem={({ item }) => <TouchableOpacity
                    style={styles.MenuTile}
                    onPress={() => { handleClick(item.key) }}>
                    <View>
                        <Text style={styles.btnText}>{item.key}</Text>
                    </View>
                </TouchableOpacity>}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
            />
            <TouchableOpacity
                style={styles.TouchableOpacity}
                onPress={() => { navigation.navigate("News") }}>
                <View>
                    <Text style={styles.btnText}>Записаться на пробное занятие</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                //contentContainerStyle={{paddingBottom: 10, paddingTop: 8}}
                renderItem={({ item }) => <TouchableOpacity
                    style={styles.MenuTile}
                    onPress={() => { handleClick(item.key) }}>
                    <View>
                        <Text style={styles.btnText}>{item.key}</Text>
                    </View>
                </TouchableOpacity>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    TouchableOpacity: {
        marginTop: 12,
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#930'
    },
    MenuTile: {
        marginTop: 12,
        height: 100,
        width: 100,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#930'
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    }
})