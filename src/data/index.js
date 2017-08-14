import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import font from './font';
import user from './user';
import presets from './presets';
import ui from './ui';

export default combineReducers({
  routing: routerReducer,
  font,
  user,
  presets,
  ui,
});
