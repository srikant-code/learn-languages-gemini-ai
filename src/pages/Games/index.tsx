import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import CustomImage, { AllImages } from "../../components/Image";
import ParaGraph from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { STRINGS } from "../../utilities/constants";
import { ShuffleArray } from "../../utilities/utilities";
import {
  AppCurrencyIcon,
  AppCurrencyWithText,
  AppXPIcon,
  AppXPWithText,
} from "../Home/homeContent";
import { GamesMetaData } from "./gamesMetadata";
import { MediumGameCards } from "./mediumGameCards";
import { Link, Outlet } from "react-router-dom";

interface GamesProps {}

const Games: FunctionComponent<GamesProps> = () => {
  return (
    <div>
      <Outlet />
      {/* <JumbledWordsGame /> */}
    </div>
  );
};

export default Games;

// The app should also have a page section for games. It is the most exciting part
// of the app. There should be display of various different language learning realted
// games that the user should be able to play. They should be related to the lessons
// they are involved in and should display the points they will earn of completing
// those games. It should also add those points to the challenges progress and ultimately
// that will be stored in firebase. The challenges should also have those game specific
// challenges and its equivalent progress. Also in the end give me the list of what exact
// games which are suitable for learning and that can be implemented later on as a single
// developer developing the application.

// Let's add a section for language learning games to your app. This section will display various games related to the lessons the user is involved in, show the points they can earn, and update the challenges progress accordingly. We'll also store this progress in Firebase.

// ### Firebase Setup

// Ensure you have Firebase set up in your project. If not, you can follow the [Firebase setup guide](https://firebase.google.com/docs/web/setup).

// ### Firebase Collections

// We'll have the following collections in Firebase:
// 1. `games`: Stores all available language learning games.
// 2. `users`: Stores user-specific data, including their selected courses, progress, and game progress.

// ### Helper Functions

// We'll create helper functions to interact with Firebase, such as fetching games, updating game progress, and updating user points.

// ### React Components

// We'll create React components to display the games, allow users to play them, and track their progress.

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
// const fetchGames = async () => {
//   const gamesSnapshot = await getDocs(collection(db, "games"));
//   return gamesSnapshot.docs.map(doc => doc.data());
// };

// const updateUserGameProgress = async (userId, gameId, points) => {
//   const userDoc = doc(db, "users", userId);
//   const userSnapshot = await getDoc(userDoc);
//   const userData = userSnapshot.data();

//   const updatedGames = userData.games.map(game => {
//     if (game.id === gameId) {
//       return { ...game, progress: game.progress + points };
//     }
//     return game;
//   });

//   await setDoc(userDoc, { ...userData, games: updatedGames, points: userData.points + points });
// };
// ```

// ### React Components

// #### Games Component

// ```javascript

const GameCategories = {
  "Time-Bound Games": {
    id: "Time-Bound Games",
    heading: (
      <span className="flex gap-2">
        Race Against Time - Earn 2X Rewards <AppXPIcon /> <AppCurrencyIcon />!
      </span>
    ),
    summary: "Play within the limit, earn double coins and XP.",
    detailedText: (
      <>{`Dive into the thrill of our time-bound games! These games are not just about fun, they’re about strategy and speed. Complete the games within the set time limit and earn double the coins and XP. It’s time to game on and level up faster!`}</>
    ),
    props: { timer: true },
  },
  "Casual Games": {
    id: "Casual Games",
    heading: "Relax and Enjoy - No Timers, No Pressure!",
    summary: "Enjoy games at your own pace, anytime, anywhere.",
    detailedText: `Looking for a laid-back gaming experience? Our casual games are perfect for you. Whether you’re waiting for a bus or winding down for the day, these games provide a fun and relaxing way to pass the time. No timers, no pressure, just pure enjoyment.`,
    props: {},
  },
  "Multiplayer Games": {
    id: "Multiplayer Games",
    heading: "Coming Soon - The Ultimate Challenge!",
    summary: "Get ready to compete with players worldwide. Stay tuned!",
    detailedText: `Get ready for an exciting new way to game! Our multiplayer games are coming soon. Challenge your friends or players from around the world. It’s time to put your skills to the test and see who comes out on top. Stay tuned!`,
    props: { multiplayer: true },
  },
};

const gamesList = Object.values(GamesMetaData);

