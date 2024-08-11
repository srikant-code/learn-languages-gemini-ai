import { AllImages } from "../../components/Image";
import { STRINGS } from "../../utilities/constants";
import DigitDetectiveGamePlay from "./GameLogic/digitDetective";
import EmojiTranslatorGamePlay from "./GameLogic/emojiTranslator";
import EquationSolverGamePlay from "./GameLogic/equationSolver";
import ImageRiddleGamePlay from "./GameLogic/imageRiddle";
import LetterTwisterGamePlay from "./GameLogic/letterTwister";
import LexiconLeaderGamePlay from "./GameLogic/lexiconLeader";
import MemoryMaestroGamePlay from "./GameLogic/memoryMaestro";
import NumericalNavigatorGamePlay from "./GameLogic/numericalNavigator";
import PhraseJugglerGamePlay from "./GameLogic/phraseJuggler";
import RhymeRangerGamePlay from "./GameLogic/rhymeRanger";
import SentenceSleuthGamePlay from "./GameLogic/sentenceSleuth";
import SoundScribeGamePlay from "./GameLogic/soundScribe";
import VocabularyVoyagerPlay from "./GameLogic/vocabularyVoyager";
const GameIDs = {
  letter_twister: { title: "Letter Twister", id: "letter_twister" },
  phrase_juggler: { title: "Phrase Juggler", id: "phrase_juggler" },
  image_riddle: { title: "Image Riddle", id: "image_riddle" },
  emoji_translator: { title: "Emoji Translator", id: "emoji_translator" },
  digit_detective: { title: "Digit Detective", id: "digit_detective" },
  numerical_navigator: {
    title: "Numerical Navigator",
    id: "numerical_navigator",
  },
  vocabulary_voyager: { title: "Vocabulary Voyager", id: "vocabulary_voyager" },
  equation_solver: { title: "Equation Solver", id: "equation_solver" },
  lexicon_leader: { title: "Lexicon Leader", id: "lexicon_leader" },
  sentence_sleuth: { title: "Sentence Sleuth", id: "sentence_sleuth" },
  sound_scribe: { title: "Sound Scribe", id: "sound_scribe" },
  rhyme_ranger: { title: "Rhyme Ranger", id: "rhyme_ranger" },
  memory_maestro: { title: "Memory Maestro", id: "memory_maestro" },
};

const HowToPlayGuide = {
  [GameIDs.memory_maestro.id]: [
    {
      heading: `Choose Difficulty`,
      text: `Select the difficulty level for the game. 'Easy' has 4 pairs of cards, 'Medium' has 8 pairs, and 'Hard' has 10 pairs.`,
    },
    {
      heading: `Start the Game`,
      text: `Click on the 'Start' button to begin the game. The game will shuffle and lay out the cards face down.`,
    },
    {
      heading: `Flip a Card`,
      text: `Click on a card to flip it over and reveal its value.`,
    },
    {
      heading: `Match Cards`,
      text: `Try to find the matching card for the one you just flipped. Click on another card to flip it. If it's a match, both cards will stay flipped. If not, both cards will flip back after a short delay.`,
    },
    {
      heading: `Use Hints`,
      text: `If you're stuck, click on the 'Show Hint' button. This will temporarily reveal the value of a random unmatched card.`,
    },
    {
      heading: `Track Your Progress`,
      text: `Keep an eye on the 'Moves', 'Matches', and 'Points' counters to track your progress. Each match gives you 10 points.`,
    },
    {
      heading: `Win the Game`,
      text: `The game ends when all pairs have been matched. A congratulatory message will be displayed.`,
    },
    {
      heading: `Play Again`,
      text: `To play again, simply click on the 'Reset' button. This will shuffle and lay out the cards again.`,
    },
    {
      heading: ``,
      text: `Remember, the goal is to match all pairs in as few moves as possible. Good luck!`,
    },
  ],
};

const easyPoints = 100;
const mediumPoints = easyPoints * 1.5;
const hardPoints = easyPoints * 2;

const gameDifficulty = {
  [STRINGS.DIFFICULTY.easy.id]: {
    id: STRINGS.DIFFICULTY.easy.id,
    xp: easyPoints,
    coins: easyPoints,
  },
  [STRINGS.DIFFICULTY.medium.id]: {
    id: STRINGS.DIFFICULTY.medium.id,
    xp: mediumPoints,
    coins: mediumPoints,
  },
  [STRINGS.DIFFICULTY.hard.id]: {
    id: STRINGS.DIFFICULTY.hard.id,
    xp: hardPoints,
    coins: hardPoints,
  },
};
const maxPoints = {
  maxCoins: hardPoints,
  maxXP: hardPoints,
};

export const GamesMetaData = {
  [GameIDs.letter_twister.id]: {
    title: GameIDs.letter_twister.title,
    id: GameIDs.letter_twister.id,
    description:
      "Unscramble the letters to form meaningful words. More words, more points!",
    ...maxPoints,
    gameCategory: "Word",
    image: AllImages.letterTwister,
    imageText: AllImages.letterTwisterSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "example",
        hint: "This is just a sample word.",
      },
    ],
    gameDifficulty,
    comboPointsFormula: "points = correctWords * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example",
    Component: LetterTwisterGamePlay,
  },
  [GameIDs.phrase_juggler.id]: {
    title: GameIDs.phrase_juggler.title,
    id: GameIDs.phrase_juggler.id,
    description: "Arrange the jumbled words to form a correct sentence.",
    ...maxPoints,
    gameCategory: "Language",
    image: AllImages.phraseJuggler,
    imageText: AllImages.phraseJugglerSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "example sentence",
        hint: "This is just a sample sentence.",
      },
    ],
    comboPointsFormula: "points = correctSentences * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example sentence",
    Component: PhraseJugglerGamePlay,
    gameDifficulty,
  },

  [GameIDs.image_riddle.id]: {
    title: GameIDs.image_riddle.title,
    id: GameIDs.image_riddle.id,
    description:
      "Guess the word based on the picture shown. Different modes available.",
    ...maxPoints,
    gameCategory: "Visual",
    image: AllImages.imageRiddle,
    imageText: AllImages.imageRiddleSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "example",
        hint: "This is just a sample picture.",
      },
    ],
    comboPointsFormula: "points = correctGuesses * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example",
    Component: ImageRiddleGamePlay,
    gameDifficulty,
  },
  [GameIDs.emoji_translator.id]: {
    title: GameIDs.emoji_translator.title,
    id: GameIDs.emoji_translator.id,
    description: "Explain the meaning of emojis in your own language.",
    ...maxPoints,
    gameCategory: "Language",
    image: AllImages.emojiTranslator,
    imageText: AllImages.emojiTranslatorSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "😊",
        hint: "This is a sample emoji.",
      },
    ],
    comboPointsFormula: "points = correctExplanations * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "happy",
    Component: EmojiTranslatorGamePlay,
    gameDifficulty,
  },
  [GameIDs.digit_detective.id]: {
    title: GameIDs.digit_detective.title,
    id: GameIDs.digit_detective.id,
    description: "Identify the number shown. Different modes available.",
    ...maxPoints,
    gameCategory: "Math",
    image: AllImages.digitDetective,
    imageText: AllImages.digitDetectiveSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "123",
        hint: "This is just a sample number.",
      },
    ],
    comboPointsFormula: "points = correctIdentifications * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "123",
    Component: DigitDetectiveGamePlay,
    gameDifficulty,
  },

  [GameIDs.numerical_navigator.id]: {
    title: GameIDs.numerical_navigator.title,
    id: GameIDs.numerical_navigator.id,
    description: "Guess the number shown. Different modes available.",
    ...maxPoints,
    gameCategory: "Math",
    image: AllImages.numericalNavigator,
    imageText: AllImages.numericalNavigatorSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "123",
        hint: "This is just a sample number.",
      },
    ],
    comboPointsFormula: "points = correctGuesses * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "123",
    Component: NumericalNavigatorGamePlay,
    gameDifficulty,
  },
  [GameIDs.vocabulary_voyager.id]: {
    title: GameIDs.vocabulary_voyager.title,
    id: GameIDs.vocabulary_voyager.id,
    description: "Find the middle word and replace it to make it meaningful.",
    ...maxPoints,
    gameCategory: "Word",
    image: AllImages.vocabularyVoyager,
    imageText: AllImages.vocabularyVoyagerSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "Mop",
        hint: "This is a sample word.",
      },
    ],
    comboPointsFormula: "points = correctSwaps * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "Map",
    Component: VocabularyVoyagerPlay,
    gameDifficulty,
  },
  [GameIDs.equation_solver.id]: {
    title: GameIDs.equation_solver.title,
    id: GameIDs.equation_solver.id,
    description:
      "Solve basic math problems and choose/write the correct answer.",
    ...maxPoints,
    gameCategory: "Math",
    image: AllImages.equationExplorer,
    imageText: AllImages.equationExplorerSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "2+2",
        hint: "This is a sample math problem.",
      },
    ],
    comboPointsFormula: "points = correctAnswers * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "4",
    Component: EquationSolverGamePlay,
    gameDifficulty,
  },

  [GameIDs.lexicon_leader.id]: {
    title: GameIDs.lexicon_leader.title,
    id: GameIDs.lexicon_leader.id,
    description:
      "Confusing words with similar letters are displayed and user has to select the correct spelling.",
    ...maxPoints,
    gameCategory: "Language",
    image: AllImages.lexiconLeader,
    imageText: AllImages.lexiconLeaderSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "example",
        hint: "This is a sample confusing word.",
      },
    ],
    comboPointsFormula: "points = correctSelections * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example",
    Component: LexiconLeaderGamePlay,
    gameDifficulty,
  },
  [GameIDs.sentence_sleuth.id]: {
    title: GameIDs.sentence_sleuth.title,
    id: GameIDs.sentence_sleuth.id,
    description:
      "Find the next word in the sentence. Different modes available.",
    ...maxPoints,
    gameCategory: "Language",
    //  image: AllImages.sentenceSleuthSVG,
    imageText: AllImages.sentenceSleuthSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "The horse is _",
        hint: "This is a sample sentence.",
      },
    ],
    comboPointsFormula: "points = correctFills * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "big",
    Component: SentenceSleuthGamePlay,
    gameDifficulty,
  },
  [GameIDs.sound_scribe.id]: {
    title: GameIDs.sound_scribe.title,
    id: GameIDs.sound_scribe.id,
    description:
      "An audio is given and the user has to type what that correctly.",
    ...maxPoints,
    gameCategory: "Listening",
    image: AllImages.soundScribble,
    imageText: AllImages.soundScribbleSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "example",
        hint: "This is a sample audio.",
      },
    ],
    comboPointsFormula: "points = correctTypings * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example",
    Component: SoundScribeGamePlay,
    gameDifficulty,
  },

  [GameIDs.rhyme_ranger.id]: {
    title: GameIDs.rhyme_ranger.title,
    id: GameIDs.rhyme_ranger.id,
    description:
      "A game where you have to find words that rhyme with the given word.",
    ...maxPoints,
    gameCategory: "Language",
    image: AllImages.rhymeRanger,
    imageText: AllImages.rhymeRangerSVG,
    imageTextColor: null,
    gameData: [
      {
        word: "example",
        hint: "This is a sample word.",
      },
    ],
    comboPointsFormula: "points = correctMatches * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "sample",
    Component: RhymeRangerGamePlay,
    gameDifficulty,
  },
  [GameIDs.memory_maestro.id]: {
    title: GameIDs.memory_maestro.title,
    id: GameIDs.memory_maestro.id,
    howToPlay: HowToPlayGuide[GameIDs.memory_maestro.id],
    description:
      "A memory game where you have to match all the tiles with the same word.",
    ...maxPoints,
    gameCategory: "Memory",
    image: AllImages.memoryMaestro,
    imageText: AllImages.memoryMaestroSVG,
    imageTextColor: "light",
    gameData: [
      {
        word: "example",
        hint: "This is a sample word.",
      },
    ],
    comboPointsFormula: "points = correctMatches * 10",
    hintPointDeductionFormula: "points = points - (hintsUsed * 2)",
    correctAnswer: "example",
    Component: MemoryMaestroGamePlay,
    gameDifficulty,
  },
};

// Word Scramble ➡️ “Letter Twister”
// Sentence Order ➡️ “Phrase Juggler”
// Picture Guess ➡️ “Image Riddle”
// Emoji Explain ➡️ “Emoji Translator”
// Number Identify ➡️ “Digit Detective”
// Number Guess ➡️ “Numerical Navigator”
// Word Swap ➡️ “Vocabulary Voyager”
// Math Solve ➡️ “Equation Explorer”
// Spelling Select ➡️ “Lexicon Leader”
// Word Fill ➡️ “Sentence Sleuth”
// Audio Type ➡️ “Sound Scribe”
// Rhyme Match ➡️ “Rhyme Ranger”
// Memory Match ➡️ “Memory Maestro”
