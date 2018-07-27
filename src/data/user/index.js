import {push} from 'react-router-redux';
import {request, GraphQLClient} from 'graphql-request';
import fx from 'money';
import {setStable} from '../ui';
import {
	addProjectToUser,
	authenticateUser,
	authenticateFacebookUser,
	authenticateGoogleUser,
	authenticateTwitterUser,
	authenticateAnonymousUser,
	getPresetExportedCount,
	updatePresetExportedCount,
	signupUser,
	getUserProjects,
	updateProject,
	deleteProject,
} from '../queries';
import {updateSubset, loadLibrary} from '../font';
import {
	DEFAULT_UI_WORD,
	DEFAULT_UI_GLYPH,
	GRAPHQL_API,
	BASE_PACK_PRICE,
	BASE_VARIANT_PRICE,
} from '../constants';

export const STORE_USER_EMAIL = 'user/STORE_USER_EMAIL';
export const STORE_EXPORT_TYPE = 'user/STORE_EXPORT_TYPE';
export const STORE_CHOSEN_WORD = 'user/STORE_CHOSEN_WORD';
export const STORE_CHOSEN_GLYPH = 'user/STORE_CHOSEN_GLYPH';
export const PAYMENT_SUCCESSFUL = 'user/PAYMENT_SUCCESSFUL';
export const CONNECT_TO_GRAPHCOOL = 'user/CONNECT_TO_GRAPHCOOL';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';
export const STORE_PROJECT = 'user/STORE_PROJECT';
export const STORE_PROJECTS = 'user/STORE_PROJECTS';
export const STORE_PROJECT_INFOS = 'user/STORE_PROJECT_INFOS';
export const CHANGE_FONT_SIZE = 'user/CHANGE_FONT_SIZE';
export const SWITCH_BLACK_ON_WHITE = 'user/SWITCH_BLACK_ON_WHITE';
export const SWITCH_GLYPH_MODE = 'user/SWITCH_GLYPH_MODE';
export const CHANGE_CHECKOUT_ORDER = 'user/CHANGE_CHECKOUT_ORDER';
export const RESET_CHECKOUT_OPTIONS = 'user/RESET_CHECKOUT_OPTIONS';
export const DELETE_PROJECT = 'user/DELETE_PROJECT';
export const LOGOUT = 'user/LOGOUT';
export const UPDATE_RECOMMANDATIONS = 'user/UPDATE_RECOMMANDATIONS';
export const STORE_COUPON = 'user/STORE_COUPON';

const initialState = {
	email: '',
	exportType: undefined,
	hasPayed: false,
	chosenWord: DEFAULT_UI_WORD,
	graphqlID: undefined,
	projects: [],
	currentProject: {id: undefined, name: undefined},
	shouldLogout: false,
	fontSize: 50,
	isBlackOnWhite: true,
	isGlyphMode: false,
	chosenGlyph: DEFAULT_UI_GLYPH,
	checkoutOptions: [],
	checkoutPrice: BASE_PACK_PRICE,
	option5Price: BASE_VARIANT_PRICE,
	graphQLToken: undefined,
	basePrice: BASE_PACK_PRICE,
	authError: '',
	recommandations: {},
	coupon: {},
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
				projects: action.projects,
			};

		case STORE_CHOSEN_WORD:
			return {
				...state,
				chosenWord: action.chosenWord,
			};

		case STORE_CHOSEN_GLYPH:
			return {
				...state,
				chosenGlyph: action.chosenGlyph,
			};

		case CONNECT_TO_GRAPHCOOL:
			return {
				...state,
				graphqlID: action.graphqlID,
				email: action.email,
				graphQLToken: action.graphQLToken,
				projects: action.projects,
				shouldLogout: action.shouldLogout,
				authError: '',
				anonymous: action.anonymous || false,
			};

		case STORE_PROJECT:
			return {
				...state,
				currentProject: action.currentProject,
				projects: action.projects,
			};

		case DELETE_PROJECT:
			return {
				...state,
				projects: action.projects,
			};

		case STORE_PROJECTS:
			return {
				...state,
				projects: action.projects,
			};

		case LOGOUT:
			return {
				...state,
				email: '',
				exportType: undefined,
				hasPayed: false,
				chosenWord: DEFAULT_UI_WORD,
				graphqlID: undefined,
				graphQLToken: undefined,
				projects: [],
				currentProject: {},
				projectName: undefined,
				shouldLogout: false,
			};

		case STORE_PROJECT_INFOS:
			return {
				...state,
				currentProject: {
					id: action.id,
					name: action.name,
					bought: action.bought,
				},
			};

		case CHANGE_FONT_SIZE:
			return {
				...state,
				fontSize: action.fontSize,
			};

		case SWITCH_BLACK_ON_WHITE:
			return {
				...state,
				isBlackOnWhite: !state.isBlackOnWhite,
			};

		case SWITCH_GLYPH_MODE:
			return {
				...state,
				isGlyphMode: !state.isGlyphMode,
			};

		case CHANGE_CHECKOUT_ORDER:
			return {
				...state,
				checkoutOptions: action.checkoutOptions,
				checkoutPrice: action.checkoutPrice,
				option5Price: action.option5Price,
				basePrice: action.basePrice,
			};

		case RESET_CHECKOUT_OPTIONS:
			return {
				...state,
				checkoutOptions: [],
				checkoutPrice: BASE_PACK_PRICE,
			};

		case LOGIN_ERROR:
			return {
				...state,
				authError: action.authError,
			};
		case UPDATE_RECOMMANDATIONS:
			return {
				...state,
				recommandations: action.recommandations,
			};
		case STORE_COUPON:
			return {
				...state,
				coupon: action.coupon,
			};
		default:
			return state;
	}
};

