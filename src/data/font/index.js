import { templateNames } from "prototypo-library";
import saveAs from "save-as";
import mergeWith from "lodash.mergewith";
import { push } from "react-router-redux";
import { request } from "graphql-request";
import { loadPresets } from "../presets";
import { setUnstable, setStable } from "../ui";
import { storeChosenWord, updateProjectInfos } from "../user";
import { DEFAULT_UI_WORD, GRAPHQL_API } from "../constants";
import {
  storeCreatedFont,
  deleteCreatedFont,
  createPrototypoFactory
} from "../createdFonts";
import {
  getSelectedCount,
  updateSelectedCount,
  getSpecialChoiceSelectedCount,
  getPreset
} from "../queries";

export const CREATE_REQUESTED = "font/CREATE_REQUESTED";
export const CREATE = "font/CREATE";
export const SELECT_FONT_REQUESTED = "font/SELECT_FONT_REQUESTED";
export const SELECT_FONT = "font/SELECT_FONT";
export const DEFINE_NEED = "font/DEFINE_NEED";
export const CHANGE_STEP = "font/CHANGE_STEP";
export const UPDATE_VALUES = "font/UPDATE_VALUES";
export const SELECT_CHOICE_REQUESTED = "font/SELECT_CHOICE_REQUESTED";
export const SELECT_CHOICE = "font/SELECT_CHOICE";
export const RELOAD_FONTS = "font/RELOAD_FONTS";
export const FINISH_EDITING = "font/FINISH_EDITING";
export const CLEAR_IS_LOADING = "font/CLEAR_IS_LOADING";
export const LOAD_FONT_DATA = "font/LOAD_FONT_DATA";
export const ADD_CHOICE_FONT = "font/ADD_CHOICE_FONT";
export const SET_FONT_BOUGHT = "font/SET_FONT_BOUGHT";
export const RESET_STEP = "font/RESET_STEP";

const initialState = {
  fontName: "",
  initialValues: {},
  currentPreset: {
    font: {}
  },
  step: 0,
  isLoading: false,
  stepBaseValues: {},
  choicesMade: [null],
  choicesFontsName: [],
  sliderFontName: "",
  currentParams: {},
  need: "",
  alreadyBought: false
};

const templates = {
  elzevir: "ELZEVIR",
  venus: "GROTESK",
  "john-fell": "FELL",
  gfnt: "SPECTRAL",
  antique: "ANTIQUE"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUESTED:
      return {
        ...state,
        isLoading: true
      };

    case CREATE:
      return {
        ...state,
        fontName: action.fontName,
        currentPreset: action.selectedFont,
        step: 1,
        initialValues: action.initialValues,
        isLoading: false,
        stepBaseValues: action.stepBaseValues
      };

    case DEFINE_NEED:
      return {
        ...state,
        need: action.need
      };

    case SELECT_FONT_REQUESTED:
      return {
        ...state,
        isLoading: true
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
        sliderFontName: action.sliderFontName
      };

    case ADD_CHOICE_FONT:
      return {
        ...state,
        choicesFontsName: action.choicesFontsName
      };

    case SET_FONT_BOUGHT:
      return {
        ...state,
        alreadyBought: true
      };

    case SELECT_CHOICE_REQUESTED:
      return {
        ...state
      };

    case SELECT_CHOICE:
      return {
        ...state,
        currentParams: action.currentParams
          ? action.currentParams
          : state.currentParams,
        choicesMade: action.choicesMade
      };

    case CHANGE_STEP:
      return {
        ...state,
        step: action.step
      };

    case CLEAR_IS_LOADING:
      return {
        ...state,
        isLoading: false
      };

    case RELOAD_FONTS:
      return {
        ...state,
        currentPreset: action.currentPreset,
        choicesFontsName: action.choicesFontsName,
        fontName: action.fontName,
        step: action.step,
        sliderFontName: action.sliderFontName
      };

    case LOAD_FONT_DATA:
      return {
        ...state,
        currentPreset: action.currentPreset,
        currentParams: action.currentParams,
        baseValues: action.baseValues,
        step: action.step,
        alreadyBought: action.bought
      };
    default:
      return state;
  }
};

