export const STORE_CREATED_FONT = 'createdFonts/STORE_CREATED_FONT';
export const DELETE_CREATED_FONT = 'createdFonts/DELETE_CREATED_FONT';
const initialState = {
  fonts: {},
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
