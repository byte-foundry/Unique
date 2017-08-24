import Ptypo, { templateNames } from 'prototypo-library';
import saveAs from 'save-as';
import { push } from 'react-router-redux';
import { request } from 'graphql-request';
import { loadPresets } from '../presets';
import { setUnstable, setStable } from '../ui';
import { storeChosenWord } from '../user';
import { DEFAULT_UI_WORD } from '../constants';
import { GRAPHQL_API } from '../constants';
import { getSelectedCount, updateSelectedCount, getPresetExportedCount, updatePresetExportedCount } from '../queries';

export const CREATE_REQUESTED = 'font/CREATE_REQUESTED';
export const CREATE = 'font/CREATE';
export const SELECT_FONT_REQUESTED = 'font/SELECT_FONT_REQUESTED';
export const SELECT_FONT = 'font/SELECT_FONT';
export const DEFINE_NEED = 'font/DEFINE_NEED';
export const CHANGE_STEP = 'font/CHANGE_STEP';
export const UPDATE_VALUES = 'font/UPDATE_VALUES';
export const SELECT_CHOICE_REQUESTED = 'font/SELECT_CHOICE_REQUESTED';
export const SELECT_CHOICE = 'font/SELECT_CHOICE';
export const RELOAD_FONTS = 'font/RELOAD_FONTS';

const initialState = {
  font: {},
  initialValues: {},
  currentPreset: {
    font: {},
  },
  step: 0,
  isLoading: false,
  stepBaseValues: {},
  choicesMade: [null],
  choicesFonts: [],
  sliderFont: {},
  currentParams: {},
  need: '',
};

const prototypoFontFactory = new Ptypo();

export default (state = initialState, action) => {
  switch (action.type) {
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

    case SELECT_FONT_REQUESTED:
      return {
        ...state,
        isLoading: true,
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
        choicesMade: [null],
        choicesFonts: action.choicesFonts,
        currentParams: {},
        sliderFont: action.sliderFont,
      };

    case SELECT_CHOICE_REQUESTED:
      return {
        ...state,
      };

    case SELECT_CHOICE:
      return {
        ...state,
        font: action.font,
        currentParams: action.currentParams ? action.currentParams : state.currentParams,
        choicesMade: action.choicesMade,
      };

    case CHANGE_STEP:
      return {
        ...state,
        step: action.step,
      };

    case UPDATE_VALUES:
      return {
        ...state,
        font: action.font,
        choicesFonts: action.choicesFonts,
        sliderFont: action.sliderFont,
      };

    case RELOAD_FONTS:
      return {
        ...state,
        currentPreset: action.currentPreset,
        choicesFonts: action.choicesFonts,
        font: action.font,
        sliderFont: action.sliderFont,
      };

    default:
      return state;
  }
};

