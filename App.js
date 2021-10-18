/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainContainer from './navigation/MainContainer';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
