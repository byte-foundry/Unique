import { templateNames } from 'prototypo-library';
import saveAs from 'save-as';
import mergeWith from 'lodash.mergewith';
import uniq from 'lodash.uniq';
import { push } from 'react-router-redux';
import { request, GraphQLClient } from 'graphql-request';
import { loadPresets } from '../presets';
import { setUnstable, setStable } from '../ui';
import {
  updateProjectInfos,
  resetCheckout,
  STORE_PROJECTS,
} from '../user';
import { GRAPHQL_API } from '../constants';
import {
  storeCreatedFont,
  createPrototypoFactory,
} from '../createdFonts';
import {
  getSelectedCount,
  updateSelectedCount,
  getSpecialChoiceSelectedCount,
  getUserProject,
  getUserProjects,
} from '../queries';

export const SELECT_FONT_REQUESTED = 'font/SELECT_FONT_REQUESTED';
export const SELECT_FONT = 'font/SELECT_FONT';
export const DEFINE_NEED = 'font/DEFINE_NEED';
export const CHANGE_STEP = 'font/CHANGE_STEP';
export const UPDATE_VALUES = 'font/UPDATE_VALUES';
export const SELECT_CHOICE = 'font/SELECT_CHOICE';
export const RELOAD_FONTS = 'font/RELOAD_FONTS';
export const CLEAR_IS_LOADING = 'font/CLEAR_IS_LOADING';
export const LOAD_FONT_DATA = 'font/LOAD_FONT_DATA';
export const SET_FONT_BOUGHT = 'font/SET_FONT_BOUGHT';
export const CREATE_FONT_VARIANTS = 'font/CREATE_FONT_VARIANTS';
export const CLEAN_FONT_DATA = 'font/CLEAN_FONT_DATA';

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
  possibleVariants: [],
};

const templates = {
  'elzevir.ptf': 'ELZEVIR',
  'venus.ptf': 'GROTESK',
  'john-fell.ptf': 'FELL',
  'gfnt.ptf': 'SPECTRAL',
  'antique.ptf': 'ANTIQUE',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEFINE_NEED:
      return {
        ...state,
        need: action.need,
      };

    case SELECT_FONT_REQUESTED:
      return {
        ...state,
        currentPreset: action.selectedFont,
        isLoading: true,
      };

    case SELECT_FONT:
      return {
        ...state,
        fontName: action.fontName,
        currentPreset: action.selectedFont,
        step: action.step,
        initialValues: action.initialValues,
        isLoading: false,
        stepBaseValues: action.stepBaseValues,
        choicesMade: action.choicesMade,
        choicesFontsName: action.choicesFontsName,
        currentParams: action.currentParams,
        sliderFontName: action.sliderFontName,
      };
    case SET_FONT_BOUGHT:
      return {
        ...state,
        alreadyBought: true,
      };

    case SELECT_CHOICE:
      return {
        ...state,
        currentParams: action.currentParams
          ? action.currentParams
          : state.currentParams,
        choicesMade: action.choicesMade,
      };

    case CHANGE_STEP:
      return {
        ...state,
        step: action.step,
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
        choicesMade: action.choicesMade,
      };
    
    case CLEAN_FONT_DATA:
      return {
        ...state,
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
        alreadyBought: false,
        possibleVariants: [],
      }

    case CREATE_FONT_VARIANTS:
      return {
        ...state,
        possibleVariants: action.possibleVariants,
      };
    default:
      return state;
  }
};

