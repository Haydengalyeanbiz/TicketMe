//? ACTION TYPES
const SET_ALL_EVENTS = 'events/SET_ALL_EVENTS';
const SET_SELECTED_EVENT = 'events/SET_SELECTED_EVENT';
const SET_SELECTED_CATEGORY = 'events/SET_SELECTED_CATEGORY';

//? ACTION CREATORS
const setAllEvents = (events) => ({
	type: SET_ALL_EVENTS,
	payload: events,
});

const setSelectedEvent = (event) => ({
	type: SET_SELECTED_EVENT,
	payload: event,
});
export const setSelectedCategory = (category) => ({
	type: SET_SELECTED_CATEGORY,
	payload: category,
});

// ! THUNKS
//? FETCH ALL EVENTS
export const fetchAllEvents = () => async (dispatch) => {
	try {
		const response = await fetch('/api/events');
		if (response.ok) {
			const events = await response.json();
			dispatch(setAllEvents(events));
		}
	} catch (error) {
		console.error('Failed to fetch all events:', error);
	}
};

//? FETCH A SINGLE EVENT
export const fetchEventById = (id) => async (dispatch) => {
	try {
		const response = await fetch(`/api/events/${id}`);
		if (response.ok) {
			const event = await response.json();
			dispatch(setSelectedEvent(event));
		}
	} catch (error) {
		console.error('Failed to fetch event by ID:', error);
	}
};

const initialState = {
	allEvents: [],
	eventId: null,
	eventDetails: null,
	selectedCategory: null,
};

const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_EVENTS:
			return {
				...state,
				allEvents: action.payload,
			};
		case SET_SELECTED_EVENT:
			return {
				...state,
				eventId: action.payload.id,
				eventDetails: action.payload,
			};
		case SET_SELECTED_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload,
			};
		default:
			return state;
	}
};

export default eventReducer;
