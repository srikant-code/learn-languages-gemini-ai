import { useParams } from "react-router-dom";
import { CustomLinkButton } from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import ParaGraph from "../../../components/Paragraph";
import { SlideIDs, STRINGS } from "../../../utilities/constants";
import { GetAllLanguages } from "../../../utilities/countryIcons";
import {
  COINS_OBJ,
  UpdateCoins,
} from "../../../store/reduxHelpers/coinsAndXps";
import { IconCardWithTextButton } from "../../Home/appHeader";
import { AppCurrencyIcon } from "../../Home/homeContent";
import { ChapterProgress, CoinsPerChapter } from "../allChapters";

export const Lessons = ({ chapter, chapterData }) => {
  const { course } = useParams();
  const courseName = GetAllLanguages[course]?.languageName;
  return (
    <div className="flex flex-col gap-4 outline-primary-300 outline-[3px] outline-offset-[-40px] outline-dotted">
      {chapterData[chapter].chapters.map((chapter, index) => {
        const isCompleted = index === 0;
        const lessonRoute = chapter.lesson?.replaceAll(" ", "_");
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
                  />
                  <div className="flex p-4 flex-col gap-2 items-start">
                    <ParaGraph
                      className={`${STRINGS.CLASSES.heading} flex gap-4 items-center text-wrap`}>
                      {chapter.lesson}{" "}
                    </ParaGraph>
                    <ParaGraph
                      className={`${STRINGS.CLASSES.subText} text-wrap`}>
                      {chapter.description} in {courseName}
                    </ParaGraph>
                  </div>
                </div>
                {
                  <div className="flex gap-4 items-center mr-">
                    {!isCompleted ? (
                      <IconCardWithTextButton
                        left={<AppCurrencyIcon className="" />}
                        child={CoinsPerChapter}
                        heading={"unlock"}
                        onClick={(e) => {
                          if (e.preventDefault) {
                            e.preventDefault();
                            UpdateCoins({
                              earnedForID: COINS_OBJ.COURSE_LESSON_UNLOCK,
                              earnedForDetails: {
                                name: `Unlocked "${chapter.lesson}" lesson in ${courseName}.`,
                                buttonText: "Go to lesson",
                                route: `${SlideIDs.courses.route}/${course}/${lessonRoute}`,
                              },
                            });
                          }
                          console.log("Completed");
                        }}
                      />
                    ) : (
                      <IconCardWithTextButton
                        left={<AppCurrencyIcon className="text-green-400" />}
                        child={CoinsPerChapter}
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
