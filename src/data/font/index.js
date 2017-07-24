import Ptypo, { templateNames } from 'prototypo-library';
import { push } from 'react-router-redux';

export const CREATE_REQUESTED = 'font/CREATE_REQUESTED';
export const CREATE = 'font/CREATE';
export const IMPORT_PRESETS_REQUESTED = 'font/IMPORT_PRESETS_REQUESTED';
export const IMPORT_PRESETS = 'font/IMPORT_PRESETS';
export const SELECT_FONT = 'font/SELECT_FONT';
export const STEP_FORWARD = 'font/STEP_FORWARD';
export const STEP_BACKWARD = 'font/STEP_BACKWARD';
export const CHANGE_STEP = 'font/CHANGE_STEP';
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
        isCreating: false,
      };

    case IMPORT_PRESETS_REQUESTED:
      return {
        ...state,
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
    case STEP_FORWARD:
      return {
        ...state,
        step: action.step,
      };
    case STEP_BACKWARD:
      return {
        ...state,
        step: action.step,
      };
    case CHANGE_STEP:
      return {
        ...state,
        step: action.step,
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
    (createdFont) => {
      dispatch({ type: CREATE, font: createdFont, selectedFont: font, values: { ...font.values } });
      dispatch(push('/customize'));
    });
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

export const stepForward = () => (dispatch, getState) => {
  let { step } = getState().font;
  const { currentPreset } = getState().font;
  step += 1;
  dispatch({ type: STEP_FORWARD, step });
  if (step - 1 === currentPreset.steps.lenth) {
    dispatch(push('/final'));
  }
};


export const stepBackward = () => (dispatch, getState) => {
  let { step } = getState().font;
  step -= 1;
  dispatch({ type: STEP_BACKWARD, step });
  if (step === 0) {
    dispatch(push('/'));
  }
};

export const goToStep = step => (dispatch) => {
  dispatch({ type: CHANGE_STEP, step });
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

export const changeParams = (choice, saveChanges) => (dispatch, getState) => {
  const { font, step, currentPreset } = getState().font;
  dispatch({
    type: CHANGE_PARAMS_REQUESTED,
  });
  font.changeParams(choice);
  dispatch({
    type: CHANGE_PARAMS,
    newParams: saveChanges ? choice : undefined,
  });
  if (step === currentPreset.steps.lenth) {
    dispatch(push('/final'));
  } else {
    stepForward();
  }
};
