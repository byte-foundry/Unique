export const SET_UI_UNSTABLE = 'ui/SET_INSTABLE';
export const SET_UI_STABLE = 'ui/SET_STABLE';
const initialState = {
  unstable: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UI_STABLE:
      return {
        ...state,
        unstable: false,
      };

    case SET_UI_UNSTABLE:
      return {
        ...state,
        unstable: true,
      };

    default:
      return state;
  }
};

export const setUnstable = () => (dispatch) => {
  dispatch({
    type: SET_UI_UNSTABLE,
  });
};

export const setStable = () => (dispatch) => {
  dispatch({
    type: SET_UI_STABLE,
  });
};
