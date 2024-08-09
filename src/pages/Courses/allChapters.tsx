import { useState } from "react";
import { ChaptersData } from "./lesson/lessonsData";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import { CustomCard } from "../../components/Card";
import { CustomLinkButton } from "../../components/Button";
import CustomCircularProgress from "../../components/Progress";
import CustomImage, { AllImages } from "../../components/Image";
import { FaCheck } from "react-icons/fa6";
import CustomAccordian from "../../components/Accordian";
import { Lessons } from "./lesson/lessons";

const AllChapters = () => {
  const chaptersData = ChaptersData;
  const chapterKeys = Object.keys(chaptersData);
  const [selectedChapter, setSelectedChapter] = useState(chapterKeys[0]);
  return (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
          All Chapters
        </ParaGraph>
      </div>
      <div className="p-2">
        <CustomAccordian
          items={chapterKeys.map((chapter, index) => {
            return {
              children: (
                <CustomCard className={`gap-4 border-none`}>
                  <ParaGraph className="text-xl font-bold">Topics</ParaGraph>
                  <Lessons chapter={chapter} chapterData={chaptersData} />
                </CustomCard>
              ),
              title: (
                <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                  {chaptersData[chapter].chapterName}
                </ParaGraph>
              ),
              subtitle: (
                <ParaGraph className={`py-2`}>
                  {chaptersData[chapter].description}
                </ParaGraph>
              ),
              // indicator: (
              //   <CustomImage
              //     src={AllImages.book}
              //     className={"w-[90px] m-[-1rem]"}
              //   />
              // ),
              startContent: (
                <ChapterProgress
                  isCompleted={index === 0}
                  chapterNumber={index + 1}
                />
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default AllChapters;

export const ChapterProgress = ({ isCompleted, chapterNumber }) => {
  return isCompleted ? (
    <div className="rounded-full bg-primary-500 p-4 m-1">
      <FaCheck className="text-xl text-white" />
    </div>
  ) : (
    <CustomCircularProgress
      value={0}
      classNames={{
        value: STRINGS.CLASSES.heading,
        svg: "w-16 h-16",
      }}
      color="primary"
      valueLabel={chapterNumber}
    />
  );
};