export const selectFont = (font, step) => (dispatch, getState) => {
  /* global Intercom */
  /* global fbq */
  /* global ga */
  try {
    Intercom('trackEvent', 'unique-selected-font', {
      unique_preset: font.variant.family.name,
    });
    fbq('track', 'ViewContent', {
      content_name: font.variant.family.name,
      content_category: 'Template',
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
    ga('send', 'event', 'Template', 'Selected', font.variant.family.name);
  } catch (e) {
  }
  dispatch(resetCheckout());
  const { currentParams, choicesMade } = getState().font;
  const selectedFont = { ...font };
  dispatch({
    type: SELECT_FONT_REQUESTED,
    selectedFont,
  });
  if (!selectedFont.variant) {
    dispatch(push('/app/'));
    return;
  }
  const selectedFontName = `${selectedFont.variant.family.name}${
    selectedFont.variant.name
  }`;

  //* *********  PREPARE FONT ***********/

  // Get max choice number (to create the right amount of fonts)
  // Create default choices
  // Sort choices

  let maxChoices = 0;
  selectedFont.steps.forEach((step) => {
    // Max choices
    if (step.choices.length > maxChoices) {
      maxChoices = step.choices.length;
    }

    // Sort choices
    let stepParams = {};
    // Get all step params
    step.choices.forEach((choice) => {
      stepParams = mergeWith({}, stepParams, choice.values);
    });
    // Extract what's not needed
    const {
      glyphSpecialProps,
      manualChanges,
      name,
      glyphComponentChoice,
      ...params
    } = stepParams;

    let paramToSort;
    switch (step.name) {
      case 'Thickness':
        paramToSort = 'thickness';
        break;
      case 'Width':
        paramToSort = 'width';
        break;
      case 'Slant':
        paramToSort = 'slant';
        break;
      case 'Contrast':
        paramToSort = 'contrast';
        break;
      case 'X height':
        paramToSort = 'xHeight';
        break;
      case 'X-Height':
        paramToSort = 'xHeight';
        break;
      case 'Curviness':
        paramToSort = 'curviness';
        break;
      case 'Serifs':
        paramToSort = 'serifHeight';
        break;
      case 'Ascenders/Descenders':
        paramToSort = 'ascenders';
        break;
      default:
        paramToSort = Object.keys(params)[0];
        break;
    }
    // If no default choice, create it
    let defaultStep = { values: {} };
    if (!step.choices.find(e => e.name === step.defaultStepName)) {
      defaultStep = {
        name: step.defaultStepName,
        values: {
          [paramToSort]: selectedFont.baseValues[paramToSort],
        },
        id: `default${step.name}`,
      };
      // Push default choice to the font steps
      step.choices.push(defaultStep);
    }

    // Sort by the first useful param //todo : find a master param
    step.choices.sort((a, b) => a.values[paramToSort] - b.values[paramToSort]);
    delete defaultStep.values[paramToSort];
  });

  /** ******************** Create fonts ****************** */

  const promiseArray = [];
  const choicesFontsName = [];

  // Create max choiceFont number + slider fonts

  // User font
  promiseArray.push(new Promise((resolve) => {
    dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
      prototypoFontFactory
        .createFont(
          selectedFontName,
          templateNames[templates[selectedFont.template]],
          true,
        )
        .then((createdFont) => {
          dispatch(storeCreatedFont(createdFont, selectedFontName));
          resolve(true);
        });
    });
  }));

  // All choices font
  for (let i = 0; i < maxChoices + 1; i += 1) {
    promiseArray.push(new Promise((resolve) => {
      dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
        prototypoFontFactory
          .createFont(
            `choiceFont${i}`,
            templateNames[templates[selectedFont.template]],
            true,
          )
          .then((createdFont) => {
            resolve(true);
            dispatch(storeCreatedFont(createdFont, `choiceFont${i}`));
            choicesFontsName[i] = `choiceFont${i}`;
          });
      });
    }));
  }

  // Slider font
  const sliderFontName = 'sliderFont';
  promiseArray.push(new Promise((resolve) => {
    dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
      prototypoFontFactory
        .createFont(
          sliderFontName,
          templateNames[templates[selectedFont.template]],
          true,
        )
        .then((createdFont) => {
          dispatch(storeCreatedFont(createdFont, sliderFontName));
          resolve(true);
        });
    });
  }));

  // When all font created
  Promise.all(promiseArray).then(() => {
    // Statistics : update preset selected count
    request(GRAPHQL_API, getSelectedCount('Preset', font.id))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount('Preset', font.id, data.Preset.selected + 1),
        ))

    // All set, ready to customize
    dispatch({
      type: SELECT_FONT,
      fontName: selectedFontName,
      selectedFont,
      initialValues: { ...selectedFont.baseValues },
      stepBaseValues: { ...selectedFont.baseValues },
      choicesFontsName,
      sliderFontName,
      choicesMade: step ? choicesMade : [null],
      currentParams: step ? currentParams : {},
      step: step || 1,
    });
    dispatch(setStable());
    if (step && choicesMade[step]) {
      dispatch(goToStep(step + 1));
    } else {
      dispatch(goToStep(step || 1));
    }
    if (!step || choicesMade.length < selectedFont.steps.length) {
      dispatch(push('/app/customize'));
    } else {
      dispatch(push('/app/specimen'));
    }
  });
};

