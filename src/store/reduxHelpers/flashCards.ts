import { useSelector } from "react-redux";
import { setSetting } from "../reducer";
import store from "../store";
import { STRINGS } from "../../utilities/constants";

export const CreateFlashcardCategory = ({
  language = "en",
  category,
  heading,
  totalCards,
  completedCards,
  cardData,
  id = STRINGS.STORAGE.FLASH_CARDS_DATA,
}) => {
  const flashcards = store.getState().language[id];
  const time = new Date().toISOString();
  let flashcardsObj = {};

  if (!flashcards || !flashcards[language] || !flashcards[language][category]) {
    // If the category doesn't exist, create a new one
    flashcardsObj = {
      [language]: {
        [category]: {
          heading,
          totalCards,
          completedCards,
          lastUpdateOn: time,
          cardData,
        },
      },
    };
  } else {
    // If the category exists, update it
    flashcardsObj = { ...flashcards };
    flashcardsObj[language][category] = {
      ...flashcards[language][category],
      heading,
      totalCards,
      completedCards,
      lastUpdateOn: time,
      cardData,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: flashcardsObj,
    })
  );

  return flashcardsObj;
};

export const UpdateFlashcard = ({
  language = "en",
  category,
  cardIndex,
  cardDetails,
  id = STRINGS.STORAGE.FLASH_CARDS_DATA,
}) => {
  const flashcards = store.getState().language[id];
  const time = new Date().toISOString();
  let flashcardsObj = {};

  if (flashcards && flashcards[language] && flashcards[language][category]) {
    // If the category exists, update the flashcard
    flashcardsObj = { ...flashcards };
    flashcardsObj[language][category].cardData[cardIndex] = {
      ...flashcards[language][category].cardData[cardIndex],
      ...cardDetails,
      lastUpdateOn: time,
    };

    // Update the completedCards count
    flashcardsObj[language][category].completedCards = flashcards[language][
      category
    ].cardData.reduce(
      (count, card) => (card.isCompleted ? count + 1 : count),
      0
    );

    store.dispatch(
      setSetting({
        key: id,
        value: flashcardsObj,
      })
    );
  }

  return flashcardsObj;
};

// CreateFlashcardCategory({
//   language: "en",
//   category: "CATEGORY_1",
//   heading: "New Category Heading",
//   totalCards: 30,
//   completedCards: 13,
//   cardData: [
//     {
//       frontText: "A",
//       backText: "definition of A",
//       isCompleted: false,
//       isSaved: true,
//       otherDetails: {},
//     },
//     // More cards...
//   ],
// });

// UpdateFlashcard({
//   language: "en",
//   category: "CATEGORY_1",
//   cardIndex: 0,
//   cardDetails: {
//     frontText: "B",
//     backText: "definition of B",
//     isCompleted: true,
//     isSaved: false,
//     otherDetails: {},
//   },
// });

// Custom hook to get flashcard category details
export const useFlashcardCategoryDetails = (language, category) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.FLASH_CARDS_DATA]?.[language]?.[
          category
        ]
    ) ?? {}
  );
};

// Custom hook to get completed cards
export const useCompletedCards = (language, category) => {
  return useSelector(
    (state) =>
      state.language?.[STRINGS.STORAGE.FLASH_CARDS_DATA]?.[language]?.[
        category
      ]?.cardData?.filter((card) => card.isCompleted) ?? []
  );
};

// Custom hook to get incomplete cards
export const useIncompleteCards = (language, category) => {
  return useSelector(
    (state) =>
      state.language?.[STRINGS.STORAGE.FLASH_CARDS_DATA]?.[language]?.[
        category
      ]?.cardData?.filter((card) => !card.isCompleted) ?? []
  );
};

// Custom hook to get completed categories
export const useCompletedCategories = (language) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.FLASH_CARDS_DATA]?.[language] || {}
      )?.filter(
        (category) => category.completedCards === category.totalCards
      ) ?? []
  );
};

// Custom hook to get incomplete categories
export const useIncompleteCategories = (language) => {
  return useSelector(
    (state) =>
      Object.values(
        state.language?.[STRINGS.STORAGE.FLASH_CARDS_DATA]?.[language] || {}
      )?.filter((category) => category.completedCards < category.totalCards) ??
      []
  );
};

// const FlashcardCategoryComponent = ({ language, category }) => {
//   const categoryDetails = useFlashcardCategoryDetails(language, category);
//   const completedCards = useCompletedCards(language, category);
//   const incompleteCards = useIncompleteCards(language, category);
//   // Use categoryDetails, completedCards, and incompleteCards...
// };

// const FlashcardCategoriesComponent = ({ language }) => {
//   const completedCategories = useCompletedCategories(language);
//   const incompleteCategories = useIncompleteCategories(language);
//   // Use completedCategories and incompleteCategories...
// };
