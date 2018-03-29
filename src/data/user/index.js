import { push } from "react-router-redux";
import { request, GraphQLClient } from "graphql-request";
import fx from "money";
import { setUnstable, setStable } from "../ui";
import {
  addProjectToUser,
  getPresetExportedCount,
  updatePresetExportedCount,
  updateProjectBought,
  getBoughtProjects,
  authenticateUser,
  authenticateFacebookUser,
  authenticateGoogleUser,
  authenticateTwitterUser,
  signupUser,
  getUserProjects,
  updateProject,
  deleteProject
} from "../queries";
import { setFontBought, updateSubset, loadLibrary } from "../font";
import {
  DEFAULT_UI_WORD,
  DEFAULT_UI_GLYPH,
  GRAPHQL_API,
  BASE_PACK_PRICE
} from "../constants";

export const STORE_USER_EMAIL = "user/STORE_USER_EMAIL";
export const STORE_EXPORT_TYPE = "user/STORE_EXPORT_TYPE";
export const STORE_CHOSEN_WORD = "user/STORE_CHOSEN_WORD";
export const STORE_CHOSEN_GLYPH = "user/STORE_CHOSEN_GLYPH";
export const PAYMENT_SUCCESSFUL = "user/PAYMENT_SUCCESSFUL";
export const CONNECT_TO_GRAPHCOOL = "user/CONNECT_TO_GRAPHCOOL";
export const LOGIN_ERROR = "user/LOGIN_ERROR";
export const STORE_PROJECT = "user/STORE_PROJECT";
export const STORE_PROJECTS = "user/STORE_PROJECTS";
export const STORE_PROJECT_INFOS = "user/STORE_PROJECT_INFOS";
export const CHANGE_FONT_SIZE = "user/CHANGE_FONT_SIZE";
export const SWITCH_BLACK_ON_WHITE = "user/SWITCH_BLACK_ON_WHITE";
export const SWITCH_GLYPH_MODE = "user/SWITCH_GLYPH_MODE";
export const CHANGE_CHECKOUT_ORDER = "user/CHANGE_CHECKOUT_ORDER";
export const RESET_CHECKOUT_OPTIONS = "user/RESET_CHECKOUT_OPTIONS";
export const DELETE_PROJECT = "user/DELETE_PROJECT";
export const LOGOUT = "user/LOGOUT";

const initialState = {
  email: "",
  exportType: undefined,
  hasPayed: false,
  chosenWord: DEFAULT_UI_WORD,
  graphqlID: undefined,
  projects: [],
  projectID: undefined,
  projectName: undefined,
  shouldLogout: false,
  fontSize: 50,
  isBlackOnWhite: true,
  isGlyphMode: false,
  chosenGlyph: DEFAULT_UI_GLYPH,
  checkoutOptions: [],
  checkoutPrice: BASE_PACK_PRICE,
  userFontName: "",
  option5Price: 5,
  graphQLToken: undefined,
  authError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID
      };

    case STORE_EXPORT_TYPE:
      return {
        ...state,
        exportType: action.exportType
      };

    case PAYMENT_SUCCESSFUL:
      return {
        ...state,
        hasPayed: true,
        projects: action.projects
      };

    case STORE_CHOSEN_WORD:
      return {
        ...state,
        chosenWord: action.chosenWord
      };

    case STORE_CHOSEN_GLYPH:
      return {
        ...state,
        chosenGlyph: action.chosenGlyph
      };

    case CONNECT_TO_GRAPHCOOL:
      return {
        ...state,
        graphqlID: action.graphqlID,
        email: action.email,
        graphQLToken: action.graphQLToken,
        projects: action.projects,
        shouldLogout: action.shouldLogout,
        authError: ""
      };

    case STORE_PROJECT:
      return {
        ...state,
        projectID: action.projectID,
        projects: action.projects,
        projectName: action.projectName
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: action.projects
      };

    case STORE_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };

    case LOGOUT:
      return {
        ...state,
        email: "",
        exportType: undefined,
        hasPayed: false,
        chosenWord: DEFAULT_UI_WORD,
        graphqlID: undefined,
        graphQLToken: undefined,
        projects: [],
        projectID: undefined,
        projectName: undefined,
        shouldLogout: false
      };

    case STORE_PROJECT_INFOS:
      return {
        ...state,
        projectID: action.projectID,
        projectName: action.projectName
      };

    case CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize
      };

    case SWITCH_BLACK_ON_WHITE:
      return {
        ...state,
        isBlackOnWhite: !state.isBlackOnWhite
      };

    case SWITCH_GLYPH_MODE:
      return {
        ...state,
        isGlyphMode: !state.isGlyphMode
      };

    case CHANGE_CHECKOUT_ORDER:
      return {
        ...state,
        checkoutOptions: action.checkoutOptions,
        checkoutPrice: action.checkoutPrice,
        userFontName: action.fontName,
        option5Price: action.option5Price,
      };

    case RESET_CHECKOUT_OPTIONS:
      return {
        ...state,
        checkoutOptions: [],
        checkoutPrice: BASE_PACK_PRICE
      };

    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.authError
      };
    default:
      return state;
  }
};