export const defineNeed = need => (dispatch) => {
  dispatch({
    type: DEFINE_NEED,
    need,
  });
  dispatch(updateProjectInfos());
  dispatch(loadPresets());
  /* global Intercom */
  /* global fbq */
  /* global ga */
  try {
    Intercom('trackEvent', 'unique-selected-need', {
      need,
    });
    fbq('track', 'ViewContent', {
      content_name: need,
      content_category: 'Need',
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
    ga('send', 'event', 'Need', need, '');
  } catch (e) {
  }
};

export const setFontBought = () => (dispatch) => {
  dispatch({
    type: SET_FONT_BOUGHT,
  });
};

export const updateSubset = () => (dispatch, getState) => {
  const { step } = getState().font;
  if (step) {
    dispatch(updateValues(step));
  }
};

export const cleanData = () => (dispatch, getState) => {
  const { currentPreset } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[`${currentPreset.variant.family.name}${currentPreset.variant.name}`].changeParams(
    currentPreset.baseValues,
    currentPreset.tags.map(
      tag => tag.charAt(0).toUpperCase() + tag.slice(1)
    ).join(',')
  );
  dispatch({
    type: CLEAN_FONT_DATA,
  });
};

const getCalculatedValues = (choice, choicesMade, currentPreset) => {
  const stepChoices = { ...choice.values };
  const choiceWithoutCurrentStep = choicesMade.filter((item) => item.name !== choice.name);

  const manualChanges = {};
  const baseManualChanges = currentPreset.baseValues.manualChanges || {};
  const choiceManualChangeKeys = [];
  [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
    choiceManualChangeKeys.push(...Object.keys(choiceMade.manualChanges || {}));
  });
  const baseManualChangeGlyphs = uniq(...[Object.keys(baseManualChanges), ...choiceManualChangeKeys]);

  baseManualChangeGlyphs.forEach((key) => {
    const baseValue = baseManualChanges[key] || 0;
    const choiceCursors = [];

    [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
      if (choiceMade.manualChanges && choiceMade.manualChanges[key]) {
        choiceCursors.push(...Object.keys(choiceMade));
      }
    });

    const valueCursors = uniq([
      ...Object.keys(baseValue.cursors),
      ...choiceCursors,
    ]);

    manualChanges[key] = { cursors: {} };

    valueCursors.forEach((cursor) => {
      const baseCursorValue = baseValue.cursors[cursor] || 0;
      manualChanges[key].cursors[cursor] = baseCursorValue;

      [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
        if (
          choiceMade.manualChanges &&
          choiceMade.manualChanges[key] &&
          choiceMade.manualChanges[key].cursors[cursor] !== undefined
        ) {
          manualChanges[key].cursors[cursor] +=
            choiceMade.manualChanges[key].cursors[cursor] - baseCursorValue;
        }
      });
    });
  });

  const glyphSpecialProps = {};
  const baseSpecialProps = currentPreset.baseValues.specialProps || {};
  const choiceSpecialPropsKeys = [];
  [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
    choiceSpecialPropsKeys.push(...Object.keys(choiceMade.glyphSpecialProps || {}));
  });
  const baseSpecialPropsGlyphs = uniq(...[Object.keys(baseSpecialProps), ...choiceSpecialPropsKeys]);

  baseSpecialPropsGlyphs.forEach((key) => {
    const baseValue = baseSpecialProps[key] || 0;
    const choiceCursors = [];

    [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
      if (choiceMade.glyphSpecialProps && choiceMade.glyphSpecialProps[key]) {
        choiceCursors.push(...Object.keys(choiceMade));
      }
    });

    const props = uniq([
      ...Object.keys(baseValue.glyphSpecialProps),
      ...choiceCursors,
    ]);

    glyphSpecialProps[key] = {};

    props.forEach((prop) => {
      const baseCursorValue = baseValue[prop] || 0;
      glyphSpecialProps[key][prop] = baseCursorValue;

      [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
        if (
          choiceMade.glyphSpecialProps &&
          choiceMade.glyphSpecialProps[key] &&
          choiceMade.glyphSpecialProps[key][prop] !== undefined
        ) {
          glyphSpecialProps[key][prop] +=
            choiceMade.manualChanges[key][prop] - baseCursorValue;
        }
      });
    });
  });
  return mergeWith(
    {},
    currentPreset.baseValues,
    ...choiceWithoutCurrentStep,
    stepChoices,
    {
      manualChanges,
      glyphSpecialProps,
    },
  );
};

