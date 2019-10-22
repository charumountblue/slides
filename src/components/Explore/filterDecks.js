// import Decks from "./decksList.json";

export default function filterDecks(searchText, maxResults, Decks) {
  // console.log("decks ffff",Decks[0].title);
  return Object.values(Decks)
    .filter(deck => {
      if (
        deck.title.toLowerCase().includes(searchText.toLowerCase()) ||
        deck.description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}
