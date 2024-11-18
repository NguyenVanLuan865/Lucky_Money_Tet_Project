import * as React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { AuthorizedStoryboardParamList } from '../storyboard';

import { Onboard } from '../container/authorized/OnBoard/onboard.view';
import { PoppupHealth } from '../container/authorized/Poppup_Health/PoppupHealth.view';
import { TabNavigator } from './TabNavigator';
const Stack = createSharedElementStackNavigator();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="PoppupHealth" component={PoppupHealth}  options={{ headerShown: false }} />
      <Stack.Screen name="Onboard" component={Onboard}  options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};