import React from "react";
import { WordButtons } from "./wordHeader";
import ParaGraph from "../../components/Paragraph";

const Collocations = ({ collocations }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">Collocations</ParaGraph>
      <WordButtons data={collocations} />
    </div>
  );
};

export default Collocations;
