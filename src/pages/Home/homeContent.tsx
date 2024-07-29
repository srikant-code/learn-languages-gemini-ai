import {
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spacer,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import { CustomCard, CustomCardHeaderChild } from "../../components/Card";
import Flag from "../../components/Flag";
import MarkdownRenderer from "../../components/Markdown";
import ParaGraph from "../../components/Paragraph";
import WordRotator from "../../components/Paragraph/wordRotator";
import { STRINGS } from "../../utilities/constants";
import {
  GetAllCountries,
  GetAllLanguages,
  GetCountryDetailsByCountryCode,
  GetCountryDetailsByCountryName,
  GetLanguageByCountryCode,
  GetLanguageByLanguageCode,
  GetLanguagesByCountryName,
} from "../../utilities/countryIcons";
import {
  GetColorContrastAndGradient,
  ShuffleArray,
} from "../../utilities/utilities";
import { FaCoins } from "react-icons/fa";
import { TbCoinYuanFilled } from "react-icons/tb";
import { WordButtons, WordHeader } from "../Dictionary/wordHeader";
import { GetModel } from "../../geminiAI/genAI";

interface HomeContentProps {}

const HomeContent: FunctionComponent<HomeContentProps> = () => {
  const [markDown, setMarkDown] = useState(null);

  useEffect(() => {
    import("../../../README.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => {
          setMarkDown(text);
          // console.log(text);
        });
    });
  }, []);

  console.log({
    GetAllCountries: GetAllCountries,
    GetAllLanguages: GetAllLanguages,
    GetCountryDetailsByCountryCode: GetCountryDetailsByCountryCode("IN"),
    GetCountryDetailsByCountryName: GetCountryDetailsByCountryName("india"),
    GetLanguagesByCountryName: GetLanguagesByCountryName("india"),
    GetLanguageByLanguageCode: GetLanguageByLanguageCode("KN"),
    GetLanguageByCountryCode: GetLanguageByCountryCode("IN"),
  });

  // console.log({ model: GetModel() });

  return (
    <div>
      <LanguageAnimationLearnHeader />
      <Spacer y={8} />
      <div className="flex flex-col p-4 gap-6">
        <HomeQuickOverviewCard />
        <HomeQuickLinksCard />
        <HomeIntroducingAICard />
        <HomeWordOfTheDayCard />
        <HomeGamesCard />
        <HomeChallengesCard />
        <HomeCoursesCard />
        <HomeMyVocabularyCard />
        <HomeAISuggestionsCard />
        <HomeAlphabetsCard />
        <HomeLearningCalendarCard />
      </div>
      <div className="h-lvh" />
      <MarkdownRenderer markdownContent={markDown ?? ""} />
    </div>
  );
};

export default HomeContent;

