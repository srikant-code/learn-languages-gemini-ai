import { Outlet, useParams } from "react-router-dom";
import CustomTabs from "../../components/Tabs";
import AllChapters from "./allChapters";
import ParaGraph from "../../components/Paragraph";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { STRINGS } from "../../utilities/constants";
import Flag from "../../components/Flag";
import Assessments from "./assessments";
import MarkdownRenderer from "../../components/Markdown";
import Alphabets from "../Alphabets";
import Practice from "./practice";
import Flashcards from "./FlashCards/flashCards";
import { useSetHeaderTitle } from "../../hooks/useSetHeaderTitle";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import { setSetting } from "../../store/reducer";
import CustomImage, { AllImages } from "../../components/Image";
import { Spacer } from "@nextui-org/react";

interface RenderChaptersProps {}

const ChaptersAndLessons: FunctionComponent<RenderChaptersProps> = () => {
  const { course } = useParams();
  useSetHeaderTitle(GetAllLanguages[course].languageName + " Course");
  const settings = useSelector((state) => state.language) || {};
  const languagesUserKnows = Object.keys(
    settings?.[STRINGS.STORAGE.languagesUserKnows] || {}
  );
  const languagesUserWantsToKnow = Object.keys(
    settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {}
  );
  const allLanguages = Object.keys({
    ...languagesUserKnows,
    ...languagesUserWantsToKnow,
  });
  const doesUserWantsToLearnIt = languagesUserWantsToKnow?.find(
    (lang) => lang.toLowerCase() === course.toLowerCase()
  );
  const doesUserKnowsIt = languagesUserKnows?.find(
    (lang) => lang.toLowerCase() === course.toLowerCase()
  );
  const notInAnyList = !doesUserKnowsIt && !doesUserWantsToLearnIt;
  const dispatch = useDispatch();

  const enrollHandler = () => {
    dispatch(
      setSetting({
        key: STRINGS.STORAGE.languagesUserWantsToKnow,
        value: {
          ...(settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {}),
          [course]: {
            read: true,
            write: true,
            speak: true,
          },
        },
      })
    );
    dispatch(
      setSetting({
        key: STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE,
        value: course,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex items-center gap-4 pl-2">
          <Flag
            flag={GetAllLanguages[course].usedIn[0].content}
            className="w-[50px]"
          />
          <div className="flex flex-col gap-2">
            <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
              {GetAllLanguages[course].languageName} Course
            </ParaGraph>
            <div>
              <ParaGraph className={`${STRINGS.CLASSES.subText} flex gap-2`}>
                {[
                  doesUserKnowsIt ? "You know this" : null,
                  doesUserWantsToLearnIt ? "You want to learn this" : null,
                ]
                  .filter((i) => i)
                  .join(" | ")}
                <span>{notInAnyList && "Do you want to learn this?"}</span>
              </ParaGraph>
            </div>
          </div>
        </div>
        <div>
          {notInAnyList && (
            <CustomButton
              variant="solid"
              color="primary"
              onClick={enrollHandler}>
              Enroll
            </CustomButton>
          )}
          {!notInAnyList && (
            <CustomButton
              variant="ghost"
              color="warning"
              onClick={() => {
                const { [course]: removeCourse, ...otherLangs } =
                  settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {};

                dispatch(
                  setSetting({
                    key: STRINGS.STORAGE.languagesUserWantsToKnow,
                    value: {
                      ...(Object.keys(otherLangs)?.length >= 1
                        ? otherLangs
                        : {
                            en: {
                              read: true,
                              write: true,
                              speak: true,
                            },
                          }),
                    },
                  })
                );
                dispatch(
                  setSetting({
                    key: STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE,
                    value: Object.keys(otherLangs)[0] ?? "en",
                  })
                );
              }}>
              Drop Course
            </CustomButton>
          )}
        </div>
      </div>
      {notInAnyList ? (
        <div className="flex w-full items-center justify-center gap-6">
          <CustomImage src={AllImages.app.enroll} className={"max-w-[300px]"} />
          <div className="flex flex-col gap-4">
            <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
              Enroll in {GetAllLanguages[course].languageName} Course to
              continue
            </ParaGraph>
            <CustomButton
              variant="solid"
              color="primary"
              onClick={enrollHandler}>
              Enroll
            </CustomButton>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default ChaptersAndLessons;

export const ChaptersAndLessonsHome = () => {
  return (
    <div>
      <CustomTabs
        id={STRINGS.STORAGE.TABS.allChapters}
        fullWidth
        tabs={[
          {
            title: "All Chapters",
            content: (
              <div className="flex flex-col px-2">
                <Spacer y={4} />
                <AllChapters />
              </div>
            ),
          },
          {
            title: "Flash Cards",
            content: (
              <div className="flex flex-col px-2">
                <Spacer y={4} />
                <Flashcards />
              </div>
            ),
          },
          {
            title: "Alphabets",
            content: (
              <div className="flex flex-col px-2">
                <Spacer y={4} />
                <Alphabets />
              </div>
            ),
          },
          {
            title: "Practice",
            content: (
              <div className="flex flex-col px-2">
                <Spacer y={4} />
                <Practice />
              </div>
            ),
          },
          {
            title: "Assessments",
            content: (
              <div className="flex flex-col px-2">
                <Spacer y={4} />
                <Assessments />
              </div>
            ),
          },
        ]}
      />
      <MarkdownRenderer
        markdownContent={`

        ## TODOs
        
        - Reading skills in profile section, using quizzes on the chapters.
        - writing skill using canvas and photo send to gemini
        - speaking skills using speech recording and sending to gemini
        - listening skill will increases the points and skill level, the more character length they choose to hear the more points they get.

        - concept of accuracy in games as well as the uploaded content score impact on skill level


        - self introduction exercises
        - reading comprehension exercises


        - The markdown should show give me more information on this - it should add to the global state. 
        the listener should pull the value and dynamically render the 
        `}
      />
    </div>
  );
};