const updateValues = (step, isSpecimen) => (dispatch, getState) => {
  const { chosenWord, chosenGlyph } = getState().user;
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
  const subset = isSpecimen
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$£€¥¢%‰#<+=−×÷>¡!¿?.,:;…-–—()[]{}/\\&*@“”‘’„‚«»‹›©ÀÁÂÃÄÅÇÈÉÊËÌÍÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåçèéêëìíîïñòóôõöøùúûüýÿþ '
    : chosenWord + chosenGlyph;

  // Update choice fonts
  currentPreset.steps[stepToUpdate - 1].choices.forEach((choice, index) => {
    const stepChoices = { ...choice.values };
    const choiceWithoutCurrentStep = choicesMade.filter((item, i) => item && (stepToUpdate - 1 !== i));

    const manualChanges = {};
    const baseManualChanges = currentPreset.baseValues.manualChanges || {};
    const choiceManualChangeKeys = [];
    [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
      choiceManualChangeKeys.push(...Object.keys(choiceMade.manualChanges || {}));
    });
    const baseManualChangeGlyphs = uniq(...[Object.keys(baseManualChanges), ...choiceManualChangeKeys]);

    baseManualChangeGlyphs.forEach((key) => {
      const baseValue = baseManualChanges[key] || 0;
      const choiceCursors = [];

      [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
        if (choiceMade.manualChanges && choiceMade.manualChanges[key]) {
          choiceCursors.push(...Object.keys(choiceMade));
        }
      });

      const valueCursors = uniq([
        ...Object.keys(baseValue.cursors),
        ...choiceCursors,
      ]);

      manualChanges[key] = { cursors: {} };

      valueCursors.forEach((cursor) => {
        const baseCursorValue = baseValue.cursors[cursor] || 0;
        manualChanges[key].cursors[cursor] = baseCursorValue;

        [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
          if (
            choiceMade.manualChanges &&
            choiceMade.manualChanges[key] &&
            choiceMade.manualChanges[key].cursors[cursor] !== undefined
          ) {
            manualChanges[key].cursors[cursor] +=
              choiceMade.manualChanges[key].cursors[cursor] - baseCursorValue;
          }
        });
      });
    });

    const glyphSpecialProps = {};
    const baseSpecialProps = currentPreset.baseValues.specialProps || {};
    const choiceSpecialPropsKeys = [];
    [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
      choiceSpecialPropsKeys.push(...Object.keys(choiceMade.glyphSpecialProps || {}));
    });
    const baseSpecialPropsGlyphs = uniq(...[Object.keys(baseSpecialProps), ...choiceSpecialPropsKeys]);

    baseSpecialPropsGlyphs.forEach((key) => {
      const baseValue = baseSpecialProps[key] || 0;
      const choiceCursors = [];

      [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
        if (choiceMade.glyphSpecialProps && choiceMade.glyphSpecialProps[key]) {
          choiceCursors.push(...Object.keys(choiceMade));
        }
      });

      const props = uniq([
        ...Object.keys(baseValue.glyphSpecialProps),
        ...choiceCursors,
      ]);

      glyphSpecialProps[key] = {};

      props.forEach((prop) => {
        const baseCursorValue = baseValue[prop] || 0;
        glyphSpecialProps[key][prop] = baseCursorValue;

        [...choiceWithoutCurrentStep, stepChoices].forEach((choiceMade) => {
          if (
            choiceMade.glyphSpecialProps &&
            choiceMade.glyphSpecialProps[key] &&
            choiceMade.glyphSpecialProps[key][prop] !== undefined
          ) {
            glyphSpecialProps[key][prop] +=
              choiceMade.manualChanges[key][prop] - baseCursorValue;
          }
        });
      });
    });

    // Update choice font param
    if (fonts[choicesFontsName[index]]) {
      // CurrentParams, then step Base Values, then choice values
      const params = mergeWith(
        {},
        currentPreset.baseValues,
        ...choiceWithoutCurrentStep,
        stepChoices,
        {
          manualChanges,
          glyphSpecialProps,
        },
      );
      fonts[choicesFontsName[index]].changeParams(params, subset);
    } else {
      // Error : no choiceFont for this choice
    }
  });
  // Update slider font
  if (fonts[sliderFontName]) {
    fonts[sliderFontName].changeParams(
      mergeWith({}, stepBaseValues, currentParams),
      subset,
    );
  } else {
    // Error, no slider font
  }

  // If exists, change user font
  if (fonts[fontName] && fonts[fontName].changeParams) {
    fonts[fontName].changeParams(
      mergeWith({}, stepBaseValues, currentParams),
      subset,
    );
  }

  // Update store with new values
  dispatch({
    type: UPDATE_VALUES,
  });
};

