import { templateNames } from 'prototypo-library';
import saveAs from 'save-as';
import { push } from 'react-router-redux';
import { request } from 'graphql-request';
import { loadPresets } from '../presets';
import { setUnstable, setStable } from '../ui';
import { storeChosenWord, updateProjectInfos } from '../user';
import { DEFAULT_UI_WORD, GRAPHQL_API } from '../constants';
import { storeCreatedFont, deleteCreatedFont, createPrototypoFactory } from '../createdFonts';
import { getSelectedCount, updateSelectedCount, getSpecialChoiceSelectedCount, getPreset } from '../queries';

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
export const FINISH_EDITING = 'font/FINISH_EDITING';
export const CLEAR_IS_LOADING = 'font/CLEAR_IS_LOADING';
export const LOAD_FONT_DATA = 'font/LOAD_FONT_DATA';
export const ADD_CHOICE_FONT = 'font/ADD_CHOICE_FONT';
export const SET_FONT_BOUGHT = 'font/SET_FONT_BOUGHT'
export const RESET_STEP = 'font/RESET_STEP';

const initialState = {
  fontName: '',
  initialValues: {},
  currentPreset: {
    font: {},
  },
  step: 0,
  isLoading: false,
  stepBaseValues: {},
  choicesMade: [null],
  choicesFontsName: [],
  sliderFontName: '',
  currentParams: {},
  need: '',
  alreadyBought: false,
};

const templates = {
  elzevir: 'ELZEVIR',
  venus: 'GROTESK',
  'john-fell': 'FELL',
  gfnt: 'SPECTRAL',
  antique: 'ANTIQUE',
};



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
        fontName: action.fontName,
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
        fontName: action.fontName,
        currentPreset: action.selectedFont,
        step: 1,
        initialValues: action.initialValues,
        isLoading: false,
        stepBaseValues: action.stepBaseValues,
        choicesMade: [null],
        choicesFontsName: action.choicesFontsName,
        currentParams: {},
        sliderFontName: action.sliderFontName,
      };

    case ADD_CHOICE_FONT:
      return {
        ...state,
        choicesFontsName: action.choicesFontsName,
      };

    case SET_FONT_BOUGHT:
      return {
        ...state,
        alreadyBought: true,
      };

    case SELECT_CHOICE_REQUESTED:
      return {
        ...state,
      };

    case FINISH_EDITING:
      return {
        ...state,
        step: action.step,
        choicesMade: action.choicesMade,
      };

    case SELECT_CHOICE:
      return {
        ...state,
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
      };

    case CLEAR_IS_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case RELOAD_FONTS:
      return {
        ...state,
        currentPreset: action.currentPreset,
        choicesFontsName: action.choicesFontsName,
        fontName: action.fontName,
        step: action.step,
        sliderFontName: action.sliderFontName,
      };

    case LOAD_FONT_DATA:
      return {
        ...state,
        currentPreset: action.currentPreset,
        currentParams: action.currentParams,
        baseValues: action.baseValues,
        step: action.step,
        alreadyBought: action.bought,
      };
    
    case RESET_STEP:
      return {
        ...state,
        currentParams: action.currentParams,
        choicesMade: action.choicesMade,
      };

    default:
      return state;
  }
};

export const createFont = font => (dispatch, getState) => {
  const { chosenWord } = getState().user;
  dispatch({
    type: CREATE_REQUESTED,
  });
  dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
    prototypoFontFactory
    .createFont('peasy', templateNames[templates[font.template]])
    .then((createdFont) => {
      createdFont.changeParams(font.baseValues, chosenWord);
      dispatch(storeCreatedFont(createdFont, 'peasy'));
      dispatch({
        type: CREATE,
        fontName: 'peasy',
        selectedFont: font,
        initialValues: { ...font.baseValues },
        stepBaseValues: { ...font.baseValues },
      });
      dispatch(push('/customize'));
    });
  });
};

