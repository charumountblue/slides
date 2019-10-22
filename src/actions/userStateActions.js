import {
  FETCH_USER,
  CREATE_USER,
  FETCH_USER_DECKS,
  CREATE_NEW_DECK,
  SET_CURRENT_WORKING_DECK_ID,
  SET_CURRENT_WORKING_DECK,
  UPDATE_SLIDES_TO_DECK,
  FETCH_USER_DETAILS,
  FETCH_ALL_DECKS,
  UPDATE_DECKS_ON_DELETE,
} from './types';
import firebase from '../components/fibebase';

export const fetchUser = () => (dispatch) => {
  // console.log('fetching name...');
  let user = firebase.getUser();
  dispatch({ type: FETCH_USER, payload: user });
};

export const createUser = (name, email, password) => async (dispatch) => {
  // console.log('creating user...');
  try {
    await firebase.register(name, email, password);
    let user = await firebase.getUser();
    await firebase.createUserDeck(user);
    dispatch({ type: CREATE_USER, payload: user });
  } catch (err) {
    alert(err);
  }
};

export const getUserDecks = (user) => async (dispatch) => {
  // console.log('getting Decks...');
  let data = await firebase.fetchUserDecks(user);
  dispatch({ type: FETCH_USER_DECKS, payload: data });
};

export const createDeck = (user, description, title) => async (dispatch) => {
  // console.log('creating new doc', user, description, title);
  let data = await firebase.newDeckForUser(user, description, title);
  dispatch({ type: CREATE_NEW_DECK, payload: data });
};
export const setDeckId = (id) => (dispatch) => {
  // console.log('in set deckid..');
  dispatch({ type: SET_CURRENT_WORKING_DECK_ID, payload: id });
};

export const setCurrentDeck = (deck) => (dispatch) => {
  // console.log('in Set Current Deck');
  dispatch({ type: SET_CURRENT_WORKING_DECK, payload: deck });
};

export const updateSlidesToDeck = (slides, deck) => async (dispatch) => {
  // console.log('Inside updateSlides', deck);
  let updatedDeck = { ...deck };
  updatedDeck.slides = [...slides];
  const resp = await firebase.updateSlides(slides, deck.idDeck);
  if (resp) {
    dispatch({ type: UPDATE_SLIDES_TO_DECK, payload: updatedDeck });
  } else {
    // console.log('Failed to update!');
  }
};

export const fetchUserDeck = (idDeck) => async (dispatch) => {
  const deck = await firebase.fetchUserDeck(idDeck);
  // console.log(idDeck);
  deck.idDeck = idDeck;
  dispatch({ type: SET_CURRENT_WORKING_DECK, payload: deck });
};

export const fetchUserDetails = (uid) => async (dispatch) => {
  const user = await firebase.fetchUserDetails(uid);
  user.uid = uid;
  user.displayName = user.name;
  // console.log('fetch user userAction', user);
  dispatch({ type: FETCH_USER_DETAILS, payload: user });
};

export const fetchAllDecks = () => async (dispatch) => {
  // console.log('user Action all');
  const decks = await firebase.fetchAllDecks();
  // console.log(decks.length, Array.isArray(decks));
  dispatch({ type: FETCH_ALL_DECKS, payload: decks });
};

export const deleteDeck = (idDeck, decks) => async (dispatch) => {
  await firebase.deleteDeckById(idDeck);
  let userDecks = [...decks];
  userDecks = await userDecks.filter((deck) => {
    return deck.idDeck !== idDeck;
  });
  dispatch({ type: UPDATE_DECKS_ON_DELETE, payload: userDecks });
};
