import { push } from 'react-router-redux';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';

const initialState = {
  email: '',
  exportType: undefined,
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

export const afterPayment = () => (dispatch, getState) => {
  const { exportType } = getState().user;
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