export const selectFont = font => (dispatch, getState) => {
  console.log('==========font/selectFont============')


  const { chosenWord } = getState().user;
  const selectedFont = { ...font };
  dispatch({
    type: SELECT_FONT_REQUESTED
  });
  const selectedFontName = `${selectedFont.preset}${selectedFont.variant}`;

  //**********  PREPARE FONT ***********/

  // Get max choice number (to create the right amount of fonts)
  // Create default choices
  // Sort choices 

  let maxChoices = 0;
  selectedFont.steps.forEach((step, index) => {
    // Max choices
    if (step.choices.length > maxChoices) {
      maxChoices = step.choices.length;
    }
    
    // If no default choice, create it
    if (!step.choices.find(e => e.name === "Default")) {
      const defaultStepParams = {};
      // Get all choices params for this step and set them to the font default value
      step.choices.forEach(choice => {
        Object.keys(choice.values).forEach(key => {
          if (key !== "name") {
            defaultStepParams[key] = selectedFont.baseValues[key];
          }
        });
      });

      // Push default choice to the font steps
      selectedFont.steps[index].choices.push({
        name: "Default",
        values: defaultStepParams,
        id: `default${step.name}`
      });
    }

    // Sort choices
    let stepParams = {};
    // Get all step params
    step.choices.forEach(choice => {
      stepParams = mergeWith(stepParams, choice.values);
    });
    // Extract what's not needed
    const {
      glyphSpecialProps,
      manualChanges,
      name,
      glyphComponentChoice,
      ...params
    } = stepParams;

    //Sort by the first useful param //todo : find a master param
    const paramToSort = Object.keys(params)[0];

    step.choices.sort(function (a, b) {
      return a.values[paramToSort] - b.values[paramToSort];
    });
  });

  /********************** Create fonts *******************/

  const promiseArray = [];
  let choicesFontsName = [];

  // Create max choiceFont number + slider fonts

  //All choices font
  for (let i = 0; i < maxChoices + 1; i += 1) {
    promiseArray.push(
      new Promise(resolve => {
        dispatch(createPrototypoFactory()).then(prototypoFontFactory => {
          prototypoFontFactory
            .createFont(
              `choiceFont${i}`,
              templateNames[templates[selectedFont.template]]
            )
            .then(createdFont => {
              resolve(true);
              dispatch(storeCreatedFont(createdFont, `choiceFont${i}`));
              choicesFontsName[i] = `choiceFont${i}`;
            });
        });
      })
    );
  }


  // Slider font
  let sliderFontName = "sliderFont";
  promiseArray.push(
    new Promise(resolve => {
      dispatch(createPrototypoFactory()).then(prototypoFontFactory => {
        prototypoFontFactory
          .createFont(sliderFontName, templateNames[templates[selectedFont.template]])
          .then(createdFont => {
            dispatch(storeCreatedFont(createdFont, sliderFontName));
            resolve(true);
          });
      });
    })
  );


  // When all font created
  Promise.all(promiseArray).then(() => {

    //Statistics : update preset selected count
    request(GRAPHQL_API, getSelectedCount("Preset", font.id))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount("Preset", font.id, data.Preset.selected + 1)
        )
      )
      .catch(error => console.log(error));

    // All set, ready to customize
    dispatch(goToStep(1));
    dispatch(push("/customize"));
    dispatch({
      type: SELECT_FONT,
      fontName: selectedFontName,
      selectedFont,
      initialValues: { ...selectedFont.baseValues },
      stepBaseValues: { ...selectedFont.baseValues },
      choicesFontsName,
      sliderFontName
    });
  });
};

