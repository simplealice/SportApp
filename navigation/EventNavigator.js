import React from 'react'
import EventsScreen from '../screens/EventsScreen';
import EventPage from '../screens/EventPage';
import SignSeminarPage from '../screens/SignSeminarPage';
import SignCompetitionPage from '../screens/SignCompetitionPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const EventStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventsScreen} options={{ header: () => null }} />
      <Stack.Screen name="Event" component={EventPage} options={{ header: () => null }} />
      <Stack.Screen name="SignInSeminar" component={SignSeminarPage} options={{ header: () => null }} />
      <Stack.Screen name="SignInCompetition" component={SignCompetitionPage} options={{ header: () => null }} />
    </Stack.Navigator>
  )
}

export default EventStackNavigator