export const GamesContent = ({}) => {
  const [games, setGames] = useState([]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        {STRINGS.APP_NAME} Games ({gamesList.length})
      </ParaGraph>
      <CustomTabs
        id={STRINGS.STORAGE.TABS.gamesPage}
        tabs={Object.values(GameCategories).map((item) => {
          return {
            title: item.id,
            content: <RenderAllGames {...item} />,
          };
        })}
      />

      <MediumGameCards />
    </div>
  );
};

// ### Suitable Games for Language Learning

// Here are some game ideas that are suitable for language learning and can be implemented by a single developer:

// 1. **Word Matching**: Match words with their meanings or synonyms.
// 2. **Flashcard Quiz**: Use flashcards to test vocabulary.
// 3. **Sentence Construction**: Form sentences using given words.
// 4. **Listening Comprehension**: Listen to audio clips and answer questions.
// 5. **Grammar Quiz**: Test grammar knowledge with multiple-choice questions.
// 6. **Pronunciation Practice**: Repeat words or sentences and get feedback.
// 7. **Memory Game**: Match pairs of words and their meanings.
// 8. **Fill in the Blanks**: Complete sentences with the correct words.
// 9. **Role-Playing Scenarios**: Simulate real-life conversations.
// 10. **Crossword Puzzles**: Solve crossword puzzles with vocabulary words.

// ### Additional Ideas for the Homepage

// 1. **Leaderboard**: Show a leaderboard of top learners to motivate users.
// 2. **Daily Goals**: Set and track daily learning goals.
// 3. **Achievements**: Display badges or achievements for completing milestones.
// 4. **Community**: Include a section for community discussions or language exchange partners.
// 5. **Notifications**: Remind users of their progress and encourage them to continue learning.
// 6. **Personalized Recommendations**: Suggest courses or challenges based on the user's progress and interests.

// These additions can make the homepage more engaging and encourage users to stay motivated in their language learning journey. Let me know if you need any more help!

// Give me the UI for this games section, There should be a carousel with games rotating from a list. It will contain a big card which shows the active game, otpion to play and 2 more buttons which can show the XP/coins user will get. The right side small cards will also change based on the active game which is shown, On clicking the small cards that should replace the details in the main focused game card.
// And then below should be categories of games with the text and there will be a background image.
// Do this in tailwind and react.

