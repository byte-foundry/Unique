import Ptypo, { templateNames } from 'prototypo-library';
import { push } from 'react-router-redux';
import { setUnstable, setStable } from '../ui';

export const IMPORT_PRESETS_REQUESTED = 'presets/IMPORT_PRESETS_REQUESTED';
export const IMPORT_PRESETS = 'presets/IMPORT_PRESETS';
export const LOAD_PRESETS_REQUESTED = 'presets/LOAD_PRESETS_REQUESTED';
export const LOAD_PRESETS = 'presets/LOAD_PRESETS';
const initialState = {
  presets: [],
  isLoading: false,
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

    case IMPORT_PRESETS_REQUESTED:
      return {
        ...state,
      };

    case IMPORT_PRESETS:
      return {
        ...state,
        presets: action.presetsArray,
      };

    default:
      return state;
  }
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
  const { presets } = getState().presets;
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
    dispatch(setStable());
  });
};

export const reloadPresets = () => (dispatch) => {
  dispatch(loadPresets());
};
