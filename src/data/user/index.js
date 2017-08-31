import { push } from 'react-router-redux';
import { request } from 'graphql-request';
import { findUser, createUser, addProjectToUser } from '../queries';
import { DEFAULT_UI_WORD, GRAPHQL_API } from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';
export const STORE_CHOSEN_WORD = 'user/STORE_CHOSEN_WORD';
export const PAYMENT_SUCCESSFUL = 'user/PAYMENT_SUCCESSFUL';

const initialState = {
  email: '',
  exportType: undefined,
  hasPayed: false,
  chosenWord: DEFAULT_UI_WORD,
  graphqlID: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID,
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

export const storeEmail = email => (dispatch, getState) => {
  const { currentPreset, choicesMade } = getState().font;
  request(GRAPHQL_API, findUser(email))
    .then((data) => {
      if (data.User) {
        request(GRAPHQL_API, addProjectToUser(data.User.id, currentPreset.id, choicesMade))
          .then(() => {})
          .catch(error => console.log(error));
        dispatch({
          type: STORE_USER_EMAIL,
          email,
          graphqlID: data.User.id,
        });
        dispatch(push('/export'));
      } else {
        request(GRAPHQL_API, createUser(email, currentPreset.id, choicesMade))
          .then((res) => {
            dispatch({
              type: STORE_USER_EMAIL,
              email,
              graphqlID: res.createUser.id,
            });
            dispatch(push('/export'));
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
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
