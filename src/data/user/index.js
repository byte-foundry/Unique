import { push } from "react-router-redux";
import { request, GraphQLClient } from "graphql-request";
import { setUnstable, setStable } from '../ui';
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
  updateProject,
  deleteProject,
} from "../queries";
import { setFontBought, updateSubset, loadLibrary } from "../font";
import {
  DEFAULT_UI_WORD,
  DEFAULT_UI_GLYPH,
  GRAPHQL_API,
  GRAPHQL_PROTOTYPO_API,
  BASE_PACK_PRICE
} from "../constants";

export const STORE_USER_EMAIL = "user/STORE_USER_EMAIL";
export const STORE_EXPORT_TYPE = "user/STORE_EXPORT_TYPE";
export const STORE_CHOSEN_WORD = "user/STORE_CHOSEN_WORD";
export const STORE_CHOSEN_GLYPH = "user/STORE_CHOSEN_GLYPH";
export const STORE_PROTOTYPO_USER = "user/STORE_PROTOTYPO_USER";
export const PAYMENT_SUCCESSFUL = "user/PAYMENT_SUCCESSFUL";
export const CONNECT_TO_GRAPHCOOL = "user/CONNECT_TO_GRAPHCOOL";
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
  prototypoUser: {},
  projects: [],
  projectID: undefined,
  projectName: undefined,
  shouldLogout: false,
  fontSize: 70,
  isBlackOnWhite: true,
  isGlyphMode: false,
  chosenGlyph: DEFAULT_UI_GLYPH,
  checkoutOptions: [],
  checkoutPrice: BASE_PACK_PRICE,
  userFontName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_EMAIL:
      return {
        ...state,
        email: action.email,
        graphqlID: action.graphqlID,
        prototypoUser: action.prototypoUser
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

    case STORE_PROTOTYPO_USER:
      return {
        ...state,
        prototypoUser: action.prototypoUser
      };

    case CONNECT_TO_GRAPHCOOL:
      return {
        ...state,
        graphqlID: action.graphqlID,
        email: action.email,
        projects: action.projects,
        prototypoUser: action.prototypoUser,
        shouldLogout: action.shouldLogout
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
        projects: action.projects,
      }

    case STORE_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      }

    case LOGOUT:
      return {
        ...state,
        email: "",
        exportType: undefined,
        hasPayed: false,
        chosenWord: DEFAULT_UI_WORD,
        graphqlID: undefined,
        prototypoUser: {},
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
      };

    case RESET_CHECKOUT_OPTIONS:
      return {
        ...state,
        checkoutOptions: [],
        checkoutPrice: BASE_PACK_PRICE
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
  const { currentPreset, choicesMade, need } = getState().font;
  console.log(choicesMade);
  const { projectID, graphqlID, checkoutOptions } = getState().user;
  let filteredCheckoutOptions = [];
  if (bought) {
    checkoutOptions.forEach(option => {
      if (option.selected) {
        filteredCheckoutOptions.push(option.dbName)
      }
    })
    console.log(filteredCheckoutOptions)
  }
  if (graphqlID) {
    request(GRAPHQL_API, getUserProjects(graphqlID))
      .then(data => {
        if (data.User.projects.find(project => project.id === projectID)) {
          console.log("project already found on database. updating it");
          request(
            GRAPHQL_API,
            updateProject(projectID, choicesMade, fontName, bought, filteredCheckoutOptions)
          ).then(res => {
            console.log(res);
            dispatch({
              type: STORE_PROJECT,
              projectID: res.updateProject.id,
              projects: res.updateProject.user.projects,
              projectName: fontName,
            });
            dispatch(loadLibrary());
            dispatch(setStable());
          });   
        } else {
          console.log("project not found, saving it on database");
          request(
            GRAPHQL_API,
            addProjectToUser(
              graphqlID,
              currentPreset.id,
              choicesMade,
              fontName,
              bought,
              need,
              filteredCheckoutOptions,
            )
          ).then(res => {
            const metadata = {
              unique_preset: res.createProject.id,
              choices_made: choicesMade
                .map((choice, index) => {
                  if (index !== 0) return choice.name;
                  return currentPreset.preset + currentPreset.variant;
                })
                .toString()
            };
            console.log(res);
            Intercom("update", {
              unique_finished_fonts: res.createProject.user.projects.length
            });
            Intercom("trackEvent", "unique-finished-font", metadata);
            dispatch({
              type: STORE_PROJECT,
              projectID: res.createProject.id,
              projects: res.createProject.user.projects,
              projectName: fontName
            });
            dispatch(loadLibrary());
            dispatch(setStable());
          });
        }
      })
      .catch(error => console.log(error));
  }
  // Else : user not logged in, adding the project to a "to be savec spot" that will be saved after email input
};

