import Ptypo, { templateNames } from 'prototypo-library';
import { push } from 'react-router-redux';

export const CREATE_REQUESTED = 'font/CREATE_REQUESTED';
export const CREATE = 'font/CREATE';
export const IMPORT_PRESETS_REQUESTED = 'font/IMPORT_PRESETS_REQUESTED';
export const IMPORT_PRESETS = 'font/IMPORT_PRESETS';
export const LOAD_PRESETS_REQUESTED = 'font/LOAD_PRESETS_REQUESTED';
export const LOAD_PRESETS = 'font/LOAD_PRESETS';
export const SELECT_FONT = 'font/SELECT_FONT';
export const DEFINE_NEED = 'font/DEFINE_NEED';
export const STEP_FORWARD = 'font/STEP_FORWARD';
export const STEP_BACKWARD = 'font/STEP_BACKWARD';
export const CHANGE_STEP = 'font/CHANGE_STEP';
export const CHANGE_PARAMS_REQUESTED = 'font/CHANGE_PARAMS_REQUESTED';
export const CHANGE_PARAMS = 'font/CHANGE_PARAMS';
export const RESET_PARAMS_REQUESTED = 'font/RESET_PARAMS_REQUESTED';
export const RESET_PARAMS = 'font/RESET_PARAMS';

const initialState = {
  font: {},
  initialValues: {},
  presets: [],
  currentPreset: {},
  step: 0,
  isLoading: false,
  stepBaseValues: {},
  choicesMade: [],
  need: '',
};

const prototypoFontFactory = new Ptypo();

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRESETS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_PRESETS:
      return {
        ...state,
        isLoading: false,
        presets: action.presets,
      };

    case CREATE_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE:
      return {
        ...state,
        font: action.font,
        currentPreset: action.selectedFont,
        step: 1,
        initialValues: action.initialValues,
        isLoading: false,
        stepBaseValues: action.stepBaseValues,
      };

    case DEFINE_NEED:
      return {
        ...state,
        need: action.need,
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
        currentPreset: action.selectedFont,
        step: 1,
        initialValues: action.initialValues,
        isLoading: false,
        stepBaseValues: action.stepBaseValues,
      };

    case CHANGE_PARAMS_REQUESTED:
      return {
        ...state,
      };

    case CHANGE_PARAMS:
      return {
        ...state,
        font: action.font,
        currentParams: {
          ...state.currentParams,
          ...action.savedParams,
        },
        choicesMade: action.choicesMade,
      };

    case RESET_PARAMS_REQUESTED:
      return {
        ...state,
      };

    case RESET_PARAMS:
      return {
        ...state,
        font: action.font,
      };
    case STEP_FORWARD:
      return {
        ...state,
        step: action.step,
        stepBaseValues: action.stepBaseValues,
        font: action.font,
      };
    case STEP_BACKWARD:
      return {
        ...state,
        step: action.step,
        stepBaseValues: action.stepBaseValues,
        font: action.font,
      };
    case CHANGE_STEP:
      return {
        ...state,
        step: action.step,
        stepBaseValues: action.stepBaseValues,
        font: action.font,
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
      createdFont.changeParams(font.baseValues);
      dispatch({
        type: CREATE,
        font: createdFont,
        selectedFont: font,
        initialValues: { ...font.baseValues },
        stepBaseValues: { ...font.baseValues },
      });
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

export const loadPresets = () => (dispatch, getState) => {
  dispatch({
    type: LOAD_PRESETS_REQUESTED,
  });
  const { presets } = getState().font;
  const promiseArray = [];
  presets.forEach((preset, index) => {
    promiseArray.push(new Promise((resolve) => {
      prototypoFontFactory.createFont(`${preset.preset}${preset.variant}`, templateNames[preset.template.toUpperCase()]).then(
        (createdFont) => {
          createdFont.changeParams(preset.baseValues);
          resolve(true);
          presets[index].font = createdFont;
        });
    }));
  });
  Promise.all(promiseArray).then(() => {
    dispatch({
      type: LOAD_PRESETS,
      presets,
    });
    dispatch(push('/select'));
  });
};


export const selectFont = font => (dispatch) => {
  dispatch({
    type: SELECT_FONT,
    font: font.font,
    selectedFont: font,
    initialValues: { ...font.baseValues },
    stepBaseValues: { ...font.baseValues },
  });
  dispatch(push('/customize'));
};

export const defineNeed = need => (dispatch) => {
  dispatch({
    type: DEFINE_NEED,
    need,
  });
  dispatch(loadPresets());
};

export const stepForward = () => (dispatch, getState) => {
  let { step } = getState().font;
  const { currentPreset, font, choicesMade, initialValues } = getState().font;
  if (step === currentPreset.steps.length) {
    dispatch(push('/final'));
  } else {
    step += 1;
    if (choicesMade[step] && Object.keys(choicesMade[step]).length > 0) {
      const valuesToReset = {};
      Object.keys(choicesMade[step]).forEach((key) => {
        valuesToReset[key] = initialValues[key];
      });
      font.changeParams(valuesToReset);
    }
    dispatch({
      type: STEP_FORWARD,
      step,
      font,
      stepBaseValues: { ...font.values },
    });
  }
};


export const stepBackward = () => (dispatch, getState) => {
  let { step } = getState().font;
  const { font, choicesMade, initialValues } = getState().font;
  step -= 1;
  if (choicesMade[step] && Object.keys(choicesMade[step]).length > 0) {
    const valuesToReset = {};
    Object.keys(choicesMade[step]).forEach((key) => {
      valuesToReset[key] = initialValues[key];
    });
    font.changeParams(valuesToReset);
  }
  dispatch({
    type: STEP_BACKWARD,
    step,
    font,
    stepBaseValues: { ...font.values },
  });
  if (step === 0) {
    dispatch(push('/'));
  }
};

export const goToStep = step => (dispatch, getState) => {
  const { font, choicesMade, initialValues } = getState().font;
  if (choicesMade[step] && Object.keys(choicesMade[step]).length > 0) {
    const valuesToReset = {};
    Object.keys(choicesMade[step]).forEach((key) => {
      valuesToReset[key] = initialValues[key];
    });
    font.changeParams(valuesToReset);
  }
  dispatch({
    type: CHANGE_STEP,
    step,
    font,
    stepBaseValues: { ...font.values },
  });
};

export const resetValues = () => (dispatch, getState) => {
  const { font, stepBaseValues } = getState().font;
  dispatch({
    type: RESET_PARAMS_REQUESTED,
  });
  font.changeParams(stepBaseValues);
  dispatch({
    type: RESET_PARAMS,
    font,
  });
};

export const changeParams = (choice, saveChanges) => (dispatch, getState) => {
  const { font, choicesMade, step } = getState().font;
  dispatch({
    type: CHANGE_PARAMS_REQUESTED,
    params: choice.values,
  });
  font.changeParams(choice.values);
  if (saveChanges) {
    choicesMade[step] = choice.values;
    dispatch({
      type: CHANGE_PARAMS,
      font,
      savedParams: choice.values,
      choicesMade,
    });
    dispatch(stepForward());
  } else {
    dispatch({
      type: CHANGE_PARAMS,
      font,
      savedParams: {},
      choicesMade,
    });
  }
};
