import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import store from './app/store';
import Home from './app/containers/App';
import DetailsPage from './app/components/DetailsPage';

const Navigator = StackNavigator({
  Home: {
    screen: Home,
  },
  DetailsPage: {
    screen: DetailsPage,
  },
});

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
