// Okay, I have a different functionality of MyVocabulary. Here is a rough idea but i am also not exacyly sure of the implementation. It should be in react and nextui.

import { useEffect, useState } from "react";
import ParaGraph from "../../components/Paragraph";
import CustomInput from "../../components/Input";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import { CardBody, CardHeader, Spacer } from "@nextui-org/react";
import { STRINGS } from "../../utilities/constants";
import { WordButtons, WordHeader } from "../Dictionary/wordHeader";

// In firebase there should be a collection of words.
// It will store details like the synonyms, meanings, antonyms, and other realted things.
// Now each user will have a reference to the word collection objects as an array that they choose to save in their my vocabulary..

// My vocabulary should fetch the array of words of the user and the respective meanings etc.

// The user should be able to add a new word to their vocabulary and to the global words collection using the helper function from any component.

// Any other user who chooses to keep a word in my vocabulary that already exists in word collection should refer it from there.

// Got it! Let's break down the implementation of the "MyVocabulary" functionality in React and NextUI, using Firebase for data storage.

// ### Step 1: Firebase Setup

// First, ensure you have Firebase set up in your project. If not, you can follow the [Firebase setup guide](https://firebase.google.com/docs/web/setup).

// ### Step 2: Define Firebase Collections

// We'll have two main collections in Firebase:
// 1. `words`: Stores all words with their details.
// 2. `users`: Stores user-specific data, including their vocabulary.

// ### Step 3: Helper Functions

// We'll create helper functions to interact with Firebase, such as fetching words, adding new words, and updating user vocabulary.

// ### Step 4: React Components

// We'll create React components to display the user's vocabulary and allow them to add new words.

// ### Firebase Configuration

// ```javascript
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// ```

// ### Helper Functions

// ```javascript
// const addWordToGlobalCollection = async (word) => {
//   const wordDoc = doc(db, "words", word.id);
//   await setDoc(wordDoc, word);
// };

// const addUserWord = async (userId, wordId) => {
//   const userDoc = doc(db, "users", userId);
//   await updateDoc(userDoc, {
//     vocabulary: arrayUnion(wordId)
//   });
// };

// const fetchUserVocabulary = async (userId) => {
//   const userDoc = doc(db, "users", userId);
//   const userSnapshot = await getDoc(userDoc);
//   const userData = userSnapshot.data();
//   return userData.vocabulary;
// };

// const fetchWordDetails = async (wordId) => {
//   const wordDoc = doc(db, "words", wordId);
//   const wordSnapshot = await getDoc(wordDoc);
//   return wordSnapshot.data();
// };
// ```

// ### React Components

// #### Vocabulary Component

// ```javascript
// import React, { useState, useEffect } from 'react';
// import { Card, Grid, Text, Button, Input } from '@nextui-org/react';

interface VocabularyProps {}

const Vocabulary: FunctionComponent<VocabularyProps> = () => {
  return (
    <div>
      <VocabularyContent userId={"hello"} />
    </div>
  );
};

export default Vocabulary;

const MyVocabData = [
  {
    id: "Battle",
    synonyms: ["example synonym"],
    meanings: ["example meaning"],
    antonyms: ["example antonym"],
  },
  {
    id: "Kid",
    synonyms: ["example synonym"],
    meanings: ["example meaning"],
    antonyms: ["example antonym"],
  },
];
const VocabularyContent = ({ userId }) => {
  const [vocabulary, setVocabulary] = useState(MyVocabData ?? []);
  const [newWord, setNewWord] = useState("");
  const [wordDetails, setWordDetails] = useState({});

  useEffect(() => {
    const fetchVocabulary = async () => {
      const userVocabulary = await fetchUserVocabulary(userId);
      const words = await Promise.all(
        userVocabulary.map((wordId) => fetchWordDetails(wordId))
      );
      setVocabulary(words);
    };

    fetchVocabulary();
  }, [userId]);

  const handleAddWord = async () => {
    const wordId = newWord.toLowerCase();
    const existingWord = await fetchWordDetails(wordId);

    if (!existingWord) {
      const word = {
        id: wordId,
        synonyms: ["example synonym"],
        meanings: ["example meaning"],
        antonyms: ["example antonym"],
      };
      await addWordToGlobalCollection(word);
    }

    await addUserWord(userId, wordId);
    setVocabulary([...vocabulary, existingWord || wordDetails]);
    setNewWord("");
  };

  return (
    <div className="p-8">
      <ParaGraph className={STRINGS.CLASSES.heading}>
        My Vocabulary ({vocabulary.length})
      </ParaGraph>
      <Spacer y={4} />
      <div>
        Searchbar filter, <br />
        sort by date,
        <br />
        alphabetical, <br />
        language
      </div>
      <Spacer y={4} />
      <div>
        Unsave feature, <br />
        start something using AI, <br />
        more details on the word -&gt; go to dictionary
      </div>
      <Spacer y={4} />
      <div className="flex flex-col justify-center gap-4">
        {vocabulary.map((word) => (
          <div className="" key={word.id}>
            <CustomCard as={CustomButton}>
              <div className="w-full text-justify">
                <WordHeader data={{ word: word.id, phonetic: word.id }} />
              </div>
              <CardBody className="flex flex-col gap-4">
                <ParaGraph>
                  Meanings: <WordButtons data={word.meanings} />
                </ParaGraph>
                <ParaGraph>
                  Synonyms: <WordButtons data={word.synonyms} />
                </ParaGraph>
                <ParaGraph>
                  Antonyms: <WordButtons data={word.antonyms} />
                </ParaGraph>
              </CardBody>
            </CustomCard>
          </div>
        ))}
      </div>
      <Spacer y={6} />
      <div className="flex flex-col gap-4">
        <CustomInput
          isClearable
          placeholder="Add a new word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <CustomButton size="lg" onClick={handleAddWord}>
          Add Word
        </CustomButton>
      </div>
    </div>
  );
};

// export default Vocabulary;
// ```

// ### Usage

// You can use the `Vocabulary` component in your app and pass the `userId` as a prop:

// ```javascript
// import React, { useEffect, useState } from 'react';
// import Vocabulary from './Vocabulary';
// import { CustomCard } from '../../components/Card';
// import { CardBody, CardHeader } from '@nextui-org/react';
// import ParaGraph from '../../components/Paragraph';
// import CustomInput from '../../components/Input';
// import CustomButton from '../../components/Button';

// const App = () => {
//   const userId = "userId"; // Replace with actual user ID

//   return (
//     <div>
//       <Vocabulary userId={userId} />
//     </div>
//   );
// };

// export default App;
// ```

// This setup will allow users to manage their vocabulary, add new words, and fetch word details from Firebase. You can further customize the UI and functionality as needed. Let me know if you need any more help!
