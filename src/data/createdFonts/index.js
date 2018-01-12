import Ptypo from 'prototypo-library';

export const STORE_CREATED_FONT = 'createdFonts/STORE_CREATED_FONT';
export const DELETE_CREATED_FONT = 'createdFonts/DELETE_CREATED_FONT';
export const SET_PROTOTYPO_LOADED = 'createdFonts/SET_PROTOTYPO_LOADED';
export const SET_PROTOTYPO_LOADING = 'createdFonts/SET_PROTOTYPO_LOADING';
const initialState = {
  fonts: {},
  isPrototypoLoaded: false,
  isPrototypoLoading: false,
  prototypoFontFactory: undefined,
  prototypoLoadingPromise: undefined,
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
      };
    default:
      return state;
  }
};

export const storeCreatedFont = (createdFont, fontName) => (dispatch, getState) => {
  const { fonts } = getState().createdFonts;
  console.log(`> Created ${fontName}`);
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
  console.log(`> Deleted ${fontName}`);
  delete fonts[fontName];
  dispatch({
    type: DELETE_CREATED_FONT,
    fonts,
  });
};

export const createPrototypoFactory = () => (dispatch, getState) => {
  const {
    isPrototypoLoaded,
    isPrototypoLoading,
    prototypoFontFactory,
    prototypoLoadingPromise,
  } = getState().createdFonts;

  if (isPrototypoLoaded) {
    console.log('> Prototypo factory already loaded')
    return new Promise(resolve => resolve(prototypoFontFactory));
  } else if (isPrototypoLoading) {
    console.log('> Prototypo factory already creating, please wait....')
    return prototypoLoadingPromise;
  }
  console.log('> Creating Prototypo factory....');
  const createdPrototypoLoadingPromise = new Promise((resolve) => {
    const createdPrototypoFontFactory = new Ptypo('b1f4fb23-7784-456e-840b-f37f5a647b1c');
    dispatch({
      type: SET_PROTOTYPO_LOADED,
      prototypoFontFactory: createdPrototypoFontFactory,
    });
    resolve(createdPrototypoFontFactory);
    // createdPrototypoFontFactory.init().then(() => {
    //   console.log('> Prototypo factory created !');
    //   dispatch({
    //     type: SET_PROTOTYPO_LOADED,
    //     prototypoFontFactory: createdPrototypoFontFactory,
    //   });
    //   resolve(createdPrototypoFontFactory);
    // });
  });
  dispatch({
    type: SET_PROTOTYPO_LOADING,
    prototypoLoadingPromise: createdPrototypoLoadingPromise,
  });
  return createdPrototypoLoadingPromise;
};