export const createFont = font => (dispatch) => {
  dispatch({
    type: CREATE_REQUESTED,
  });
  prototypoFontFactory
    .createFont('peasy', templateNames[font.template.toUpperCase()])
    .then((createdFont) => {
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

export const selectFont = font => (dispatch, getState) => {
  const { choicesFonts = [] } = getState().font;
  const { presets } = getState().presets;
  dispatch({
    type: SELECT_FONT_REQUESTED,
  });
  presets.forEach((preset) => {
    if (preset.font.delete && preset.font.fontName !== font.font.fontName) {
      preset.font.delete();
    }
  });
  choicesFonts.forEach((choiceFont) => {
    if (choiceFont.delete) {
      choiceFont.delete();
    }
  });
  let maxStep = 0;
  font.steps.forEach((step) => {
    if (step.choices.length > maxStep) {
      maxStep = step.choices.length;
    }
  });
  const promiseArray = [];
  for (let i = 0; i < maxStep; i += 1) {
    promiseArray.push(
      new Promise((resolve) => {
        prototypoFontFactory
          .createFont(`choiceFont${i}`, templateNames[font.template.toUpperCase()])
          .then((createdFont) => {
            createdFont.changeParams(font.baseValues);
            createdFont.changeParams(font.steps[0].choices[i].values);
            resolve(true);
            choicesFonts[i] = createdFont;
          });
      }),
    );
  }
  let sliderFont = {};
  promiseArray.push(
      new Promise((resolve) => {
        prototypoFontFactory
          .createFont('sliderFont', templateNames[font.template.toUpperCase()])
          .then((createdFont) => {
            createdFont.changeParams(font.baseValues);
            sliderFont = createdFont;
            resolve(true);
          });
      }),
    );
  Promise.all(promiseArray).then(() => {
    request(GRAPHQL_API, getSelectedCount('Preset', font.id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Preset', font.id, data.Preset.selected + 1)))
      .catch(error => console.log(error));
    dispatch({
      type: SELECT_FONT,
      font: font.font,
      selectedFont: font,
      initialValues: { ...font.baseValues },
      stepBaseValues: { ...font.baseValues },
      choicesFonts,
      sliderFont,
    });
    dispatch(push('/customize'));
    request(GRAPHQL_API, getSelectedCount('Step', font.steps[0].id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Step', font.steps[0].id, data.Step.selected + 1)))
      .catch(error => console.log(error));
  });
};

export const defineNeed = need => (dispatch) => {
  if (need !== 'logo') {
    dispatch(storeChosenWord(DEFAULT_UI_WORD));
  }
  dispatch({
    type: DEFINE_NEED,
    need,
  });
  dispatch(loadPresets());
};

const updateStepValues = (step, font) => (dispatch, getState) => {
  const {
    choicesFonts,
    currentPreset,
    currentParams,
    stepBaseValues,
    choicesMade,
    sliderFont,
  } = getState().font;
  const curFont = font || getState().font.font;
  const stepToUpdate = step || getState().font.step;
  currentPreset.steps[stepToUpdate - 1].choices.forEach((choice, index) => {
    const stepChoices = { ...choice.values };
    if (choicesMade[stepToUpdate]) {
      Object.keys(choicesMade[stepToUpdate]).forEach((key) => {
        if (!stepChoices[key]) {
          stepChoices[key] = currentPreset.baseValues[key];
        }
      });
    }
    choicesFonts[index].changeParams({ ...stepBaseValues, ...currentParams, ...stepChoices });
  });
  sliderFont.changeParams({ ...stepBaseValues, ...currentParams });
  curFont.changeParams({ ...stepBaseValues, ...currentParams });
  request(GRAPHQL_API, getSelectedCount('Step', currentPreset.steps[stepToUpdate - 1].id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Step', currentPreset.steps[stepToUpdate - 1].id, data.Step.selected + 1)))
      .catch(error => console.log(error));
  dispatch({
    type: UPDATE_VALUES,
    font: curFont,
    choicesFonts,
    sliderFont,
  });
};

const updateFont = () => (dispatch, getState) => {
  const { font, currentParams, choicesFonts, stepBaseValues, sliderFont } = getState().font;
  font.changeParams({ ...stepBaseValues, ...currentParams });
  sliderFont.changeParams({ ...stepBaseValues, ...currentParams });
  dispatch({
    type: UPDATE_VALUES,
    font,
    choicesFonts,
    sliderFont,
  });
};

export const goToStep = (step, isSpecimen) => (dispatch, getState) => {
  const { currentPreset } = getState().font;
  switch (step) {
    case 0:
      dispatch(push('/'));
      break;
    case currentPreset.steps.length + 1:
      dispatch(updateFont());
      dispatch(push('/specimen'));
      break;
    default:
      dispatch(updateStepValues(step));
      dispatch({
        type: CHANGE_STEP,
        step,
      });
      if (isSpecimen) {
        dispatch(push('/customize'));
      }
      break;
  }
};

export const stepForward = () => (dispatch, getState) => {
  const { font, choicesMade } = getState().font;
  let { step } = getState().font;
  choicesMade[step] = {};
  choicesMade[step].name = 'No choice';
  dispatch({
    type: SELECT_CHOICE,
    font,
    choicesMade,
  });
  dispatch(goToStep((step += 1)));
};

export const stepBack = () => (dispatch, getState) => {
  let { step } = getState().font;
  dispatch(goToStep((step -= 1)));
};

export const selectChoice = choice => (dispatch, getState) => {
  const { font, choicesMade, currentPreset } = getState().font;
  let { step, currentParams } = getState().font;
  dispatch({
    type: SELECT_CHOICE_REQUESTED,
    params: choice.values,
  });
  const paramsToReset = {};
  if (choicesMade[step]) {
    Object.keys(choicesMade[step]).forEach((key) => {
      if (key !== 'name') {
        paramsToReset[key] = currentPreset.baseValues[key];
      }
    });
  }
  currentParams = {
    ...currentParams,
    ...paramsToReset,
    ...choice.values,
  };
  choicesMade[step] = choice.values;
  choicesMade[step].name = choice.name;
  dispatch({
    type: SELECT_CHOICE,
    font,
    currentParams,
    choicesMade,
  });
  dispatch(goToStep((step += 1)));
  request(GRAPHQL_API, getSelectedCount('Choice', choice.id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Choice', choice.id, data.Choice.selected + 1)))
      .catch(error => console.log(error));
};

export const download = () => (dispatch, getState) => {
  const { font } = getState().font;
  font.getArrayBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/x-font-opentype' });
    saveAs(blob, `${font.fontName}.otf`);
  });
  request(GRAPHQL_API, getPresetExportedCount(font.id))
      .then(data => request(GRAPHQL_API, updateSelectedCount(font.id, data.Preset.exported + 1)))
      .catch(error => console.log(error));
};

export const updateSliderFont = (newParams) => (dispatch, getState) => {
  const { sliderFont } = getState().font;
  sliderFont.changeParam(newParams.name, parseFloat(newParams.value));
};

export const reloadFonts = () => (dispatch, getState) => {
  dispatch(setUnstable());

  const { currentPreset, currentParams, baseValues, step } = getState().font;
  // create userFont
  prototypoFontFactory
    .createFont(`${currentPreset.preset}${currentPreset.variant}`, templateNames[currentPreset.template.toUpperCase()])
    .then((createdFont) => {
      createdFont.changeParams({ ...baseValues, ...currentParams });
      currentPreset.font = createdFont;
    });
  // create choiceFonts
  const choicesFonts = [];
  let maxStep = 0;
  currentPreset.steps.forEach((s) => {
    if (s.choices.length > maxStep) {
      maxStep = s.choices.length;
    }
  });
  const promiseArray = [];
  for (let i = 0; i < maxStep; i += 1) {
    promiseArray.push(
      new Promise((resolve) => {
        prototypoFontFactory
          .createFont(`choiceFont${i}`, templateNames[currentPreset.template.toUpperCase()])
          .then((createdFont) => {
            createdFont.changeParams({
              ...baseValues,
              ...currentParams,
              ...currentPreset.steps[step - 1].choices[i].values,
            });
            choicesFonts[i] = createdFont;
            resolve(true);
          });
      }),
    );
  }
  let sliderFont = {};
  promiseArray.push(
      new Promise((resolve) => {
        prototypoFontFactory
          .createFont('sliderFont', templateNames[currentPreset.template.toUpperCase()])
          .then((createdFont) => {
            createdFont.changeParams({
              ...baseValues,
              ...currentParams,
            });
            sliderFont = createdFont;
            resolve(true);
          });
      }),
    );
  Promise.all(promiseArray).then(() => {
    dispatch({
      type: RELOAD_FONTS,
      choicesFonts,
      currentPreset,
      font: currentPreset.font,
      sliderFont,
    });
    dispatch(updateStepValues(step, currentPreset.font));
    dispatch(setStable());
  });
};
