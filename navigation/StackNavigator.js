import React from 'react'
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
import AboutScreen from '../screens/AboutScreen';
import CoachesScreen from '../screens/CoachesScreen';
import PrizesScreen from '../screens/PrizesScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SignSeminarPage from '../screens/SignSeminarPage';
import SignCompetitionPage from '../screens/SignCompetitionPage';
import EditUsersScreen from '../screens/editor_screens/EditUsersScreen';
import EditUserPage from '../screens/editor_screens/EditUserPage';
import AddUserPage from '../screens/editor_screens/AddUserPage';
import EditNewsScreen from '../screens/editor_screens/EditNewsScreen';
import AddNewsPage from '../screens/editor_screens/AddNewsPage';
import EditNewsPage from '../screens/editor_screens/EditNewsPage';
import SplashScreen from './SplashScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Splash") {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      {!global.splashed ? <Stack.Screen name="Splash" component={SplashScreen} options={{ header: () => null }} /> : <></>}
      <Stack.Screen name="Main" component={MainScreen} options={{ header: () => null }} />
      <Stack.Screen name="Seminars" component={SeminarsScreen} options={{ header: () => null }} />
      <Stack.Screen name="Seminar" component={SeminarPage} options={{ header: () => null }} />
      <Stack.Screen name="Competitions" component={CompetitionsScreen} options={{ header: () => null }} />
      <Stack.Screen name="Competition" component={CompetitionPage} options={{ header: () => null }} />
      <Stack.Screen name="News" component={NewsScreen} options={{ header: () => null }} />
      <Stack.Screen name="Newsone" component={NewsPage} options={{ header: () => null }} />
      <Stack.Screen name="Events" component={EventsScreen} options={{ header: () => null }} />
      <Stack.Screen name="Event" component={EventPage} options={{ header: () => null }} />
      <Stack.Screen name="Trial" component={TrialPage} options={{ header: () => null }} />
      <Stack.Screen name="Galery" component={GaleryScreen} options={{ header: () => null }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ header: () => null }} />
      <Stack.Screen name="Coaches" component={CoachesScreen} options={{ header: () => null }} />
      <Stack.Screen name="Prizes" component={PrizesScreen} options={{ header: () => null }} />
      <Stack.Screen name="Contacts" component={ContactsScreen} options={{ header: () => null }} />
      <Stack.Screen name="SignInSeminar" component={SignSeminarPage} options={{ header: () => null }} />
      <Stack.Screen name="SignInCompetition" component={SignCompetitionPage} options={{ header: () => null }} />
      <Stack.Screen name="EditUsersScreen" component={EditUsersScreen} options={{ header: () => null }} />
      <Stack.Screen name="EditUserPage" component={EditUserPage} options={{ header: () => null }} />
      <Stack.Screen name="AddUserPage" component={AddUserPage} options={{ header: () => null }} />
      <Stack.Screen name="EditNewsScreen" component={EditNewsScreen} options={{ header: () => null }} />
      <Stack.Screen name="AddNewsPage" component={AddNewsPage} options={{ header: () => null }} />
      <Stack.Screen name="EditNewsPage" component={EditNewsPage} options={{ header: () => null }} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator