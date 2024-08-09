import React, { useEffect, useRef } from "react";
import "./WordRotator.css"; // Import the CSS from a separate file
import { STRINGS } from "../../utilities/constants";

const WordRotator = ({
  setActiveWord,
  words = [
    { text: "Hey", color: "wisteria" },
    { text: "Hola", color: "belize" },
    { text: "Namaste", color: "pomegranate" },
    { text: "Bonjour", color: "green" },
    { text: "Chi", color: "midnight" },
  ],
}) => {
  const wordRefs = useRef(words.map(() => React.createRef()));
  let currentWord = 0;

  useEffect(() => {
    words.forEach((word, i) => {
      splitLetters(wordRefs.current[i].current);
    });

    wordRefs.current[currentWord].current.style.display = "inline"; // Show the first word
    wordRefs.current[currentWord].current.style.opacity = 1;

    changeWord();
    const interval = setInterval(changeWord, 4000);
    return () => clearInterval(interval);
  }, []);

  function changeWord() {
    const cw = wordRefs.current[currentWord].current.children;
    const nw =
      currentWord === words.length - 1
        ? wordRefs.current[0].current.children
        : wordRefs.current[currentWord + 1].current.children;

    wordRefs.current[currentWord].current.style.opacity = "0"; // Hide the current word
    if (currentWord === words.length - 1) {
      wordRefs.current[0].current.style.display = "inline"; // Show the next word
    } else {
      wordRefs.current[currentWord + 1].current.style.display = "inline"; // Show the next word
    }

    for (let i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (let i = 0; i < nw.length; i++) {
      nw[i].className = "letter behind";
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord =
      currentWord === wordRefs.current.length - 1 ? 0 : currentWord + 1;

    if (setActiveWord) setActiveWord(words[currentWord]);
  }

  function animateLetterOut(cw, i) {
    setTimeout(() => {
      cw[i].className = "letter out";
    }, i * 80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(() => {
      nw[i].className = "letter in";
    }, 340 + i * 80);
  }

  function splitLetters(word) {
    const content = word.innerText;
    word.innerText = "";
    for (let i = 0; i < content.length; i++) {
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.innerText = content.charAt(i);
      word.appendChild(letter);
    }
  }

  return (
    <div className="text">
      <p>
        {words.map((word, i) => (
          <span
            key={i}
            ref={wordRefs.current[i]}
            style={{ ...(word?.colorHex ? { color: word?.colorHex } : {}) }}
            className={`word ${word.color} ${STRINGS.CLASSES.basicTransitions} overflow-hidden`}>
            {word.text}
          </span>
        ))}
      </p>
    </div>
  );
};

export default WordRotator;
