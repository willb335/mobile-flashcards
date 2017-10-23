import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = "MobileFlashCards:decks";

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(items => {
    return JSON.parse(items);
  });
}

export function saveDeckTitle(deckTitle) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckTitle]: { title: deckTitle, questions: [] }
    })
  );
}

export function addNewQuestionAnswer({ question, answer }, deckTitle, entries) {
  return new Promise((resolve, reject) => {
    const newQuestions = [{ question, answer }];
    const mergeThis = {
      [deckTitle]: {
        questions: [...entries[deckTitle].questions, ...newQuestions]
      }
    };
    resolve(
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(mergeThis))
    );
    reject(new Error("Could not merge into asynstorage"));
  });
}
