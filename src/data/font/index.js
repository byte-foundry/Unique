import Ptypo, { templateNames } from 'prototypo-library';

export const CREATE_REQUESTED = 'font/CREATE_REQUESTED';
export const CREATE = 'font/CREATE';
export const IMPORT_PRESETS_REQUESTED = 'font/IMPORT_PRESETS_REQUESTED';
export const IMPORT_PRESETS = 'font/IMPORT_PRESETS';
export const SELECT_FONT = 'font/SELECT_FONT';
export const CHANGE_PARAMS_REQUESTED = 'font/CHANGE_PARAMS_REQUESTED';
export const CHANGE_PARAMS = 'font/CHANGE_PARAMS';
export const RESET_PARAMS_REQUESTED = 'font/RESET_PARAMS_REQUESTED';
export const RESET_PARAMS = 'font/RESET_PARAMS';

const initialState = {
  font: {},
  currentParams: {},
  presets: [],
  currentPreset: {},
  step: 0,
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
        currentPreset: action.selectedFont,
        step: 1,
        currentParams: action.values,
      };

    case IMPORT_PRESETS_REQUESTED:
      return {
        ...state,
        isCreating: true,
      };

    case IMPORT_PRESETS:
      return {
        ...state,
        presets: action.presetsArray,
      };

    case SELECT_FONT:
      return {
        ...state,
        font: action.font,
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

export const createFont = font => (dispatch) => {
  dispatch({
    type: CREATE_REQUESTED,
  });
  prototypoFontFactory.createFont('peasy', templateNames[font.template.toUpperCase()]).then(
    createdFont => dispatch({ type: CREATE, font: createdFont, selectedFont: font, values: { ...font.values } },
  ));
};

export const importPresets = presets => (dispatch) => {
  dispatch({
    type: IMPORT_PRESETS_REQUESTED,
  });
  const presetsArray = [];
  Object.keys(presets).forEach((key) => {
    presetsArray.push(presets[key]);
  });
  dispatch({
    type: IMPORT_PRESETS,
    presetsArray,
  });
};

export const selectFont = font => dispatch => dispatch({ type: SELECT_FONT, font });

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