export const storeProject = (fontName, bought = false) => (
  dispatch,
  getState
) => {
  console.log("========STORE PROJECT========");
  console.log("Bought?");
  console.log(bought);
  const { currentPreset, choicesMade, need } = getState().font;
  console.log(choicesMade);
  const {
    projectID,
    graphqlID,
    checkoutOptions,
    graphQLToken
  } = getState().user;
  let filteredCheckoutOptions = [];
  if (bought) {
    checkoutOptions.forEach(option => {
      if (option.selected) {
        filteredCheckoutOptions.push(option.dbName);
      }
    });
    console.log(filteredCheckoutOptions);
  }
  if (graphqlID) {
    console.log(`Bearer ${graphQLToken}`);
    const client = new GraphQLClient(GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${graphQLToken}`
      }
    });
    client
      .request(getUserProjects())
      .then(data => {
        if (
          data.user.uniqueProjects.find(project => project.id === projectID)
        ) {
          console.log("project already found on database. updating it");
          client
            .request(
              updateProject(
                projectID,
                choicesMade,
                fontName,
                bought,
                filteredCheckoutOptions
              )
            )
            .then(res => {
              console.log(res);
              dispatch({
                type: STORE_PROJECT,
                projectID: res.updateUniqueProject.id,
                projects: res.updateUniqueProject.user.uniqueProjects,
                projectName: fontName
              });
              dispatch(loadLibrary());
              dispatch(setStable());
            })
            .catch(err => console.log(err));
        } else {
          console.log("project not found, saving it on database");
          client
            .request(
              addProjectToUser(
                graphqlID,
                currentPreset.id,
                choicesMade,
                fontName,
                bought,
                need,
                filteredCheckoutOptions
              )
            )
            .then(res => {
              console.log(res);
              const metadata = {
                unique_preset: res.createUniqueProject.id,
                choices_made: choicesMade
                  .map((choice, index) => {
                    if (index !== 0) return choice.name;
                    return (
                      currentPreset.variant.family.name +
                      currentPreset.variant.name
                    );
                  })
                  .toString()
              };
              /* global Intercom*/
              Intercom("update", {
                unique_finished_fonts:
                  res.createUniqueProject.user.uniqueProjects.length
              });
              /* global Intercom*/
              Intercom("trackEvent", "unique-finished-font", metadata);
              dispatch({
                type: STORE_PROJECT,
                projectID: res.createUniqueProject.id,
                projects: res.createUniqueProject.user.uniqueProjects,
                projectName: fontName
              });
              dispatch(loadLibrary());
              dispatch(setStable());
            });
        }
      })
      .catch(error => console.log(error));
  }
};

export const deleteUserProject = projectID => (dispatch, getState) => {
  console.log("========DELETE PROJECT========");
  const { graphQLToken, graphqlID, projects } = getState().user;
  let newProjects = [...projects];
  if (graphQLToken && graphqlID) {
    const client = new GraphQLClient(GRAPHQL_API, {
      headers: {
        Authorization: `Bearer ${graphQLToken}`
      }
    });

    client
      .request(getUserProjects(graphqlID))
      .then(data => {
        if (
          data.user.uniqueProjects.find(project => project.id === projectID)
        ) {
          console.log("project found on database. deleting it");
          client.request(deleteProject(projectID)).then(res => {
            newProjects.splice(
              newProjects.findIndex(e => (e.id = projectID)),
              1
            );
            dispatch({
              type: DELETE_PROJECT,
              projects: newProjects
            });
          });
        } else {
          console.log("project not found in user DB");
        }
      })
      .catch(error => console.log(error));
  }
};

export const updateProjectInfos = (projectID, projectName) => dispatch => {
  dispatch({
    type: STORE_PROJECT_INFOS,
    projectID,
    projectName
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export const switchBlackOnWhite = () => dispatch => {
  dispatch({
    type: SWITCH_BLACK_ON_WHITE
  });
};

export const switchGlyphMode = () => dispatch => {
  dispatch({
    type: SWITCH_GLYPH_MODE
  });
};

export const changeFontSize = fontSize => dispatch => {
  dispatch({
    type: CHANGE_FONT_SIZE,
    fontSize
  });
};

export const storeExportType = exportType => dispatch => {
  console.log("> Storing export type");
  console.log(exportType);
  dispatch({
    type: STORE_EXPORT_TYPE,
    exportType
  });
};

export const resetCheckout = () => dispatch =>
  dispatch({ type: RESET_CHECKOUT_OPTIONS });

export const storeChosenWord = chosenWord => dispatch => {
  dispatch({
    type: STORE_CHOSEN_WORD,
    chosenWord:
      chosenWord.length > 1
        ? chosenWord.trim().replace(/&nbsp;/gi, "")
        : DEFAULT_UI_WORD
  });
  dispatch(updateSubset());
};

export const storeChosenGlyph = chosenGlyph => dispatch => {
  dispatch({
    type: STORE_CHOSEN_GLYPH,
    chosenGlyph:
      chosenGlyph.length > 0
        ? chosenGlyph
            .trim()
            .replace(/&nbsp;/gi, "")
            .substr(chosenGlyph.length - 1)
        : DEFAULT_UI_GLYPH
  });
  dispatch(updateSubset());
};

export const afterPayment = res => (dispatch, getState) => {
  const { userFontName, graphQLToken } = getState().user;
  const { data } = res;
  const isPayed = data.paid;
  const userStripeEmail = data.source.metadata.name;
  if (graphQLToken) {
    dispatch(storeProject(userFontName, isPayed));
  } else {
    dispatch(
      push({
        pathname: "/app/auth",
        authData: {
          callback: storeProject,
          fontName: userFontName,
          type: "boughtFont"
        }
      })
    );
  }
};

export const updateCheckoutOptions = (checkoutOptions, fontName) => (
  dispatch,
  getState
) => {
  const { currencyRates, currency } = getState().ui;
  fx.rates = currencyRates.rates;
  fx.base = currencyRates.base;
  let price = BASE_PACK_PRICE;
  checkoutOptions.forEach(option => {
    if (option.selected) {
      price = price + option.price;
    }
  });
  const checkoutPrice = fx.convert(price, { from: 'USD', to: currency });
  dispatch({
    type: CHANGE_CHECKOUT_ORDER,
    checkoutOptions: [...checkoutOptions],
    checkoutPrice,
    option5Price: fx.convert(5, { from: 'USD', to: currency }),
    fontName
  });
};

export const loginWithTwitter = (
  { oauthVerifier, oauthToken, error },
  authData
) => dispatch => {
  request(GRAPHQL_API, authenticateTwitterUser(oauthToken, oauthVerifier))
    .then(res => {
      dispatch(loginToGraphCool(res.authenticateTwitterUser.token, authData));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        authError: err
      });
    });
};

export const loginWithFacebook = (response, authData) => dispatch => {
  const token = response.accessToken;
  request(GRAPHQL_API, authenticateFacebookUser(token))
    .then(res => {
      dispatch(loginToGraphCool(res.authenticateFacebookUser.token, authData));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        authError: err
      });
    });
};

export const loginWithGoogle = (response, authData) => dispatch => {
  console.log("logging in with google");
  console.log(authData);
  const token = response.accessToken;
  request(GRAPHQL_API, authenticateGoogleUser(token))
    .then(res => {
      dispatch(loginToGraphCool(res.authenticateGoogleUser.token, authData));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        authError: err
      });
    });
};

export const loginWithEmail = (email, password, authData) => dispatch => {
  request(GRAPHQL_API, authenticateUser(email, password))
    .then(res => {
      dispatch(loginToGraphCool(res.authenticateEmailUser.token, authData));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        authError: err.response.errors[0].functionError
      });
    });
};

export const signupWithEmail = (
  email,
  password,
  firstName,
  lastName,
  authData
) => dispatch => {
  request(GRAPHQL_API, signupUser(email, password, firstName, lastName))
    .then(res => {
      dispatch(loginWithEmail(email, password, authData));
    })
    .catch(err => console.log(err));
};

export const loginToGraphCool = (accessToken, authData) => dispatch => {
  console.log("=========CONNECTING TO GRAPHCOOL DATABASE============");
  const client = new GraphQLClient(GRAPHQL_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  client
    .request(getUserProjects())
    .then(res => {
      console.log("> User connected on Prototypo Graphcool");
      console.log(res);
      dispatch({
        type: CONNECT_TO_GRAPHCOOL,
        email: res.user.email,
        graphqlID: res.user.id,
        graphQLToken: accessToken,
        projects: res.user.uniqueProjects,
        shouldLogout: false
      });
      /* global Intercom*/
      Intercom("update", { email: res.user.email });
      if (authData && Object.keys(authData).length > 1) {
        dispatch(
          authData.callback(authData.fontName, authData.type === "boughtFont")
        );
      } else dispatch(loadLibrary());
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: CONNECT_TO_GRAPHCOOL,
        email: undefined,
        graphQLToken: undefined,
        graphqlID: undefined,
        projects: [],
        shouldLogout: true
      });
    });
};
