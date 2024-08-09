import { ScrollShadow } from "@nextui-org/react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import { CheckRightTop } from "./languageFinder";

interface UserDailyGoalProps {}

const UserDailyGoal: FunctionComponent<UserDailyGoalProps> = ({
  dailyGoal,
  setDailyGoal,
  className,
}) => {
  const goalsArray = [
    {
      icon: "🪫",
      description: "Got a job and needs to talk with people",
      label: 5,
    },
    {
      icon: "🔋",
      description: "Casually want to know about different culture",
      label: 10,
    },
    {
      icon: "💪",
      description: "Need to give my free mind some work",
      label: 15,
    },
    {
      icon: "💪",
      description: "My girlfriend is from different state so need to learn",
      label: 20,
    },
    {
      icon: "🧠",
      description: "Gotta travel to Dubai for few weeks",
      label: 25,
    },
    {
      icon: "🧠",
      description: "My grades are dependent on a language",
      label: 30,
    },
  ];

  const addOrDeleteGoal = (goal) => {
    setDailyGoal(goal.label);
  };
  return (
    <ScrollShadow className="h-[30vh] flex flex-wrap gap-4">
      {goalsArray.map((goal, index) => {
        return (
          <CustomCard
            as={CustomButton}
            key={index}
            className="p-0 w-full max-w-[47%] flex items-start justify-start">
            <div
              className="p-6 flex flex-col items-start gap-2"
              onClick={() => addOrDeleteGoal(goal)}>
              <ParaGraph className="absolute top-6 right-6 text-5xl">
                {goal.icon}
              </ParaGraph>
              <ParaGraph className="text-left text-lg font-semibold min-w-40 max-w-[160px] w-[75%] whitespace-break-spaces">
                {goal.label} minutes
              </ParaGraph>
              {/* <ParaGraph className="text-left text-small min-w-48 max-w-[160px] w-[75%] whitespace-break-spaces">
                {goal.description}
              </ParaGraph> */}
              {dailyGoal === goal.label ? <CheckRightTop /> : <></>}
            </div>
          </CustomCard>
        );
      })}
    </ScrollShadow>
  );
};

export default UserDailyGoal;
