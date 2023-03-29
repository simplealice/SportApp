import { StyleSheet, ScrollView, FlatList, View, TextInput, SafeAreaView, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function AuthScreen({ navigation }) {

  const s = require('../styles/styles');
  const hms = require('../styles/horiz_menu_styles');
  const tls = require('../styles/tiles_list_styles');

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState(null);

  const getUser = () => {
    fetch(global.URL + `users/get?email=${username}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        if (data.surname) {
          setUser(data.surname);
        } else {
          console.log('Invalid login credentials');
        }
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
        setRefreshToken(data.refreshToken);
        console.log(`Logged in with token ${data.token} and refresh token ${data.refreshToken}`);

        getUser();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send logout request to server
    axios.post(global.URL + "auth/logout", { refreshToken })
      .then(response => {
        console.log(response.data);
        setToken(null);
        setRefreshToken(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRefreshToken = () => {
    // Send refresh token request to server
    axios.post(global.URL + "auth/authenticate", { refreshToken })
      .then(response => {
        const data = response.data;
        setToken(data.token);
        console.log(`Token refreshed with token ${data.token}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!token && !refreshToken) {
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
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Пароль"
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
  } else {
    // Render dashboard if logged in
    return (


      <ScrollView>
        <View style={s.container}>
          <ImageBackground style={s.imageBack} resizeMode='cover' source={require("../images/back.jpg")}>
            <Image
              style={styles.imageIcon}
              source={require("../images/icon.jpg")} />
            <TouchableOpacity onPress={() => { navigation.navigate("Main") }}>
              <Text style={s.iconText}>{'\u25C0'} Мой профиль</Text>
            </TouchableOpacity>
            <View style={hms.menuView}>
              
            </View>
          </ImageBackground>

          {/* <FlatList style={{ width: '90%' }}
            data={groups}
            renderItem={renderGroup}
            keyExtractor={item => item.groupNumber.toString()}
          /> */}

          <Text style={tls.btnAllNewsText}>МЫ В СОЦСЕТЯХ</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://vk.com/public151614553')}>
            <Image style={s.netsImage} source={require('../images/vk.png')} />
          </TouchableOpacity>

          <View>
            <Text>You are logged in with token {token}</Text>
            <TouchableOpacity
              style={styles.btnWrite}
              // disabled
              onPress={handleLogout}>
              <View>
                <Text style={styles.writeText}>Log out</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnWrite}
              // disabled
              onPress={handleRefreshToken}>
              <View>
                <Text style={styles.writeText}>Refresh token</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};
//   return (
//     <View style={s.container}>
//       <ImageBackground style={styles.imageBack} source={require("../images/back2.jpg")}>
//         <Image
//           style={styles.image}
//           source={require("../images/icon.jpg")} />
//         <Text style={styles.iconText}>Спортивный клуб каратэ "ВОИН"</Text>
//         <View style={styles.menuView}>
//           <SafeAreaView>
//             <TextInput
//               style={styles.input}
//               onChangeText={text => setUsername(text)}
//               value={username}
//               placeholder="Email"
//             />
//             <TextInput
//               style={styles.input}
//               secureTextEntry={true}
//               onChangeText={text => setPassword(text)}
//               value={password}
//               placeholder="Пароль"
//             />
//           </SafeAreaView>
//           <TouchableOpacity
//             style={styles.btnWrite}
//             // disabled
//             onPress={handleSubmit}>
//             <View>
//               <Text style={styles.writeText}>Войти</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

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
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    padding: 10,
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
})