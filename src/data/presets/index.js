import { templateNames } from 'prototypo-library';
import { push } from 'react-router-redux';
import { setUnstable, setStable } from '../ui';
import { storeCreatedFont, createPrototypoFactory } from '../createdFonts';
import { clearFontIsLoading } from '../font';

export const IMPORT_PRESETS_REQUESTED = 'presets/IMPORT_PRESETS_REQUESTED';
export const IMPORT_PRESETS = 'presets/IMPORT_PRESETS';
export const LOAD_PRESETS_REQUESTED = 'presets/LOAD_PRESETS_REQUESTED';
export const LOAD_PRESETS = 'presets/LOAD_PRESETS';
const initialState = {
  loadedPresetsName: [],
  importedPresets: [],
  isLoading: false,
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
    case LOAD_PRESETS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_PRESETS:
      return {
        ...state,
        isLoading: false,
        loadedPresetsName: action.loadedPresetsName,
      };

    case IMPORT_PRESETS_REQUESTED:
      return {
        ...state,
      };

    case IMPORT_PRESETS:
      return {
        ...state,
        importedPresets: action.importedPresets,
        isLoading: false,
      };

    default:
      return state;
  }
};


export const importPresets = presets => (dispatch) => {
  console.log('-- ImportPresets');
  dispatch({
    type: IMPORT_PRESETS_REQUESTED,
  });
  console.log(presets);
  dispatch({
    type: IMPORT_PRESETS,
    importedPresets: presets,
  });
};

export const loadPresets = (reloading = false) => (dispatch, getState) => {
  console.log('========LOAD PRESETS=======');
  if (reloading) {
    dispatch(setUnstable());
  }
  const { importedPresets, isLoading } = getState().presets;
  if (isLoading) return;
  dispatch({
    type: LOAD_PRESETS_REQUESTED,
  });
  const promiseArray = [];
  const loadedPresetsName = [];
  importedPresets.forEach((preset, index) => {
    promiseArray.push(new Promise((resolve) => {
      dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
        prototypoFontFactory.createFont(`${preset.variant.family.name}${preset.variant.name}`, templateNames[templates[preset.template]], true).then((createdFont) => {
          createdFont.changeParams(preset.baseValues);
          resolve(true);
          loadedPresetsName[index] = `${preset.variant.family.name}${preset.variant.name}`;
          dispatch(storeCreatedFont(createdFont, `${preset.variant.family.name}${preset.variant.name}`));
        });
      });
    }));
  });
  Promise.all(promiseArray).then(() => {
    console.log('> All presets loaded');
    dispatch({
      type: LOAD_PRESETS,
      loadedPresetsName,
    });
    dispatch(clearFontIsLoading());
    dispatch(push('/select'));
    dispatch(setStable());
  });
  console.log('======END LOAD PRESETS=======');
};

export const reloadPresets = () => (dispatch) => {
  dispatch(loadPresets(true));
};
