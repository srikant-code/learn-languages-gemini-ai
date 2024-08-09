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
    { label: "Practice business vocabulary and phrases", icon: "💼" },
    { label: "Learn formal language etiquette", icon: "👔" },
    { label: "Participate in simulated job interviews", icon: "🎙️" },
    { label: "Learn to write professional emails", icon: "✉️" },
    {
      label: "Understand workplace culture of the target language",
      icon: "🏢",
    },
  ],
  [MOTIVATION.LEARN_NEW_CULTURES]: [
    { label: "Explore cultural lessons on traditions and customs", icon: "🌍" },
    { label: "Learn about famous historical figures and events", icon: "📚" },
    { label: "Discover popular music, movies, and books", icon: "🎵" },
    { label: "Learn to cook traditional dishes", icon: "🍲" },
    { label: "Participate in cultural quizzes and games", icon: "🎮" },
  ],
  [MOTIVATION.BRAIN_TRAINING]: [
    { label: "Participate in language puzzles and word games", icon: "🧩" },
    { label: "Learn complex grammar structures", icon: "📖" },
    { label: "Practice memory exercises with vocabulary", icon: "🧠" },
    { label: "Listen to language podcasts", icon: "🎧" },
    { label: "Read advanced level literature", icon: "📚" },
  ],
  [MOTIVATION.FAMILY_AND_FRIENDS]: [
    { label: "Learn colloquial phrases and slangs", icon: "💬" },
    { label: "Practice everyday conversations", icon: "🗣️" },
    { label: "Learn about family-related vocabulary", icon: "👨‍👩‍👧‍👦" },
    { label: "Understand cultural nuances in communication", icon: "🌐" },
    { label: "Participate in role-plays with family scenarios", icon: "🎭" },
  ],
  [MOTIVATION.TRAVELING_TO_NEW_PLACE]: [
    { label: "Learn essential travel phrases", icon: "✈️" },
    {
      label: "Understand transportation and directions vocabulary",
      icon: "🚗",
    },
    { label: "Practice ordering at restaurants", icon: "🍽️" },
    { label: "Learn about tourist attractions", icon: "🗺️" },
    { label: "Understand currency and shopping vocabulary", icon: "💰" },
  ],
  [MOTIVATION.SCHOOL_AND_COLLEGE]: [
    { label: "Practice academic vocabulary", icon: "🎓" },
    { label: "Learn to write essays and reports", icon: "📝" },
    { label: "Understand lecture-style content", icon: "👩‍🏫" },
    { label: "Participate in study group discussions", icon: "👥" },
    { label: "Practice presentations in the target language", icon: "🎤" },
  ],
  [MOTIVATION.MOVING_AND_STAYING_IN_NEW_CITY]: [
    { label: "Learn about housing and accommodation vocabulary", icon: "🏠" },
    { label: "Understand local slang and dialects", icon: "🗣️" },
    {
      label: "Practice conversations at local places (like markets, hospitals)",
      icon: "🏪",
    },
    { label: "Learn about local laws and regulations", icon: "⚖️" },
    { label: "Understand cultural norms and etiquette", icon: "🎩" },
  ],
  [MOTIVATION.OTHERS]: [
    {
      label: "Explore a variety of lessons and choose what interests you",
      icon: "🔍",
    },
    { label: "Participate in community discussions and forums", icon: "💬" },
    { label: "Set your own learning goals and track them", icon: "🎯" },
    {
      label: "Try out different learning methods (like flashcards, immersion)",
      icon: "📚",
    },
    { label: "Explore user-generated content and lessons", icon: "👥" },
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
