import Ptypo from 'prototypo-library';

import { TEMPLATE_URL } from '../constants.js';

export const STORE_CREATED_FONT = 'createdFonts/STORE_CREATED_FONT';
export const DELETE_CREATED_FONT = 'createdFonts/DELETE_CREATED_FONT';
export const SET_PROTOTYPO_LOADED = 'createdFonts/SET_PROTOTYPO_LOADED';
export const SET_PROTOTYPO_LOADING = 'createdFonts/SET_PROTOTYPO_LOADING';
export const SET_TEMPLATE_DOWN = 'createdFonts/SET_TEMPLATE_DOWN';
const initialState = {
  fonts: {},
  isPrototypoLoaded: false,
  isPrototypoLoading: false,
  prototypoFontFactory: undefined,
  prototypoLoadingPromise: undefined,
  templateDown: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_CREATED_FONT:
      return {
        ...state,
        fonts: action.fonts,
      };
    case DELETE_CREATED_FONT:
      return {
        ...state,
        fonts: action.fonts,
      };
    case SET_PROTOTYPO_LOADED:
      return {
        ...state,
        isPrototypoLoaded: true,
        isPrototypoLoading: false,
        prototypoFontFactory: action.prototypoFontFactory,
      };
    case SET_PROTOTYPO_LOADING:
      return {
        ...state,
        isPrototypoLoading: true,
        prototypoLoadingPromise: action.prototypoLoadingPromise,
        templateDown: false,
      };
    case SET_TEMPLATE_DOWN:
      return {
        ...state,
        templateDown: true,
      };
    default:
      return state;
  }
};

export const storeCreatedFont = (createdFont, fontName) => (dispatch, getState) => {
  const { fonts } = getState().createdFonts;
  dispatch({
    type: STORE_CREATED_FONT,
    fonts: {
      ...fonts,
      [fontName]: createdFont,
    },
  });
};

export const deleteCreatedFont = fontName => (dispatch, getState) => {
  const { fonts } = getState().createdFonts;
  delete fonts[fontName];
  dispatch({
    type: DELETE_CREATED_FONT,
    fonts,
  });
};

let initTries = 0;

function initFontFactory(prototypoFontFactory, resolve, dispatch) {
  prototypoFontFactory.init(undefined, undefined, TEMPLATE_URL).then(() => {
    dispatch({
      type: SET_PROTOTYPO_LOADED,
      prototypoFontFactory,
    });
    resolve(prototypoFontFactory);
    initTries = 0;
  }).catch(() => {
    /* global Intercom */
    /* global fbq */
    /* global ga */
    try {
      Intercom('trackEvent', 'unique-error-loadtemplate');
      ga('send', 'event', 'Errors', 'Library', 'LoadTemplates');
    } catch (e) {}
    if (initTries < 3) {
      initTries++;
      initFontFactory(prototypoFontFactory, resolve, dispatch);
    } else {
      console.log('templates are down');
      initTries = 0;
      dispatch({
        type: SET_TEMPLATE_DOWN,
      });
    }
  });
}

export const createPrototypoFactory = () => (dispatch, getState) => {
  const {
    isPrototypoLoaded,
    isPrototypoLoading,
    prototypoFontFactory,
    prototypoLoadingPromise,
  } = getState().createdFonts;

  if (isPrototypoLoaded) {
    return new Promise(resolve => resolve(prototypoFontFactory));
  } else if (isPrototypoLoading) {
    return prototypoLoadingPromise;
  }
  const createdPrototypoFontFactory = new Ptypo('b1f4fb23-7784-456e-840b-f37f5a647b1c');
  const createdPrototypoLoadingPromise = new Promise((resolve) => {
    initFontFactory(createdPrototypoFontFactory, resolve, dispatch);
  });
  dispatch({
    type: SET_PROTOTYPO_LOADING,
    prototypoLoadingPromise: createdPrototypoLoadingPromise,
  });
  return createdPrototypoLoadingPromise;
};