export const storeProject = (fontName, {bought = false, noRedirect} = {}) => (
	dispatch,
	getState,
) => {
	const {currentPreset, choicesMade, need} = getState().font;
	const {
		currentProject: {id: projectId},
		graphqlID,
		checkoutOptions,
		graphQLToken,
	} = getState().user;
	const filteredCheckoutOptions = [];
	if (bought) {
		checkoutOptions.forEach((option) => {
			if (option.selected) {
				filteredCheckoutOptions.push(option.dbName);
			}
		});
	}
	if (graphqlID) {
		const client = new GraphQLClient(GRAPHQL_API, {
			headers: {
				Authorization: `Bearer ${graphQLToken}`,
			},
		});
		client.request(getUserProjects()).then((data) => {
			if (
				data.user.uniqueProjects.find((project) => project.id === projectId)
			) {
				client
					.request(
						updateProject(
							projectId,
							choicesMade,
							encodeURI(fontName),
							bought,
							filteredCheckoutOptions,
						),
					)
					.then((res) => {
						const {bought, name, id} = res.updateUniqueProject;
						dispatch({
							type: STORE_PROJECT,
							currentProject: {
								bought,
								name,
								id,
							},
							projects: res.updateUniqueProject.user.uniqueProjects,
						});
						if (!noRedirect) {
							dispatch(loadLibrary());
						}
						dispatch(setStable());
					});
			} else {
				client
					.request(
						addProjectToUser(
							graphqlID,
							currentPreset.id,
							choicesMade,
							encodeURI(fontName),
							bought,
							need,
							filteredCheckoutOptions,
						),
					)
					.then((res) => {
						const {bought, name, id} = res.createUniqueProject;
						const metadata = {
							fontName,
							unique_preset: id,
							choices_made: choicesMade
								.map((choice, index) => {
									if (index !== 0) return choice.name;
									return (
										currentPreset.variant.family.name +
										currentPreset.variant.name
									);
								})
								.toString(),
						};
						/* global Intercom */
						/* global fbq */
						/* global ga */
						try {
							fbq('track', 'AddToWishlist', {
								content_name: currentPreset.variant.family.name,
								content_category: 'Font',
								referrer: document.referrer,
								userAgent: navigator.userAgent,
								language: navigator.language,
							});
							ga(
								'send',
								'event',
								'Font',
								'Saved',
								currentPreset.variant.family.name,
							);
							Intercom('update', {
								unique_saved_fonts:
									res.createUniqueProject.user.uniqueProjects.length,
							});
							Intercom('trackEvent', 'unique-saved-font', metadata);
						} catch (e) {}
						dispatch({
							type: STORE_PROJECT,
							currentProject: {
								bought,
								name,
								id,
							},
							// projectBought: bought,
							// projectID: res.createUniqueProject.id,
							projects: res.createUniqueProject.user.uniqueProjects,
							// projectName: fontName,
						});
						if (!noRedirect) {
							dispatch(loadLibrary());
						}
						dispatch(setStable());
					});
			}
		});
	}
};

export const deleteUserProject = (projectId) => (dispatch, getState) => {
	const {graphQLToken, graphqlID, projects} = getState().user;
	const newProjects = [...projects];
	if (graphQLToken && graphqlID) {
		const client = new GraphQLClient(GRAPHQL_API, {
			headers: {
				Authorization: `Bearer ${graphQLToken}`,
			},
		});

		client.request(getUserProjects(graphqlID)).then((data) => {
			if (
				data.user.uniqueProjects.find((project) => project.id === projectId)
			) {
				client.request(deleteProject(projectId)).then(() => {
					newProjects.splice(
						newProjects.findIndex((e) => e.id === projectId),
						1,
					);
					dispatch({
						type: DELETE_PROJECT,
						projects: newProjects,
					});
				});
			} else {
			}
		});
	}
};

