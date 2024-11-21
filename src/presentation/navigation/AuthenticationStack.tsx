import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStoryboardParamList} from '../storyboard';
import SignIn from '../container/authentication/sign-in'
import resgiter from '../container/authentication/register';

const Stack = createStackNavigator<AuthenticationStoryboardParamList>();

export const AuthenticationNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={resgiter} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};