import { BsAlphabet } from "react-icons/bs";
import { FaBook, FaCog, FaGamepad, FaReadme, FaTrophy } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
export const STRINGS = {
  CLASSES: {
    subHeading: "text-xl font-semibold mt-2 first-letter:uppercase",
    subText: "text-sm text-gray-500",
  },
  MODELS: {
    FLASH_1_5: {
      label: "Gemini 1.5 Flash",
      value: "gemini-1.5-flash",
      description: "A fast, lightweight model for quick responses.",
    },
    PRO_1_0: {
      label: "Gemini 1.0 Pro",
      value: "gemini-1.0-pro",
      description: "A fast, lightweight model for quick responses.",
    },
    PRO_1_5: {
      label: "Gemini 1.5 Pro",
      value: "gemini-1.5-pro",
      description: "A fast, lightweight model for quick responses.",
    },
  },
  STORAGE: {
    SETTINGS: "settings",
  },
  THEMES: {
    LIGHT: "light",
    DARK: "dark",
  },
  TEXT: {
    FOOTER_MADE_BY: `Made with 💜 by Srikant`,
    MORE_SLOGANS: [
      "Speak Globally, Live Locally",
      "Unlock Languages, Unlock Opportunities",
      "Words Open Worlds",
      "Language Learning, Life Changing",
      "Speak New Worlds into Existence",
    ],
  },
  TYPES: {
    INPUT: "input",
    SELECT: "select",
    BOOLEAN: "boolean",
  },
};

export const SlideIDs = {
  home: {
    route: "/",
    path: "",
    name: "Home",
    description: "Home description",
    icon: <FaMoon />,
  },
  lessons: {
    route: "/lessons",
    path: "lessons",
    name: "Lessons",
    description: "Lessons description",
    icon: <FaReadme />,
  },
  myVocabulary: {
    route: "/myVocabulary",
    path: "myVocabulary",
    name: "My Vocabulary",
    description: "My Vocabulary description",
    icon: <FaMoon />,
  },
  dictionary: {
    route: "/dictionary",
    path: "dictionary",
    name: "Dictionary",
    description: "Dictionary description",
    icon: <FaBook />,
  },
  games: {
    route: "/games",
    path: "games",
    name: "Games",
    description: "Games description",
    icon: <FaGamepad />,
  },
  challenges: {
    route: "/challenges",
    path: "challenges",
    name: "Challenges",
    description: "Challenges description",
    icon: <FaTrophy />,
  },
  leaderboard: {
    route: "/leaderboard",
    path: "leaderboard",
    name: "Leaderboard",
    description: "Leaderboard description",
    icon: <FaMoon />,
  },
  settings: {
    route: "/settings",
    path: "settings",
    name: "Settings",
    description: "Settings description",
    icon: <FaCog />,
  },
  alphabets: {
    route: "/alphabets",
    path: "alphabets",
    name: "Alphabets",
    description: "Alphabets description",
    icon: <BsAlphabet />,
  },
};

export const FooterSlogans = {
  [SlideIDs.home.route]: {
    slogan: "Your Journey Begins Here",
    subtext: "Start your language learning journey with us.",
  },
  [SlideIDs.lessons.route]: {
    slogan: "Learn, Grow, Repeat",
    subtext: "Structured lessons to guide your learning.",
  },
  [SlideIDs.myVocabulary.route]: {
    slogan: "Words are the Keys to Understanding",
    subtext: "Expand your vocabulary, expand your world.",
  },
  [SlideIDs.games.route]: {
    slogan: "Learning is Fun",
    subtext: "Play games and learn a new language.",
  },
  [SlideIDs.challenges.route]: {
    slogan: "Dare to Know",
    subtext: "Take on challenges and test your knowledge.",
  },
  [SlideIDs.leaderboard.route]: {
    slogan: "Celebrating Success",
    subtext: "See how you stack up against other learners.",
  },
  default: {
    slogan: "Unlock Languages, Unlock Opportunities",
    subtext: "Learn a new language and broaden your horizons.",
  },
};
