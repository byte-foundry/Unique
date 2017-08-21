import { push } from 'react-router-redux';
import { DEFAULT_UI_WORD } from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';
export const STORE_CHOSEN_WORD = 'user/STORE_CHOSEN_WORD';
export const PAYMENT_SUCCESSFUL = 'user/PAYMENT_SUCCESSFUL';

const initialState = {
  email: '',
  exportType: undefined,
  hasPayed: false,
  chosenWord: DEFAULT_UI_WORD,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
      };

    case STORE_EXPORT_TYPE:
      return {
        ...state,
        exportType: action.exportType,
      };

    case PAYMENT_SUCCESSFUL:
      return {
        ...state,
        hasPayed: true,
      };

    case STORE_CHOSEN_WORD:
      return {
        ...state,
        chosenWord: action.chosenWord,
      };

    default:
      return state;
  }
};

export const storeEmail = email => (dispatch) => {
  dispatch({
    type: STORE_USER_EMAIL,
    email,
  });
  dispatch(push('/export'));
};

export const storeExportType = exportType => (dispatch) => {
  dispatch({
    type: STORE_EXPORT_TYPE,
    exportType,
  });
};

export const storeChosenWord = chosenWord => (dispatch) => {
  dispatch({
    type: STORE_CHOSEN_WORD,
    chosenWord,
  });
};


export const afterPayment = () => (dispatch, getState) => {
  const { exportType } = getState().user;
  dispatch({
    type: PAYMENT_SUCCESSFUL,
  });
  switch (exportType) {
    case 'host':
      break;
    case 'download':
      dispatch(push('/success'));
      break;
    case 'prototypo':
      break;
    default:
      break;
  }
};

