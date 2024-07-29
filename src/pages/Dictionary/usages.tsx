import React from "react";
import ParaGraph from "../../components/Paragraph";

const Usages = ({ usages }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">Usages</ParaGraph>
      {Object.entries(usages.sentences).map(([position, sentences], index) => (
        <div key={index} className="flex flex-col gap-2">
          <ParaGraph className="text-lg font-medium capitalize">
            {position}
          </ParaGraph>
          {sentences.map((sentence, sentIndex) => (
            <p key={sentIndex} className="ml-3">
              {sentence}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Usages;
