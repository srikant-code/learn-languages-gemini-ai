import React from "react";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";

const Meanings = ({ meanings }) => {
  return (
    <div className="flex flex-col gap-4">
      {meanings.map((meaning, index) => (
        <div key={index} className="flex flex-col gap-4">
          <ParaGraph className={STRINGS.CLASSES.subHeading}>
            {meaning.partOfSpeech}
          </ParaGraph>
          {meaning.definitions.map((definition, defIndex) => (
            <div key={defIndex} className="flex gap-4">
              <ParaGraph className="ml-3">{defIndex + 1}</ParaGraph>
              <div className="flex flex-col">
                <ParaGraph>{definition.definition}</ParaGraph>
                <ParaGraph
                  className={`text-gray-500 dark:text-gray-400 ${STRINGS.CLASSES.subText}`}>
                  {definition.example}
                </ParaGraph>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Meanings;
