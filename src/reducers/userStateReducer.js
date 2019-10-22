import {
  FETCH_USER,
  CREATE_USER,
  FETCH_USER_DECKS,
  CREATE_NEW_DECK,
  SET_CURRENT_WORKING_DECK_ID,
  SET_CURRENT_WORKING_DECK,
  UPDATE_SLIDES_TO_DECK,
  FETCH_USER_DECK,
  FETCH_USER_DETAILS,
  FETCH_ALL_DECKS,
  UPDATE_DECKS_ON_DELETE
} from '../actions/types';

const initialState = {
  user: {},
  userdecks: [], //decks belonging to user
  viewDecks: [], //for viewing
  currentWorkingDeck: {},
  currentWorkingDeckId: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_USER_DECKS:
      return {
        ...state,
        userdecks: action.payload
      };
    case CREATE_NEW_DECK:
      return {
        ...state,
        currentWorkingDeckId: action.payload
      };
    case SET_CURRENT_WORKING_DECK_ID:
      return {
        ...state,
        currentWorkingDeckId: action.payload
      };
    case SET_CURRENT_WORKING_DECK:
      return {
        ...state,
        currentWorkingDeck: action.payload
      };
    case UPDATE_SLIDES_TO_DECK:
      return {
        ...state,
        currentWorkingDeck: action.payload
      };
    case FETCH_USER_DECK:
      return {
        ...state,
        currentWorkingDeck: action.payload
      };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_ALL_DECKS:
      return {
        ...state,
        viewDecks: action.payload
      };
    case UPDATE_DECKS_ON_DELETE:
      return {
        ...state,
        userdecks: action.payload
      };
    default:
      return state;
  }
}
