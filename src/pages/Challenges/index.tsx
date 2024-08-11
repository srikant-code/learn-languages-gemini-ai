import { Spacer } from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import CustomImage, { AllImages } from "../../components/Image";
import ParaGraph from "../../components/Paragraph";
import { CustomProgress } from "../../components/Progress";
import CustomTabs from "../../components/Tabs";
import { STRINGS } from "../../utilities/constants";
import { AppCurrencyWithText, AppStreakIcon } from "../Home/homeContent";
import { ChallengesComponent } from "./challengesTemplate";

interface ChallengesProps {}

const ChallengesObject = {
  daily: [
    {
      id: 1,
      title: "Daily Vocabulary Quiz",
      description: "Take a daily quiz to test your vocabulary knowledge.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 2,
      title: "Flashcard Review",
      description: "Review flashcards for 15 minutes.",
      points: 15,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 3,
      title: "Word of the Day",
      description: "Learn and use the word of the day in a sentence.",
      points: 10,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 4,
      title: "Pronunciation Practice",
      description: "Practice pronunciation with the AI and get feedback.",
      points: 25,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 5,
      title: "Listening Comprehension",
      description:
        "Listen to a short audio clip and answer questions about it.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
  ],
  weekly: [
    {
      id: 6,
      title: "Translate a short story",
      description:
        "Translate a short story from your native language to the target language.",
      points: 50,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 7,
      title: "Conversation Practice",
      description:
        "Have a conversation with the AI in the target language for 10 minutes.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 8,
      title: "Grammar Exercise",
      description: "Complete a grammar exercise focusing on past tense verbs.",
      points: 25,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 9,
      title: "Write a Diary Entry",
      description: "Write a diary entry in the target language about your day.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 10,
      title: "Reading Comprehension",
      description: "Read a short article and answer comprehension questions.",
      points: 25,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
  ],
  lifetime: [
    {
      id: 11,
      title: "Cultural Insights",
      description:
        "Learn about a cultural aspect of a country where the target language is spoken.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 12,
      title: "Role-Playing",
      description:
        "Role-play a scenario with the AI, such as ordering food at a restaurant.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 13,
      title: "Synonym Challenge",
      description: "Find synonyms for 10 words in the target language.",
      points: 15,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 14,
      title: "Antonym Challenge",
      description: "Find antonyms for 10 words in the target language.",
      points: 15,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 15,
      title: "Sentence Construction",
      description: "Construct 10 sentences using new vocabulary words.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 16,
      title: "Language Games",
      description: "Play a language game to reinforce learning.",
      points: 25,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 17,
      title: "Watch a Short Video",
      description:
        "Watch a short video in the target language and summarize it.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 18,
      title: "News Article Translation",
      description:
        "Translate a news article from the target language to your native language.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 19,
      title: "Storytelling",
      description:
        "Tell a story in the target language using prompts provided by the AI.",
      points: 25,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 20,
      title: "Peer Review",
      description: "Review and provide feedback on another learner's writing.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 21,
      title: "Language Exchange",
      description: "Participate in a language exchange with another learner.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 22,
      title: "Dictation Exercise",
      description: "Listen to a passage and write it down as you hear it.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 23,
      title: "Grammar Quiz",
      description: "Take a quiz to test your grammar knowledge.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 24,
      title: "Interactive Story",
      description:
        "Participate in an interactive story where you make choices in the target language.",
      points: 30,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
    {
      id: 25,
      title: "Idioms and Phrases",
      description: "Learn and use 5 new idioms or phrases in sentences.",
      points: 20,
      endDate: moment().endOf("day").toISOString(),
      status: "incomplete",
    },
  ],
};

const badges = [
  {
    badgeId: 1,
    badgeTitle: "Novice",
    badgeDescription: "Complete 1 challenge",
  },
  { badgeId: 2, badgeTitle: "Pro", badgeDescription: "Complete 5 challenges" },
  {
    badgeId: 3,
    badgeTitle: "Grammar Guru",
    badgeDescription: "Master 10 grammar lessons",
  },
  {
    badgeId: 4,
    badgeTitle: "Vocabulary Victor",
    badgeDescription: "Learn 50 new words",
  },
  {
    badgeId: 5,
    badgeTitle: "Fluent Speaker",
    badgeDescription: "Speak for 30 minutes",
  },
  {
    badgeId: 6,
    badgeTitle: "Listening Legend",
    badgeDescription: "Listen to 10 audio lessons",
  },
  {
    badgeId: 7,
    badgeTitle: "Writing Wizard",
    badgeDescription: "Write 5 essays",
  },
  {
    badgeId: 8,
    badgeTitle: "Reading Rockstar",
    badgeDescription: "Read 3 books",
  },
  {
    badgeId: 9,
    badgeTitle: "Quiz Master",
    badgeDescription: "Score 100% on 5 quizzes",
  },
  {
    badgeId: 10,
    badgeTitle: "Daily Streak",
    badgeDescription: "Complete challenges for 7 consecutive days",
  },
];

const Challenges: FunctionComponent<ChallengesProps> = () => {
  return (
    <div>
      <div className="p-4">
        <ChallengesPage
          challenges={ChallengesObject}
          // onCompleteAll={handleCompleteChallenge}
        />
      </div>
    </div>
  );
};

export default Challenges;

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const ChallengesPage = ({ challenges }) => {
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   const userDoc = doc(db, "users", "userId"); // Replace "userId" with the actual user ID
    //   const userSnapshot = await getDoc(userDoc);
    //   const userData = userSnapshot.data();
    //   if (userData) {
    //     setPoints(userData.points);
    //     setProgress(
    //       (userData.completedChallenges.length /
    //         Object.values(challenges).flat().length) *
    //         100
    //     );
    //   }
    // };
    // fetchUserData();
  }, []);

  const handleCompleteChallenge = async (challengeId, category) => {
    // await completeChallenge(challengeId, category);
    // setPoints(userPoints);
    // setProgress(getProgress());
  };

  const allCompleted = true; //challenges?.every(
  //   (challenge) => challenge.status === "completed"
  // );

  return (
    <div>
      <ChallengeHeaderCard
        coins={327}
        bonusCoins={27}
        streakDays={5}
        titleTop="Pro learner"
        titleBottom="Novice hunter"
      />
      <Spacer y={8} />
      <Spacer y={4} />
      <CustomTabs
        id={STRINGS.STORAGE.TABS.challengesPage}
        // className=""
        fullWidth
        tabs={Object.keys(challenges).map((category) => {
          return {
            title: category.toProperCase(),
            content: <RenderChallengesCategories category={category} />,
          };
        })}
      />
      <Spacer y={6} />
      {allCompleted && (
        <CustomCard className="bg-green-200 dark:bg-green-900 p-6 rounded-2xl flex flex-col">
          <ParaGraph className="font-bold text-xl">Congratulations!</ParaGraph>
          <ParaGraph>You have completed today's challenges.</ParaGraph>
        </CustomCard>
      )}
      <div className="mt-8">
        <ParaGraph className="text-lg font-bold">Badges</ParaGraph>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {badges.map((badge) => (
            <CustomCard key={badge.badgeId} className="p-4 rounded-2xl ">
              <ParaGraph className="text-xl font-bold">
                {badge.badgeTitle}
              </ParaGraph>
              <Spacer y={2} />
              <ParaGraph>{badge.badgeDescription}</ParaGraph>
            </CustomCard>
          ))}
        </div>
      </div>
      <ChallengesComponent />
    </div>
  );
};

function ChallengeHeaderCard({
  coins,
  bonusCoins,
  streakDays,
  titleTop,
  titleBottom,
}) {
  return (
    <CustomCard
      className="max-h-96 flex flex-row p-0 rounded-3xl justify-between 
    relative bg-gradient-to-tr from-violet-400 via-pink-400 to-yellow-400">
      <div className="flex flex-col p-8 gap-4 z-10">
        <div className="flex items-start gap-4">
          <CustomImage src={AllImages.badge1} className={`w-[100px]`} />
          <div className="">
            <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
              {titleTop}
              <br />
              {titleBottom}
            </ParaGraph>
          </div>
        </div>
        {/* <ParaGraph className="text-gray-600">Coins</ParaGraph> */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <ParaGraph className="text-xl font-bold">
              <AppCurrencyWithText
                className={"text-5xl"}
                pClassName={"text-3xl"}
                text={coins}
              />
            </ParaGraph>
            <ParaGraph className="text-green-950 font-bold">
              +{bonusCoins} {STRINGS.APP_CURRENCY}
            </ParaGraph>
          </div>
          <ParaGraph className="font-bold pl-4">
            <AppStreakIcon />
            {streakDays} days streak
          </ParaGraph>
        </div>
      </div>

      <div>
        {/* className={"absolute top-0 right-0"} */}
        <CustomImage
          src={AllImages.challenges}
          className={"w-[320px] absolute top-0 right-[-50px]"}
        />
      </div>
    </CustomCard>
  );
}

const RenderChallengesCategories = ({ category }) => {
  const [challenges, setChallenges] = useState(ChallengesObject[category]);

  const handleCompleteChallenge = (id) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === id
          ? {
              ...challenge,
              status: "completed",
              completedAt: moment().toISOString(),
            }
          : challenge
      )
    );
  };

  return (
    <div key={category} className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <ParaGraph className="text-3xl font-bold">
          Today's Challenges ({challenges.length ?? 0})
        </ParaGraph>
        {/* <ParaGraph h3>Total Points: {0}</ParaGraph> */}
      </div>
      <CustomProgress value={30} color="primary" />
      <ParaGraph
        className={`first-letter:uppercase ${STRINGS.CLASSES.heading}`}>
        {category} Challenges ({challenges?.length})
      </ParaGraph>
      <Spacer y={1} />
      <div className="flex flex-wrap gap-8">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onComplete={() => onCompleteAll(challenge.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ChallengeCard = ({ challenge, onComplete }) => {
  const { title, description, points, endDate, status } = challenge;
  const timeLeft = moment(endDate).fromNow();

  return (
    <div className="min-w-[300px] w-full max-w-[45%]">
      <CustomCard
        className={`flex flex-col min-w-min gap-4 z-10 p-6 h-fit rounded-3xl transition-transform transform ${
          status === "completed" ? "scale-105" : "hover:scale-105"
        }`}>
        <ParaGraph className="font-bold text-xl">{title}</ParaGraph>
        <ParaGraph className="">{description}</ParaGraph>
        <ParaGraph className="text-green-500">
          <AppCurrencyWithText text={points} />
        </ParaGraph>
        {status === "completed" ? (
          <ParaGraph className="text-blue-500 font-bold">Completed!</ParaGraph>
        ) : (
          <CustomButton
            onClick={onComplete}
            className="font-bold"
            variant="solid"
            color="primary"
            // onClick={() =>
            //   handleCompleteChallenge(challenge.id, category)
            // }
            // disabled={completedChallenges.has(challenge.id)}
          >
            {/* {completedChallenges.has(challenge.id)
                        ? "Completed"
                        :  "Complete Challenge"
          }*/}
            Complete Challenge
          </CustomButton>
        )}
      </CustomCard>
      <CustomCard className="p-4 mt-[-2.5rem]">
        <Spacer y={8} />
        <div className="px-3 flex gap-4 items-center">
          <FaClock />
          <ParaGraph className="font-medium">Ends: {timeLeft}</ParaGraph>
        </div>
      </CustomCard>
    </div>
  );
};
