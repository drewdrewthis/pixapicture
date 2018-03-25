import { combineReducers } from 'redux';

import appReducer from './containers/App/reducer';

const rootReducer = combineReducers({
  appReducer: appReducer
})

export default rootReducer;
