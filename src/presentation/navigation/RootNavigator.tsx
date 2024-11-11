import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { AuthorizedNavigator } from './AuthorizedStack';
import { enableScreens } from 'react-native-screens';

const Stack = createNativeStackNavigator();
enableScreens();
export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, replaceAnimation: 'push' }}>
        <Stack.Screen
          component={AuthorizedNavigator}
          name="AuthorizedNavigator"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
