import { push } from 'react-router-redux';
import { request, GraphQLClient } from 'graphql-request';
import {
  findUser,
  createUser,
  addProjectToUser,
  getPresetExportedCount,
  updatePresetExportedCount,
  updateProjectBought,
  getBoughtProjects,
  getPrototypoUser,
  authenticateUser,
  signupUser,
  sendFontToPrototypo,
} from '../queries';
import { DEFAULT_UI_WORD, GRAPHQL_API, GRAPHQL_PROTOTYPO_API } from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';
export const STORE_CHOSEN_WORD = 'user/STORE_CHOSEN_WORD';
export const STORE_PROTOTYPO_USER = 'user/STORE_PROTOTYPO_USER';
export const PAYMENT_SUCCESSFUL = 'user/PAYMENT_SUCCESSFUL';

const initialState = {
  email: '',
  exportType: undefined,
  hasPayed: false,
  chosenWord: DEFAULT_UI_WORD,
  graphqlID: undefined,
  currentProject: undefined,
  prototypoUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID,
        currentProject: action.projectID,
        prototypoUser: action.prototypoUser,
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

    case STORE_PROTOTYPO_USER:
      return {
        ...state,
        prototypoUser: action.prototypoUser,
      }

    default:
      return state;
  }
};

export const storeEmail = email => (dispatch, getState) => {
  console.log('========STORE EMAIL========');
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
            Intercom('update', { unique_finished_fonts: res.createProject.user.projects.length })
            Intercom('trackEvent', 'unique-finished-font', metadata);
            request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
            .then((response) => {
              dispatch({
                type: STORE_USER_EMAIL,
                email,
                graphqlID: data.User.id,
                projectID: res.createProject.id,
                prototypoUser: response.User ? response.User : {},
              });
              console.log({
                type: STORE_USER_EMAIL,
                email,
                graphqlID: data.User.id,
                projectID: res.createProject.id,
                prototypoUser: response.User ? response.User : {},
              });
            })
            .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
        dispatch(push('/export'));
      } else {
        request(GRAPHQL_API, createUser(email, currentPreset.id, choicesMade))
          .then((res) => {
            request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
            .then((response) => {
              dispatch({
                type: STORE_USER_EMAIL,
                email,
                graphqlID: res.createUser.id,
                projectID: res.createUser.projects[0].id,
                prototypoUser: response.User ? response.User : {},
              });
              console.log({
                type: STORE_USER_EMAIL,
                email,
                graphqlID: res.createUser.id,
                projectID: res.createUser.projects[0].id,
                prototypoUser: response.User ? response.User : {},
              });
            })
            .catch(error => console.log(error));
            const metadata = {
              unique_preset: res.createUser.projects[0].id,
              choices_made: choicesMade.map((choice, index) => { if (index !== 0) return choice.name; return currentPreset.preset + currentPreset.variant; }).toString(),
            };
            Intercom('update', { email, unique_finished_fonts: 1 });
            setTimeout(() => Intercom('trackEvent', 'unique-finished-font', metadata), 1500);
            dispatch(push('/export'));
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
};

export const storeExportType = exportType => (dispatch) => {
  console.log('> Storing export type');
  console.log(exportType);
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

export const exportFontToPrototypoWithAccount = (email, password, familyName, variantName) => (dispatch, getState) => {
  console.log('=========EXPORT TO PROTOTYPO WITH ACCOUNT============');
  const { currentPreset, currentParams, initialValues } = getState().font;
  const { prototypoUser } = getState().user;
  request(GRAPHQL_PROTOTYPO_API, authenticateUser(email, password))
  .then((data) => {
    const token = data.authenticateEmailUser.token;
    const client = new GraphQLClient(GRAPHQL_PROTOTYPO_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    client.request(
      sendFontToPrototypo(
        prototypoUser.id,
        familyName,
        `${currentPreset.template}.ptf`,
        variantName,
        {
          ...initialValues,
          ...currentParams,
        },
      ),
    )
    .then(() => dispatch(push('/success')))
    .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
  console.log('====================================');
};

export const exportFontToPrototypoWithoutAccount = (email, password, familyName, variantName, firstName, lastName) => (dispatch, getState) => {
  console.log('=========EXPORT TO PROTOTYPO WITHOUT ACCOUNT============');
  const { currentPreset, currentParams, initialValues } = getState().font;
  request(GRAPHQL_PROTOTYPO_API, signupUser(email, password, firstName, lastName))
  .then((created) => {
    const prototypoId = created.signupEmailUser.id;
    request(GRAPHQL_PROTOTYPO_API, authenticateUser(email, password))
    .then((data) => {
      const token = data.authenticateEmailUser.token;
      const client = new GraphQLClient(GRAPHQL_PROTOTYPO_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      client.request(
        sendFontToPrototypo(
          prototypoId,
          familyName,
          `${currentPreset.template}.ptf`,
          variantName,
          {
            ...initialValues,
            ...currentParams,
          },
        ),
      )
      .then(() => {
        dispatch({
          type: STORE_PROTOTYPO_USER,
          prototypoUser: {
            id: prototypoId,
            firstName,
          },
        });
        dispatch(push('/success'));
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  })
  .catch(error => console.log(error));  
  console.log('====================================');
};
