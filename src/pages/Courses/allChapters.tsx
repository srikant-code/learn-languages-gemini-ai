import { Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa6";
import { MdPlayLesson } from "react-icons/md";
import CustomAccordian from "../../components/Accordian";
import { CustomCard } from "../../components/Card";
import ParaGraph, { IconHeaderNonSticky } from "../../components/Paragraph";
import CustomCircularProgress from "../../components/Progress";
import { STRINGS } from "../../utilities/constants";
import { IconCardWithTextButton } from "../Home/appHeader";
import {
  AppCurrencyIcon,
  AppCurrencyWithText,
  AppXPIcon,
  AppXPWithText,
} from "../Home/homeContent";
import { Lessons } from "./lesson/lessons";
import { ChaptersData } from "./lesson/lessonsData";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { useParams } from "react-router-dom";

export const CoinsPerChapter = 200;
export const XPsPerChapter = 250;

const AllChapters = () => {
  const chaptersData = ChaptersData;
  const chapterKeys = Object.keys(chaptersData);
  let totalChapters = chapterKeys?.length;
  const { course } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(chapterKeys[0]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <IconHeaderNonSticky
          title={`All Chapters (${totalChapters})`}
          Icon={MdPlayLesson}
        />
      </div>
      <CourseStatistics />
      <div className="p-2">
        <CustomAccordian
          items={chapterKeys.map((chapter, index) => {
            const noOfLessonsInChapter = chaptersData[chapter].chapters?.length;
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
                <div className="flex flex-col">
                  <ParaGraph className={`py-2`}>
                    {chaptersData[chapter].description} in{" "}
                    {GetAllLanguages[course]?.languageName}
                  </ParaGraph>
                  <div className="flex flex-row gap-4">
                    <AppCurrencyWithText
                      className=""
                      text={noOfLessonsInChapter * CoinsPerChapter}
                    />
                    <AppXPWithText
                      className=""
                      text={noOfLessonsInChapter * XPsPerChapter}
                    />
                    <ParaGraph className={`py-2`}>
                      {noOfLessonsInChapter} Lessons
                    </ParaGraph>
                  </div>
                </div>
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

export const ChapterProgress = ({
  isCompleted,
  chapterNumber,
  value = 0,
  classNames = {},
  hideLock = false,
  noBorder = true,
}) => {
  return isCompleted ? (
    <div className="rounded-full bg-primary-500 p-4 m-1">
      <FaCheck className="text-xl text-white" />
    </div>
  ) : (
    <CustomCard
      className={`flex flex-col items-center justify-center gap-0 rounded-full p-0 ${
        noBorder ? "border-none" : ""
      }`}>
      <CustomCircularProgress
        value={value}
        classNames={{
          value: `${STRINGS.CLASSES.heading}`,
          svg: `w-16 h-16`,
          ...classNames,
        }}
        color="primary"
        valueLabel={chapterNumber}
      />
      {!hideLock && !isCompleted && (
        <FaLock className="text-xl text-primary-500 mb-4 my-2" />
      )}
    </CustomCard>
  );
};

const CourseStatistics = () => {
  const chaptersData = ChaptersData;
  const chapterKeys = Object.keys(chaptersData);

  let totalCoinsInCourse = 0;
  let totalXPsInCourse = 0;

  let noOfLessonsInCourse = 0;
  let completedNoOfLessons = 39;
  chapterKeys.forEach((chapter, index) => {
    const noOfLessonsInChapter = chaptersData[chapter].chapters?.length;
    noOfLessonsInCourse += noOfLessonsInChapter;
    completedNoOfLessons += 0; // TODO: complete the logic
    totalCoinsInCourse += CoinsPerChapter * noOfLessonsInChapter;
    totalXPsInCourse += XPsPerChapter * noOfLessonsInChapter;
  });
  let courseProgress = Math.floor(
    (completedNoOfLessons / noOfLessonsInCourse) * 100
  ); // TODO: complete the logic

  return (
    <CustomCard className={"flex"}>
      <div>
        <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
          Course statistics
        </ParaGraph>
        <Spacer y={4} />
        <div className="flex flex-wrap gap-4">
          <IconCardWithTextButton
            left={
              <ChapterProgress
                isCompleted={false}
                hideLock
                noBorder
                chapterNumber={`${courseProgress}%`}
                value={courseProgress}
                classNames={{
                  value: "text-md font-bold",
                }}
              />
            }
            child={`${completedNoOfLessons}/${noOfLessonsInCourse}`}
            heading={"Completed lessons"}
          />
          <IconCardWithTextButton
            left={<AppCurrencyIcon className="" />}
            child={totalCoinsInCourse}
            heading={`total ${STRINGS.APP_CURRENCY}`}
          />
          <IconCardWithTextButton
            left={<AppXPIcon className="" />}
            child={totalXPsInCourse}
            heading={"total xps"}
          />
          <IconCardWithTextButton
            left={<AppCurrencyIcon className="" />}
            child={CoinsPerChapter * completedNoOfLessons}
            heading={`earned ${STRINGS.APP_CURRENCY}`}
          />
          <IconCardWithTextButton
            left={<AppXPIcon className="" />}
            child={XPsPerChapter * completedNoOfLessons}
            heading={"earned xps"}
          />
        </div>
      </div>
    </CustomCard>
  );
};
