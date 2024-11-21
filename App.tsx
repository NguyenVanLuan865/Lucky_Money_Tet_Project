import 'reflect-metadata';
import * as React from 'react';
import { RootNavigator } from './src/presentation';
import 'reflect-metadata';
import './src/di/AppModule';
import './src/core/config/firebaseConfig';
import { Provider } from 'react-redux';
import FullScreenLoadingIndicator from './src/presentation/component/indicator/FullScreenLoadingIndicator.tsx';
import store from './src/presentation/shared-state/redux/store.ts'


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <FullScreenLoadingIndicator/> 
    </Provider>

  );
};

export default App;
