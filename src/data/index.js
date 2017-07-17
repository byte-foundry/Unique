import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import font from './font';

export default combineReducers({
  routing: routerReducer,
  font,
});
