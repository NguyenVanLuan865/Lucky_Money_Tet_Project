import * as React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { OnBoard } from '../container';
import { TabNavigator } from './TabNavigator';
const Stack = createSharedElementStackNavigator();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Onboard" component={OnBoard}  options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};