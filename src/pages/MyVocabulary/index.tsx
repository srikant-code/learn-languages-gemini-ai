// Okay, I have a different functionality of MyVocabulary. Here is a rough idea but i am also not exacyly sure of the implementation. It should be in react and nextui.

import { useEffect, useState } from "react";
import ParaGraph from "../../components/Paragraph";
import CustomInput from "../../components/Input";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import { CardBody, CardHeader, Spacer } from "@nextui-org/react";
import { STRINGS } from "../../utilities/constants";
import { WordButtons, WordHeader } from "../Dictionary/wordHeader";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FaPlus, FaSort } from "react-icons/fa6";
import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import SortButton from "../../components/Button/sortButton";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../store/reducer";
import moment from "moment";
import CustomImage, { AllImages } from "../../components/Image";
import { SetActiveTabInRedux } from "../../components/Tabs";
import { DICTIONARY_TABS } from "../Dictionary";
import { AI_TABS } from "../Chat";

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

const VocabularyContent = ({ userId }) => {
  const myVocabularyFromStore =
    useSelector((state) => state.language[STRINGS.STORAGE.MY_VOCABULARY]) ?? {};
  const searchWordInput =
    useSelector(
      (state) => state.language[STRINGS.STORAGE.VOCABULARY_SEARCH_BAR]
    ) ?? "";
  const dispatch = useDispatch();
  const myVocabularyFromRedux = Object.values(myVocabularyFromStore);
  const [renderVocabData, setRenderVocabData] = useState(myVocabularyFromRedux);

  const filteredVocab = renderVocabData.filter((v) => {
    return JSON.stringify(v)
      ?.toLowerCase()
      .includes(searchWordInput?.toLowerCase());
  });

  useEffect(() => {
    setRenderVocabData(myVocabularyFromRedux);
  }, [myVocabularyFromStore]);

  return (
    <div className="p-8">
      <div className="flex gap-4 items-center justify-between">
        <ParaGraph className={STRINGS.CLASSES.heading}>
          My Vocabulary ({renderVocabData.length})
        </ParaGraph>
        <div className="flex gap-4">
          <SortButton
            data={renderVocabData}
            setData={setRenderVocabData}
            sortProperty={"savedOn"}
            date
          />
          <SortButton
            data={renderVocabData}
            setData={setRenderVocabData}
            sortProperty={"word"}
          />
        </div>
      </div>

      <Spacer y={4} />

      <div className="flex flex-col gap-4">
        <CustomInput
          placeholder="Add a new word or Search an existing one..."
          value={searchWordInput}
          onChange={(e) =>
            dispatch(
              setSetting({
                key: STRINGS.STORAGE.VOCABULARY_SEARCH_BAR,
                value: e,
              })
            )
          }
          endContent={
            <div className="flex gap-4">
              <CustomButton isIconOnly onClick={undefined}>
                <FaSearch />
              </CustomButton>
            </div>
          }
        />
      </div>
      <Spacer y={4} />

      <ParaGraph>
        {/* Searchbar filter, <br />
        alphabetical, <br /> */}
        {/* sort by date, */}
        {/* start something using AI */}
        <br />
        {/* language sort */}
      </ParaGraph>

      {/* Unsave feature, <br /> */}
      {/* more details on the word -&gt; go to dictionary */}

      <RenderVocabularyCards vocabulary={filteredVocab} />
      {filteredVocab?.length ? null : (
        <NoVocabWordFound word={searchWordInput} />
      )}
      <Spacer y={6} />
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

const RenderVocabularyCards = ({ vocabulary }) => {
  const [parent] = useAutoAnimate();
  return (
    <div
      className={`flex flex-row flex-wrap justify-center gap-4 ${STRINGS.CLASSES.basicTransitions}`}
      ref={parent}>
      {vocabulary.map((word) => (
        <CustomCard key={word.word} as={CustomButton} className={"flex-1"}>
          <div className="w-full text-justify">
            <WordHeader
              data={{ word: word.word, phonetic: word?.phonetic ?? word.word }}
            />
          </div>
          <CardBody className="flex flex-col gap-4 p-0 pt-4">
            {word.meanings && (
              <ParaGraph>
                Meanings: <WordButtons data={word.meanings} />
              </ParaGraph>
            )}
            {word.synonyms && (
              <ParaGraph>
                Synonyms: <WordButtons data={word.synonyms} />
              </ParaGraph>
            )}
            {word.antonyms && (
              <ParaGraph>
                Antonyms: <WordButtons data={word.antonyms} />
              </ParaGraph>
            )}
            <ParaGraph className="text-sm italic">
              {moment(word?.savedOn).calendar()}
            </ParaGraph>
          </CardBody>
        </CustomCard>
      ))}
    </div>
  );
};

const NoVocabWordFound = ({ word = "hello" }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center">
        <CustomImage
          src={AllImages.app.myVocabulary}
          className={`max-w-[250px] w-[100%] ${""}`}
        />
      </div>
      <ParaGraph className={`text-left ${STRINGS.CLASSES.subHeading}`}>
        "{word}" was not found in your saved vocabulary.
      </ParaGraph>
      <ParaGraph className={`text-left ${STRINGS.CLASSES.subText}`}>
        Try these instead...
      </ParaGraph>
      <CustomCard>
        <ParaGraph>Add "{word}" to your vocabulary</ParaGraph>
        <WordHeader data={{ word, phonetic: word }} />
        {/* <ParaGraph>English</ParaGraph> */}
      </CustomCard>
      <CustomCard className="p-0" as={CustomButton}>
        <div
          className="p-6"
          onClick={() => {
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.rightSideBar,
              activeTab: DICTIONARY_TABS.id,
            });
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.dictionary,
              activeTab: DICTIONARY_TABS.API,
            });
          }}>
          <ParaGraph>Search "{word}" in Dictionary</ParaGraph>
        </div>
      </CustomCard>
      <CustomCard className="p-0" as={CustomButton}>
        <div
          className="p-6"
          onClick={() => {
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.rightSideBar,
              activeTab: DICTIONARY_TABS.id,
            });
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.dictionary,
              activeTab: DICTIONARY_TABS.AI,
            });
          }}>
          <ParaGraph>
            Search "{word}" in {STRINGS.APP_NAME}
          </ParaGraph>
        </div>
      </CustomCard>
      <CustomCard className="p-0" as={CustomButton}>
        <div
          className="p-6"
          onClick={() => {
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.rightSideBar,
              activeTab: AI_TABS.id,
            });
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.chat,
              activeTab: AI_TABS.ALL_CHATS,
            });
            dispatch(
              setSetting({
                key: STRINGS.STORAGE.CHAT_INPUT_VALUE,
                value: `Explain me about "${word}". How and where can I use it.`,
              })
            );
          }}>
          <ParaGraph>
            Ask something about "{word}" to {STRINGS.APP_NAME} AI
          </ParaGraph>
        </div>
      </CustomCard>
    </div>
  );
};
