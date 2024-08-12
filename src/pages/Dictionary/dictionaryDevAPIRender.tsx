import { Spacer } from "@nextui-org/react";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import RenderAlphabetsAndGamesInDic from "./alphaAndGames";
import { WordHeader } from "./wordHeader";

const RenderMeaningFromDicAPI = ({ data }) => {
  const subHeadingClasses = STRINGS.CLASSES.subHeading;
  const flex = "flex flex-col gap-4";
  return (
    <div>
      <div className="flex flex-col gap-4">
        <WordHeader
          data={{
            word: data.word,
            phonetic: data?.phonetics ? data?.phonetics[0]?.text : data?.word,
          }}
        />
        {data?.meanings.map((meaning, index) => (
          <div key={index} className="flex flex-col gap-4">
            <ParaGraph className={subHeadingClasses}>
              {meaning.partOfSpeech}
            </ParaGraph>
            {meaning.definitions.map((definition, index) => (
              <div key={index} className="flex gap-4">
                <ParaGraph className="ml-3">{index + 1}</ParaGraph>
                <div className="flex flex-col">
                  <ParaGraph>{definition.definition}</ParaGraph>
                  <ParaGraph className={STRINGS.CLASSES.subText}>
                    {definition.example}
                  </ParaGraph>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Spacer y={6} />
      <div className={`${flex}`}>
        <div className={`${flex}`}>
          <ParaGraph className={subHeadingClasses}>Synonyms</ParaGraph>
        </div>
        <div className={`${flex}`}>
          <ParaGraph className={subHeadingClasses}>Antonyms</ParaGraph>
        </div>
        {/* <RenderAlphabetsAndGamesInDic data={data} /> */}
        {/* <ParaGraph className={subHeadingClasses}>
          Tools - Translations
        </ParaGraph> */}
      </div>
    </div>
  );
};

export default RenderMeaningFromDicAPI;