export const updateProjectInfos = (id, name, bought) => (dispatch) => {
	dispatch({
		type: STORE_PROJECT_INFOS,
		id,
		name,
		bought,
	});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('uniqueGraphcoolToken');
	dispatch({
		type: LOGOUT,
	});
};

export const switchBlackOnWhite = () => (dispatch) => {
	dispatch({
		type: SWITCH_BLACK_ON_WHITE,
	});
};

export const switchGlyphMode = () => (dispatch) => {
	dispatch({
		type: SWITCH_GLYPH_MODE,
	});
};

export const changeFontSize = (fontSize) => (dispatch) => {
	dispatch({
		type: CHANGE_FONT_SIZE,
		fontSize,
	});
};

export const storeRecommandations = (recommandations, currentStep) => (
	dispatch,
	getState,
) => {
	const currentReco = getState().user.recommandations;
	dispatch({
		type: UPDATE_RECOMMANDATIONS,
		recommandations: {
			...currentReco,
			[currentStep]: recommandations,
		},
	});
};

export const storeExportType = (exportType) => (dispatch) => {
	dispatch({
		type: STORE_EXPORT_TYPE,
		exportType,
	});
};

export const storeCoupon = (coupon) => (dispatch) => {
	dispatch({
		type: STORE_COUPON,
		coupon,
	});
};

export const resetCheckout = () => (dispatch) =>
	dispatch({type: RESET_CHECKOUT_OPTIONS});

export const storeChosenWord = (chosenWord) => (dispatch) => {
	dispatch({
		type: STORE_CHOSEN_WORD,
		chosenWord:
			chosenWord.length > 1
				? chosenWord.trim().replace(/&nbsp;/gi, '')
				: '&nbsp;',
	});
	dispatch(updateSubset());
};

export const storeChosenGlyph = (chosenGlyph) => (dispatch) => {
	dispatch({
		type: STORE_CHOSEN_GLYPH,
		chosenGlyph:
			chosenGlyph.length > 0
				? chosenGlyph
						.trim()
						.replace(/&nbsp;/gi, '')
						.substr(chosenGlyph.length - 1)
				: '&nbsp;',
	});
	dispatch(updateSubset());
};

export const afterPayment = (res) => (dispatch, getState) => {
	const {
		currentProject: {name},
		graphQLToken,
		checkoutOptions,
		checkoutPrice,
		anonymous,
	} = getState().user;
	const {currency} = getState().ui;
	const {currentPreset} = getState().font;
	const {data} = res;
	const isPayed = data.paid;
	dispatch(storeCoupon({}));
	/* global Intercom */
	/* global fbq */
	/* global ga */
	try {
		fbq('track', 'Purchase', {
			content_name: 'Package',
			content_type: 'Font',
			currency,
			contents: checkoutOptions,
			num_items: checkoutOptions.length,
			value: checkoutPrice,
			referrer: document.referrer,
			userAgent: navigator.userAgent,
			language: navigator.language,
		});
		ga('send', 'event', 'Checkout', 'Stripe', 'Finished');
		ga('ecommerce:addTransaction', {
			id: graphQLToken,
			affiliation: 'Unique',
			revenue: checkoutPrice,
			currency,
		});
		ga('ecommerce:send');

		Intercom('trackEvent', 'unique-bought-font');
	} catch (e) {}
	request(GRAPHQL_API, getPresetExportedCount(currentPreset.id)).then((data) =>
		request(
			GRAPHQL_API,
			updatePresetExportedCount(
				currentPreset.id,
				data.Preset.exported ? data.Preset.exported + 1 : 1,
			),
		),
	);
	if (graphQLToken && !anonymous) {
		dispatch(storeProject(name, {bought: isPayed}));
	} else {
		dispatch(storeProject(name, {bought: isPayed, noRedirect: true}));
		dispatch(
			push({
				pathname: '/app/auth',
			}),
		);
	}
	dispatch(setStable());
};

