export const SET_UI_UNSTABLE = "ui/SET_INSTABLE";
export const SET_UI_STABLE = "ui/SET_STABLE";
export const SET_LOCALE = "ui/SET_LOCALE";
const initialState = {
  unstable: false,
  locale: navigator.language.split(/[-_]/)[0]
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

export const setLocale = locale => dispatch => {
  dispatch({
    type: SET_LOCALE,
    locale
  });
};
