import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './index';

export const history = createHistory();
const namespace = 'peasy';
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), save({
  states: ['font', 'user'],
  namespace,
})];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, load({ namespace }), composedEnhancers);

export default store;
