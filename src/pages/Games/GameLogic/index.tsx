import { Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import CustomButton from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import CustomImage, { AllImages } from "../../../components/Image";
import ParaGraph from "../../../components/Paragraph";
import CustomCircularProgress from "../../../components/Progress";
import { STRINGS } from "../../../utilities/constants";
import { CustomUnOrderedList } from "../../Dictionary";
import { AppCurrencyWithText, AppXPWithText } from "../../Home/homeContent";
import { GamesMetaData } from "../gamesMetadata";
import { RenderMediumGameCard } from "../mediumGameCards";
import CustomTabs from "../../../components/Tabs";

interface GamePlayProps {}

const TimerComponent = ({ timer, seconds = 60 }) => {
  return (
    <ParaGraph>
      <CustomCircularProgress
        value={(timer % seconds) * (100 / seconds)}
        classNames={{
          value: STRINGS.CLASSES.heading,
          svg: "w-24 h-24",
        }}
        color="primary"
        valueLabel={timer % seconds}
      />
    </ParaGraph>
  );
};

const GamePlay: FunctionComponent<GamePlayProps> = () => {
  const { gameId } = useParams();
  const selectedGame = GamesMetaData[gameId?.replace("time_", "")];
  const gameName = selectedGame?.title;
  const isTimerEnabled = gameId?.includes("time_");
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const Component = selectedGame?.Component;

  const [timer, setTimer] = useState(null);
  const [points, setPoints] = useState(0);
  const [gameSummary, setGameSummary] = useState([]);

  // Add a new state for the difficulty level
  const [difficulty, setDifficulty] = useState(STRINGS.DIFFICULTY.easy.id);

  // useEffect to handle timer if isTimerEnabled is true
  useEffect(() => {
    let interval = null;
    if (isTimerEnabled) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else if (!isTimerEnabled && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerEnabled, timer]);

  //   selectedGame.component
  const toggleHTP = () => setShowHowToPlay(!showHowToPlay);
  return (
    <div>
      {showHowToPlay ? (
        <RenderHowToPlay
          selectedGame={selectedGame}
          isTimerEnabled={isTimerEnabled}
          gameName={gameName}
          onClick={toggleHTP}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : (
        <div>
          <div className="flex flex-col">
            <RenderMediumGameCard game={selectedGame} />
            <Spacer y={8} />
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                  {gameName}
                </ParaGraph>
                <CustomButton onClick={toggleHTP} isIconOnly>
                  <FaRegCircleQuestion />
                </CustomButton>
              </div>
              {/* <div className="flex flex-col">
                  <CustomProgress value={points} label={"Asd"} />
                  <ParaGraph>Points</ParaGraph>
                </div> */}
            </div>
            <Spacer y={4} />
            <div>
              <Component
                isTimerEnabled={isTimerEnabled}
                TimerComponent={isTimerEnabled && TimerComponent}
                difficulty={difficulty}
              />
              {/* <GameButtonCard>A</GameButtonCard>
                <GameButtonCard>B</GameButtonCard> */}
            </div>
            {/* <div>
                <div className="flex gap-4 justify-between w-[80%]">
                  <CustomButton onClick={undefined}>Check</CustomButton>
                  <CustomButton onClick={undefined}>Hint 💡</CustomButton>
                </div>
              </div> */}
          </div>
          <Spacer y={24} />
        </div>
      )}
    </div>
  );
};

export default GamePlay;

export const GameButtonCard = ({
  children,
  onClick,
  bClass = "",
  className = "",
  ...props
}) => {
  return (
    <div>
      <CustomCard
        as={CustomButton}
        className={`flex items-center justify-center p-0 ${className}`}
        {...props}>
        <div
          onClick={onClick}
          className={`flex items-center justify-center w-full ${bClass} p-4 min-w-28 min-h-28`}>
          {children}
        </div>
      </CustomCard>
    </div>
  );
};

const RenderHowToPlay = ({
  selectedGame,
  isTimerEnabled,
  gameName,
  onClick,
  difficulty,
  setDifficulty,
}) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <RenderMediumGameCard game={selectedGame} />
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <ParaGraph>
            {isTimerEnabled ? (
              <CustomImage src={AllImages.clock} className="w-[50px]" />
            ) : (
              <CustomImage src={AllImages.casual} className="w-[50px]" />
            )}
          </ParaGraph>
          <div className="flex flex-col gap-2">
            <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
              {gameName}
            </ParaGraph>

            <ParaGraph className={``}>
              {isTimerEnabled ? "60 seconds timer" : "No Timer No Pressure"}
            </ParaGraph>
          </div>
        </div>
        <div className="flex gap-4">
          <ParaGraph>You will get</ParaGraph>
          <div>
            <AppXPWithText
              text={
                selectedGame.gameDifficulty[difficulty].xp /
                (isTimerEnabled ? 1 : 2)
              }
            />
            <AppCurrencyWithText
              text={
                selectedGame.gameDifficulty[difficulty].coins /
                (isTimerEnabled ? 1 : 2)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
        <div className="flex gap-4 ">
          {Object.keys(selectedGame?.gameDifficulty).map((diff, index) => {
            return (
              <CustomButton
                key={index}
                color={difficulty === diff ? "secondary" : "default"}
                variant={difficulty === diff ? "solid" : "flat"}
                onClick={() => setDifficulty(STRINGS.DIFFICULTY[diff].id)}>
                {STRINGS.DIFFICULTY[diff].name}
              </CustomButton>
            );
          })}
        </div>
        <CustomButton
          color={"primary"}
          variant="solid"
          onClick={onClick}
          className="w-full">
          Let's Play in {STRINGS.DIFFICULTY[difficulty].name} mode 🚀
        </CustomButton>
      </div>
      <CustomTabs
        fullWidth
        tabs={[
          {
            title: "How to Play",
            content: <RenderHTP selectedGame={selectedGame} />,
          },
          {
            title: "Completed Games",
            content: <RenderCompletedGames selectedGame={selectedGame} />,
          },
        ]}
      />
    </div>
  );
};

const RenderHTP = ({ selectedGame }) => {
  return (
    <>
      <ParaGraph className="text-xl font-bold">How to play</ParaGraph>
      <Spacer y={6} />
      {selectedGame?.howToPlay?.length ? (
        <CustomUnOrderedList
          items={selectedGame.howToPlay?.map((item, index) => {
            return (
              <span key={index} className="flex flex-col gap-2 ">
                {item.heading && (
                  <span className="font-bold">{item.heading}</span>
                )}
                <span>{item.text}</span>
              </span>
            );
          })}
        />
      ) : null}
    </>
  );
};

const RenderCompletedGames = ({ selectedGame }) => {
  return <div>Completed games {selectedGame.title}</div>;
};

const Timer = ({ totalSeconds, splits }) => {
  const [seconds, setSeconds] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(totalSeconds);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <div className="time">
        {Math.floor(seconds / splits)}:
        {seconds % splits < 10 ? `0${seconds % splits}` : seconds % splits}
      </div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};
