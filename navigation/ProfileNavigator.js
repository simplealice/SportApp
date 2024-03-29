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
import EditCoachesScreen from '../screens/editor_screens/EditCoachesScreen';
import EditCoachPage from '../screens/editor_screens/EditCoachPage';
import AddCoachPage from '../screens/editor_screens/AddCoachPage';
import EditClubInfoPage from '../screens/editor_screens/EditClubInfoPage';
import ChatScreen from '../screens/ChatScreen';
import ChatPage from '../screens/ChatPage';
import FeedbackScreen from '../screens/editor_screens/FeedbackScreen';
import FeedbackPage from '../screens/editor_screens/FeedbackPage';
import EditPrizesScreen from '../screens/editor_screens/EditPrizesScreen';
import AddPrizePage from '../screens/editor_screens/AddPrizePage';
import EditPrizePage from '../screens/editor_screens/EditPrizePage';
import EditTimeSignInScreen from '../screens/editor_screens/EditTimeSignInScreen';
import AddTimeSignInPage from '../screens/editor_screens/AddTimeSignInPage';
import SigningIndividualScreen from '../screens/editor_screens/SigningIndividualScreen';
import SigningTrialScreen from '../screens/editor_screens/SigningTrialScreen';
import AddCurriculumPage from '../screens/editor_screens/AddCurriculumPage';

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
            <Stack.Screen name="AddCurriculumPage" component={AddCurriculumPage} options={{ header: () => null }} />
            <Stack.Screen name="EditCurriculumScreen" component={EditCurriculumScreen} options={{ header: () => null }} />
            <Stack.Screen name="AddCoachPage" component={AddCoachPage} options={{ header: () => null }} />
            <Stack.Screen name="EditCoachesScreen" component={EditCoachesScreen} options={{ header: () => null }} />
            <Stack.Screen name="EditCoachPage" component={EditCoachPage} options={{ header: () => null }} />
            <Stack.Screen name="EditClubInfoPage" component={EditClubInfoPage} options={{ header: () => null }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ header: () => null }} />
            <Stack.Screen name="ChatPage" component={ChatPage} options={{ header: () => null }} />
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ header: () => null }} />
            <Stack.Screen name="FeedbackPage" component={FeedbackPage} options={{ header: () => null }} />
            <Stack.Screen name="AddPrizePage" component={AddPrizePage} options={{ header: () => null }} />
            <Stack.Screen name="EditPrizesScreen" component={EditPrizesScreen} options={{ header: () => null }} />
            <Stack.Screen name="EditPrizePage" component={EditPrizePage} options={{ header: () => null }} />
            <Stack.Screen name="EditTimeSignInScreen" component={EditTimeSignInScreen} options={{ header: () => null }} />
            <Stack.Screen name="AddTimeSignInPage" component={AddTimeSignInPage} options={{ header: () => null }} />
            <Stack.Screen name="SigningIndividualScreen" component={SigningIndividualScreen} options={{ header: () => null }} />
            <Stack.Screen name="SigningTrialScreen" component={SigningTrialScreen} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator