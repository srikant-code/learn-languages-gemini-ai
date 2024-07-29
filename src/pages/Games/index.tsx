import { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph, { IconHeader } from "../../components/Paragraph";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { CardBody, CardHeader, Spacer } from "@nextui-org/react";
import { AppCurrencyWithText } from "../Home/homeContent";

interface GamesProps {}

const Games: FunctionComponent<GamesProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.games.icon}>Games</IconHeader>
      <GamesContent userId={"hello"} />
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

const MyGamesData = [
  {
    id: "id1",
    name: "Game 1",
    description: "This is a game about learning English words.",
    points: 10,
  },
  {
    id: "id2",
    name: "Game 2",
    description: "This is a game about learning English wordsz.",
    points: 30,
  },
];

export const GamesContent = ({ userId }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      const gamesList = await fetchGames();
      setGames(gamesList);
    };

    fetchGamesData();
  }, []);

  const handlePlayGame = async (gameId, points) => {
    await updateUserGameProgress(userId, gameId, points);
    // Update UI or notify user of points earned
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        Language Learning Games
      </ParaGraph>
      <GamesHeroSection />
      <div className="flex flex-col gap-4 justify-center">
        {MyGamesData.map((game) => (
          <div className="" key={game.id}>
            <CustomCard>
              <CardHeader>
                <ParaGraph h4>{game.name}</ParaGraph>
              </CardHeader>
              <CardBody>
                <ParaGraph>{game.description}</ParaGraph>
                <ParaGraph>Points: {game.points}</ParaGraph>
                <CustomButton
                  onClick={() => handlePlayGame(game.id, game.points)}>
                  Play Game
                </CustomButton>
              </CardBody>
            </CustomCard>
          </div>
        ))}
      </div>
    </div>
  );
};

// ```

// ### Home Page Component

// ```javascript
// import React from 'react';
// import Courses from './Courses';
// import ExploreLanguages from './ExploreLanguages';
// import Games from './Games';

// const HomePage = ({ userId }) => {
//   return (
//     <div>
//       <Courses userId={userId} />
//       <ExploreLanguages userId={userId} />
//       <Games userId={userId} />
//     </div>
//   );
// };

// export default HomePage;
// ```

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

const gamesList = [
  { title: "Puzzle Builder", subtitle: "The hunt is on", xp: 50, coins: 30 },
  { title: "Jumbler", subtitle: "Mix and match", xp: 40, coins: 20 },
  { title: "Cards", subtitle: "Card master", xp: 60, coins: 35 },
  { title: "Dice", subtitle: "Roll the dice", xp: 45, coins: 25 },
];

const categories = [
  { name: "Puzzles", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
  { name: "Writing", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
  { name: "Speaking", bgImage: STRINGS.DUMMY.BACKGROUND_IMAGE },
];

function GamesHeroSection() {
  const [activeGame, setActiveGame] = useState(gamesList[0]);
  const transformScale = `transition-transform transform hover:scale-105`;
  return (
    <div className="p-4 flex flex-col gap-6 ">
      <ParaGraph className="text-lg font-bold">
        Games ({gamesList.length})
      </ParaGraph>
      <div className="flex justify-between items-start gap-6">
        <CustomCard
          as={CustomButton}
          className={`items-start w-2/3 p-5 gap-4 rounded-3xl h-full ${transformScale}`}>
          <div className="flex flex-col items-start gap-4">
            <ParaGraph className="font-bold text-3xl">
              {activeGame.title}
            </ParaGraph>
            <ParaGraph>{activeGame.subtitle}</ParaGraph>
            <div className="flex gap-2">
              <CustomButton className="px-6" variant="solid" color={"primary"}>
                Play →
              </CustomButton>
              <CustomButton className="bg-green-500 hover:bg-green-700 text-white font-bold">
                XP: {activeGame.xp}
              </CustomButton>
              <CustomButton className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold">
                <AppCurrencyWithText text={activeGame.coins} />
              </CustomButton>
            </div>
            <div className="flex gap-2"></div>
          </div>
        </CustomCard>
        <div className="w-1/3 space-y-4">
          {gamesList.map((game, index) => (
            <CustomCard
              as={CustomButton}
              key={index}
              className={`items-start w-full p-4 rounded-2xl ${transformScale}`}
              onClick={() => setActiveGame(game)}>
              <ParaGraph className="font-bold">{game.title}</ParaGraph>
              <ParaGraph>{game.subtitle}</ParaGraph>
            </CustomCard>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <CustomCard
            as={CustomButton}
            key={index}
            className={`items-start flex-1 p-6 rounded-2xl ${transformScale}`}
            style={{
              backgroundImage: `url(${category.bgImage})`,
              backgroundSize: "cover",
            }}>
            <ParaGraph className="font-bold text-xl">{category.name}</ParaGraph>
          </CustomCard>
        ))}
      </div>
    </div>
  );
}
