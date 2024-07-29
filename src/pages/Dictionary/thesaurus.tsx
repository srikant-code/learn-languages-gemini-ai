import React from "react";
import ParaGraph from "../../components/Paragraph";
import { WordButtons } from "./wordHeader";

const Thesaurus = ({ thesaurus }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">Thesaurus</ParaGraph>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <ParaGraph className="text-lg font-medium">Synonyms</ParaGraph>
          <WordButtons data={thesaurus.synonyms} />
        </div>
        <div className="flex flex-col">
          <ParaGraph className="text-lg font-medium">Antonyms</ParaGraph>
          <WordButtons data={thesaurus.antonyms} />
        </div>
      </div>
    </div>
  );
};

export default Thesaurus;
