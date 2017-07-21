import Ptypo, { templateNames } from 'prototypo-library';

export const CREATE_REQUESTED = 'font/CREATE_REQUESTED';
export const CREATE = 'font/CREATE';
export const CHANGE_PARAMS_REQUESTED = 'font/CHANGE_PARAMS_REQUESTED';
export const CHANGE_PARAMS = 'font/CHANGE_PARAMS';
export const RESET_PARAMS_REQUESTED = 'font/RESET_PARAMS_REQUESTED';
export const RESET_PARAMS = 'font/RESET_PARAMS';

const initialState = {
  font: {},
  currentParams: {},
  isCreating: false,
};

const prototypoFontFactory = new Ptypo();

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUESTED:
      return {
        ...state,
        isCreating: true,
      };

    case CREATE:
      return {
        ...state,
        font: action.font,
        currentParams: action.values,
      };

    case CHANGE_PARAMS_REQUESTED:
      return {
        ...state,
      };

    case CHANGE_PARAMS:
      return {
        ...state,
        currentParams: action.newParams ? action.newParams : state.currentParams,
      };

    case RESET_PARAMS_REQUESTED:
      return {
        ...state,
      };

    case RESET_PARAMS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const createFont = fontName => (dispatch) => {
  dispatch({
    type: CREATE_REQUESTED,
  });
  prototypoFontFactory.createFont('peasy', templateNames[fontName]).then(
    font => dispatch({ type: CREATE, font, values: { ...font.values } },
  ));
};

export const resetValues = () => (dispatch, getState) => {
  const { font, currentParams } = getState().font;
  dispatch({
    type: RESET_PARAMS_REQUESTED,
  });
  font.changeParams(currentParams);
  dispatch({
    type: RESET_PARAMS,
  });
};

export const changeParams = (choices, saveChanges = true) => (dispatch, getState) => {
  const { font } = getState().font;
  dispatch({
    type: CHANGE_PARAMS_REQUESTED,
  });
  font.changeParams(choices);
  dispatch({
    type: CHANGE_PARAMS,
    newParams: saveChanges ? choices : undefined,
  });
};