export const deleteUserProject = (projectID) => (
  dispatch,
  getState
) => {
  console.log("========DELETE PROJECT========");
  const { graphqlID, projects } = getState().user;
  let newProjects = [...projects]
  if (graphqlID) {
    request(GRAPHQL_API, getUserProjects(graphqlID))
      .then(data => {
        if (data.User.projects.find(project => project.id === projectID)) {
          console.log("project found on database. deleting it");
          request(
            GRAPHQL_API,
            deleteProject(projectID)
          ).then(res => {
            newProjects.splice(newProjects.findIndex(e => e.id = projectID), 1);
            dispatch({
              type: DELETE_PROJECT,
              projects: newProjects,
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

export const storeEmail = (email, fontName, payed = false) => (
  dispatch,
  getState
) => {
  console.log("========STORE EMAIL========");
  /* global Intercom*/
  const { currentPreset, choicesMade } = getState().font;
  request(GRAPHQL_API, findUser(email))
    .then(data => {
      if (data.User) {
        console.log(
          "> User found on Unique graphcool, checking if prototypo user exists"
        );
        request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
          .then(response => {
            dispatch({
              type: STORE_USER_EMAIL,
              email,
              graphqlID: data.User.id,
              prototypoUser: response.User ? response.User : {}
            });
            dispatch(storeProject(fontName, payed));
          })
          .catch(error => console.log(error));
      } else {
        request(GRAPHQL_API, createUser(email, currentPreset.id, choicesMade))
          .then(res => {
            console.log(
              "> User created on Unique, checking if prototypo user exists"
            );
            request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
              .then(response => {
                dispatch({
                  type: STORE_USER_EMAIL,
                  email,
                  graphqlID: res.createUser.id,
                  prototypoUser: response.User ? response.User : {}
                });
              })
              .catch(error => console.log(error));
            const metadata = {
              unique_preset: res.createUser.projects[0].id,
              choices_made: choicesMade
                .map((choice, index) => {
                  if (index !== 0) return choice.name;
                  return currentPreset.preset + currentPreset.variant;
                })
                .toString()
            };
            Intercom("update", { email, unique_finished_fonts: 1 });
            setTimeout(
              () => Intercom("trackEvent", "unique-finished-font", metadata),
              1500
            );
            dispatch(storeProject(fontName, payed));
          })
          .catch(error => console.log(error));
      }
    })
    .catch(error => console.log(error));
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
  const { userFontName } = getState().user;
  const { data } = res;
  const isPayed = data.paid;
  const userStripeEmail = data.source.metadata.name;
  dispatch(storeEmail(userStripeEmail, userFontName, isPayed));
};

export const exportFontToPrototypoWithAccount = (
  email,
  password,
  familyName,
  variantName
) => (dispatch, getState) => {
  console.log("=========EXPORT TO PROTOTYPO WITH ACCOUNT============");
  const { currentPreset, currentParams, initialValues } = getState().font;
  const { prototypoUser } = getState().user;
  request(GRAPHQL_PROTOTYPO_API, authenticateUser(email, password))
    .then(data => {
      const token = data.authenticateEmailUser.token;
      const client = new GraphQLClient(GRAPHQL_PROTOTYPO_API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      client
        .request(
          sendFontToPrototypo(
            prototypoUser.id,
            familyName,
            `${currentPreset.template}.ptf`,
            variantName,
            {
              ...initialValues,
              ...currentParams
            }
          )
        )
        .then(() => dispatch(push("/ptyposuccess")))
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  console.log("====================================");
};

export const updateCheckoutOptions = (checkoutOptions, fontName) => dispatch => {
  let price = BASE_PACK_PRICE;
  checkoutOptions.forEach(option => {
    if (option.selected) {
      price = price + option.price;
    }
  });
  dispatch({
    type: CHANGE_CHECKOUT_ORDER,
    checkoutOptions: [...checkoutOptions],
    checkoutPrice: price,
    fontName
  });
};

export const loginToGraphCool = accessToken => dispatch => {
  console.log("=========CONNECTING TO GRAPHCOOL DATABASE============");
  request(GRAPHQL_API, connectToGraphCool(accessToken))
    .then(data => {
      console.log(data);
      request(GRAPHQL_API, getUserProjects(data.authenticateUser.id))
        .then(res => {
          console.log(res);
          console.log(
            "> User connected on Unique, checking if prototypo user exists"
          );
          request(
            GRAPHQL_PROTOTYPO_API,
            getPrototypoUser(data.authenticateUser.email)
          )
            .then(response => {
              console.log(response);
              dispatch({
                type: CONNECT_TO_GRAPHCOOL,
                email: data.authenticateUser.email,
                graphqlID: data.authenticateUser.id,
                projects: res.User.projects,
                prototypoUser: response.User ? response.User : {},
                shouldLogout: false
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
      Intercom("update", { email: data.authenticateUser.email });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: CONNECT_TO_GRAPHCOOL,
        email: undefined,
        graphqlID: undefined,
        projects: [],
        prototypoUser: {},
        shouldLogout: true
      });
    });
};

export const exportFontToPrototypoWithoutAccount = (
  email,
  password,
  familyName,
  variantName,
  firstName,
  lastName
) => (dispatch, getState) => {
  console.log("=========EXPORT TO PROTOTYPO WITHOUT ACCOUNT============");
  const { currentPreset, currentParams, initialValues } = getState().font;
  request(
    GRAPHQL_PROTOTYPO_API,
    signupUser(email, password, firstName, lastName)
  )
    .then(created => {
      const prototypoId = created.signupEmailUser.id;
      request(GRAPHQL_PROTOTYPO_API, authenticateUser(email, password))
        .then(data => {
          const token = data.authenticateEmailUser.token;
          const client = new GraphQLClient(GRAPHQL_PROTOTYPO_API, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          client
            .request(
              sendFontToPrototypo(
                prototypoId,
                familyName,
                `${currentPreset.template}.ptf`,
                variantName,
                {
                  ...initialValues,
                  ...currentParams
                }
              )
            )
            .then(() => {
              dispatch({
                type: STORE_PROTOTYPO_USER,
                prototypoUser: {
                  id: prototypoId,
                  firstName
                }
              });
              dispatch(push("/ptyposuccess"));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  console.log("====================================");
};