export const clearFontIsLoading = () => (dispatch) => {
  dispatch({
    type: CLEAR_IS_LOADING,
  });
};

export const goToStep = (step, fromSpecimen) => (dispatch, getState) => {
  const { currentPreset, choicesMade } = getState().font;
  const previousStep = getState().font.step;
  switch (step) {
    case 0:
      dispatch(loadPresets());
      dispatch(push('/app/select'));
      break;
    case currentPreset.steps.length + 1:
      dispatch({
        type: CHANGE_STEP,
        step: currentPreset.steps.length,
      });
      dispatch(updateValues(undefined, true));
      dispatch(push('/app/specimen'));

      /* global Intercom */
      /* global fbq */
      /* global ga */
      try {
        Intercom('trackEvent', 'unique-finished-font', {
          preset_name: currentPreset.variant.family.name,
          choices_made: choicesMade
            .map((choice, index) => {
              if (index !== 0) return choice.name;
              return (
                currentPreset.variant.family.name + currentPreset.variant.name
              );
            })
            .toString(),
        });
        fbq('track', 'ViewContent', {
          content_name: 'Finished',
          content_category: 'Font',
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          language: navigator.language,
        });
        ga('send', 'event', 'Font', 'Finished', currentPreset.steps[step - 1].name);
      } catch (e) {
      }

      break;
    default:
      dispatch({
        type: CHANGE_STEP,
        step: step || previousStep,
      });
      dispatch(updateValues(step, fromSpecimen || step === currentPreset.steps.length));
      if (fromSpecimen) dispatch(push('/app/customize'));
      break;
  }
};

export const stepBack = () => (dispatch, getState) => {
  let { step } = getState().font;
  dispatch(goToStep((step -= 1)));
};

