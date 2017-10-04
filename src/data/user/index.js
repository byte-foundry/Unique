import { push } from 'react-router-redux';
import { request } from 'graphql-request';
import {
  findUser,
  createUser,
  addProjectToUser,
  getPresetExportedCount,
  updatePresetExportedCount,
  updateProjectBought,
  getBoughtProjects,
} from '../queries';
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
  currentProject: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID,
        currentProject: action.projectID,
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
  /* global Intercom*/
  const { currentPreset, choicesMade } = getState().font;
  request(GRAPHQL_API, findUser(email))
    .then((data) => {
      if (data.User) {
        request(GRAPHQL_API, addProjectToUser(data.User.id, currentPreset.id, choicesMade))
          .then((res) => {
            const metadata = {
              unique_preset: res.createProject.id,
              choices_made: choicesMade.map((choice, index) => { if (index !== 0) return choice.name; return currentPreset.preset + currentPreset.variant; }).toString(),
            };
            Intercom('update', { unique_finished_fonts: res.createProject.user.projects.length });
            Intercom('trackEvent', 'unique-finished-font', metadata);
            dispatch({
              type: STORE_USER_EMAIL,
              email,
              graphqlID: data.User.id,
              projectID: res.createProject.id,
            });
          })
          .catch(error => console.log(error));
        dispatch(push('/export'));
      } else {
        request(GRAPHQL_API, createUser(email, currentPreset.id, choicesMade))
          .then((res) => {
            dispatch({
              type: STORE_USER_EMAIL,
              email,
              graphqlID: res.createUser.id,
              projectID: res.createUser.projects[0].id,
            });
            const metadata = {
              unique_preset: res.createUser.projects[0].id,
              choices_made: choicesMade.map((choice, index) => { if (index !== 0) return choice.name; return currentPreset.preset + currentPreset.variant; }).toString(),
            };
            Intercom('trackEvent', 'unique-finished-font', metadata);
            Intercom('update', { email });
            Intercom('update', { unique_finished_fonts: 1 });
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
  /* global Intercom*/
  const { exportType, graphqlID, currentProject } = getState().user;
  const { id } = getState().font.currentPreset;
  const { choicesMade, currentPreset } = getState().font;
  dispatch({
    type: PAYMENT_SUCCESSFUL,
  });
  request(GRAPHQL_API, getPresetExportedCount(id))
    .then(data => request(GRAPHQL_API, updatePresetExportedCount(id, data.Preset.exported + 1)))
    .catch(error => console.log(error));
  request(GRAPHQL_API, updateProjectBought(currentProject))
    .then(() =>
      request(GRAPHQL_API, getBoughtProjects(graphqlID))
        .then((res) => {
          const metadata = {
            unique_preset: id,
            choices_made: choicesMade.map((choice, index) => { if (index !== 0) return choice.name; return currentPreset.preset + currentPreset.variant; }).toString(),
          };
          Intercom('trackEvent', 'unique-bought-font', metadata);
          Intercom('update', { unique_bought_fonts: res.allProjects.length });
        })
        .catch(error => console.log(error)),
    )
    .catch(error => console.log(error));

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
