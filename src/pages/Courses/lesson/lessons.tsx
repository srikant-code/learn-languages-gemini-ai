import { useParams } from "react-router-dom";
import CustomButton, { CustomLinkButton } from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import ParaGraph from "../../../components/Paragraph";
import {
  COINS_OBJ,
  UpdateCoins,
  useCoinsDetails,
} from "../../../store/reduxHelpers/coinsAndXps";
import { SlideIDs, STRINGS } from "../../../utilities/constants";
import { GetAllLanguages } from "../../../utilities/countryIcons";
import { IconCardWithTextButton } from "../../Home/appHeader";
import { AppCurrencyIcon } from "../../Home/homeContent";
import {
  ChapterProgress,
  CoinsPerLesson,
  GenerateCourseDataCopy,
} from "../allChapters";
import { Sleep } from "../../../utilities/utilities";
import {
  findChapterAndLessonByLessonId,
  unlockSpecificLesson,
  UpdateCourse,
  useCourseDetails,
} from "../../../store/reduxHelpers/courseChapterLessons";
import { CustomModal } from "../../../components/Modal";
import CustomImage, { AllImages } from "../../../components/Image";
import { CustomUnOrderedList } from "../../Dictionary";
import { ScrollShadow, Spacer } from "@nextui-org/react";

export const Lessons = ({ chapter, chapterData }) => {
  const { course } = useParams();
  const courseName = GetAllLanguages[course]?.languageName;
  const courseData = useCourseDetails(course);
  return (
    <div className="flex flex-col gap-4 outline-primary-300 outline-[3px] outline-offset-[-40px] outline-dotted w-full">
      {chapterData[chapter].chapters.map((lesson, index) => {
        const isUnlocked = lesson?.isUnlocked;
        const isCompleted = lesson?.isCompleted;
        const lessonRoute = lesson.lesson?.replaceAll(" ", "_");
        return (
          <div key={index}>
            <CustomCard
              as={CustomLinkButton}
              to={`${lessonRoute}`}
              className={"px-0 py-2 items-start justify-between"}>
              <div className="items-center flex-row justify-between flex px-5 w-full">
                <div className="flex items-center">
                  <ChapterProgress
                    isCompleted={isCompleted}
                    chapterNumber={index + 1}
                    hideLock={isUnlocked}
                  />
                  <div className="flex p-4 flex-col gap-2 items-start">
                    <ParaGraph
                      className={`${STRINGS.CLASSES.heading} flex gap-4 items-center text-wrap`}>
                      {lesson.lesson}{" "}
                    </ParaGraph>
                    <ParaGraph
                      className={`${STRINGS.CLASSES.subText} text-wrap`}>
                      {lesson.description} in {courseName}
                    </ParaGraph>
                  </div>
                </div>
                {
                  <div className="flex gap-4 items-center mr-">
                    {isUnlocked ? null : !isCompleted ? (
                      <UnlockLessonButton
                        lessonRoute={lessonRoute}
                        chapterId={""}
                      />
                    ) : (
                      <IconCardWithTextButton
                        left={<AppCurrencyIcon className="text-green-400" />}
                        child={CoinsPerLesson}
                        heading={"earned"}
                        buttonProps={{
                          color: "success",
                          variant: "flat",
                          disabled: true,
                          onClick: (e) => {
                            if (e.preventDefault) {
                              e.preventDefault();
                            }
                            console.log("Completed");
                          },
                        }}
                      />
                    )}
                    {/* <div>
                      <ParaGraph className={`${STRINGS.CLASSES.subText}`}>
                        {"Unlock"}
                      </ParaGraph>
                      <AppCurrencyWithText className="" text={100} />
                    </div> */}
                  </div>
                }
              </div>
            </CustomCard>
          </div>
        );
      })}
    </div>
  );
};

