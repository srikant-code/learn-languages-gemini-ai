import { Spacer } from "@nextui-org/react";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";

const RenderMeaningFromDicAPI = ({ data }) => {
  const subHeadingClasses = STRINGS.CLASSES.subHeading;
  return (
    <div>
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-4">
        <ParaGraph className={subHeadingClasses}>Synonyms</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Antonyms</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Games</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Alphabets</ParaGraph>
        <ParaGraph className={subHeadingClasses}>
          Tools - Translations
        </ParaGraph>
      </div>
    </div>
  );
};

export default RenderMeaningFromDicAPI;
