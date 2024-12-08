import React from "react";
import ParaGraph from "../../components/Paragraph";

const Etymology = ({ etymology }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">History</ParaGraph>
      <ParaGraph className="ml-3">{etymology}</ParaGraph>
    </div>
  );
};

export default Etymology;
