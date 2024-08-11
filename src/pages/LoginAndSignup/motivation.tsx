import { ScrollShadow } from "@nextui-org/react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import { CheckRightTop } from "./languageFinder";

interface MotivationToLearnProps {}

export const MOTIVATION = {
  JOB_OPPORTUNITIES: "Job opportunities",
  LEARN_NEW_CULTURES: "Learn new cultures",
  BRAIN_TRAINING: "Brain training",
  FAMILY_AND_FRIENDS: "Family and friends",
  TRAVELING_TO_NEW_PLACE: "Traveling to new place",
  SCHOOL_AND_COLLEGE: "School/college",
  MOVING_AND_STAYING_IN_NEW_CITY: "Moving and staying in a new city",
  OTHERS: "Others",
};

export const Motivations = [
  {
    icon: "💼",
    description: "Got a job and needs to talk with people?",
    label: MOTIVATION.JOB_OPPORTUNITIES,
  },
  {
    icon: "🧫",
    description: "Casually want to know about different culture.",
    label: MOTIVATION.LEARN_NEW_CULTURES,
  },
  {
    icon: "🧠",
    description: "Need to give my free mind some work.",
    label: MOTIVATION.BRAIN_TRAINING,
  },
  {
    icon: "👫",
    description:
      "My girlfriend is from different state so need to learn to surprise her.",
    label: MOTIVATION.FAMILY_AND_FRIENDS,
  },
  {
    icon: "🛩️",
    description: "Gotta travel to Dubai for few weeks?",
    label: MOTIVATION.TRAVELING_TO_NEW_PLACE,
  },
  {
    icon: "🚌",
    description: "My grades are dependent on learning a language.",
    label: MOTIVATION.SCHOOL_AND_COLLEGE,
  },
  {
    icon: "🌇",
    description: "Completely shifting to a new state.",
    label: MOTIVATION.MOVING_AND_STAYING_IN_NEW_CITY,
  },
  {
    icon: "🎮",
    description: "I don't know, I am just exploring it.",
    label: MOTIVATION.OTHERS,
  },
];

export const MotivationSuggestedActions = {
  [MOTIVATION.JOB_OPPORTUNITIES]: [
    {
      label: "Practice business vocabulary and phrases",
      icon: "💼",
      prompt: "Generate a list of business vocabulary and phrases",
    },
    {
      label: "Learn formal language etiquette",
      icon: "👔",
      prompt: "Provide a lesson on formal language etiquette",
    },
    {
      label: "Participate in simulated job interviews",
      icon: "🎙️",
      prompt: "Create a simulated job interview scenario",
    },
    {
      label: "Learn to write professional emails",
      icon: "✉️",
      prompt: "Provide a lesson on writing professional emails",
    },
    {
      label: "Understand workplace culture in target",
      icon: "🏢",
      prompt: "Describe the workplace culture in target",
    },
  ],
  [MOTIVATION.LEARN_NEW_CULTURES]: [
    {
      label: "Explore cultural lessons on traditions and customs",
      icon: "🌍",
      prompt:
        "Provide a lesson on traditions and customs of the target culture",
    },
    {
      label: "Learn about famous historical figures and events",
      icon: "📚",
      prompt:
        "Provide information on famous historical figures and events of the target culture",
    },
    {
      label: "Discover popular music, movies, and books",
      icon: "🎵",
      prompt: "List popular music, movies, and books of the target culture",
    },
    {
      label: "Learn to cook traditional dishes",
      icon: "🍲",
      prompt: "Provide a recipe for a traditional dish from the target culture",
    },
    {
      label: "Participate in cultural quizzes and games",
      icon: "🎮",
      prompt: "Create a cultural quiz or game related to the target culture",
    },
  ],
  [MOTIVATION.BRAIN_TRAINING]: [
    {
      label: "Participate in language puzzles and word games",
      icon: "🧩",
      prompt: "Generate a language puzzle or word game",
    },
    {
      label: "Learn complex grammar structures",
      icon: "📖",
      prompt: "Provide a lesson on complex grammar structures",
    },
    {
      label: "Practice memory exercises with vocabulary",
      icon: "🧠",
      prompt: "Create a memory exercise using vocabulary words",
    },
    {
      label: "Listen to language podcasts",
      icon: "🎧",
      prompt: "Recommend a language podcast",
    },
    {
      label: "Read advanced level literature",
      icon: "📚",
      prompt: "Recommend a piece of advanced level literature",
    },
  ],
  [MOTIVATION.FAMILY_AND_FRIENDS]: [
    {
      label: "Learn colloquial phrases and slangs",
      icon: "💬",
      prompt: "Provide a list of colloquial phrases and slangs",
    },
    {
      label: "Practice everyday conversations",
      icon: "🗣️",
      prompt: "Create a scenario for an everyday conversation",
    },
    {
      label: "Learn about family-related vocabulary",
      icon: "👨‍👩‍👧‍👦",
      prompt: "Provide a list of family-related vocabulary words",
    },
    {
      label: "Understand cultural nuances in communication",
      icon: "🌐",
      prompt: "Explain some cultural nuances in communication",
    },
    {
      label: "Participate in role-plays with family scenarios",
      icon: "🎭",
      prompt: "Create a role-play scenario involving a family situation",
    },
  ],
  [MOTIVATION.TRAVELING_TO_NEW_PLACE]: [
    {
      label: "Learn essential travel phrases",
      icon: "✈️",
      prompt: "Provide a list of essential travel phrases",
    },
    {
      label: "Understand transportation and directions vocabulary",
      icon: "🚗",
      prompt:
        "Provide a list of vocabulary words related to transportation and directions",
    },
    {
      label: "Practice ordering at restaurants",
      icon: "🍽️",
      prompt: "Create a scenario for ordering at a restaurant at target",
    },
    {
      label: "Learn about tourist attractions",
      icon: "🗺️",
      prompt: "Provide information about popular tourist attractions at target",
    },
    {
      label: "Understand currency and shopping vocabulary",
      icon: "💰",
      prompt:
        "Provide a list of vocabulary words related to currency and shopping",
    },
  ],
  [MOTIVATION.SCHOOL_AND_COLLEGE]: [
    {
      label: "Practice academic vocabulary",
      icon: "🎓",
      prompt: "Generate a list of academic vocabulary",
    },
    {
      label: "Learn to write essays and reports",
      icon: "📝",
      prompt: "Provide a lesson on writing essays and reports",
    },
    {
      label: "Understand lecture-style content",
      icon: "👩‍🏫",
      prompt: "Create a lecture-style content on a given topic",
    },
    {
      label: "Participate in study group discussions",
      icon: "👥",
      prompt: "Create a scenario for a study group discussion",
    },
    {
      label: "Practice presentations in the target language",
      icon: "🎤",
      prompt: "Create a presentation script",
    },
  ],
  [MOTIVATION.MOVING_AND_STAYING_IN_NEW_CITY]: [
    {
      label: "Learn about housing and accommodation vocabulary",
      icon: "🏠",
      prompt:
        "Generate a list of vocabulary related to housing and accommodation",
    },
    {
      label: "Understand local slang and dialects",
      icon: "🗣️",
      prompt: "Provide a list of local slang and dialects",
    },
    {
      label: "Practice conversations at local places (like markets, hospitals)",
      icon: "🏪",
      prompt:
        "Create a conversation scenario at a local place like a market or hospital",
    },
    {
      label: "Learn about local laws and regulations",
      icon: "⚖️",
      prompt: "Provide information about local laws and regulations",
    },
    {
      label: "Understand cultural norms and etiquette",
      icon: "🎩",
      prompt: "Explain the cultural norms and etiquette of target",
    },
  ],
  [MOTIVATION.OTHERS]: [
    {
      label: "Explore a variety of lessons and choose what interests you",
      icon: "🔍",
      prompt: "Generate a variety of lessons on different topics",
    },
    {
      label: "Participate in community discussions and forums",
      icon: "💬",
      prompt: "Create a scenario for a community discussion or forum",
    },
    {
      label: "Set your own learning goals and track them",
      icon: "🎯",
      prompt: "Provide a template for setting and tracking learning goals",
    },
    {
      label: "Try out different learning methods (like flashcards, immersion)",
      icon: "📚",
      prompt:
        "Generate a lesson using a different learning method like flashcards or immersion",
    },
    {
      label: "Explore user-generated content and lessons",
      icon: "👥",
      prompt: "Provide a list of content and lessons",
    },
  ],
};