export const selectFont = font => (dispatch, getState) => {
  console.log('============SELECT FONT============');
  const { choicesFontsName = [] } = getState().font;
  const { loadedPresetsName } = getState().presets;
  const { chosenWord } = getState().user;
  dispatch({
    type: SELECT_FONT_REQUESTED,
  });
  const selectedFontName = `${font.preset}${font.variant}`;
  choicesFontsName.forEach((choiceFont) => {
    dispatch(deleteCreatedFont(choiceFont));
  });
  let maxStep = 0;
  font.steps.forEach((step) => {
    if (step.choices.length > maxStep) {
      maxStep = step.choices.length;
    }
  });
  const promiseArray = [];
  for (let i = 0; i < maxStep; i += 1) {
    console.log(`Creating choiceFont${i} from template ${templateNames[templates[font.template]]}`);
    promiseArray.push(
      new Promise((resolve) => {
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
          .createFont(`choiceFont${i}`, templateNames[templates[font.template]])
          .then((createdFont) => {
            createdFont.changeParams(font.baseValues, chosenWord);
            if (font.steps[0].choices[i]) {
              createdFont.changeParams(font.steps[0].choices[i].values, chosenWord);
            }
            resolve(true);
            console.log(`Changing params for choiceFont${i}`);
            dispatch(storeCreatedFont(createdFont, `choiceFont${i}`));
            choicesFontsName[i] = `choiceFont${i}`;
          });
        });
      }),
    );
  }
  let sliderFontName = '';
  promiseArray.push(
      new Promise((resolve) => {
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
          .createFont('sliderFont', templateNames[templates[font.template]])
          .then((createdFont) => {
            createdFont.changeParams(font.baseValues, chosenWord);
            sliderFontName = 'sliderFont';
            dispatch(storeCreatedFont(createdFont, 'sliderFont'));
            resolve(true);
          });
        });
      }),
    );
  Promise.all(promiseArray).then(() => {
    request(GRAPHQL_API, getSelectedCount('Preset', font.id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Preset', font.id, data.Preset.selected + 1)))
      .catch(error => console.log(error));    
    dispatch(push('/customize'));
    dispatch({
      type: SELECT_FONT,
      fontName: selectedFontName,
      selectedFont: font,
      initialValues: { ...font.baseValues },
      stepBaseValues: { ...font.baseValues },
      choicesFontsName,
      sliderFontName,
    });
    loadedPresetsName.forEach((preset) => {
      if (preset !== selectedFontName) {
        dispatch(deleteCreatedFont(preset));
      }
    });
    request(GRAPHQL_API, getSelectedCount('Step', font.steps[0].id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Step', font.steps[0].id, data.Step.selected + 1)))
      .catch(error => console.log(error));
  });
  console.log('===============END SELECT FONT===============');  
};

export const defineNeed = need => (dispatch) => {
  if (need !== 'logo') {
    dispatch(storeChosenWord(DEFAULT_UI_WORD));
  }
  dispatch({
    type: DEFINE_NEED,
    need,
  });
  dispatch(updateProjectInfos(undefined, undefined));
  dispatch(loadPresets());
};

export const setFontBought = () => (dispatch) => {
  dispatch({
    type: SET_FONT_BOUGHT,
  });
};

const updateStepValues = (step, font) => (dispatch, getState) => {
  let { chosenWord } = getState().user;
  console.log('========updateStepValues===========');
  const {
    choicesFontsName,
    currentPreset,
    currentParams,
    stepBaseValues,
    choicesMade,
    sliderFontName,
  } = getState().font;
  console.log(choicesFontsName);
  const { fonts } = getState().createdFonts;
  console.log(fonts);
  const curFontName = font || getState().font.fontName;
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
    console.log(fonts[choicesFontsName[index]]);
    if (fonts[choicesFontsName[index]]){
      fonts[choicesFontsName[index]].changeParams(
        { ...stepBaseValues, ...currentParams, ...stepChoices },
        chosenWord,
      );
    } else {
      dispatch(setUnstable());
      dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
        prototypoFontFactory
        .createFont(`choiceFont${index}`, templateNames[templates[getState().font.currentPreset.template]])
        .then((createdFont) => {
          createdFont.changeParams(
            { ...stepBaseValues, ...currentParams, ...stepChoices },
            chosenWord,
          );
          dispatch(storeCreatedFont(createdFont, `choiceFont${index}`));
          choicesFontsName[index] = `choiceFont${index}`;
          dispatch({
            type: ADD_CHOICE_FONT,
            choicesFontsName,
          });
          dispatch(setStable());
        });
      });
    }
  });
  fonts[sliderFontName].changeParams({ ...stepBaseValues, ...currentParams }, chosenWord);
  if (fonts[curFontName] && fonts[curFontName].changeParams) {
    chosenWord = step === currentPreset.steps.length ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!;,;:/1234567890-àéè().&' : chosenWord;
    fonts[curFontName].changeParams({ ...stepBaseValues, ...currentParams }, chosenWord);
  }
  request(GRAPHQL_API, getSelectedCount('Step', currentPreset.steps[stepToUpdate - 1].id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Step', currentPreset.steps[stepToUpdate - 1].id, data.Step.selected + 1)))
      .catch(error => console.log(error));
  dispatch({
    type: UPDATE_VALUES,
  });
  console.log('====================================');
};

export const resetStep = () => (dispatch, getState) => {
  const { stepBaseValues, choicesMade, step, fontName } = getState().font;
  let { currentParams } = getState().font;
  const { chosenWord } = getState().user;
  const { fonts } = getState().createdFonts;
  const paramsToReset = {};
  Object.keys(choicesMade[step]).forEach((key) => {
    if (key !== 'name') {
      paramsToReset[key] = stepBaseValues[key];
    }
  });
  fonts[fontName].changeParams(paramsToReset, chosenWord);
  choicesMade[step] = {
    name: 'No choice',
    values: {},
  };
  console.log(choicesMade)
  currentParams = {
    ...currentParams,
    ...paramsToReset,
  };
  dispatch({
    type: RESET_STEP,
    choicesMade,
    currentParams,
  });
};

const updateFont = (isSpecimen = false) => (dispatch, getState) => {
  let { chosenWord } = getState().user;
  const {
    fontName,
    currentParams,
    stepBaseValues,
    sliderFontName,
    currentPreset,
    step,
  } = getState().font;
  const { fonts } = getState().createdFonts;
  chosenWord = (step === currentPreset.steps.length) || isSpecimen ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!;,;:/1234567890-àéè().&' : chosenWord;
  fonts[fontName].changeParams({ ...stepBaseValues, ...currentParams }, chosenWord);
  fonts[sliderFontName].changeParams({ ...stepBaseValues, ...currentParams }, chosenWord);
  dispatch({
    type: UPDATE_VALUES,
  });
};

export const clearFontIsLoading = () => (dispatch) => {
  dispatch({
    type: CLEAR_IS_LOADING,
  });
};

export const goToStep = (step, isSpecimen) => (dispatch, getState) => {
  const { currentPreset } = getState().font;
  switch (step) {
    case 0:
      dispatch(push('/'));
      break;
    case currentPreset.steps.length + 1:
      dispatch(updateFont(true));
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
  const { choicesMade } = getState().font;
  let { step } = getState().font;
  choicesMade[step] = {};
  choicesMade[step].name = 'No choice';
  dispatch({
    type: SELECT_CHOICE,
    choicesMade,
  });
  dispatch(goToStep((step += 1)));
  request(GRAPHQL_API, getSpecialChoiceSelectedCount('No choice'))
  .then(data => request(GRAPHQL_API, updateSelectedCount('Choice', data.allChoices[0].id, data.allChoices[0].selected + 1)))
  .catch(error => console.log(error));
};

export const stepBack = () => (dispatch, getState) => {
  let { step } = getState().font;
  dispatch(goToStep((step -= 1)));
};

export const selectChoice = choice => (dispatch, getState) => {
  const { choicesMade, currentPreset } = getState().font;
  let { step, currentParams } = getState().font;  
  console.log('===============SELECT CHOICE===================');
  console.log(choice);
  if (!choice || !choice.name) {
    console.log('no choice selected')
    choice = {
      name: 'No choice',
      values: {},
    };
    console.log(choice);
  }  
  console.log('===============================================');
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
  choicesMade[step] = choice.values || {};
  choicesMade[step].name = choice.name;
  dispatch({
    type: SELECT_CHOICE,
    currentParams,
    choicesMade,
  });
  dispatch(goToStep((step += 1)));
  if (choice.name === 'Custom' || choice.name === 'No choice') {
    request(GRAPHQL_API, getSpecialChoiceSelectedCount(choice.name))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Choice', data.allChoices[0].id, data.allChoices[0].selected + 1)))
      .catch(error => console.log(error));
  } else {
    request(GRAPHQL_API, getSelectedCount('Choice', choice.id))
      .then(data => request(GRAPHQL_API, updateSelectedCount('Choice', choice.id, data.Choice.selected + 1)))
      .catch(error => console.log(error));
  }
};

export const finishEditing = () => (dispatch, getState) => {
  const { choicesMade, currentPreset, step } = getState().font;
  const stepLength = currentPreset.steps.length;
  for (let index = step; index < stepLength + 1; index += 1) {
    if (!choicesMade[index]) {
      choicesMade[index] = {};
      choicesMade[index].name = 'No choice';
    }
  }
  request(GRAPHQL_API, getSpecialChoiceSelectedCount('No choice'))
  .then(data => request(GRAPHQL_API, updateSelectedCount('Choice', data.allChoices[0].id, data.allChoices[0].selected + ((stepLength + 1) - step))))
  .catch(error => console.log(error));
  dispatch(updateFont(true));
  dispatch(push('/specimen'));
  dispatch({
    type: FINISH_EDITING,
    step: stepLength,
    choicesMade,
  });
};

export const download = () => (dispatch, getState) => {
  const { fontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[fontName].getArrayBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/x-font-opentype' });
    saveAs(blob, `${fontName}.otf`);
  });
};

export const updateSliderFont = newParams => (dispatch, getState) => {
  const { chosenWord } = getState().user;
  const { sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParam(newParams.name, parseFloat(newParams.value), chosenWord);
};

export const resetSliderFont = () => (dispatch, getState) => {
  const { chosenWord } = getState().user;
  const { currentParams, stepBaseValues, sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParams({ ...stepBaseValues, ...currentParams }, chosenWord);
};

export const reloadFonts = (restart = true) => (dispatch, getState) => {
  dispatch(setUnstable());
  let { chosenWord } = getState().user;
  const { currentPreset, currentParams, baseValues, step } = getState().font;
  let currentStep = step;
  console.log(step)
  console.log(currentPreset.steps.length)
  chosenWord = step === currentPreset.steps.length ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!;,;:/1234567890-àéè().&' : chosenWord;
  // create userFont
  dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
    console.log('...')
    console.log('templateNames')
    console.log(templateNames)
    console.log(currentPreset)
    console.log(templateNames[templates[currentPreset.template]]);    
    prototypoFontFactory
    .createFont(`${currentPreset.preset}${currentPreset.variant}`, templateNames[templates[currentPreset.template]])
    .then((createdFont) => {
      console.log(chosenWord)
      dispatch(storeCreatedFont(createdFont, `${currentPreset.preset}${currentPreset.variant}`));
      createdFont.changeParams({ ...baseValues, ...currentParams }, chosenWord);
    });
  });
  // create choiceFonts
  const choicesFontsName = [];
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
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
          .createFont(`choiceFont${i}`, templateNames[templates[currentPreset.template]])
          .then((createdFont) => {
            if (!currentPreset.steps[currentStep - 1]) {
              currentStep = currentPreset.steps.length - 1;
            }
            if (currentPreset.steps[currentStep - 1].choices[i]) {
              createdFont.changeParams({
                ...baseValues,
                ...currentParams,
                ...currentPreset.steps[currentStep - 1].choices[i].values,
              }, chosenWord);
              dispatch(storeCreatedFont(createdFont, `choiceFont${i}`));
              choicesFontsName[i] = `choiceFont${i}`;
            }
            resolve(true);
          });
        });
      }),
    );
  }
  let sliderFontName = '';
  promiseArray.push(
      new Promise((resolve) => {
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
          .createFont('sliderFont', templateNames[templates[currentPreset.template]])
          .then((createdFont) => {
            createdFont.changeParams({
              ...baseValues,
              ...currentParams,
            }, chosenWord);
            dispatch(storeCreatedFont(createdFont, 'sliderFont'));
            sliderFontName = 'sliderFont';
            resolve(true);
          });
        });
      }),
    );
  Promise.all(promiseArray).then(() => {
    dispatch({
      type: RELOAD_FONTS,
      choicesFontsName,
      currentPreset,
      fontName: `${currentPreset.preset}${currentPreset.variant}`,
      sliderFontName,
      step: currentStep,
    });
    dispatch(updateStepValues(currentStep, `${currentPreset.preset}${currentPreset.variant}`));
    dispatch(setStable());
    if (restart) dispatch(push('/restart')); else dispatch(push('/specimen'));
  });
};

