import { StyleSheet, View, TextInput, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import * as React from 'react';

export default function HomeScreen({ navigation }) {

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {email, password}
    console.log(user)
    fetch("http://192.168.31.10:8080/auth/authenticate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    }).then(() => {
      console.log("Successfully")
      navigation.navigate("News") 
    })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../images/icon.png")} />
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
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
        style={styles.TouchableOpacity}
        // disabled
        onPress={handleSubmit}>
        <View>
          <Text style={styles.btnText}>Войти</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => { navigation.navigate("News") }}>
        <View>
          <Text style={styles.btnText}>Войти как гость</Text>
        </View>
      </TouchableOpacity>
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
  image: {
    marginBottom: 20,
    width: 120,
    height: 160
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  btnText: {
    fontSize: 20,
    color: 'white'
  }
})