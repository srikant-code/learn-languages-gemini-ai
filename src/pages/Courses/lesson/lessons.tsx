import { CustomLinkButton } from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import ParaGraph from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";
import { ChapterProgress } from "../allChapters";

export const Lessons = ({ chapter, chapterData }) => {
  return (
    <div className="flex flex-col gap-4 outline-primary-300 outline-[3px] outline-offset-[-40px] outline-dotted">
      {chapterData[chapter].chapters.map((chapter, index) => {
        return (
          <div key={index}>
            <CustomCard
              as={CustomLinkButton}
              to={`${chapter.lesson?.replaceAll(" ", "_")}`}
              className={"p-0 w-full items-start"}>
              <div className="flex items-center px-4">
                <ChapterProgress
                  isCompleted={index === 0}
                  chapterNumber={index + 1}
                />
                <div className="flex p-4 flex-col gap-2 items-start">
                  <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                    {chapter.lesson}
                  </ParaGraph>
                  <ParaGraph className={`${STRINGS.CLASSES.subText}`}>
                    {chapter.description}
                  </ParaGraph>
                </div>
              </div>
            </CustomCard>
          </div>
        );
      })}
    </div>
  );
};
