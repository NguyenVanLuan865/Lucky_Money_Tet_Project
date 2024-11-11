import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Thay đổi import thành '@react-navigation/native-stack'
import { AuthorizedNavigator } from './src/presentation/navigation/AuthorizedStack';
import { enableScreens } from 'react-native-screens';
import { RootNavigator } from './src/presentation';

const Stack = createNativeStackNavigator();
enableScreens();

const App: React.FC = () => { 
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{ headerShown: false,}}>
    //     <Stack.Screen
    //       component={AuthorizedNavigator}
    //       name="AuthorizedNavigator"
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <RootNavigator />
  );
};

export default App; 