const morefeatures = {
  "Interactive Lessons": [
    "AI-powered lessons that adapt to the user's proficiency level",
    "Interactive exercises with instant feedback",
    "Grammar lessons with detailed explanations",
    "Pronunciation practice with speech recognition technology",
    "Spaced repetition system for vocabulary learning",
  ],
  "Community Features": [
    "Language exchange with other learners",
    "Community forums for discussions and questions",
    "Peer review of writing and speaking exercises",
    "Group challenges and competitions",
    "User-generated content and lessons",
  ],
  "Progress Tracking": [
    "Detailed progress reports",
    "Personalized learning recommendations",
    "Goal setting and tracking",
    "Badges and rewards for motivation",
    "Reminders and notifications for study sessions",
  ],
  "Multimedia Content": [
    "Video lessons with subtitles",
    "Audio lessons for listening practice",
    "Interactive stories and dialogues",
    "News articles and blog posts in the target language",
    "Songs and movies with interactive transcripts",
  ],
  "Additional Tools": [
    "Quick Translator tool for instant translations",
    "Flashcards for vocabulary practice",
    "Dictionary with example sentences",
    "Notebook for saving new words and phrases",
    "Language games for fun and effective learning",
  ],
};

const MotivationToLearn: FunctionComponent<MotivationToLearnProps> = ({
  motivation,
  setMotivation,
  className,
}) => {
  const motivPresent = (motiv) => motivation?.find((g) => g === motiv.label);

  const addOrDeleteMotivation = (motiv) => {
    if (motivPresent(motiv))
      setMotivation(motivation?.filter((g) => g !== motiv.label));
    else setMotivation([...motivation, motiv.label]);
  };
  return (
    <ScrollShadow className="h-[60vh] flex flex-wrap gap-4">
      {Motivations.map((motiv, index) => {
        return (
          <CustomCard
            as={CustomButton}
            key={index}
            className="p-0 w-full max-w-[47%] flex items-start justify-start">
            <div
              className="p-6 flex flex-col items-start gap-2"
              onClick={() => addOrDeleteMotivation(motiv)}>
              <ParaGraph className="absolute top-6 right-6 text-5xl">
                {motiv.icon}
              </ParaGraph>
              <ParaGraph className="text-left text-lg font-semibold min-w-40 max-w-[160px] w-[75%] whitespace-break-spaces">
                {motiv.label}
              </ParaGraph>
              <ParaGraph className="text-left text-small min-w-48 max-w-[160px] w-[75%] whitespace-break-spaces">
                {motiv.description}
              </ParaGraph>
              {motivPresent(motiv) ? <CheckRightTop /> : <></>}
            </div>
          </CustomCard>
        );
      })}
    </ScrollShadow>
  );
};

export default MotivationToLearn;
