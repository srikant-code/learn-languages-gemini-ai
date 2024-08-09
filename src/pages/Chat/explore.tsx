import { Spacer } from "@nextui-org/react";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import {
  Motivations,
  MotivationSuggestedActions,
} from "../LoginAndSignup/motivation";
import { CustomCard } from "../../components/Card";
import { CustomNoWrapButton } from "../../components/Button";

interface ExploreProps {}

const Explore: FunctionComponent<ExploreProps> = () => {
  return (
    <div>
      <Spacer y={5} />
      <ParaGraph className={`${STRINGS.CLASSES.heading}`}>Explore</ParaGraph>
      <Spacer y={5} />
      <div className="flex flex-col gap-4">
        {Motivations.map((motivation, index) => {
          return (
            <CustomCard key={index} className={"gap-4"}>
              <div className={`flex flex-row items-center justify-start gap-6`}>
                <ParaGraph className={"text-3xl"}>{motivation.icon}</ParaGraph>
                <div className="flex flex-col gap-1">
                  <ParaGraph className={`text-xl font-semibold`}>
                    {motivation.label}
                  </ParaGraph>
                  <ParaGraph>{motivation.description}</ParaGraph>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {MotivationSuggestedActions[motivation.label].map(
                  (item, index) => {
                    return <ExploreSuggestedCard key={index} data={item} />;
                  }
                )}
              </div>
            </CustomCard>
          );
        })}
      </div>
    </div>
  );
};

const ExploreSuggestedCard = ({ data }) => {
  return (
    <CustomCard as={CustomNoWrapButton} className={"p-0 items-start"}>
      <div className="flex justify-between items-center p-4 px-6 gap-4 w-full">
        <ParaGraph className={""}>{data.label}</ParaGraph>
        <ParaGraph className={"text-xl"}>{data.icon}</ParaGraph>
      </div>
    </CustomCard>
  );
};

export default Explore;
