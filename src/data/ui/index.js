export const SET_UI_UNSTABLE = "ui/SET_INSTABLE";
export const SET_UI_STABLE = "ui/SET_STABLE";
export const SET_LOCALE = "ui/SET_LOCALE";
export const TOGGLE_TOOLTIPS = "ui/TOGGLE_TOOLTIPS";

const initialState = {
  unstable: false,
  locale: navigator.language.split(/[-_]/)[0],
  shouldShowTooltips: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_STABLE:
      return {
        ...state,
        unstable: false
      };

    case SET_UI_UNSTABLE:
      return {
        ...state,
        unstable: true
      };

    case SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      };

    case TOGGLE_TOOLTIPS:
      return {
        ...state,
        shouldShowTooltips: !state.shouldShowTooltips,
      }

    default:
      return state;
  }
};

export const setUnstable = () => dispatch => {
  dispatch({
    type: SET_UI_UNSTABLE
  });
};

export const setStable = () => dispatch => {
  dispatch({
    type: SET_UI_STABLE
  });
};

export const toggleTooltips = () => dispatch => {
  dispatch({
    type: TOGGLE_TOOLTIPS,
  });
};

export const setLocale = locale => dispatch => {
  dispatch({
    type: SET_LOCALE,
    locale
  });
};
