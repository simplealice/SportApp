import React from "react";
import EventsScreen from '../screens/EventsScreen';
import CurriculumScreen from "../screens/CurriculumScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainStackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#E3241D', }}>
            <Tab.Screen name="Home" component={MainStackNavigator} options={{
                tabBarIcon: ({ focused }) => (
                    // focused ?
                    // <Image
                    //   style={{ tintColor: '#E3241D', width: 30, height: 30 }}
                    //   source={require('../images/main.png')                  
                    //   }/> : <Image
                    //   style={{ tintColor: '#605F60', width: 30, height: 30 }}
                    //   source={require('../images/main.png')                  
                    //   }/>
                    <Image
                        style={{ tintColor: '#605F60', width: 30, height: 30 }}
                        source={require('../images/main.png')
                        } />
                ),
                tabBarLabel: 'Главная', header: () => null
            }} />
            <Tab.Screen name="Events" component={EventsScreen} options={{
                tabBarIcon: () => (
                    <Image
                        style={{ tintColor: '#605F60', width: 25, height: 25 }}
                        source={require('../images/calendar.png')
                        } />
                ),
                tabBarLabel: 'События', header: () => null
            }} />
            <Tab.Screen name="Curriculum" component={CurriculumScreen} options={{
                tabBarIcon: () => (
                    <Image
                        style={{ tintColor: '#605F60', width: 25, height: 25 }}
                        source={require('../images/doc.png')
                        } />
                ),
                tabBarLabel: 'Расписание', header: () => null
            }} />
            <Tab.Screen name="Profile" component={AuthScreen} options={{
                tabBarIcon: () => (
                    <Image
                        style={{ tintColor: '#605F60', width: 30, height: 30 }}
                        source={require('../images/profile.png')
                        } />
                ),
                tabBarLabel: 'Профиль', header: () => null
            }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    bottomTabIcon: {
        flex: 1,
        // backgroundColor: '#fff',
        width: 30,
        height: 30
    },
})

export default BottomTabNavigator;