export const defineNeed = need => dispatch => {
  console.log('==========font/defineNeed============')
  if (need !== "logo") {
    dispatch(storeChosenWord(DEFAULT_UI_WORD));
  }
  dispatch({
    type: DEFINE_NEED,
    need
  });
  dispatch(updateProjectInfos(undefined, undefined));
  dispatch(loadPresets());
};

export const setFontBought = () => dispatch => {
  console.log('==========font/setFontBought============')
  dispatch({
    type: SET_FONT_BOUGHT
  });
};

export const updateSubset = () => (dispatch, getState) => {
  console.log('==========font/updateSubset============')
  const { step } = getState().font;
  if (step) {
    dispatch(updateValues(step));
  }
};

const updateValues = (step, isSpecimen) => (dispatch, getState) => {
  let { chosenWord, chosenGlyph } = getState().user;
  console.log("========font/updateValues===========");
  const {
    choicesFontsName,
    currentPreset,
    currentParams,
    stepBaseValues,
    choicesMade,
    sliderFontName,
    fontName,
  } = getState().font;
  const { fonts } = getState().createdFonts;
  const stepToUpdate = step || getState().font.step;


  // Update choice fonts
  currentPreset.steps[stepToUpdate - 1].choices.forEach((choice, index) => {
    const stepChoices = { ...choice.values };
    if (choicesMade[stepToUpdate]) {
      Object.keys(choicesMade[stepToUpdate]).forEach(key => {
        if (!stepChoices[key]) {
          stepChoices[key] = currentPreset.baseValues[key];
        }
      });
    }
    console.log(fonts[choicesFontsName[index]]);
    if (fonts[choicesFontsName[index]]) {
      fonts[choicesFontsName[index]].changeParams(
        mergeWith(mergeWith(stepBaseValues, currentParams), stepChoices),
        chosenWord + chosenGlyph
      );
    } else {
      // Error : no choiceFont for this choice
    }
  });
  if (fonts[sliderFontName]) {
    fonts[sliderFontName].changeParams(
      mergeWith(stepBaseValues, currentParams),
      chosenWord + chosenGlyph
    );
  } else {
    // Error, no slider font
  }

  // If exists, change user font
  if (fonts[curFontName] && fonts[curFontName].changeParams) {
    chosenWord =
      step === currentPreset.steps.length
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!;,;:/1234567890-àéè().&"
        : chosenWord + chosenGlyph;
    fonts[curFontName].changeParams(
      mergeWith(stepBaseValues, currentParams),
      chosenWord + chosenGlyph
    );
  }

  // Update store with new values
  dispatch({
    type: UPDATE_VALUES
  });
};


export const clearFontIsLoading = () => dispatch => {
  console.log('==========font/clearFontIsLoading============')
  dispatch({
    type: CLEAR_IS_LOADING
  });
};

export const goToStep = (step, isSpecimen) => (dispatch, getState) => {
  console.log('==========font/goToStep============')
  const { currentPreset } = getState().font;
  switch (step) {
    case 0:
      dispatch(loadPresets());
      dispatch(push("/select"));
      break;
    case currentPreset.steps.length + 1:
      dispatch(updateValues(undefined, true));
      dispatch(push("/specimen"));
      break;
    default:
      dispatch(updateValues(step));
      dispatch({
        type: CHANGE_STEP,
        step
      });
      if (isSpecimen) {
        dispatch(updateValues(undefined, true));
        dispatch(push("/customize"));
      }
      break;
  }
};

export const stepBack = () => (dispatch, getState) => {
  let { step } = getState().font;
  dispatch(goToStep((step -= 1)));
};

