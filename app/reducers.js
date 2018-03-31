import { combineReducers } from 'redux';

import appReducer from './containers/App/reducer';

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
