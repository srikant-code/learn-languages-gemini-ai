import { Spacer } from "@nextui-org/react";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import {
  Motivations,
  MotivationSuggestedActions,
} from "../LoginAndSignup/motivation";
import { CustomCard } from "../../components/Card";
import { CustomNoWrapButton } from "../../components/Button";
import { SetActiveTabInRedux } from "../../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../store/reducer";
import { AI_TABS } from ".";
import { GetAllLanguages } from "../../utilities/countryIcons";
import {
  Chapters,
  ChaptersMotivation,
  ChaptersSuggestedActions,
} from "../Courses/lesson/lessonsData";

interface ExploreProps {}

const Explore: FunctionComponent<ExploreProps> = () => {
  return (
    <div>
      <Spacer y={5} />
      <ParaGraph className={`${STRINGS.CLASSES.heading}`}>Explore</ParaGraph>
      <Spacer y={5} />
      <div className="flex flex-row flex-wrap gap-4">
        {Motivations.map((motivation, index) => {
          return (
            <CustomCard key={index} className={"gap-4 w-fit flex-1"}>
              <div className={`flex flex-row items-center justify-start gap-6`}>
                <ParaGraph className={"text-3xl"}>{motivation.icon}</ParaGraph>
                <div className="flex flex-col gap-1">
                  <ParaGraph className={`text-xl font-semibold`}>
                    {motivation.label}
                  </ParaGraph>
                  <ParaGraph>{motivation.description}</ParaGraph>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {MotivationSuggestedActions[motivation.label].map(
                  (item, index) => {
                    return (
                      <ExploreSuggestedCard
                        key={index}
                        index={index}
                        data={item}
                      />
                    );
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
export const CoursesChapters: FunctionComponent<ExploreProps> = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.language) ?? {};
  const selectedLang =
    GetAllLanguages[
      settings[STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE] || "en"
    ];
  // const prompt = `${data.prompt?.replace(
  //   "target",
  //   selectedLang?.usedIn[0]?.id?.countryName
  // )} ${data.label} in "${selectedLang.languageName}" language.`;
  return (
    <div>
      <Spacer y={5} />
      <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
        Course Structure for {selectedLang.languageName}
      </ParaGraph>
      <Spacer y={5} />
      <div className="flex flex-row flex-wrap gap-4">
        {ChaptersMotivation.map((chapter, index) => {
          return (
            <CustomCard key={index} className={"gap-4 w-fit flex-1"}>
              <div className={`flex flex-row items-center justify-start gap-6`}>
                <ParaGraph className={"text-3xl"}>{chapter.icon}</ParaGraph>
                <div className="flex flex-col gap-1">
                  <ParaGraph className={`text-xl font-semibold`}>
                    {Chapters[chapter.label].name} in{" "}
                    {selectedLang.languageName}
                  </ParaGraph>
                  <ParaGraph>{chapter.description}</ParaGraph>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {ChaptersSuggestedActions[chapter.label].map((item, index) => {
                  return (
                    <ExploreSuggestedCard
                      key={index}
                      index={index}
                      data={item}
                    />
                  );
                })}
              </div>
            </CustomCard>
          );
        })}
      </div>
    </div>
  );
};

const ExploreSuggestedCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.language) ?? {};
  const selectedLang =
    GetAllLanguages[
      settings?.[STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE] || "en"
    ];
  const prompt = `${data.prompt?.replace(
    "target",
    selectedLang?.usedIn[0]?.id?.countryName
  )} ${data.label} in "${selectedLang?.languageName}" language.`;
  return (
    <CustomCard as={CustomNoWrapButton} className={"p-0 w-full"}>
      <div
        className="w-full"
        onClick={() => {
          SetActiveTabInRedux({
            dispatch,
            tabID: STRINGS.STORAGE.TABS.chat,
            activeTab: AI_TABS.ALL_CHATS,
          });
          dispatch(
            setSetting({
              key: STRINGS.STORAGE.CHAT_INPUT_VALUE,
              value: prompt,
            })
          );
        }}>
        <div className="flex justify-between items-center p-4 px-6 gap-4 w-full">
          <div className="flex gap-4 items-center">
            <ParaGraph className={"text-wrap font-bold text-2xl"}>
              {index + 1}
            </ParaGraph>
            <div>
              <ParaGraph className={"text-wrap"}>{data.label}</ParaGraph>
              <ParaGraph className={"text-wrap text-small"}>
                {data.prompt} in "{selectedLang.languageName}" language.
              </ParaGraph>
            </div>
          </div>
          <ParaGraph className={"text-xl"}>{data.icon}</ParaGraph>
        </div>
      </div>
    </CustomCard>
  );
};

export default Explore;