export const selectChoice = (choice, isSpecimen = false) => (
  dispatch,
  getState,
) => {
  const { choicesMade, currentPreset } = getState().font;
  let { step, currentParams } = getState().font;

  // If choice not in the step, do nothing
  if (
    !currentPreset.steps[step - 1].choices.find(e => e.id === choice.id) &&
    choice.name !== 'Custom'
  ) {
    return;
  }

  // If choice already saved for this step, reset those
  const paramsToReset = {};
  if (choicesMade[step]) {
    Object.keys(choicesMade[step]).forEach((key) => {
      if (key !== 'name') {
        paramsToReset[key] = currentPreset.baseValues[key];
      }
    });
  }

  // Save choice made
  choicesMade[step - 1] = choice.values || {};
  choicesMade[step - 1].name = choice.name;
  choicesMade[step - 1].stepName = currentPreset.steps[step - 1].name;
  const manualChanges = {};
  const baseManualChanges = currentPreset.baseValues.manualChanges || {};
  const choiceManualChangeKeys = [];
  choicesMade.forEach((choiceMade) => {
    choiceManualChangeKeys.push(...Object.keys(choiceMade.manualChanges || {}));
  });
  const baseManualChangeGlyphs = uniq(...[Object.keys(baseManualChanges), ...choiceManualChangeKeys]);

  baseManualChangeGlyphs.forEach((key) => {
    const baseValue = baseManualChanges[key] || 0;
    const choiceCursors = [];

    choicesMade.forEach((choiceMade) => {
      if (choiceMade.manualChanges && choiceMade.manualChanges[key]) {
        choiceCursors.push(...Object.keys(choiceMade));
      }
    });

    const valueCursors = uniq([
      ...Object.keys(baseValue.cursors),
      ...choiceCursors,
    ]);

    manualChanges[key] = { cursors: {} };

    valueCursors.forEach((cursor) => {
      const baseCursorValue = baseValue.cursors[cursor] || 0;
      manualChanges[key].cursors[cursor] = baseCursorValue;

      choicesMade.forEach((choiceMade) => {
        if (
          choiceMade.manualChanges &&
          choiceMade.manualChanges[key] &&
          choiceMade.manualChanges[key].cursors[cursor]
        ) {
          manualChanges[key].cursors[cursor] +=
            choiceMade.manualChanges[key].cursors[cursor] - baseCursorValue;
        }
      });
    });
  });

  const glyphSpecialProps = {};
  const baseSpecialProps = currentPreset.baseValues.specialProps || {};
  const choiceSpecialPropsKeys = [];
  choicesMade.forEach((choiceMade) => {
    choiceSpecialPropsKeys.push(...Object.keys(choiceMade.glyphSpecialProps || {}));
  });
  const baseSpecialPropsGlyphs = uniq(...[Object.keys(baseSpecialProps), ...choiceSpecialPropsKeys]);

  baseSpecialPropsGlyphs.forEach((key) => {
    const baseValue = baseSpecialProps[key] || 0;
    const choiceCursors = [];

    choicesMade.forEach((choiceMade) => {
      if (choiceMade.glyphSpecialProps && choiceMade.glyphSpecialProps[key]) {
        choiceCursors.push(...Object.keys(choiceMade));
      }
    });

    const props = uniq([
      ...Object.keys(baseValue.glyphSpecialProps),
      ...choiceCursors,
    ]);

    glyphSpecialProps[key] = {};

    props.forEach((prop) => {
      const baseCursorValue = baseValue[prop] || 0;
      glyphSpecialProps[key][prop] = baseCursorValue;

      choicesMade.forEach((choiceMade) => {
        if (
          choiceMade.glyphSpecialProps &&
          choiceMade.glyphSpecialProps[key] &&
          choiceMade.glyphSpecialProps[key][prop]
        ) {
          glyphSpecialProps[key][prop] +=
            choiceMade.manualChanges[key][prop] - baseCursorValue;
        }
      });
    });
  });

  // Current font params : Params to reset, then current params, then choice values
  currentParams = mergeWith({}, currentPreset.baseValues, ...choicesMade, {
    manualChanges,
  });

  /* global Intercom */
  /* global fbq */
  /* global ga */
  try {
    Intercom('trackEvent', 'unique-chose-choice', { choice_name: choice.name });
    fbq('track', 'ViewContent', {
      content_name: step,
      content_category: 'Step',
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
    ga('send', 'event', 'Step', 'Selected', currentPreset.steps[step - 1].name);
  } catch (e) {
  }
  // Tracking : update selected count
  if (
    choice.name === 'Custom' ||
    choice.name === 'No choice' ||
    choice.name === 'Default' ||
    choice.name === 'Normal' ||
    choice.id === 'defaultThickness'
  ) {
    request(GRAPHQL_API, getSpecialChoiceSelectedCount(choice.name))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount(
            'Choice',
            data.allChoices[0].id,
            data.allChoices[0].selected + 1,
          ),
        ))
  } else {
    request(GRAPHQL_API, getSelectedCount('Choice', choice.id))
      .then(data =>
        request(
          GRAPHQL_API,
          updateSelectedCount('Choice', choice.id, data.Choice ? data.Choice.selected + 1 : 1),
        ))
  }

  dispatch({
    type: SELECT_CHOICE,
    currentParams,
    choicesMade,
  });
  // Go to next step
  if (isSpecimen) {
    dispatch(goToStep(undefined, true));
  } else {
    dispatch(goToStep((step += 1)));
  }
};

