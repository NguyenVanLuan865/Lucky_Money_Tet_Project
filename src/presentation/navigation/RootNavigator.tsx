import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState, AppDispatch } from '../shared-state';
import { localSignInAsync } from '../shared-state';
import { AuthorizedNavigator } from './AuthorizedStack';
import { AuthenticationNavigator } from './AuthenticationStack';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const isAuthorized = useSelector((state: RootState) => state.authentication.isAuthorized);
  console.log(isAuthorized)


  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(localSignInAsync());
  // }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthorized ? (
          <Stack.Screen name="AuthorizedNavigator" component={AuthorizedNavigator} />
        ) : (
          <Stack.Screen name="AuthenticationNavigator" component={AuthenticationNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
