import { StyleSheet, ScrollView, View, TextInput, SafeAreaView, TouchableOpacity, Text, Image, ImageBackground, Switch } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import XDate from 'xdate';
import Accordion from '../navigation/Accordion';

export default function AuthScreen({ navigation }) {

  const s = require('../styles/styles');
  const hms = require('../styles/horiz_menu_styles');
  const tls = require('../styles/tiles_list_styles');

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('');
  const [surname, setSurame] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [kuDan, setKuDan] = useState('');
  const [category, setCategory] = useState('');
  const [major, setMajor] = useState('');
  const [team, setTeam] = useState('');
  const [medals, setMedals] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  var menu = [
    {
      title: 'Участник соревнований',
      data: 'Спортсмен пока не участвовал ни в одних соревнованиях...'
    },
    {
      title: 'Мое расписание',
      // data: renderGroup(groups[0])
      data: 'Расписания нет...'
    },
    {
      title: 'Мои документы',
      data: 'Пока что не добавлен ни один документ...'
    }
  ]

  // useState(() => {
  //   var str = surname
  //   str += ' '
  //   str += name
  //   global.name = str
  //   console.log("GName: " + global.name)
  // })
  const changeState = () => {
    var str = surname
    str += ' '
    str += name
    global.name = str
    global.birthday = birthday
    global.category = category
  }

  const getUser = (token) => {
    fetch(global.URL + `users/get/${username}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(response => response.json())
      .then(data => {
        setRole(data.role)
        setSurame(data.surname)
        setName(data.name)
        setBirthday(data.birthDate)
        setCategory(data.category)
        setKuDan(data.kuDan)
        setMajor(data.major)
        setTeam(data.team)
        setMedals(data.medals)
      })
      .catch(error => console.error(error));
  };

  const handleLogin = () => {
    // Send login request to server
    axios.post(global.URL + "auth/authenticate", {
      'email': username,
      'password': password,
    })
      .then(response => {
        const data = response.data;
        setToken(data.token);
        // console.log(`Logged in with token ${data.token}`);
        getUser(data.token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send logout request to server
    axios.post(global.URL + "auth/logout")
      .then(response => {
        console.log(response.data);
        setToken(null);
        global.name = ''
        global.birthday = ''
      })
      .catch(error => {
        console.error(error);
      });
  };

  const retDate = (e) => {
    var dt = new XDate(e);
    return dt.toString("dd.MM.yyyy");
  }

  // This func returns a news tile and render it on the screen
  const renderInfo = () => {
    if (surname == null || name == null || birthday == null || category == null) { }
    else {
      return (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTextBold}>КАРТОЧКА СПОРТСМЕНА</Text>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Дата рождения:</Text>
            <Text style={styles.cardText}>{retDate(birthday)}</Text>
          </View>
          <View style={styles.lineFull}></View>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Кю/дан:</Text>
            <Text style={styles.cardText}>{kuDan}</Text>
          </View>
          <View style={styles.lineFull}></View>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Категория:</Text>
            <Text style={styles.cardText}>{category}</Text>
          </View>
          <View style={styles.lineFull}></View>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Направление:</Text>
            <Text style={styles.cardText}>{major}</Text>
          </View>
          <View style={styles.lineFull}></View>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Членство в сборной:</Text>
            <Text style={styles.cardText}>{team}</Text>
          </View>
          <View style={styles.lineFull}></View>
          <View style={styles.cardString}>
            <Text style={styles.cardTextGrey}>Количество медалей:</Text>
            <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">{medals}</Text>
          </View>
        </View>
      )
    }
  }

  const renderAccordions = () => {
    const items = [];
    for (let item = 0; item < menu.length; item++) {
      items.push(
        <Accordion
          key={item}
          title={menu[item].title}
          data={menu[item].data}
        />
      );
    }
    return items;
  }


  if (!token) {
    return (
      <View style={s.container}>
        <ImageBackground style={styles.imageBack} source={require("../images/back2.jpg")}>
          <Image
            style={styles.image}
            source={require("../images/icon.jpg")} />
          <Text style={styles.iconText}>Спортивный клуб каратэ "ВОИН"</Text>
          <View style={styles.menuView}>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={text => setUsername(text)}
                value={username}
                placeholder="Эл. почта"
                autoCapitalize='none'
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Пароль"
                autoCapitalize='none'
              />
            </SafeAreaView>
            <TouchableOpacity
              style={styles.btnWrite}
              // disabled
              onPress={handleLogin}>
              <View>
                <Text style={styles.writeText}>Войти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  } else if (role === "SPORTSMEN") {
    // Render dashboard if logged in
    { changeState() }
    return (
      <ScrollView>
        <View style={s.container}>
          <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
            <Image
              style={styles.imageIcon}
              source={require("../images/icon.jpg")} />
            <TouchableOpacity onPress={() => { navigation.navigate("Main") }}>
              <Text style={s.iconText}>{'\u25C0'} {surname} {name}</Text>
            </TouchableOpacity>
            <View style={hms.menuView} />
          </ImageBackground>

          <View style={styles.container}>
            {renderInfo()}

            {renderAccordions()}

            <Text>{"\n"}</Text>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              {/* <Image style={styles.btnImage} source={require('../images/bell.png')} /> */}
              <Text style={styles.btnText}>Уведомления</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              {/* <Image style={styles.btnImage} source={require('../images/bell.png')} /> */}
              <Text style={styles.btnText}>Чат с тренером</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              {/* <Image style={styles.btnImage} source={require('../images/bell.png')} /> */}
              <Text style={styles.btnText}>Мой календарь</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("IndividualPage", { token: token }) }}>
              {/* <Image style={styles.btnImage} source={require('../images/bell.png')} /> */}
              <Text style={styles.btnText}>Записаться на индивидуальное занятие</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>

            <View style={styles.pushContainer}>
              <Text style={styles.btnText}>Включить пуш-уведомления</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#E3241D' }}
                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                ios_backgroundColor="#E5E5E5"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <TouchableOpacity
              style={styles.btnWrite}
              // disabled
              onPress={handleLogout}>
              <View>
                <Text style={styles.writeText}>Выйти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else if (role === "ADMIN") {
    return (
      <ScrollView>
        <View style={s.container}>
          <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
            <Image
              style={styles.imageIcon}
              source={require("../images/icon.jpg")} />
            <TouchableOpacity onPress={() => { navigation.navigate("Main") }}>
              <Text style={s.iconText}>{'\u25C0'} Страница редактора</Text>
            </TouchableOpacity>
            <View style={hms.menuView}></View>
          </ImageBackground>

          <Text>{"\n"}</Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              <Text style={styles.btnText}>Уведомления</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              <Text style={styles.btnText}>Чаты</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <Text>{"\n"}</Text>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("EditUsersScreen", { token: token }) }}>
              <Text style={styles.btnText}>Пользователи</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("EditNewsScreen") }}>
              <Text style={styles.btnText}>Новости</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTile}
              onPress={() => { navigation.navigate("") }}>
              <Text style={styles.btnText}>События</Text>
              <Text style={styles.btnTextArrow}>{String.fromCharCode(9654)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnWrite}
              // disabled
              onPress={handleLogout}>
              <View>
                <Text style={styles.writeText}>Выйти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  iconText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  imageBack: {
    flex: 1,
    width: "100%",
    height: 1000,
    paddingTop: 40,
    justifyContent: 'center'
  },
  menuView: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20
  },
  btnWrite: {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E3241D',
    width: 150,
    borderRadius: 20,
  },
  writeText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    color: 'white'
  },
  image: {
    marginBottom: 20,
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 100
  },
  pushContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    padding: 10,
  },
  btnImage: {
    width: 25,
    height: 25,
    tintColor: '#E3241D'
  },
  btnText: {
    fontSize: 14,
    // marginLeft: 15,
    paddingRight: 10
  },
  btnTextArrow: {
    color: '#E3241D'
  },
  btnTile: {
    height: 46,
    width: '98%',
    paddingHorizontal: 20,
    shadowColor: 'black',
    elevation: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  imageIcon: {
    marginTop: 60,
    marginBottom: 10,
    width: 110,
    height: 110,
    borderRadius: 10
  },

  item: {
    padding: 10,
    fontSize: 18,
  },
  TouchableOpacity: {
    width: '80%',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 5,
    backgroundColor: '#930'
  },
  TouchableOpacityNews: {
    width: '90%',
    // alignItems: 'flex-end',
    marginTop: 10,
    paddingVertical: 5,
  },
  icon: {
    width: 20,
    height: 30,
    // tintColor: 'white'
  },

  btnView: {
    alignItems: 'center',
    paddingTop: 15
  },


  NewsTile: {
    height: 130,
    width: '98%',
    margin: 10,
    paddingHorizontal: 20,
    shadowColor: 'black',
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  timeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  lineFull: {
    backgroundColor: 'gainsboro',
    height: 1,
    marginBottom: 10,
    marginTop: 5
  },
  container: {
    flex: 1,
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    width: '100%',
    shadowColor: 'black',
    elevation: 6,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  cardString: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    color: 'black'
  },
  cardTextBold: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardTextGrey: {
    fontSize: 14,
    color: 'grey'
  }
})