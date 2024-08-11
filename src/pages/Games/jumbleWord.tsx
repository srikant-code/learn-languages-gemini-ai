import React, { useState, useEffect } from "react";
import ParaGraph from "../../components/Paragraph";
import CustomInput from "../../components/Input";
import CustomButton from "../../components/Button";
import { STRINGS } from "../../utilities/constants";
import CustomCircularProgress, {
  CustomProgress,
} from "../../components/Progress";
import { Spacer } from "@nextui-org/react";
import RenderLetters from "../Dictionary/wordAlphabets";

const JumbledWordGameLogic = ({
  word,
  possibleWords,
  variableLengthAllowed,
  timeBound,
}) => {
  const [jumbledWord, setJumbledWord] = useState("");
  const [userWord, setUserWord] = useState("");

  // Function to jumble the word
  const jumbleWord = (word) => {
    // Logic to jumble the word
    let jumbledWord = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setJumbledWord(jumbledWord);
  };

  // Function to check the user's word
  const checkWord = (word) => {
    // Logic to check the word and update points
    if (possibleWords.includes(word)) {
      setPoints(points + word.length); // Increase points by the length of the word
      setUserWord(""); // Reset the user's word
    }
  };

  // Function to end the game and show summary
  const endGame = () => {
    // Logic to end the game and show summary
    const missedWords = possibleWords.filter((w) => !gameSummary.includes(w));
    setGameSummary({
      foundWords: gameSummary,
      missedWords: missedWords,
      points: points,
    });
  };

  // Function to handle hint request
  const handleHint = () => {
    // Logic to handle hint request
    // Deduct points for hint
    setPoints(points - 5);
    // Show the meaning of the next word
    const nextWord = possibleWords.find((w) => !gameSummary.includes(w));
    if (nextWord) {
      alert(`Hint: ${nextWord.meaning}`);
    }
  };

  // Function to save game summary to localStorage
  const saveGameSummary = () => {
    // Logic to save game summary to localStorage
    let completedGames =
      JSON.parse(localStorage.getItem("completedGames")) || [];
    completedGames.push(gameSummary);
    localStorage.setItem("completedGames", JSON.stringify(completedGames));
  };

  useEffect(() => {
    jumbleWord(word);
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center gap-4">
          <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
            Scramble Words
          </ParaGraph>
          <ParaGraph>Word</ParaGraph>
          <RenderLetters word={jumbledWord} />
        </div>
      </div>
      <div>
        <CustomInput
          type="text"
          value={userWord}
          onChange={(e) => setUserWord(e)}
        />
        <CustomButton onClick={() => checkWord(userWord)}>
          Submit Word
        </CustomButton>
      </div>
      <div>
        <CustomButton onClick={handleHint}>Get Hint 💡</CustomButton>
        <CustomButton onClick={endGame} color={"danger"}>
          Exit
        </CustomButton>
      </div>
      <Spacer y={8} />
      {gameSummary && (
        <div className="flex flex-col">
          <ParaGraph>Game Summary</ParaGraph>
          <ParaGraph>
            Words Found: {gameSummary.foundWords?.join(", ")}
          </ParaGraph>
          <ParaGraph>
            Missed Words: {gameSummary.missedWords?.join(", ")}
          </ParaGraph>
          <ParaGraph>Total Points: {gameSummary.points}</ParaGraph>
        </div>
      )}
    </div>
  );
};

export const JumbledWordsGame = () => {
  const word = "react";
  const possibleWords = ["caret", "carte", "react", "crate", "act", "eat"];
  const variableLengthAllowed = true;
  const timeBound = true;

  return (
    <div>
      <JumbledWordGameLogic
        word={word}
        possibleWords={possibleWords}
        variableLengthAllowed={variableLengthAllowed}
        timeBound={timeBound}
      />
    </div>
  );
};
