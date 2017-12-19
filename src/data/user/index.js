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
  connectToGraphCool,
  getUserProjects,
} from '../queries';
import { DEFAULT_UI_WORD, GRAPHQL_API, GRAPHQL_PROTOTYPO_API } from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';
export const STORE_CHOSEN_WORD = 'user/STORE_CHOSEN_WORD';
export const STORE_PROTOTYPO_USER = 'user/STORE_PROTOTYPO_USER';
export const PAYMENT_SUCCESSFUL = 'user/PAYMENT_SUCCESSFUL';
export const CONNECT_TO_GRAPHCOOL = 'user/CONNECT_TO_GRAPHCOOL';
export const STORE_PROJECT = 'user/STORE_PROJECT';
export const STORE_PROJECT_ID = 'user/STORE_PROJECT_ID';

const initialState = {
  email: '',
  exportType: undefined,
  hasPayed: false,
  chosenWord: DEFAULT_UI_WORD,
  graphqlID: undefined,
  prototypoUser: {},
  projects: [],
  projectID: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID,
        prototypoUser: action.prototypoUser,
      };

    case STORE_EXPORT_TYPE:
      return {
        ...state,
        exportType: action.exportType,
        projectID: undefined,
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
      };

    case CONNECT_TO_GRAPHCOOL:
      return {
        ...state,
        graphqlID: action.graphqlID,
        email: action.email,
        projects: action.projects,
      };

    case STORE_PROJECT:
      return {
        ...state,
        projectID: action.projectID,
        projects: action.projects,
      };

    case STORE_PROJECT_ID:
      return {
        ...state,
        projectID: action.projectID,
      };

    default:
      return state;
  }
};

export const storeProject = () => (dispatch, getState) => {
  console.log('========STORE PROJECT========');
  const { currentPreset, choicesMade } = getState().font;
  const { projectID, graphqlID } = getState().user;
  request(GRAPHQL_API, getUserProjects(graphqlID))
  .then((data) => {
    if (data.User.projects.find(project => project.id === projectID)) {
      console.log('project already found on database');
      dispatch(push('/export'));
    } else {
      console.log('project not found, saving it on database');
      request(GRAPHQL_API, addProjectToUser(graphqlID, currentPreset.id, choicesMade))
      .then((res) => {
        const metadata = {
          unique_preset: res.createProject.id,
          choices_made: choicesMade.map((choice, index) => {
            if (index !== 0) return choice.name;
            return currentPreset.preset + currentPreset.variant;
          }).toString(),
        };
        Intercom('update', { unique_finished_fonts: res.createProject.user.projects.length });
        Intercom('trackEvent', 'unique-finished-font', metadata);
        dispatch({
          type: STORE_PROJECT,
          projectID: res.createProject.id,
          projects: res.createProject.user.projects,
        });
        dispatch(push('/export'));
      });
    }
  })
  .catch(error => console.log(error));
};

export const updateProjectId = projectID => (dispatch) => {
  dispatch({
    type: STORE_PROJECT_ID,
    projectID,
  });
};

export const storeEmail = email => (dispatch, getState) => {
  console.log('========STORE EMAIL========');
  /* global Intercom*/
  const { currentPreset, choicesMade } = getState().font;
  request(GRAPHQL_API, findUser(email))
    .then((data) => {
      if (data.User) {
        request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
        .then((response) => {
          dispatch({
            type: STORE_USER_EMAIL,
            email,
            graphqlID: data.User.id,
            prototypoUser: response.User ? response.User : {},
          });
          dispatch(storeProject());
        })
        .catch(error => console.log(error));
      } else {
        request(GRAPHQL_API, createUser(email, currentPreset.id, choicesMade))
          .then((res) => {
            request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
            .then((response) => {
              dispatch({
                type: STORE_USER_EMAIL,
                email,
                graphqlID: res.createUser.id,
                prototypoUser: response.User ? response.User : {},
              });
            })
            .catch(error => console.log(error));
            const metadata = {
              unique_preset: res.createUser.projects[0].id,
              choices_made: choicesMade.map((choice, index) => {
                if (index !== 0) return choice.name;
                return currentPreset.preset + currentPreset.variant;
              }).toString(),
            };
            Intercom('update', { email, unique_finished_fonts: 1 });
            setTimeout(() => Intercom('trackEvent', 'unique-finished-font', metadata), 1500);
            dispatch(storeProject());
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
  const { exportType, graphqlID, projectID } = getState().user;
  const { id } = getState().font.currentPreset;
  const { choicesMade, currentPreset } = getState().font;
  dispatch({
    type: PAYMENT_SUCCESSFUL,
  });
  request(GRAPHQL_API, getPresetExportedCount(id))
    .then(data => request(GRAPHQL_API, updatePresetExportedCount(id, data.Preset.exported + 1)))
    .catch(error => console.log(error));
  request(GRAPHQL_API, updateProjectBought(projectID))
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

export const loginToGraphCool = (accessToken) => (dispatch) => {
  console.log('=========CONNECTING TO GRAPHCOOL DATABASE============');
  request(GRAPHQL_API, connectToGraphCool(accessToken))
  .then((data) => {
    console.log(data);
    request(GRAPHQL_API, getUserProjects(data.authenticateUser.id))
    .then((res) => {
      console.log(res);
      dispatch({
        type: CONNECT_TO_GRAPHCOOL,
        email: data.authenticateUser.email,
        graphqlID: data.authenticateUser.id,
        projects: res.User.projects,
      });
    })
    .catch(error => console.log(error));    
    Intercom('update', { email: data.authenticateUser.email });
  })
  .catch(error => console.log(error));
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