export const updateCheckoutOptions = (checkoutOptions, fontName) => (
	dispatch,
	getState,
) => {
	const {currencyRates, currency} = getState().ui;
	fx.rates = currencyRates.rates;
	fx.base = currencyRates.base;
	let price = BASE_PACK_PRICE;
	let basePrice = BASE_PACK_PRICE;
	checkoutOptions.forEach((option) => {
		if (option.selected) {
			price += option.price;
			if (option.price > 0) {
				basePrice += option.price;
			}
		}
	});
	const checkoutPrice =
		Math.round(fx.convert(price, {from: 'USD', to: currency}) * 2) / 2 - 0.01;
	dispatch({
		type: CHANGE_CHECKOUT_ORDER,
		checkoutOptions: [...checkoutOptions],
		checkoutPrice,
		option5Price: BASE_VARIANT_PRICE,
		basePrice:
			Math.round(fx.convert(basePrice, {from: 'USD', to: currency}) * 2) / 2 -
			0.01,
		fontName,
	});
	/* global fbq */
	try {
		fbq('track', 'AddToCart', {
			content_name: 'Package',
			currency,
			value: checkoutPrice,
			contents: checkoutOptions,
			referrer: document.referrer,
			userAgent: navigator.userAgent,
			language: navigator.language,
		});
	} catch (e) {}
};

export const loginWithTwitter = ({oauthVerifier, oauthToken}, token) => (
	dispatch,
) => {
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client
		.request(authenticateTwitterUser(oauthToken, oauthVerifier))
		.then((res) => {
			dispatch(loginToGraphCool(res.authenticateTwitterUser.token));
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_ERROR,
				authError: err,
			});
		});
};

export const loginWithFacebook = (response, token) => (dispatch) => {
	const {accessToken} = response;
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client
		.request(authenticateFacebookUser(accessToken))
		.then((res) => {
			dispatch(loginToGraphCool(res.authenticateFacebookUser.token));
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_ERROR,
				authError: err,
			});
		});
};

export const loginWithGoogle = (response, token) => (dispatch) => {
	const {accessToken} = response;
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client
		.request(authenticateGoogleUser(accessToken))
		.then((res) => {
			dispatch(loginToGraphCool(res.authenticateGoogleUser.token));
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_ERROR,
				authError: err,
			});
		});
};

export const loginWithEmail = (email, password, token) => (dispatch) => {
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client
		.request(authenticateUser(email, password))
		.then((res) => {
			dispatch(loginToGraphCool(res.authenticateEmailUser.token));
		})
		.catch((err) => {
			dispatch({
				type: LOGIN_ERROR,
				authError: err.response.errors[0].functionError,
			});
		});
};

export const signupWithEmail = (
	email,
	password,
	firstName,
	lastName,
	token,
) => (dispatch) => {
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	client.request(signupUser(email, password, firstName, lastName)).then(() => {
		dispatch(loginWithEmail(email, password));
	});
};

export const anonymousAuth = () => (dispatch) => {
	const graphcoolToken = localStorage.getItem('uniqueGraphcoolToken');
	if (graphcoolToken) {
		dispatch(loginToGraphCool(graphcoolToken, false));
	} else {
		request(GRAPHQL_API, authenticateAnonymousUser)
			.then((res) => {
				const {token, id} = res.authenticateAnonymousUser;
				dispatch({
					type: CONNECT_TO_GRAPHCOOL,
					graphQLToken: token,
					graphqlID: id,
					anonymous: true,
				});
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_ERROR,
					authError: err.response.errors[0].functionError,
				});
			});
	}
};

export const loginToGraphCool = (accessToken, shouldRedirect = true) => (
	dispatch,
	getState,
) => {
	localStorage.setItem('uniqueGraphcoolToken', accessToken);
	const {bought} = getState().user.currentProject;
	/* global fbq */
	/* global ga */
	try {
		fbq('track', 'CompleteRegistration', {
			content_name: 'Logged In',
			status: bought ? 'bought' : 'save',
			referrer: document.referrer,
			userAgent: navigator.userAgent,
			language: navigator.language,
		});
		ga('send', 'event', 'User', 'LoggedIn', bought ? 'bought' : 'save');
	} catch (e) {}
	const client = new GraphQLClient(GRAPHQL_API, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	client
		.request(getUserProjects())
		.then((res) => {
			dispatch({
				type: CONNECT_TO_GRAPHCOOL,
				email: res.user.email,
				graphqlID: res.user.id,
				graphQLToken: accessToken,
				projects: res.user.uniqueProjects,
				shouldLogout: false,
			});
			/* global Intercom */
			Intercom('update', {email: res.user.email, occupation: 'unique_user'});
			Intercom('update', {
				'job-title': 'unique_user',
			});
			Intercom('trackEvent', 'logged-from-unique');
			if (shouldRedirect) {
				dispatch(loadLibrary());
			}
		})
		.catch(() => {
			dispatch({
				type: CONNECT_TO_GRAPHCOOL,
				email: undefined,
				graphQLToken: undefined,
				graphqlID: undefined,
				projects: [],
				shouldLogout: true,
			});
		});
};