export const UnlockLessonButton = ({ courseRoute, lessonRoute }) => {
  const { course, lesson } = useParams();
  const courseName = GetAllLanguages[course]?.languageName;
  const courseData = useCourseDetails(course);

  const lessonEncodedID = lesson || lessonRoute;
  const lessonDecodedID = lessonEncodedID?.replaceAll("_", " ");

  const { chapterId } =
    findChapterAndLessonByLessonId(courseData, lessonDecodedID) ?? {};

  const RenderButton = ({ ...props }) => {
    console.log({ props });
    return (
      <IconCardWithTextButton
        left={<AppCurrencyIcon className="" />}
        child={CoinsPerLesson}
        heading={"unlock"}
        onClick={(e) => {
          if (e.preventDefault) {
            e.preventDefault();
            if (props?.onPress) props?.onPress(e);
            if (true) {
              Sleep(0).then(() => {
                const courseDataCopy = GenerateCourseDataCopy(courseData); // Create a deep copy of courseData
                const unlockedLesson = unlockSpecificLesson(
                  courseDataCopy,
                  chapterId,
                  lessonDecodedID
                );
                if (unlockedLesson) {
                  UpdateCourse({
                    courseID: course,
                    courseDetails: {
                      ...courseDataCopy,
                      lastOpenedChapter: unlockedLesson.chapter,
                      lastOpenedLesson: unlockedLesson.lesson,
                      lastUpdateDetails: unlockedLesson.lesson,
                    },
                  });
                }
              });
            }
            Sleep(100).then(() => {
              UpdateCoins({
                earnedForID: COINS_OBJ.COURSE_LESSON_UNLOCK,
                earnedForDetails: {
                  name: `Unlocked "${lessonDecodedID}" lesson in ${courseName}.`,
                  buttonText: "Go to lesson",
                  route: `${SlideIDs.courses.route}/${
                    course || courseRoute
                  }/${lessonEncodedID}`,
                },
              });
            });
          }
          console.log("Completed");
        }}
      />
    );
  };

  return <ModalForInsufficientCoins Component={RenderButton} />;
};

const ModalForInsufficientCoins = ({
  message = "Unlock this lesson",
  Component,
  buttonProps = {},
}) => {
  const coins = useCoinsDetails();
  return (
    <CustomModal
      title={
        <div className="flex gap-4 items-center ">
          <ParaGraph className={STRINGS.CLASSES.heading}>
            Insufficient {STRINGS.APP_CURRENCY}!
          </ParaGraph>
          <AppCurrencyIcon />
        </div>
      }
      body={
        <div className={"flex flex-col gap-4"}>
          <div className="flex items-center  gap-4">
            <CustomImage src={AllImages.app.gems} className="w-[250px]" />
            <div className={"flex flex-col gap-4"}>
              <ParaGraph className={STRINGS.CLASSES.subHeading}>
                It seems you don't have enough {STRINGS.APP_CURRENCY} to{" "}
                {message}.
              </ParaGraph>
              <div>
                <IconCardWithTextButton
                  left={<AppCurrencyIcon />}
                  heading={"Current balance"}
                  child={coins?.total}
                />
              </div>
            </div>
          </div>

          <ScrollShadow className="max-h-[200px]">
            <ParaGraph className={"font-bold"}>
              But don't worry, there are plenty of ways to earn more!
            </ParaGraph>
            <ParaGraph className={""}>
              Here's how you can earn more {STRINGS.APP_CURRENCY}:
            </ParaGraph>
            <Spacer y={4} />
            <CustomUnOrderedList
              items={[
                <div>
                  <ParaGraph>
                    <strong>Complete Lessons</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Every lesson you complete brings you closer to mastering the
                    subject and earns you {STRINGS.APP_CURRENCY}.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Finish Chapters</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Finishing a chapter not only gives you a sense of
                    accomplishment, but also rewards you with{" "}
                    {STRINGS.APP_CURRENCY}.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Use Flashcards</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Flashcards are a great way to reinforce your learning. Plus,
                    you earn {STRINGS.APP_CURRENCY} each time you go through
                    them.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Take Assessments</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Assess your knowledge and earn {STRINGS.APP_CURRENCY} by
                    completing assessments.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Chat with {STRINGS.APP_NAME} AI</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Our AI chat is not just informative, but also rewarding. You
                    earn {STRINGS.APP_CURRENCY} each time you use it.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Use the Dictionary</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Look up new words in our dictionary and earn{" "}
                    {STRINGS.APP_CURRENCY}.
                  </ParaGraph>
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Save Words in 'My Vocabulary'</strong>{" "}
                  </ParaGraph>
                  <ParaGraph>
                    Enhance your vocabulary and earn {STRINGS.APP_CURRENCY} by
                    saving new
                  </ParaGraph>
                  words.
                </div>,
                <div>
                  <ParaGraph>
                    <strong>Complete Challenges</strong>
                  </ParaGraph>{" "}
                  <ParaGraph>
                    Challenges are fun and rewarding. Complete them to earn{" "}
                    {STRINGS.APP_CURRENCY}.
                  </ParaGraph>
                </div>,
              ]}></CustomUnOrderedList>
            <Spacer y={8} />
          </ScrollShadow>
        </div>
      }
      size="3xl"
      actions={[
        // { text: "Close", color: "danger", variant: "light" },
        {
          text: "Yes I will earn coins first",
          color: "primary",
          variant: "solid",
        },
      ]}
      Button={Component}
      buttonProps={buttonProps}
    />
  );
};