export const loadProject = (loadedProjectID, loadedProjectName) => (dispatch, getState) => {
  const { projectID } = getState().user;
  console.log('> Loading project')
  console.log(projectID)
  console.log(loadedProjectID)
  console.log(loadedProjectName)
  if (projectID === loadedProjectID) {
    dispatch(push('/specimen'));
  } else {
    dispatch(setUnstable());
    // fetch preset and project infos
    console.log('===========Loading preset infos ============')
    request(GRAPHQL_API, getPreset(loadedProjectID))
    .then((data) => {
      console.log(data.Project);
      const baseValues = data.Project.preset.baseValues;
      const currentPreset = data.Project.preset;
      console.log(currentPreset)
      const step = currentPreset.steps.length;
      const currentParams = {};
      data.Project.choicesMade.forEach(((choice, index) => {
        if (choice !== null) {
          Object.keys(choice).forEach((key) => {
            if (key !== 'name') {
              currentParams[key] = data.Project.choicesMade[index][key];
            }
          });
        }
      }));
      dispatch({
        type: LOAD_FONT_DATA,
        currentPreset,
        currentParams,
        baseValues,
        step,
        bought: data.Project.bought,
      });
      dispatch(updateProjectInfos(loadedProjectID, loadedProjectName));
      dispatch(reloadFonts(false));
    })
    .catch(error => console.log(error));
  }
};

