import React from "react";
import CustomButton from "../../components/Button";

const FollowUpActions = ({ actions }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">
        Follow-Up Suggested Chat Actions
      </h2>
      <div className="flex gap-4 flex-wrap">
        {actions.map((action, index) => (
          <CustomButton key={index} className="">
            {action}
          </CustomButton>
        ))}
      </div>
    </div>
  );
};

export default FollowUpActions;
