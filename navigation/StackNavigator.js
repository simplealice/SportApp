import React from 'react'
import ProfileScreen from '../screens/ProfileScreen';
import MainScreen from '../screens/MainScreen';
import SeminarsScreen from '../screens/SeminarsScreen';
import CompetitionsScreen from '../screens/CompetitionsScreen';
import CompetitionPage from '../screens/CompetitionPage';
import SeminarPage from '../screens/SeminarPage';
import NewsScreen from '../screens/NewsScreen';
import NewsPage from '../screens/NewsPage';
import EventsScreen from '../screens/EventsScreen';
import EventPage from '../screens/EventPage';
import TrialPage from '../screens/TrialPage';
import GaleryScreen from '../screens/GaleryScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator(); 

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} options={{header: () => null}} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{header: () => null}} />
          <Stack.Screen name="Seminars" component={SeminarsScreen} options={{header: () => null}} />
          <Stack.Screen name="Seminar" component={SeminarPage} options={{header: () => null}} />
          <Stack.Screen name="Competitions" component={CompetitionsScreen} options={{header: () => null}} />
          <Stack.Screen name="Competition" component={CompetitionPage} options={{header: () => null}} />
          <Stack.Screen name="News" component={NewsScreen} options={{header: () => null}} />
          <Stack.Screen name="Newsone" component={NewsPage} options={{header: () => null}} />
          <Stack.Screen name="Events" component={EventsScreen} options={{header: () => null}} />
          <Stack.Screen name="Event" component={EventPage} options={{header: () => null}} />
          <Stack.Screen name="Trial" component={TrialPage} options={{header: () => null}} />
          <Stack.Screen name="Galery" component={GaleryScreen} options={{header: () => null}} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator