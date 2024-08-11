import { Spacer } from "@nextui-org/react";
import { FaPenNib } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoReader } from "react-icons/io5";
import { RiSpeakFill } from "react-icons/ri";
import { IconHeaderNonSticky } from "../../../components/Paragraph";
import CustomTabs from "../../../components/Tabs";
import { STRINGS } from "../../../utilities/constants";
import { Listening } from "./listening";
import DrawingCanvas from "./writeCanvas";

interface PracticeProps {}

const Practice: FunctionComponent<PracticeProps> = () => {
  return (
    <div>
      <IconHeaderNonSticky />
      <Spacer y={4} />
      <div>Your skill level is Novice</div>
      <Spacer y={4} />
      <CustomTabs
        id={STRINGS.STORAGE.TABS.coursePractice}
        tabs={[
          {
            title: "Listening Practice",
            content: (
              <div>
                <IconHeaderNonSticky
                  title={"Listening Practice"}
                  Icon={HiSpeakerWave}
                />
                <Listening />
              </div>
            ),
          },
          {
            title: "Reading Practice",
            content: (
              <div>
                <IconHeaderNonSticky
                  title={"Reading Practice"}
                  Icon={IoReader}
                />
              </div>
            ),
          },
          {
            title: "Writing Practice",
            content: (
              <div>
                <IconHeaderNonSticky
                  title={"Writing Practice"}
                  Icon={FaPenNib}
                />
                <DrawingCanvas />
              </div>
            ),
          },
          {
            title: "Speaking Practice",
            content: (
              <div>
                <IconHeaderNonSticky
                  title={"Speaking Practice"}
                  Icon={RiSpeakFill}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Practice;
