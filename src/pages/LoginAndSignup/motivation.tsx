import { ScrollShadow } from "@nextui-org/react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import { CheckRightTop } from "./languageFinder";

interface MotivationToLearnProps {}

const MotivationToLearn: FunctionComponent<MotivationToLearnProps> = ({
  motivation,
  setMotivation,
  className,
}) => {
  const motivations = [
    {
      icon: "💼",
      description: "Got a job and needs to talk with people",
      label: "Job opportunities",
    },
    {
      icon: "🧫",
      description: "Casually want to know about different culture",
      label: "Learn new cultures",
    },
    {
      icon: "🧠",
      description: "Need to give my free mind some work",
      label: "Brain training",
    },
    {
      icon: "👫",
      description: "My girlfriend is from different state so need to learn",
      label: "Family and friends",
    },
    {
      icon: "🛩️",
      description: "Gotta travel to Dubai for few weeks",
      label: "Travelling to new place",
    },
    {
      icon: "🚌",
      description: "My grades are dependent on a language",
      label: "School/college",
    },
    {
      icon: "🌇",
      description: "Completely shifting to a new state",
      label: "Moving and staying in a new city",
    },
    {
      icon: "🎮",
      description: "I don't know, I am just exploring it.",
      label: "Other",
    },
  ];

  const motivPresent = (motiv) => motivation?.find((g) => g === motiv.label);

  const addOrDeleteMotivation = (motiv) => {
    if (motivPresent(motiv))
      setMotivation(motivation?.filter((g) => g !== motiv.label));
    else setMotivation([...motivation, motiv.label]);
  };
  return (
    <ScrollShadow className="h-[60vh] flex flex-wrap gap-4">
      {motivations.map((motiv, index) => {
        return (
          <CustomCard
            as={CustomButton}
            key={index}
            className="p-0 w-full max-w-[47%] flex items-start justify-start">
            <div
              className="p-6 flex flex-col items-start gap-2"
              onClick={() => addOrDeleteMotivation(motiv)}>
              <ParaGraph className="absolute top-6 right-6 text-5xl">
                {motiv.icon}
              </ParaGraph>
              <ParaGraph className="text-left text-lg font-semibold min-w-40 max-w-[160px] w-[75%] whitespace-break-spaces">
                {motiv.label}
              </ParaGraph>
              <ParaGraph className="text-left text-small min-w-48 max-w-[160px] w-[75%] whitespace-break-spaces">
                {motiv.description}
              </ParaGraph>
              {motivPresent(motiv) ? <CheckRightTop /> : <></>}
            </div>
          </CustomCard>
        );
      })}
    </ScrollShadow>
  );
};

export default MotivationToLearn;
