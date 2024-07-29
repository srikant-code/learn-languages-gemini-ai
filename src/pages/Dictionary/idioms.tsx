import React from "react";
import { WordButtons } from "./wordHeader";
import ParaGraph from "../../components/Paragraph";

const Idioms = ({ idioms }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">
        Idioms and Phrases
      </ParaGraph>
      <WordButtons data={idioms} />
    </div>
  );
};

export default Idioms;
