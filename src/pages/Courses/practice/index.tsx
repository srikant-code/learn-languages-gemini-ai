import { PiBrainBold } from "react-icons/pi";
import ParaGraph from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";
import { Spacer } from "@nextui-org/react";
import CustomTabs from "../../../components/Tabs";
import DrawingCanvas from "./writeCanvas";
import { Listening } from "./listening";

interface PracticeProps {}

const Practice: FunctionComponent<PracticeProps> = () => {
  return (
    <div>
      <Spacer y={4} />
      <div className={"flex items-center gap-2"}>
        <PiBrainBold className="text-2xl" />
        <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
          Practice here
        </ParaGraph>
      </div>
      <Spacer y={4} />
      <div>Your skill level is Novice</div>
      <Spacer y={4} />
      <CustomTabs
        tabs={[
          {
            title: "Listening Practice",
            content: (
              <div>
                Listening Practice
                <Listening />
              </div>
            ),
          },
          {
            title: "Reading Practice",
            content: <div>Reading Practice</div>,
          },
          {
            title: "Writing Practice",
            content: (
              <div>
                Writing Practice
                <DrawingCanvas />
              </div>
            ),
          },
          {
            title: "Speaking Practice",
            content: <div>Speaking Practice</div>,
          },
        ]}
      />
    </div>
  );
};

export default Practice;