export const finishEditing = choice => (dispatch) => {
  dispatch(selectChoice(choice, true));
  dispatch(push('/app/specimen'));
};

export const getArrayBuffer = (name, familyName, styleName, subset) => (
  dispatch,
  getState,
) => {
  const { fontName } = getState().font;
  const { fonts } = getState().createdFonts;  
  dispatch({
    type: 'font/GET_ARRAY_BUFFER',
  });
  return new Promise((resolve) => {
    fonts[name || fontName]
      .getArrayBuffer({
        familyName,
        styleName,
        merge: true,
        subset,
      })
      .then((data) => {
        resolve(data);
      });
  });
};

export const download = (name, filename) => (dispatch, getState) => {
  const { fontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[name || fontName].getArrayBuffer({ merge: true }).then((data) => {
    const blob = new Blob([data], { type: 'application/x-font-opentype' });
    saveAs(blob, `${filename}.otf`);
  });
  dispatch({
    type: 'font/DOWNLOAD',
  });
};

export const createFontVariants = () => (dispatch, getState) => {
  dispatch(setUnstable());
  const { currentPreset, choicesMade, fontName } = getState().font;
  const { chosenWord } = getState().user;
  const possibleThickness = [
    'LIGHT',
    'MEDIUM',
    'BOLD',
    'REGULAR',
    'EXTRA BOLD',
    'ULTRA LIGHT',
  ];
  //  --  Create thickness variant
  const thicknessStep = currentPreset.steps.find(e => e.name.toUpperCase() === 'THICKNESS');
  if (thicknessStep) {
    const thicknessChoices = thicknessStep.choices;
    const thicknessChoiceIndex = currentPreset.steps.findIndex(e => e.name.toUpperCase() === 'THICKNESS');
    // Check which possibleThickness are in the presets
    const thicknessVariantPossibilities = thicknessChoices.filter(e =>
      possibleThickness.includes(e.name.toUpperCase()));
    // Remove selected thickness
  
    const filteredThicknessVariantPossibilities = thicknessVariantPossibilities.filter(e => e.name !== choicesMade[thicknessChoiceIndex].name);
    const choicesToKeep = choicesMade.filter((e, index) => e && (index !== thicknessChoiceIndex));
    // Create fonts - Apply currentParams then thickness choice values
    const promiseArray = [];
    const possibleVariants = [];
    filteredThicknessVariantPossibilities.forEach((choice) => {
      promiseArray.push(new Promise((resolve) => {
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
            .createFont(
              `${fontName}Variant${choice.name}`,
              templateNames[templates[currentPreset.template]],
              true,
            )
            .then((createdFont) => {
              possibleVariants.push({
                name: `${fontName}Variant${choice.name}`,
                variant: choice.name,
              });
              const params = getCalculatedValues(
                choice,
                choicesToKeep,
                currentPreset,
              );
              createdFont.changeParams(params, chosenWord);
              dispatch(storeCreatedFont(
                createdFont,
                `${fontName}Variant${choice.name}`,
              ));
              resolve(true);
            });
        });
      }));
    });
    Promise.all(promiseArray).then(() => {
      // All set, ready to customize
      dispatch({
        type: CREATE_FONT_VARIANTS,
        possibleVariants,
      });
      dispatch(setStable());
    });
  }
  else {
    dispatch({
      type: CREATE_FONT_VARIANTS,
      possibleVariants: [],
    });
    dispatch(setStable());
  }
};

