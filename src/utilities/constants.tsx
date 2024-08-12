import { BsAlphabet } from "react-icons/bs";
import {
  FaBook,
  FaCog,
  FaGamepad,
  FaHome,
  FaReadme,
  FaTrophy,
} from "react-icons/fa";
import { FaMoon, FaPersonSnowboarding } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
export const STRINGS = {
  APP_NAME: "GemLingua",
  APP_CURRENCY: "Gems",
  CLASSES: {
    bigButton: "p-5 px-8 h-16 font-medium text-xl rounded-3xl",
    borderedHeading:
      "border-b-2 dark:border-slate-700 pb-3 text-xl font-semibold first-letter:uppercase",
    heading: "text-2xl font-semibold first-letter:uppercase",
    subHeading: "text-xl font-semibold first-letter:uppercase text-ellipsis",
    subText: "text-sm text-gray-500",
    gradientPinkYellow: "bg-gradient-to-r from-pink-500 to-yellow-500",
    gradientPinkRed: "bg-gradient-to-r from-pink-500 to-yellow-500",
    gradientPinkPurpleDark:
      "bg-gradient-to-tr from-slate-800 via-pink-950 to-violet-950 light:from-slate-200 light:via-pink-200 light:to-violet-200",
    basicTransitions: "transition-all ease-in-out duration-500",
    buttonVariantWhiteSpaceBreak: "whitespace-break-spaces text-left p-4 h-fit",
  },
  DIFFICULTY: {
    easy: {
      id: "easy",
      name: "Easy",
    },
    medium: {
      id: "medium",
      name: "Medium",
    },
    hard: {
      id: "hard",
      name: "Hard",
    },
  },
  DUMMY: {
    PROFILE_IMAGE: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    BACKGROUND_IMAGE: "https://nextui.org/images/card-example-6.jpeg",
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
  REGEX: {
    DATE: /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\-((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\-02\-((19|[2-9]\d)\d{2}))|(29\-02\-((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/,
    EMAIL:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  RESPONSE: {
    SUCCESS: "success",
    ERROR: "error",
  },
  SEPARATOR: { BULL: " • " },
  STORAGE: {
    ALPHABETS_DATA: "alphabetsData",
    CHALLENGES: "challengesData",
    CHAPTERS_DATA: "chaptersData",
    CHAT_INPUT_VALUE: "chatInputValue",
    COINS: "coins",
    COURSES_DATA: "coursesData",
    CURRENT_LEARNING_LANGUAGE: "currentLearningLanguage",
    DICTIONARY_API: "dictionaryAPIData",
    DICTIONARY_AI: "dictionaryAIData",
    DICTIONARY_SEARCH_BAR: "dictionarySearchBar",
    FLASH_CARDS_DATA: "flashCardsData",
    GAMES_DATA: "gamesData",
    LAST_DATE: "lastDate",
    MY_VOCABULARY: "myVocabulary",
    ONGOING_CHAT_ID: "ongoingChatID",
    SAVED_CHATS: "savedChats",
    SETTINGS: "settings",
    STREAK: "streak",
    SUBMISSIONS_DATA: "submissionsData",
    TABS: {
      allChapters: "allChapters",
      alphabets: "alphabets",
      appHeader: "appHeader",
      chat: "chat",
      challengesPage: "challengesPage",
      coursePage: "coursePage",
      coursePractice: "coursePractice",
      dictionary: "dictionary",
      flashCards: "flashCards",
      gamesPage: "gamesPage",
      gamePlay: "gamePlay",
      loginForm: "loginForm",
      rightSideBar: "rightSideBar",
    },
    TIME_SPENT: "timeSpent",
    STREAK_CALENDAR: "streakCalendar",
    VOCABULARY_SEARCH_BAR: "vocabularySearchBar",
    WORDS_LISTENED: "wordsListened",
    XP: "xp",
    //
    languagesUserKnows: "languagesUserKnows",
    languagesUserWantsToKnow: "languagesUserWantsToKnow",
    motivation: "motivation",
    dailyGoal: "dailyGoal",
    login: "login",
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
    CUSTOM: "custom",
  },
};

export const SlideIDs = {
  onboarding: {
    route: "/onboarding",
    path: "onboarding",
    name: "onboarding",
    description: "Onboarding description",
    icon: <FaPersonSnowboarding />,
  },
  login: {
    route: "/login",
    path: "login",
    name: "login",
    description: "Login description",
    icon: <FaHome />,
  },
  home: {
    route: "/",
    path: "",
    name: "Home",
    description: "Home description",
    icon: <FaHome />,
  },
  dashboard: {
    route: "/dashboard",
    path: "dashboard",
    name: "Dashboard",
    description: "Dashboard description",
    icon: <TbLayoutDashboardFilled />,
  },
  courses: {
    route: "/courses",
    path: "courses",
    name: "Courses",
    description: "Courses description",
    icon: <FaReadme />,
  },
  course: {
    route: "/:course",
    path: ":course",
    name: "Course",
    description: "Course description",
    icon: <FaReadme />,
  },
  // chapters: {
  //   route: "/chapters",
  //   path: "chapters",
  //   name: "Chapters",
  //   icon: <FaReadme />,
  // },
  chapter: {
    route: "/:chapter",
    path: ":chapter",
    name: "Chapter",
    icon: <FaReadme />,
  },
  // lessons: {
  //   route: "/lessons",
  //   path: "lessons",
  //   name: "Lessons",
  //   icon: <FaReadme />,
  // },
  lesson: {
    route: "/:lesson",
    path: ":lesson",
    name: "Lesson",
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
  [SlideIDs.dashboard.route]: {
    slogan: "Your Journey Begins Here",
    subtext: "Start your language learning journey with us.",
  },
  [SlideIDs.courses.route]: {
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
