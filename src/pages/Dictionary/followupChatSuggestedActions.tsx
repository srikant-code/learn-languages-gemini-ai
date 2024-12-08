import React from "react";
import CustomButton from "../../components/Button";
import ParaGraph from "../../components/Paragraph";

const FollowUpActions = ({ actions }) => {
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className="text-xl font-semibold">
        Follow-Up Suggested Chat Actions
      </ParaGraph>
      <div className="flex gap-4 flex-wrap">
        {actions.map((action, index) => (
          <CustomButton
            key={index}
            className="whitespace-break-spaces text-left p-4 h-fit">
            {action}
          </CustomButton>
        ))}
      </div>
    </div>
  );
};

export default FollowUpActions;
