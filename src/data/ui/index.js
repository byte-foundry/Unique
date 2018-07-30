import LocaleCurrency from 'locale-currency';

export const SET_UI_UNSTABLE = 'ui/SET_INSTABLE';
export const SET_UI_STABLE = 'ui/SET_STABLE';
export const SET_LOCALE = 'ui/SET_LOCALE';
export const SET_CURRENCY_RATES = 'ui/SET_CURRENCY_RATES';
export const TOGGLE_TOOLTIPS = 'ui/TOGGLE_TOOLTIPS';
export const SET_ERROR_PRESETS = 'ui/SET_ERROR_PRESETS';
export const SET_ERROR_PAYMENT = 'ui/SET_ERROR_PAYMENT';
export const SET_FETCHING_PRESETS = 'ui/SET_FETCHING_PRESETS';

const initialState = {
	unstable: false,
	locale_full: navigator.language,
	locale: navigator.language.split(/[-_]/)[0],
	shouldShowTooltips: false,
	currencyRates: undefined,
	currency: LocaleCurrency.getCurrency(navigator.language)
		? LocaleCurrency.getCurrency(navigator.language)
		: 'USD',
	errorPresets: false,
	fetchingPresets: false,
	errorPayment: false,
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

		case SET_LOCALE:
			return {
				...state,
				locale: action.locale,
			};

		case TOGGLE_TOOLTIPS:
			return {
				...state,
				shouldShowTooltips: !state.shouldShowTooltips,
			};

		case SET_CURRENCY_RATES:
			return {
				...state,
				currencyRates: action.currencyRates,
			};

		case SET_ERROR_PRESETS:
			return {
				...state,
				errorPresets: action.errorPresets,
			};

		case SET_FETCHING_PRESETS:
			return {
				...state,
				fetchingPresets: action.fetchingPresets,
			};

		case SET_ERROR_PAYMENT:
			return {
				...state,
				errorPayment: action.status,
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

export const toggleTooltips = () => (dispatch) => {
	dispatch({
		type: TOGGLE_TOOLTIPS,
	});
};

export const setLocale = (locale) => (dispatch) => {
	dispatch({
		type: SET_LOCALE,
		locale: locale.toString(),
	});
};

export const setErrorPresets = (status) => (dispatch) => {
	dispatch({
		type: SET_ERROR_PRESETS,
		errorPresets: status,
	});
};

export const setErrorPayment = (status) => (dispatch) => {
	dispatch({
		type: SET_ERROR_PAYMENT,
		status,
	});
};

export const setFetchingPresets = (status) => (dispatch) => {
	dispatch({
		type: SET_FETCHING_PRESETS,
		fetchingPresets: status,
	});
};

export const getCurrencyRates = () => (dispatch) => {
	fetch(
		'https://bzawttxlqh.execute-api.eu-west-1.amazonaws.com/local/exchangeRates',
	)
		.then((response) => response.json())
		.then((currencyRates) => {
			dispatch({
				type: SET_CURRENCY_RATES,
				currencyRates,
			});
		});
};
