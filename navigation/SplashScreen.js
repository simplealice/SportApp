import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function SplashScreen({ navigation, route }) {

  useEffect(() => {
    setTimeout(() => {
      global.splashed = true
      navigation.navigate('Main');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../images/splash.jpg')} style={styles.logo} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3241D',
  },
  logo: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain'
  }
});

export default SplashScreen;