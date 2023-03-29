import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MainContainer from './context/MainContainer';
import BottomTabNavigator from './navigation/TabNavigator';
// import DrawerNavigator from './navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  global.URL = "http://192.168.31.9:8080/"
  LogBox.ignoreAllLogs()

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      <BottomTabNavigator />
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
};

export default App;

