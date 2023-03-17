import { StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function AuthScreen({ navigation }) {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const s = require('../styles/styles');

  const handleLogin = () => {
    // Send login request to server
    axios.post(global.URL + "auth/authenticate", {
      'email': username,
      'password': password, })
      .then(response => {
        const data = response.data;
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        console.log(`Logged in with token ${data.token} and refresh token ${data.refreshToken}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send logout request to server
    axios.post(global.URL + "auth/authenticate", { refreshToken })
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

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // const user = {email, password}
  //   // console.log(user)
  //   // fetch("http://192.168.31.10:8080/auth/authenticate", {
  //   //   method:"POST",
  //   //   headers:{"Content-Type":"application/json"},
  //   //   body:JSON.stringify(user)
  //   // }).then(() => {
  //   //   console.log("Successfully")
  //   //   navigation.navigate("News") 
  //   // })
  //   console.log(username)
  //   console.log(password)
  //   user_login({
  //     email: username,
  //     password: password
  //   }).then((result) => {
  //     console.log(result.status)
  //     if (result.status == 200) {
  //       AsyncStorage.setItem("AccessToken", result.data.token)
  //       console.log("Hello")
  //       navigation.navigate("Main")
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }
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
})