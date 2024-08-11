import { useParams } from "react-router-dom";
import ParaGraph from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";
import MarkdownRenderer from "../../../components/Markdown";
import { Spacer } from "@nextui-org/react";
import { ChapterProgress } from "../allChapters";
import { IconCardWithTextButton } from "../../Home/appHeader";
import CustomButton from "../../../components/Button";
import { CustomCard } from "../../../components/Card";

interface LessonProps {}

const Lesson: FunctionComponent<LessonProps> = () => {
  const { lesson } = useParams();
  const lessonName = lesson?.replaceAll("_", " ");
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <ChapterProgress chapterNumber={1} isCompleted={false} />
          <div className="flex flex-col">
            <ParaGraph className={`text-md`}>Topic</ParaGraph>
            <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
              {lessonName}
            </ParaGraph>
          </div>
        </div>
        <div>
          <IconCardWithTextButton heading={STRINGS.APP_CURRENCY} child={"32"} />
        </div>
      </div>
      <Spacer y={6} />
      <div>
        <CustomCard>
          <MarkdownRenderer
            markdownContent={"# Hello content on English\n fkaj"}
          />
        </CustomCard>
        <Spacer y={6} />
        <div className="flex flex-col gap-4">
          <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
            Suggested Actions
          </ParaGraph>
          <div className="flex flex-wrap gap-2">
            <CustomButton size={"md"}>
              Practice writing on Alphabets
            </CustomButton>
            <CustomButton size={"md"}>
              Practice reading more on Alphabets
            </CustomButton>
            <CustomButton size={"md"}>Practice speaking Alphabets</CustomButton>
            <CustomButton size={"md"}>
              Start a game using Alphabets
            </CustomButton>
            <CustomButton size={"md"}>
              Challenges, Find words in Dictionary, chat with AI on more doubts,
              learn more on this content
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