export const selectChoice = choice => (dispatch, getState) => {
  console.log('==========font/selectChoice============')
  const { choicesMade, currentPreset } = getState().font;
  let { step, currentParams } = getState().font;
  console.log(choice);
  if (!choice || !choice.name) {
    console.log("no choice selected");
    choice = {
      name: "No choice",
      values: {}
    };
    console.log(choice);
  }
  console.log("===============================================");
  dispatch({
    type: SELECT_CHOICE_REQUESTED,
    params: choice.values
  });
  const paramsToReset = {};
  if (choicesMade[step]) {
    Object.keys(choicesMade[step]).forEach(key => {
      if (key !== "name") {
        paramsToReset[key] = currentPreset.baseValues[key];
      }
    });
  }
  currentParams = mergeWith(
    mergeWith(currentParams,
      paramsToReset),
    choice.values
  );
  choicesMade[step] = choice.values || {};
  choicesMade[step].name = choice.name;
  dispatch({
    type: SELECT_CHOICE,
    currentParams,
    choicesMade
  });
  dispatch(goToStep((step += 1)));
  if (choice.name === "Custom" || choice.name === "No choice") {
    request(GRAPHQL_API, getSpecialChoiceSelectedCount(choice.name))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount(
            "Choice",
            data.allChoices[0].id,
            data.allChoices[0].selected + 1
          )
        )
      )
      .catch(error => console.log(error));
  } else {
    request(GRAPHQL_API, getSelectedCount("Choice", choice.id))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount("Choice", choice.id, data.Choice.selected + 1)
        )
      )
      .catch(error => console.log(error));
  }
};

export const finishEditing = choice => (dispatch, getState) => {
  // Select choice
  dispatch(goToStep(undefined, true));
  dispatch(push("/specimen"));
};

export const download = () => (dispatch, getState) => {
  console.log('==========font/download============')
  const { fontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[fontName].getArrayBuffer().then(data => {
    const blob = new Blob([data], { type: "application/x-font-opentype" });
    saveAs(blob, `${fontName}.otf`);
  });
};

export const updateSliderFont = newParams => (dispatch, getState) => {
  console.log('==========font/updateSliderFont============')
  const { chosenWord } = getState().user;
  const { sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParam(
    newParams.name,
    parseFloat(newParams.value),
    chosenWord
  );
};

export const resetSliderFont = () => (dispatch, getState) => {
  console.log('==========font/resetSliderFont============')
  const { chosenWord } = getState().user;
  const { currentParams, stepBaseValues, sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParams(
    mergeWith(stepBaseValues, currentParams),
    chosenWord
  );
};

export const reloadFonts = (restart = true) => (dispatch, getState) => {
  console.log('==========font/reloadFonts============')
};

export const loadProject = (loadedProjectID, loadedProjectName) => (
  dispatch,
  getState
) => {
  console.log('==========font/loadProject============')
  const { projectID } = getState().user;
  console.log("> Loading project");
  console.log(projectID);
  console.log(loadedProjectID);
  console.log(loadedProjectName);
  if (projectID === loadedProjectID) {
    dispatch(push("/specimen"));
  } else {
    dispatch(setUnstable());
    // fetch preset and project infos
    console.log("===========Loading preset infos ============");
    request(GRAPHQL_API, getPreset(loadedProjectID))
      .then(data => {
        console.log(data.Project);
        const baseValues = data.Project.preset.baseValues;
        const currentPreset = data.Project.preset;
        console.log(currentPreset);
        const step = currentPreset.steps.length;
        const currentParams = {};
        data.Project.choicesMade.forEach((choice, index) => {
          if (choice !== null) {
            Object.keys(choice).forEach(key => {
              if (key !== "name") {
                currentParams[key] = data.Project.choicesMade[index][key];
              }
            });
          }
        });
        dispatch({
          type: LOAD_FONT_DATA,
          currentPreset,
          currentParams,
          baseValues,
          step,
          bought: data.Project.bought
        });
        dispatch(updateProjectInfos(loadedProjectID, loadedProjectName));
        dispatch(reloadFonts(false));
      })
      .catch(error => console.log(error));
  }
};
