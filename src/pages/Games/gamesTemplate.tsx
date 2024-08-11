import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import {
  useAllGames,
  useGame,
  useGameBestScores,
  useGameChallenges,
  useGameLevels,
  useGamePlays,
} from "../../store/reduxHelpers/games";
import { STRINGS } from "../../utilities/constants";

const heading = STRINGS.CLASSES.heading;
const subHeading = STRINGS.CLASSES.subHeading;
// GamesComponent displays a list of all games
export const GamesComponent = () => {
  const games = useAllGames();

  return (
    <div>
      <ParaGraph className={`${heading}`}>All Games</ParaGraph>
      {Object.values(games).map((game, index) => (
        <CustomCard key={index}>
          <ParaGraph className={`${subHeading}`}>{game.name}</ParaGraph>
          <ParaGraph>{game.description}</ParaGraph>
        </CustomCard>
      ))}
    </div>
  );
};

// GameComponent displays the details of a specific game
export const GameComponent = ({ gameID }) => {
  const game = useGame(gameID);
  const challenges = useGameChallenges(gameID);
  const bestScores = useGameBestScores(gameID);

  return (
    <div>
      <ParaGraph className={`${heading}`}>{game.name}</ParaGraph>
      <ParaGraph>{game.description}</ParaGraph>
      <ParaGraph className={`${subHeading}`}>Challenges</ParaGraph>
      {Object.values(challenges).map((challenge, index) => (
        <CustomCard key={index}>
          <h3>{challenge.name}</h3>
          <ParaGraph>{challenge.description}</ParaGraph>
        </CustomCard>
      ))}
      <ParaGraph className={`${subHeading}`}>Best Scores</ParaGraph>
      {Object.values(bestScores).map((score, index) => (
        <CustomCard key={index}>
          <ParaGraph>Score: {score.totalScore}</ParaGraph>
        </CustomCard>
      ))}
    </div>
  );
};

// GamePlayComponent displays the game plays of a specific game
export const GamePlayComponent = ({ gameID, mode, difficulty, level }) => {
  const gamePlays = useGamePlays(gameID, mode, difficulty, level);

  return (
    <div>
      <ParaGraph className={`${heading}`}>Game Plays</ParaGraph>
      {Object.values(gamePlays).map((gamePlay, index) => (
        <CustomCard key={index}>
          <ParaGraph>Score: {gamePlay.totalScore}</ParaGraph>
          <ParaGraph>Time Elapsed: {gamePlay.timeElapsed}</ParaGraph>
        </CustomCard>
      ))}
    </div>
  );
};

// GameLevelsComponent displays the levels of a specific game
export const GameLevelsComponent = ({ gameID, mode, difficulty }) => {
  const levels = useGameLevels(gameID, mode, difficulty);

  return (
    <div>
      <ParaGraph className={`${heading}`}>Levels</ParaGraph>
      {levels.map((level, index) => (
        <CustomCard key={index}>
          <ParaGraph>Level: {level}</ParaGraph>
        </CustomCard>
      ))}
    </div>
  );
};
