import { useEffect, useState } from "react";
import { GameButtonCard } from ".";
import ParaGraph from "../../../components/Paragraph";
import { IconCardWithTextButton } from "../../Home/appHeader";
import { RiSwap2Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { AppCurrencyIcon, AppXPIcon } from "../../Home/homeContent";
import CustomButton from "../../../components/Button";
import { STRINGS } from "../../../utilities/constants";
import { CustomCard } from "../../../components/Card";
import { Spacer } from "@nextui-org/react";
import { FaClock, FaRegClock } from "react-icons/fa6";
import CustomImage, { AllImages } from "../../../components/Image";

interface MemoryMaestroGamePlayProps {}

export const FlipCard = ({
  value,
  valueFront,
  onClick,
  isFlipped,
  className,
  innerDivClassName,
}) => (
  <GameButtonCard
    className={`flipCard ${isFlipped ? "flipped" : ""} p-0 ${className}`}
    innerDivClassName={`flipCard-content ${innerDivClassName}`}
    onClick={onClick}>
    {isFlipped && <div className=" w-full h-full">{value}</div>}
    {!isFlipped && (
      <div className="flipCard-content w-full h-full">{valueFront}</div>
    )}
  </GameButtonCard>
);

const MemoryMaestroGamePlay: FunctionComponent<MemoryMaestroGamePlayProps> = ({
  isTimerEnabled,
  TimerComponent,
  difficulty,
}) => {
  // Define the cards for each difficulty level
  const easyCards = ["A", "B", "C"];
  const mediumCards = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const hardCards = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // Change the generateCards function to use the difficulty level
  const generateCards = () => {
    let cards;
    switch (difficulty) {
      case STRINGS.DIFFICULTY.easy.id:
        cards = easyCards;
        break;
      case STRINGS.DIFFICULTY.medium.id:
        cards = mediumCards;
        break;
      case STRINGS.DIFFICULTY.hard.id:
        cards = hardCards;
        break;
      default:
        cards = easyCards;
    }
    return [...cards, ...cards].sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  // Add a new state for the hint
  const [hint, setHint] = useState([]);
  // Add a new state for the game end
  const [isGameEnd, setIsGameEnd] = useState(false);

  const handleCardClick = (index) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    setMoves(moves + 1);

    if (flippedCards.length === 1) {
      const firstCardIndex = flippedCards[0];
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[index];

      if (firstCard === secondCard) {
        setMatchedCards([...matchedCards, firstCardIndex, index]);
      }

      setFlippedCards([firstCardIndex, index]);

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    } else {
      setFlippedCards([index]);
    }
  };

  // Add a new function to handle the hint
  const handleHint = () => {
    const unmatchedCards = cards.filter(
      (card, index) => !matchedCards.includes(index)
    );
    const randomCardIndex = Math.floor(Math.random() * unmatchedCards.length);
    console.log({ unmatchedCards, matchedCards, cards, randomCardIndex });
    setHint(unmatchedCards[randomCardIndex]);
  };

  console.log({ hint });

  // Check if the game has ended after each move
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameEnd(true);
    }
  }, [matchedCards]);

  const handleNextLevel = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setHint([]);
    setIsGameEnd(false);
  };

  return (
    <div className="flex gap-6">
      {isGameEnd ? (
        <GameSummary
          handleNextLevel={handleNextLevel}
          children={
            <RenderStats moves={moves} matchedCards={matchedCards} showMore />
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <RenderStats moves={moves} matchedCards={matchedCards} />
            {TimerComponent && <TimerComponent />}
          </div>
          <div className="flex flex-wrap gap-4">
            {cards.map((card, index) => (
              <FlipCard
                key={index}
                value={
                  <ParaGraph className="text-3xl font-bold">{card}</ParaGraph>
                }
                isFlipped={
                  flippedCards.includes(index) ||
                  matchedCards.includes(index) ||
                  hint === card
                }
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          <CustomButton onClick={handleHint}>Show Hint 💡</CustomButton>
        </div>
      )}
    </div>
  );
};

export default MemoryMaestroGamePlay;

export const GameSummary = ({ handleNextLevel, children }) => {
  return (
    <CustomCard className="flex w-full gap-4 p-12 bg-gradient-to-tr from-sky-300 via-green-300 to-yellow-300">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center">
          <CustomImage src={AllImages.target1} className="w-[200px]" />
        </div>
        <Spacer y={6} />
        <ParaGraph className="font-bold text-2xl">Yay!</ParaGraph>
        <ParaGraph className="text-xl">You've matched all cards!</ParaGraph>
        <Spacer y={6} />
      </div>
      <div className="flex gap-4 flex-col">
        <ParaGraph className="text-xl uppercase font-bold">
          Game summary
        </ParaGraph>
        {children}
      </div>
      <Spacer y={6} />
      <CustomButton
        variant={"solid"}
        color={"primary"}
        onClick={handleNextLevel}>
        Next Level
      </CustomButton>
    </CustomCard>
  );
};

export const RenderStats = ({ moves, matchedCards, showMore }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <IconCardWithTextButton
        heading={"Moves"}
        child={moves}
        left={<RiSwap2Line className="text-2xl" />}
      />
      <IconCardWithTextButton
        heading={"Matches"}
        child={matchedCards.length / 2}
        left={<FiCopy className="text-2xl" />}
      />
      <IconCardWithTextButton
        heading={"Points"}
        child={matchedCards.length * 10}
        left={<AppCurrencyIcon className="text-2xl" />}
      />
      {showMore && (
        <>
          <IconCardWithTextButton
            heading={"Time Bonus"}
            child={10}
            left={<FaRegClock className="text-2xl" />}
          />
          <IconCardWithTextButton
            heading={"XP Earned"}
            child={matchedCards.length * 10}
            left={<AppXPIcon className="text-2xl" />}
          />
        </>
      )}
    </div>
  );
};
