import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './navigation/TabNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  global.URL = "http://192.168.31.20:8080/" // change this path
  global.splashed = false
  global.name = ''
  global.birthday = ''
  global.email = ''
  global.phone = ''
  global.userId = ''
  LogBox.ignoreAllLogs()

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;

