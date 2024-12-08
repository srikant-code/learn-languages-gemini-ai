import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBoltLightning,
  FaBookmark,
} from "react-icons/fa6";
import { AudioPlayer } from "../../../components/Audio";
import CustomButton from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import CustomImage, { AllImages } from "../../../components/Image";
import ParaGraph, { IconHeaderNonSticky } from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";
import { FlipCard } from "../../Games/GameLogic/memoryMaestro";
import { ChapterProgress } from "../allChapters";
import { FlashCardsData } from "./flashCardsData";
import { IconCardWithTextButton } from "../../Home/appHeader";
import { AppCurrencyIcon } from "../../Home/homeContent";
import CustomTabs, { SetActiveTabInRedux } from "../../../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../../store/reducer";
import store from "../../../store/store";
import { Spacer } from "@nextui-org/react";

interface FlashcardsProps {}

const COINS_PER_FLASHCARD = 5;
const FLASH_CARD_TAB = "Flash Card";
const ALL_SETS_TAB = "All Sets";

const Flashcards: FunctionComponent<FlashcardsProps> = ({}) => {
  const flashCards = FlashCardsData;
  const [activeCategory, setActiveCategory] = useState(null);
  console.log({ activeCategory });

  let totalCards = 0;
  let completedCards = 0;
  let completedCategories = 0;
  flashCards.categories.forEach((category) => {
    totalCards += category.totalCards;
    completedCards += category.completedCards;
    completedCategories +=
      category.completedCards === category.totalCards ? 1 : 0;
  });

  return (
    <div className="flex flex-col gap-4">
      <IconHeaderNonSticky title="Flash Cards Sets" Icon={FaBoltLightning} />
      <div>
        <CustomCard
          className={
            "bg-gradient-to-tr from-sky-400 via-green-400 to-yellow-400"
          }>
          <div className="flex flex-col gap-2 z-10">
            <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
              Flash Cards Statistics
            </ParaGraph>
            <div className="flex gap-2">
              <IconCardWithTextButton
                left={
                  <ChapterProgress
                    hideLock
                    value={(completedCards / totalCards) * 100}
                    isCompleted={completedCards === totalCards}
                    chapterNumber={Math.floor(
                      (completedCards / totalCards) * 100
                    )}
                  />
                }
                heading={"Total cards viewed"}
                child={`${completedCards}/${totalCards}`}
              />
              <IconCardWithTextButton
                left={
                  <ChapterProgress
                    hideLock
                    value={
                      (completedCategories / flashCards.categories?.length) *
                      100
                    }
                    isCompleted={
                      completedCategories === flashCards.categories?.length
                    }
                    chapterNumber={Math.floor(
                      (completedCategories / flashCards.categories?.length) *
                        100
                    )}
                  />
                }
                heading={"completed categories"}
                child={`${completedCategories}/${flashCards.categories?.length}`}
              />
              <IconCardWithTextButton
                left={<AppCurrencyIcon className="" />}
                heading={`earned ${STRINGS.APP_CURRENCY}`}
                child={`${COINS_PER_FLASHCARD * completedCards}/${
                  COINS_PER_FLASHCARD * totalCards
                }`}
              />
            </div>
          </div>
          <NoFlashCards className="absolute top-0 right-5 " showText={false} />
        </CustomCard>
      </div>
      <CustomTabs
        id={STRINGS.STORAGE.TABS.flashCards}
        tabs={[
          {
            title: ALL_SETS_TAB,
            content: (
              <div>
                <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                  All Sets
                </ParaGraph>
                <div className="flex flex-row gap-4 flex-wrap">
                  <RenderAllFlashcards
                    {...{ flashCards, activeCategory, setActiveCategory }}
                  />
                </div>
              </div>
            ),
          },
          {
            title: "Partially completed",
            content: (
              <div>
                <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                  Partially Completed
                </ParaGraph>
                <NoFlashCards text="You have not started any flash cards sets yet." />
              </div>
            ),
          },
          {
            title: "Completed",
            content: (
              <div>
                <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                  Completed
                </ParaGraph>
                <NoFlashCards />
              </div>
            ),
          },
          ...(activeCategory
            ? [
                {
                  title: FLASH_CARD_TAB,
                  content: (
                    <div>
                      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                        Flash Card
                      </ParaGraph>
                      <Spacer y={6} />
                      <div className="flex flex-row gap-4 flex-wrap">
                        {activeCategory && (
                          <div className="flex items-center justify-center w-full">
                            <RenderFlashCard
                              heading={activeCategory}
                              data={Array.from(
                                { length: activeCategory?.totalCards },
                                (v, i) => i + 1
                              )?.map((card, index) => {
                                return {
                                  id: index,
                                  frontText: "A",
                                  backText: "B",
                                };
                              })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                },
              ]
            : []),
        ]}
      />
    </div>
  );
};

export default Flashcards;

const NoFlashCards = ({
  className,
  showText = true,
  text = "You have not completed any flash cards sets yet.",
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center">
      <CustomImage
        src={AllImages.app.flashCards}
        className={`max-w-[300px] w-[100%] ${className}`}
      />
      {showText && (
        <div className="flex flex-col gap-2">
          <ParaGraph className={`text-3xl font-bold`}>Oops!</ParaGraph>
          <ParaGraph className={`text-lg font-semibold`}>{text}</ParaGraph>
          <CustomButton
            variant="solid"
            color="primary"
            onClick={() => {
              SetActiveTabInRedux({
                dispatch,
                tabID: STRINGS.STORAGE.TABS.flashCards,
                activeTab: ALL_SETS_TAB,
              });
            }}>
            {"See all Flash Cards"}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

const RenderAllFlashcards = ({
  flashCards,
  activeCategory,
  setActiveCategory,
}) => {
  const dispatch = useDispatch();
  return flashCards.categories.map((category, index) => {
    const completion = (category.completedCards / category.totalCards) * 100;
    const isSelectedCard = activeCategory?.heading === category.heading;
    return (
      <CustomCard
        key={index}
        as={CustomButton}
        className={`w-[47%] p-0 flex-1 ${
          isSelectedCard ? " border-4 border-secondary-500" : ""
        }`}>
        <div
          className={`p-6 flex flex-row justify-between items-start gap-4 w-full `}
          onClick={() => {
            console.log("setting active Flashcard");
            setActiveCategory({ ...category, index });
            SetActiveTabInRedux({
              dispatch,
              tabID: STRINGS.STORAGE.TABS.flashCards,
              activeTab: FLASH_CARD_TAB,
            });
          }}>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 items-start">
              <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                {category.heading}
              </ParaGraph>
              <ParaGraph className={`${STRINGS.CLASSES.subText}`}>
                {category.description}
              </ParaGraph>
              <div className="flex gap-4">
                <IconCardWithTextButton
                  left={
                    <ChapterProgress
                      hideLock
                      value={completion}
                      isCompleted={completion === 100}
                      chapterNumber={Math.floor(completion)}
                    />
                  }
                  heading={"cards"}
                  child={`${category.completedCards}/${category.totalCards}`}
                />
                <IconCardWithTextButton
                  left={<AppCurrencyIcon className="" />}
                  heading={"GET"}
                  child={`${COINS_PER_FLASHCARD * category.totalCards}`}
                />
              </div>
              {/* <ParaGraph className={`${STRINGS.CLASSES.subText}`}>
                      {category.completedCards}/{category.totalCards} cards
                    </ParaGraph> */}
            </div>
          </div>
          <div className="">
            <CustomImage src={AllImages.book} className={"w-[35px]"} />
          </div>
        </div>
      </CustomCard>
    );
  });
};

export function RenderFlashCard({ data: flashCardData, heading = "" }) {
  // const [flashCardData, setFlashCardData] = useState(data ?? []);
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  const RenderCurrentCount = () => {
    return (
      <div className="absolute top-6 right-8">
        {flashCardData && flashCardData.length > 0 ? (
          <ParaGraph className="flex text-white text-3xl font-bold">
            {current + 1}
            {/* / {flashCardData.length} */}
          </ParaGraph>
        ) : (
          ""
        )}
      </div>
    );
  };

  const cards = flashCardData?.map((card, index) => {
    return (
      <FlashCard
        card={card}
        key={index}
        className=""
        backContent={
          <div className="relative w-full h-full bg-gradient-to-bl from-yellow-500 via-orange-500 to-red-500 p-6 flex items-center justify-center">
            <ParaGraph className={`text-[2rem] font-bold text-white`}>
              {card.backText}
            </ParaGraph>
            <RenderCurrentCount />
          </div>
        }
        frontContent={
          <div className="relative w-full h-full p-6 flex items-center justify-center">
            <ParaGraph className={`text-[4rem] font-bold text-white`}>
              {card.frontText}
            </ParaGraph>
            <RenderCurrentCount />
          </div>
        }
      />
    );
  });

  const loading = <div className="loading">Loading flashcard content...</div>;
  const [parent] = useAutoAnimate();

  return (
    <CustomCard className="flex flex-col gap-4 items-center w-fit">
      <div className="flex justify-start items-start w-full">
        <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
          {heading.heading}
        </ParaGraph>
      </div>
      <div ref={parent}>
        {flashCardData && flashCardData.length > 0 ? cards[current] : loading}
      </div>
      <div className="flex w-full justify-between items-center gap-4">
        <CustomButton
          isIconOnly
          title="hello"
          onClick={previousCard}
          disabled={!(current > 0)}>
          <FaArrowLeft />
        </CustomButton>
        <div className="flex gap-4">
          <CustomButton
            title="Save"
            onClick={() => {
              console.log("save");
            }}>
            <FaBookmark />
          </CustomButton>
          <AudioPlayer text={flashCardData[current].frontText} />
        </div>
        <CustomButton
          isIconOnly
          title="hello"
          onClick={nextCard}
          disabled={!(current < flashCardData?.length - 1)}>
          <FaArrowRight />
        </CustomButton>
      </div>
    </CustomCard>
  );
}

export function FlashCard({ card, backContent, frontContent }) {
  const [side, setSide] = useState();

  function handleClick() {
    // console.log("clicked!");
    // console.log(side);
    setSide(!side);
  }
  return (
    <FlipCard
      value={backContent}
      innerDivClassName={"h-[300px]"}
      className={
        "min-w-[300px] min-h-[300px] bg-gradient-to-bl from-sky-500 via-violet-500 to-purple-500"
      }
      valueFront={frontContent}
      onClick={handleClick}
      isFlipped={side}
    />
    // <CustomCard
    //   as={CustomButton}
    //   className={`flipCard ${side ? "flipped" : ""}`}>
    //   <div onClick={handleClick} className="flipCard-content">
    //     <small>
    //       <span>Card ID</span>
    //       {card.id}
    //     </small>
    //     {/* {side ? card.fields.side1 : card.fields.side2} */}
    //     <div className="front">{card.fields.side1}</div>
    //     <div className="back">{card.fields.side2}</div>
    //   </div>
    // </CustomCard>
  );
}