const categories = [
  { name: "Puzzles", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
  { name: "Writing", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
  { name: "Speaking", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
];

export const TransformScale = `transition-transform transform hover:scale-105`;
function RenderAllGames({ ...props }) {
  const [activeGame, setActiveGame] = useState(gamesList[0]);
  const [parent] = useAutoAnimate();

  return (
    <div className="p-4 flex flex-col gap-6 ">
      <div className="flex flex-row flex-wrap items-start gap-6">
        <CustomCard>
          <div className="flex ">
            <CustomImage
              style={{ height: props.props?.multiplayer ? 70 : null }}
              src={
                props.props?.multiplayer
                  ? AllImages.multiplayer
                  : props.props?.timer
                  ? AllImages.clock
                  : AllImages.casual
              }
              className="h-[100px]"
            />
            <Spacer y={8} />
            <div className="flex flex-col gap-2 p-4 px-8">
              <ParaGraph className="font-bold text-2xl">{props.id}</ParaGraph>
              <ParaGraph className="font-semibold text-xl">
                {props.heading}
              </ParaGraph>
              <ParaGraph className="text-medium">
                {props.detailedText}
              </ParaGraph>
            </div>
          </div>
        </CustomCard>
        {ShuffleArray(gamesList).map((game, index) => {
          return (
            <RenderHeroCard
              key={index}
              activeGame={game}
              multiplayer={props.props?.multiplayer}
              timer={props.props?.timer}
            />
          );
        })}
        {/* <SmallGameCards setActiveGame={setActiveGame} /> */}
      </div>
      <RenderGames categories={categories} />
    </div>
  );
}

const RenderHeroCard = ({ activeGame, multiplayer, timer }) => {
  return (
    <CustomCard
      style={{ flex: 3, borderRadius: "2.9rem", padding: 1 }}
      as={CustomButton}
      className={`p-0
            bg-gradient-to-tl ${
              multiplayer
                ? "from-slate-900 via-slate-500 to-slate-400"
                : "from-slate-900 via-orange-500 to-yellow-400"
            }
          min-w-[500px] w-full whitespace-normal`}>
      {/* from-red-600 via-orange-500 to-yellow-400 */}
      <div
        className={`flex items-start flex-row justify-between gap-4 ${TransformScale} w-full relative`}>
        <div
          style={{ alignSelf: "normal" }}
          className={`flex flex-col justify-between gap-4 pl-14 py-16`}>
          <div
            className="flex-1 flex flex-col items-start"
            style={{ alignSelf: "start" }}>
            <ParaGraph
              className="font-bold text-5xl text-left"
              style={{ lineHeight: "3.6rem" }}>
              {activeGame.title}
            </ParaGraph>
            <ParaGraph
              className="font-bold text-xl text-left"
              style={{ lineHeight: "4rem" }}>
              {activeGame.gameCategory}
            </ParaGraph>
          </div>
          <div className="flex flex-col items-start justify-between gap-4">
            <ParaGraph className="text-left font-medium">
              {activeGame.description}
            </ParaGraph>
            <div className="flex flex-row gap-2 items-center">
              <CustomButton
                className="px-6 py-8 font-bold text-xl hover:text-white"
                variant={multiplayer ? "flat" : "solid"}
                disabled={multiplayer}
                color={multiplayer ? undefined : "primary"}
                as={multiplayer ? undefined : Link}
                to={
                  multiplayer
                    ? undefined
                    : `${timer ? "time_" : ""}${activeGame.title
                        ?.toLowerCase()
                        ?.replaceAll(" ", "_")}`
                }>
                {multiplayer ? "Coming Soon" : timer ? `⏰ Play →` : `Play →`}
              </CustomButton>
              <div className="flex gap-4">
                <CustomCard className="p-2 flex place-content-center rounded-2xl h-fit font-bold">
                  <ParaGraph className="text-sm text-left font-medium">
                    Max XP
                  </ParaGraph>
                  <AppXPWithText text={activeGame.maxXP / (timer ? 1 : 2)} />
                </CustomCard>
                <CustomCard className="p-2 flex place-content-center rounded-2xl h-fit font-bold">
                  <ParaGraph className="text-sm text-left font-medium">
                    Max {STRINGS.APP_CURRENCY}
                  </ParaGraph>
                  <AppCurrencyWithText
                    text={activeGame.maxCoins / (timer ? 1 : 2)}
                  />
                </CustomCard>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4" style={{ zIndex: 11 }}>
          {(timer || multiplayer) && (
            <CustomCard className={"p-0 opacity-80 bg-blend-multiply w-full"}>
              <div className="p-0 w-full">
                <CustomImage
                  src={timer ? AllImages.clock : AllImages.multiplayer}
                  className="rotate-12 h-[50px] p-4 w-full"
                  style={{ padding: multiplayer ? "1rem" : 0 }}
                />
              </div>
            </CustomCard>
          )}
        </div>
        <div className="w-[100%] m-2">
          <GameCardImage
            game={activeGame}
            className={"h-[340px] w-full"}
            disabled={multiplayer}
          />
        </div>
      </div>
    </CustomCard>
  );
};

const RenderGames = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category, index) => (
        <CustomCard
          as={CustomButton}
          key={index}
          className={`items-start flex-1 p-6 rounded-2xl ${TransformScale}`}
          style={{
            backgroundImage: `url(${category.bgImage})`,
            backgroundSize: "cover",
          }}>
          <ParaGraph className="font-bold text-xl">{category.name}</ParaGraph>
        </CustomCard>
      ))}
    </div>
  );
};

export const GameCardImage = ({ game, className, disabled }) => {
  return (
    <CustomCard
      className={`border-none h-full flex p-0 rounded-[2.2rem] relative justify-center items-center ${className} `}>
      {game?.image && (
        <BgImage
          style={{ mixBlendMode: disabled ? "luminosity" : undefined }}
          image={game.image}
        />
      )}
      <div className="flex place-items-center">
        {game?.imageText && (
          <CustomImage
            src={game?.imageText}
            style={{ mixBlendMode: disabled ? "luminosity" : undefined }}
            className={`w-3/4 z-10 m-10`}
          />
        )}
      </div>
    </CustomCard>
  );
};

export const BgImage = ({ image, style }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        width: "110%",
        height: "110%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
      className={"max-w-none absolute"}
    />
  );
};
