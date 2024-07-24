import { Card, CardBody, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/Button";
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
import { GetColorContrastAndGradient } from "../../utilities/utilities";

interface HomeContentProps {}

const HomeContent: FunctionComponent<HomeContentProps> = () => {
  const [markDown, setMarkDown] = useState(null);

  useEffect(() => {
    import("../../../README.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => {
          setMarkDown(text);
          console.log(text);
        });
    });
  }, []);

  console.log({
    a: GetAllCountries,
    b: GetAllLanguages,
    c: GetCountryDetailsByCountryCode("IN"),
    d: GetCountryDetailsByCountryName("india"),
    e: GetLanguagesByCountryName("india"),
    f: GetLanguageByLanguageCode("KN"),
    g: GetLanguageByCountryCode("IN"),
  });

  return (
    <div>
      <LanguageAnimationLearnHeader />
      <Spacer y={8} />
      <div className="p-4">
        <Card>
          <CardBody>Hello</CardBody>
        </Card>
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
  console.log({ activeGreetWord });

  return (
    <Card className="p-6 py-1 m-2 shadow-none border dark:border-slate-600 rounded-3xl relative">
      {/* <GradientBackground gradientColors={activeGreetWord.colorObj.gradient}> */}
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <Flag
            flag={PullMostlyUsedIn(activeGreetWord).content}
            className={`top-1 left-4 w-[140px] ${STRINGS.CLASSES.basicTransitions}`}
          />
          <div className="mt-5">
            <Spacer y={2} />
            <ParaGraph className="flex flex-col font-bold text-4xl gap-2">
              <WordRotator
                className={"text-4xl font-bold"}
                words={GetAllGreetWordsWithColor()}
                setActiveWord={setActiveGreetWord}
              />
            </ParaGraph>
            <Spacer y={2} />
            <ParaGraph className={"text-4xl font-bold first-letter:uppercase"}>
              {userProfile?.displayName?.split(" ")[0]}
            </ParaGraph>
            <br />
            <ParaGraph className="font-medium pb-4 pt-3">
              {activeGreetWord.languageName} is mostly used in{" "}
              {PullMostlyUsedIn(activeGreetWord).displayName}
            </ParaGraph>
          </div>
        </div>
        <div className="flex gap-4">
          <CustomButton size="lg" variant="solid" color="primary">
            Start learning {activeGreetWord.languageName}
          </CustomButton>
          <CustomButton size="lg" variant="bordered" color="primary">
            See all languages
          </CustomButton>
        </div>
      </div>
      {/* </GradientBackground> */}
    </Card>
  );
};

export const GetAllGreetWordsWithColor = () => {
  return Object.values(GetAllLanguages)
    .map((lang) => {
      const color = GetColorContrastAndGradient();
      return {
        ...lang,
        text: lang.greet,
        colorObj: color,
        colorHex: color.color,
      };
    })
    .filter((lang) => lang.languageCode !== "en");
};

export const PullMostlyUsedIn = (lang) => {
  return lang.usedIn && lang.usedIn[0] ? lang.usedIn[0] : {};
};
