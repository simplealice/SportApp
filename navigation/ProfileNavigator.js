import React from 'react'
import EditUsersScreen from '../screens/editor_screens/EditUsersScreen';
import EditUserPage from '../screens/editor_screens/EditUserPage';
import AddUserPage from '../screens/editor_screens/AddUserPage';
import EditNewsScreen from '../screens/editor_screens/EditNewsScreen';
import AddNewsPage from '../screens/editor_screens/AddNewsPage';
import EditNewsPage from '../screens/editor_screens/EditNewsPage';
import AuthScreen from '../screens/AuthScreen';
import IndividualPage from '../screens/IndividualPage';
import EditEventsScreen from '../screens/editor_screens/EditEventsScreen';
import AddEventPage from '../screens/editor_screens/AddEventPage';
import EditEventPage from '../screens/editor_screens/EditEventPage';
import EditCurriculumScreen from '../screens/editor_screens/EditCurriculumScreen';
import EditCurriculumPage from '../screens/editor_screens/EditCurriculumPage'
import EditCoachesScreen from '../screens/editor_screens/EditCoachesScreen';
import EditCoachPage from '../screens/editor_screens/EditCoachPage';
import AddCoachPage from '../screens/editor_screens/AddCoachPage';
import EditClubInfoPage from '../screens/editor_screens/EditClubInfoPage';
import ChatScreen from '../screens/ChatScreen';
import ChatPage from '../screens/ChatPage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={AuthScreen} options={{ header: () => null }} />
            <Stack.Screen name="IndividualPage" component={IndividualPage} options={{ header: () => null }} />
            <Stack.Screen name="EditUsersScreen" component={EditUsersScreen} options={{ header: () => null }} />
            <Stack.Screen name="EditUserPage" component={EditUserPage} options={{ header: () => null }} />
            <Stack.Screen name="AddUserPage" component={AddUserPage} options={{ header: () => null }} />
            <Stack.Screen name="EditNewsScreen" component={EditNewsScreen} options={{ header: () => null }} />
            <Stack.Screen name="AddNewsPage" component={AddNewsPage} options={{ header: () => null }} />
            <Stack.Screen name="EditNewsPage" component={EditNewsPage} options={{ header: () => null }} />
            <Stack.Screen name="EditEventsScreen" component={EditEventsScreen} options={{ header: () => null }} />
            <Stack.Screen name="AddEventPage" component={AddEventPage} options={{ header: () => null }} />
            <Stack.Screen name="EditEventPage" component={EditEventPage} options={{ header: () => null }} />
            <Stack.Screen name="EditCurriculumScreen" component={EditCurriculumScreen} options={{ header: () => null }} />
            <Stack.Screen name="EditCurriculumPage" component={EditCurriculumPage} options={{ header: () => null }} />
            <Stack.Screen name="AddCoachPage" component={AddCoachPage} options={{ header: () => null }} />
            <Stack.Screen name="EditCoachesScreen" component={EditCoachesScreen} options={{ header: () => null }} />
            <Stack.Screen name="EditCoachPage" component={EditCoachPage} options={{ header: () => null }} />
            <Stack.Screen name="EditClubInfoPage" component={EditClubInfoPage} options={{ header: () => null }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ header: () => null }} />
            <Stack.Screen name="ChatPage" component={ChatPage} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator