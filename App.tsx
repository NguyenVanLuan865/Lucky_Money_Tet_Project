<<<<<<< HEAD
import 'reflect-metadata';
import * as React from 'react';
import { RootNavigator } from './src/presentation';
import 'reflect-metadata';
import './src/di/AppModule';
import './src/core/config/firebaseConfig';
import { Provider } from 'react-redux';
import store from './src/presentation/shared-state/redux/store.ts'


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>

  );
};

export default App;

=======
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
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
