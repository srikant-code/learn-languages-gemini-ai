import { useSelector } from "react-redux";
import { STRINGS } from "../../utilities/constants";
import { setSetting } from "../reducer";
import store from "../store";

// I have a new requirement for the alphabets in a language. The final redux should look like this.
// alphabetsData : {
//   en: {
// alphabets: {
// totalCharacters: 27,
// reviewedLetters: 10,
// practicedLetters: 10,
// lastUpdateOn: time,
// alphabetsData: [{frontText: "A", backText: "definition of A", vowels: true, consonant:fasle, isReviewed:false, isPracticed: true, otherDetails: {here}}, {//more items here}]
//    },
// diacritcs: {//similar to alphabets},
// dipthongs: {//similar to alphabets},
// tones:  {//similar to alphabets},
// stress:  {//similar to alphabets},
// // more similar objects realted to a language
// }
//   },
//   es: {
// // similar like for en language.
//   }
// // other langugages object.
// }

// The helper functions should be able to create new alphabetsData with the required data for a language, it should be able to update the isPracticed, isReviewed flags.

export const CreateAlphabetsData = ({
  language = "en",
  alphabetsData,
  id = STRINGS.STORAGE.ALPHABETS_DATA,
}) => {
  const alphabets = store.getState().language[id];
  const time = new Date().toISOString();
  let alphabetsObj = {};

  if (!alphabets || !alphabets?.[language]) {
    // If the alphabets data doesn't exist for the language, create a new one
    alphabetsObj = {
      [language]: {
        ...alphabetsData,
        lastUpdateOn: time,
      },
    };
  } else {
    // If the alphabets data exists for the language, update it
    alphabetsObj = { ...alphabets };
    alphabetsObj[language] = {
      ...alphabets[language],
      ...alphabetsData,
      lastUpdateOn: time,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: alphabetsObj,
    })
  );

  return alphabetsObj;
};

// CreateAlphabetsData({
//   language: "en",
//   alphabetsData: {
//     totalCharacters: 26,
//     reviewedLetters: 10,
//     practicedLetters: 10,
//     alphabetsData: [
//       {
//         frontText: "A",
//         backText: "definition of A",
//         vowels: true,
//         consonant: false,
//         isReviewed: false,
//         isPracticed: true,
//         otherDetails: {},
//       },
//       // More letters...
//     ],
//   },
// });

export const UpdateLetter = ({
  language = "en",
  category,
  letterIndex,
  letterDetails,
  id = STRINGS.STORAGE.ALPHABETS_DATA,
}) => {
  const alphabets = store.getState().language[id];
  const time = new Date().toISOString();
  let alphabetsObj = {};

  if (alphabets && alphabets?.[language] && alphabets?.[language]?.[category]) {
    // If the alphabets data exists for the language and category, update the letter
    alphabetsObj = { ...alphabets };
    alphabetsObj[language][category].alphabetsData[letterIndex] = {
      ...(alphabets?.[language]?.[category]?.alphabetsData?.[letterIndex] ??
        {}),
      ...letterDetails,
      lastUpdateOn: time,
    };

    // Update the reviewedLetters and practicedLetters counts
    alphabetsObj[language][category].reviewedLetters = alphabets?.[language]?.[
      category
    ]?.alphabetsData.reduce(
      (count, letter) => (letter.isReviewed ? count + 1 : count),
      0
    );
    alphabetsObj[language][category].practicedLetters = alphabets?.[language]?.[
      category
    ]?.alphabetsData.reduce(
      (count, letter) => (letter.isPracticed ? count + 1 : count),
      0
    );

    store.dispatch(
      setSetting({
        key: id,
        value: alphabetsObj,
      })
    );
  }

  return alphabetsObj;
};

// // When a letter is reviewed
// UpdateLetter({
//   language: "en",
//   category: "CATEGORY_1",
//   letterIndex: 0,
//   letterDetails: { isReviewed: true },
// });

// // When a letter is practiced
// UpdateLetter({
//   language: "en",
//   category: "CATEGORY_1",
//   letterIndex: 0,
//   letterDetails: { isPracticed: true },
// });

// Custom hook to get all letters
export const useAllLetters = (language, category) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.ALPHABETS_DATA]?.[language]?.[category]
          ?.alphabetsData
    ) ?? []
  );
};

// Custom hook to get reviewed letters
export const useReviewedLetters = (language, category) => {
  return (
    useSelector((state) =>
      state.language?.[STRINGS.STORAGE.ALPHABETS_DATA]?.[language]?.[
        category
      ]?.alphabetsData.filter((letter) => letter.isReviewed)
    ) ?? []
  );
};

// Custom hook to get practiced letters
export const usePracticedLetters = (language, category) => {
  return (
    useSelector((state) =>
      state.language?.[STRINGS.STORAGE.ALPHABETS_DATA]?.[language]?.[
        category
      ]?.alphabetsData.filter((letter) => letter.isPracticed)
    ) ?? []
  );
};

// const LettersComponent = ({ language, category }) => {
//   const allLetters = useAllLetters(language, category);
//   const reviewedLetters = useReviewedLetters(language, category);
//   const practicedLetters = usePracticedLetters(language, category);
//   // Use allLetters, reviewedLetters, and practicedLetters...
// };
