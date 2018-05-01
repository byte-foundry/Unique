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
  filteredPresets: [],
  importedPresets: [],
  loadedPresetsName: [],
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
        filteredPresets: action.filteredPresets,
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
  dispatch({
    type: IMPORT_PRESETS_REQUESTED,
  });
  dispatch({
    type: IMPORT_PRESETS,
    importedPresets: presets,
  });
};

export const loadPresets = (reloading = false) => (dispatch, getState) => {
  if (reloading) {
    dispatch(setUnstable());
  }
  const { importedPresets, isLoading } = getState().presets;
  const { need } = getState().font;
  if (isLoading) return;
  dispatch({
    type: LOAD_PRESETS_REQUESTED,
  });
  const promiseArray = [];
  const loadedPresetsName = [];
  let filteredPresets = importedPresets.filter(preset => (need === 'dunno') || (preset.needs.findIndex(e => e === need) !== -1));
  filteredPresets.forEach((preset, index) => {
    if (preset.variant && preset.variant.family) {
      promiseArray.push(new Promise((resolve) => {
        dispatch(createPrototypoFactory()).then((prototypoFontFactory) => {
          prototypoFontFactory
            .createFont(
              `${preset.variant.family.name}${preset.variant.name}`,
              templateNames[templates[preset.template]],
              true,
            )
            .then((createdFont) => {
              createdFont.changeParams(preset.baseValues, preset.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)).join(','));
              resolve(true);
              loadedPresetsName[index] = `${preset.variant.family.name}${
                preset.variant.name
              }`;
              dispatch(storeCreatedFont(
                createdFont,
                `${preset.variant.family.name}${preset.variant.name}`,
              ));
            });
        });
      }));
    }
  });
  Promise.all(promiseArray).then(() => {
    dispatch({
      type: LOAD_PRESETS,
      loadedPresetsName,
      filteredPresets,
    });
    dispatch(clearFontIsLoading());
    dispatch(push('/app/select'));
    dispatch(setStable());
  });
};

export const reloadPresets = () => (dispatch) => {
  dispatch(loadPresets(true));
};
