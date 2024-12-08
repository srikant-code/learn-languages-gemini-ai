import { ScrollShadow } from "@nextui-org/react";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import { SmallGameCards } from "../Games/smallGameCards";
import RenderLetters from "./wordAlphabets";

interface RenderAlphabetsAndGamesInDicProps {}

const RenderAlphabetsAndGamesInDic: FunctionComponent<
  RenderAlphabetsAndGamesInDicProps
> = ({ data }) => {
  const flex = "flex flex-col gap-4";
  const subHeadingClasses = STRINGS.CLASSES.subHeading;
  return (
    <div>
      <div className={`${flex}`}>
        <ParaGraph className={subHeadingClasses}>Alphabets</ParaGraph>
        <RenderLetters word={data.word} />
      </div>
      <div className={`${flex} pt-4`}>
        <ParaGraph className={subHeadingClasses}>Games</ParaGraph>
        <ScrollShadow orientation={"horizontal"} size={30}>
          <div className="w-[140%]">
            <SmallGameCards customSubTitle={data.word} />
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
};

export default RenderAlphabetsAndGamesInDic;