export const updateSliderFont = newParams => (dispatch, getState) => {
  const { chosenWord } = getState().user;
  const { sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParam(
    newParams.name,
    parseFloat(newParams.value),
    chosenWord,
  );
  dispatch({
    type: 'font/UPDATE_SLIDER_FONT',
  });
};

export const resetSliderFont = () => (dispatch, getState) => {
  const { chosenWord } = getState().user;
  const { currentParams, stepBaseValues, sliderFontName } = getState().font;
  const { fonts } = getState().createdFonts;
  fonts[sliderFontName].changeParams(
    mergeWith({}, stepBaseValues, currentParams),
    chosenWord,
  );
  dispatch({
    type: 'font/RESET_SLIDER_FONT',
  });
};

export const reloadFonts = () => (dispatch, getState) => {
  const { currentPreset, step } = getState().font;
  dispatch(selectFont(currentPreset, step));
};

export const loadProject = (loadedProjectID) => (
  dispatch,
  getState,
) => {
  const { currentProject: { id: projectId }, graphQLToken } = getState().user;
  if (projectId === loadedProjectID) {
    dispatch(push('/app/specimen'));
  } else {
    dispatch(setUnstable());
    // fetch preset and project infos
    const client = new GraphQLClient(GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${graphQLToken}`,
      },
    });
    client
      .request(getUserProject(loadedProjectID))
      .then((data) => {
        const {
          choicesMade, preset, bought, id, name,
        } = data.UniqueProject;
        const baseValues = preset.baseValues;
        const currentPreset = preset;
        currentPreset.steps.forEach((step) => {
          step.choices.forEach((choice) => {
            if (!choice.name) {
              choice.name = step.defaultStepName;
            }
          });
        });
        const step = currentPreset.steps.length;
        const currentParams = {};
        choicesMade.forEach((choice, index) => {
          if (choice !== null) {
            Object.keys(choice).forEach((key) => {
              if (key !== 'name') {
                currentParams[key] = choicesMade[index][key];
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
          choicesMade,
          bought,
        });
        dispatch(updateProjectInfos(id, name, bought));
        dispatch(reloadFonts(false));
      })
  }
};

export const loadLibrary = () => (dispatch, getState) => {
  const { graphQLToken } = getState().user;
  if (!graphQLToken) {
  } else {
    dispatch(setUnstable());
    const client = new GraphQLClient(GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${graphQLToken}`,
      },
    });
    client
      .request(getUserProjects())
      .then((data) => {
        // Create fonts
        const promiseArray = [];
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          data.user.uniqueProjects.forEach((project) => {
            promiseArray.push(new Promise((resolve) => {
              prototypoFontFactory
                .createFont(
                  `project${project.id}`,
                  templateNames[templates[project.preset.template]],
                  true,
                )
                .then((createdFont) => {
                  createdFont.changeParams(project.preset.baseValues);
                  project.choicesMade.map(choiceMade =>
                    createdFont.changeParams(choiceMade));
                  dispatch(storeCreatedFont(createdFont, `project${project.id}`));
                  resolve(true);
                });
            }));
          });
        });
        Promise.all(promiseArray).then(() => {
          dispatch({
            type: STORE_PROJECTS,
            projects: data.user.uniqueProjects,
          });
          dispatch(setStable());
          dispatch(push('/app/library'));
        });
      })
  }
};