const LanguageAnimationLearnHeader = () => {
  const [activeGreetWord, setActiveGreetWord] = useState("");
  const userProfile = useSelector((state) => state.language.profile) ?? {};
  // console.log({ activeGreetWord });

  return (
    <CustomCard className="p-6 m-2 mt-5 ">
      {/* <GradientBackground gradientColors={activeGreetWord.colorObj.gradient}> */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex gap-6 flex-[2] min-w-[30rem]">
          <Flag flag={PullMostlyUsedIn(activeGreetWord).content} />
          <div className="mt-5">
            <Spacer y={2} />
            <div className="flex flex-col font-bold text-4xl gap-2">
              <WordRotator
                className={"text-4xl font-bold font-noto"}
                words={GetAllGreetWordsWithColor}
                setActiveWord={setActiveGreetWord}
              />
            </div>
            <Spacer y={2} />
            <ParaGraph className={"text-4xl font-bold first-letter:uppercase"}>
              {userProfile?.displayName?.split(" ")[0]}
            </ParaGraph>
            <br />
            <ParaGraph className="font-medium pb-4 pt-3 pr-12">
              {activeGreetWord.languageName} is mostly used in{" "}
              {PullMostlyUsedIn(activeGreetWord).displayName}
            </ParaGraph>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <CustomButton
            size="lg"
            variant="solid"
            color="primary"
            className={STRINGS.CLASSES.bigButton}>
            Start learning {activeGreetWord.languageName}
          </CustomButton>
          <CustomButton
            size="lg"
            variant="bordered"
            color="primary"
            className={""}>
            See all languages
          </CustomButton>
        </div>
      </div>
      {/* </GradientBackground> */}
    </CustomCard>
  );
};

export const GetAllGreetWordsWithColor = ShuffleArray(
  Object.values(GetAllLanguages)
    .map((lang) => {
      const color = GetColorContrastAndGradient();
      return {
        ...lang,
        text: lang.greet,
        colorObj: color,
        colorHex: color.color,
      };
    })
    .filter((lang) => lang.languageCode !== "en")
);

export const PullMostlyUsedIn = (lang) => {
  return lang.usedIn && lang.usedIn[0] ? lang.usedIn[0] : {};
};

const heading = `pl-2 mb-3 ${STRINGS.CLASSES.heading}`;

const HomeQuickLinksCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Quick Links</ParaGraph>
      <div className="flex gap-4 flex-wrap">
        <CustomCardHeaderChild
          header={"Open"}
          child={"Challenges"}
          rightContent={"🏆 2/30"}
        />
        <CustomCardHeaderChild
          header={"Open"}
          child={"Settings"}
          rightContent={"⚙️"}
        />
        <CustomCardHeaderChild
          header={"Open"}
          child={"Assessments"}
          rightContent={"📗 4/10"}
        />
      </div>
    </CustomCard>
  );
};
const HomeQuickOverviewCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Quick Overview</ParaGraph>
      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col gap-4">
          <CustomCardHeaderChild header={"Completed (20%)"} child={"14/60"} />
          <CustomCardHeaderChild header={"Level"} child={"Beginner"} />
        </div>
        <CustomCard className={`pb-5`}>
          <ParaGraph className={""}>Continue where you left off</ParaGraph>
          <ParaGraph className={`py-2 ${STRINGS.CLASSES.heading}`}>
            Spanish Grammar
          </ParaGraph>
          <div className="flex gap-4">
            <CustomCardHeaderChild header={"Concepts"} child={"📗 30"} />
            <CustomCardHeaderChild header={"Games"} child={"🎮 5"} />
            <CustomCardHeaderChild header={"Challenges"} child={"🏆 20"} />
          </div>
        </CustomCard>
        <div className="flex flex-col gap-4">
          <CustomCardHeaderChild
            header={"Coins"}
            child={<AppCurrencyWithText />}
          />
          <CustomCardHeaderChild header={"Streak"} child={"🔥 5 days"} />
        </div>
      </div>
    </CustomCard>
  );
};
const HomeIntroducingAICard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Introducing Gem AI</ParaGraph>
    </CustomCard>
  );
};
const HomeWordOfTheDayCard = ({}) => {
  return (
    <CustomCard className={`flex-row gap-8`} border={true}>
      <div className="flex-1">
        <ParaGraph className={`pl-2 ${STRINGS.CLASSES.subHeading}`}>
          Word of the day
        </ParaGraph>
        <div className="p-2 ">
          <WordHeader data={{ word: "Battle", phonetic: "/'Baatle" }} />
          <Spacer y={2} />
          <ParaGraph>Meaning of the word is battling</ParaGraph>
          <Spacer y={2} />
          <CustomButton>See more details in Dictionary</CustomButton>
        </div>
      </div>
      <div className="flex-1">
        <ParaGraph className={` ${STRINGS.CLASSES.subHeading}`}>
          Synonyms
        </ParaGraph>
        <Spacer y={3} />
        <WordButtons
          data={["Fight", "War", "Worship", "batting", "game"]}
          smallButtons={true}
        />
      </div>
    </CustomCard>
  );
};
const HomeGamesCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Games</ParaGraph>
      <div className="flex gap-4">
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </CustomCard>
  );
};
const HomeChallengesCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Daily Challenges</ParaGraph>
    </CustomCard>
  );
};
const HomeCoursesCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Your Courses</ParaGraph>
    </CustomCard>
  );
};
const HomeMyVocabularyCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>My Vocabulary</ParaGraph>
    </CustomCard>
  );
};
const HomeAlphabetsCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Alphabets</ParaGraph>
    </CustomCard>
  );
};
const HomeLearningCalendarCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>Learning Calendar</ParaGraph>
    </CustomCard>
  );
};
const HomeAISuggestionsCard = ({}) => {
  return (
    <CustomCard className={``} border={false}>
      <ParaGraph className={heading}>AI Suggestions</ParaGraph>
    </CustomCard>
  );
};

export const AppCurrencyIcon = ({ className }) => {
  return (
    <TbCoinYuanFilled className={`text-yellow-400 text-2xl ${className}`} />
  );
};

export const AppCurrencyWithText = ({ text = 198 }) => {
  return (
    <span className="flex gap-2 items-center">
      <AppCurrencyIcon /> {text}
    </span>
  );
};

const GameCard = ({}) => {
  return (
    <CustomCard
      removeAllClasses
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
        <h4 className="text-black font-medium text-2xl">Games</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={STRINGS.DUMMY.BACKGROUND_IMAGE}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
        <CustomButton
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
          variant="solid">
          Play now
        </CustomButton>
      </CardFooter>
    </CustomCard>
  );
};
