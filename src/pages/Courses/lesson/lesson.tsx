import { Spacer, Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../components/Button";
import { CustomCard } from "../../../components/Card";
import CustomImage, { AllImages } from "../../../components/Image";
import MarkdownRenderer from "../../../components/Markdown";
import ParaGraph from "../../../components/Paragraph";
import {
  findChapterAndLessonByLessonId,
  UpdateCourse,
  useChapterDetails,
  useCourseDetails,
} from "../../../store/reduxHelpers/courseChapterLessons";
import { STRINGS } from "../../../utilities/constants";
import { GetAllLanguages } from "../../../utilities/countryIcons";
import { Sleep } from "../../../utilities/utilities";
import { IconCardWithTextButton } from "../../Home/appHeader";
import { AppCurrencyIcon } from "../../Home/homeContent";
import { ChapterProgress, CoinsPerLesson } from "../allChapters";
import { UnlockLessonButton } from "./lessons";
import { GeminiChat } from "../../../geminiAI/genAI";
import { ChatBar, CustomCopyButton, NoSelectedChat, PERSONA } from "../../Chat";
import {
  COINS_OBJ,
  UpdateCoins,
} from "../../../store/reduxHelpers/coinsAndXps";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AudioPlayer } from "../../../components/Audio";
import { AppIconAndText } from "../../LoginAndSignup";

interface LessonProps {}

const Lesson: FunctionComponent<LessonProps> = () => {
  const location = useLocation();
  console.log({ location });
  const { lesson, course } = useParams();
  const courseData = useCourseDetails(course);
  const [loading, setLoading] = useState(false);
  const lessonName = lesson?.replaceAll("_", " ");
  const {
    chapterId,
    chapter: chapterData,
    lesson: lessonData,
    lessonNumber,
  } = findChapterAndLessonByLessonId(courseData, lessonName) ?? {};
  console.log({ chapterData, chapterId, course, courseData, lessonData });
  const chapterDetailsFromRedux = useChapterDetails(course, chapterId);
  const lessonsFromRedux = chapterDetailsFromRedux?.chapters;

  let currentLessonIndex = 0;
  lessonsFromRedux?.forEach((l, index) => {
    if (l.lesson === lessonName) {
      currentLessonIndex = index;
    }
  });
  const prevLesson = lessonsFromRedux?.[currentLessonIndex - 1];
  const curLesson = lessonsFromRedux?.[currentLessonIndex];
  const nextLesson = lessonsFromRedux?.[currentLessonIndex + 1];

  let currentChapIndex = 0;
  const allChaps = Object.keys(courseData?.chaptersData);
  allChaps.forEach((chapter, index) => {
    if (chapter === chapterId) {
      currentChapIndex = index;
    }
  });

  const prevChapter =
    courseData?.chaptersData?.[allChaps[currentChapIndex - 1]];
  const nextChapter =
    courseData?.chaptersData?.[allChaps[currentChapIndex + 1]];

  const isLessonUnlocked = lessonData?.isUnlocked;

  const [chatInputValue, setChatInputValue] = useState(
    "Generate lesson on ABC"
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lesson && lessonNumber) {
      setMessages([]);
    }
  }, [lesson]);

  console.log({ messages, isLoading: loading });
  const handleSend = async () => {
    if ((!loading && chatInputValue) || !messages?.length) {
      //isLessonUnlocked && !lessonData?.content
      // const courseDataCopy = GenerateCourseDataCopy(courseData);
      setLoading(true);
      const currentMessage = {
        role: PERSONA.USER.id,
        parts: [{ text: chatInputValue }],
      };

      setMessages((messages) => {
        return [...messages, currentMessage];
      });

      const updateContent = ({ newContent, otherData = {} }) => {
        const lessonNewData = {
          lessonName: lessonName,
          lessonDescription: curLesson?.description,
          content: newContent,
          otherData,
        };
        const updatedCourse = UpdateCourse({
          courseID: course,
          chapterID: chapterId,
          lessonID: lessonName,
          lessonDetails: lessonNewData,
        });
        console.log({ updatedCourse });

        // Sleep(0).then(() => {
        //   UpdateCourse({
        //     courseID: course,
        //     courseDetails: {
        //       ...updatedCourse[course],
        //       lastOpenedChapter: chapterData,
        //       lastOpenedLesson: lessonNewData,
        //       lastUpdateDetails: lessonNewData,
        //     },
        //   });
        // });
      };
      updateContent({ newContent: [...messages, currentMessage] });
      setChatInputValue("");
      // generate lesson content and update it.

      const handleResponseFromGemini = (response) => {
        console.log({ response });
        const { text, ...otherData } = response;
        const currentMessage = {
          role: PERSONA.BOT.id,
          parts: [
            {
              text: text || `# ${STRINGS.APP_NAME} AI is thinking...`,
            },
          ],
        };

        const newContent = [...(lessonData?.content || []), currentMessage];

        // SaveMToExistingChat({
        //   chatID: isNewCurChatID ?? lessonName,
        //   message: currentMessage,
        //   otherData,
        //   dispatch,
        //   title:
        //     ExtractHeadingFromMarkdown(text) ??
        //     (chatInputValue ? chatInputValue?.toProperCase() : undefined),
        // });

        updateContent({ newContent });
        Sleep(100).then(() => {
          UpdateCoins({
            earnedForID: COINS_OBJ.USE_AI,
            earnedForDetails: {
              name: `Used ${STRINGS.APP_NAME} AI inside course.`,
              buttonText: "Go to lesson",
              route: lessonName,
            },
          });
        });
        // setMessages((messages) => {
        //   return [...messages, currentMessage];
        // });
      };

      try {
        const response = {
          text: "#Gemin AI reposnse \n aksdkajdkkjhfjbshv",
          usageData: { a: "A", v: "V" },
        };
        // const { response } = await GeminiChat({
        //   history: [],
        //   msg: `
        // Chapter: ${chapterId},
        // lesson: ${lessonName},
        // languageCode: ${course},
        // languageName: ${GetAllLanguages[course].languageName}
        // Generate the content for this lesson in markdown.
        // Also in the end put of further questions that the user can ask.
        // `,
        //   json: false,
        //   callback: (newText) => {
        //     setMessages((messages) => {
        //       const newMessages = [...messages];
        //       if (newMessages.length > 0) {
        //         const curMessage = {
        //           role: PERSONA.BOT.id,
        //           parts: [{ text: newText }],
        //         };
        //         const lastMessage = newMessages[newMessages.length - 1];
        //         console.log({ newMessages, lastMessage });
        //         // Update the last message, if it was user then add it to
        //         // the end otherwise update the previous bot message itself
        //         if (lastMessage?.role === PERSONA.USER.id)
        //           newMessages[newMessages.length] = curMessage;
        //         else newMessages[newMessages.length - 1] = curMessage;
        //       }
        //       return newMessages;
        //     });
        //   },
        // });
        Sleep(2000).then(async () => {
          handleResponseFromGemini(await response);
        });
        setLoading(false);
      } catch (e) {
        console.log({ e });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleSend();
    // DeleteCourse({ courseID: course });
  }, [location.pathname]);
  const navigate = useNavigate();

  console.log({
    lessonData,
    nextLesson,
    nextChapter,
    currentChapIndex,
    allChaps,
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <ChapterProgress
            chapterNumber={lessonNumber + 1}
            isCompleted={false}
            hideLock={isLessonUnlocked}
          />
          <div className="flex flex-col">
            <ParaGraph className={`text-md`}>
              {chapterData?.chapterName || "Lesson"}
            </ParaGraph>
            <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
              {lessonName}
            </ParaGraph>
          </div>
        </div>
        <div></div>
      </div>
      <Spacer y={6} />
      <div>
        <CustomCard className={"w-full"} isPressable={false}>
          <div>
            {lessonData?.content && (
              <div>
                {/* <MarkdownRenderer markdownContent={lessonData?.content} /> */}
                <OngoingLesson messages={lessonData?.content} />
                <Spacer y={6} />
                <ChatBar
                  {...{
                    messages,
                    // handleNewChat,
                    handleSend,
                    loading,
                    inputValue: chatInputValue,
                    setInputValue: setChatInputValue,
                  }}
                />
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
                    <CustomButton size={"md"}>
                      Practice speaking Alphabets
                    </CustomButton>
                    <CustomButton size={"md"}>
                      Start a game using Alphabets
                    </CustomButton>
                    <CustomButton size={"md"}>
                      Challenges, Find words in Dictionary,
                    </CustomButton>
                    chat with AI on more doubts, learn more on this content
                  </div>
                </div>
              </div>
            )}
            {isLessonUnlocked ? (
              loading ? (
                <div className="flex items-center gap-6 justify-start p-10">
                  <Spinner color="primary" label={""} size="lg" />
                  <div>
                    <ParaGraph className={"text-lg font-bold"}>
                      {`${STRINGS.APP_NAME} is generating content of "${lessonName} in ${GetAllLanguages[course]?.languageName}"
                      `}
                    </ParaGraph>
                    <ParaGraph className={"text-2xl font-bold"}>
                      Just for you.
                    </ParaGraph>
                  </div>
                </div>
              ) : null
            ) : (
              <div className="flex items-center flex-wrap justify-center w-full">
                <CustomImage src={AllImages.app.unlock} className="w-[300px]" />
                <div className="flex flex-col gap-4 flex-1">
                  <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
                    Unlock this lesson to continue.
                  </ParaGraph>
                  <UnlockLessonButton />
                </div>
              </div>
            )}
            <Spacer y={8} />
            <div className="flex justify-between items-center">
              {prevLesson?.lesson ? (
                <IconCardWithTextButton
                  left={<FaArrowLeft />}
                  heading={`Go to previous lesson`}
                  child={prevLesson?.lesson}
                  buttonProps={{
                    as: Link,
                    to: `${"/courses"}/${course}/${prevLesson?.lesson?.replaceAll(
                      " ",
                      "_"
                    )}`,
                  }}
                />
              ) : prevChapter?.chapters?.[prevChapter?.chapters?.length - 1]
                  ?.lesson ? (
                <IconCardWithTextButton
                  left={<FaArrowLeft />}
                  heading={`Go to previous lesson`}
                  child={
                    prevChapter?.chapters?.[prevChapter?.chapters?.length - 1]
                      ?.lesson
                  }
                  buttonProps={{
                    as: Link,
                    to: `${"/courses"}/${course}/${prevChapter?.chapters?.[
                      prevChapter?.chapters?.length - 1
                    ]?.lesson?.replaceAll(" ", "_")}`,
                  }}
                />
              ) : null}
              {nextLesson?.lesson ? (
                <IconCardWithTextButton
                  left={
                    isLessonUnlocked ? <AppCurrencyIcon /> : <FaArrowRight />
                  }
                  heading={`Go to next lesson ${
                    isLessonUnlocked
                      ? `Earn ${CoinsPerLesson} ${STRINGS.APP_CURRENCY}`
                      : ""
                  }`}
                  child={nextLesson?.lesson}
                  buttonProps={{
                    as: Link,
                    to: `${"/courses"}/${course}/${nextLesson?.lesson?.replaceAll(
                      " ",
                      "_"
                    )}`,
                  }}
                />
              ) : nextChapter?.chapters?.[0]?.lesson ? (
                <IconCardWithTextButton
                  left={
                    isLessonUnlocked ? <AppCurrencyIcon /> : <FaArrowRight />
                  }
                  heading={`Go to next lesson ${
                    isLessonUnlocked
                      ? `Earn ${CoinsPerLesson} ${STRINGS.APP_CURRENCY}`
                      : ""
                  }`}
                  child={nextChapter?.chapters?.[0]?.lesson}
                  buttonProps={{
                    as: Link,
                    to: `${"/courses"}/${course}/${nextChapter?.chapters?.[0]?.lesson?.replaceAll(
                      " ",
                      "_"
                    )}`,
                  }}
                />
              ) : null}
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default Lesson;

export const OngoingLesson = ({ messages, isLoading }) => {
  const [parent] = useAutoAnimate();
  const [parent2] = useAutoAnimate();
  const bottomOfChatRef = useRef(null);

  // const settings = useSelector((state) => state.language);

  // const savedChats = settings[STRINGS.STORAGE.SAVED_CHATS];
  // const ongoingChatID = settings[STRINGS.STORAGE.ONGOING_CHAT_ID];
  // const curChat = savedChats[ongoingChatID];
  const totalTokensUsed = undefined;
  // curChat?.otherData?.usageMetadata?.totalTokenCount ?? undefined;

  useEffect(() => {
    if (bottomOfChatRef.current)
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
  });

  console.log({ messages });

  return Array.isArray(messages) && messages.length > 0 ? (
    <div ref={parent}>
      {messages.map((message, index) => {
        const isUser = message.role === PERSONA.USER.id;
        const currentMessage = message?.parts?.[0]?.text;

        const copyButton = (
          <CustomCopyButton size={"sm"} text={currentMessage} />
        );

        const audioPlayer = (
          <AudioPlayer
            text={currentMessage}
            src={undefined}
            buttonProps={{
              variant: "flat",
              size: "sm",
            }}
          />
        );

        return (
          <div
            key={index}
            color={isUser ? "primary" : "secondary"}
            className="flex flex-col py-4">
            <div
              className={`flex flex-row${
                isUser ? `-reverse` : ""
              } items-center gap-4`}>
              {!isUser && (
                <AppIconAndText
                  onlyLogo
                  classNames={{
                    parent: "p-0",
                    icon: "m-[-2rem] p-0",
                  }}
                  removeAllClasses
                />
              )}
              <div className="flex gap-4 items-center">
                {isUser && (
                  <div className="flex gap-2">
                    {copyButton} {audioPlayer}
                  </div>
                )}
                <ParaGraph className="font-bold">
                  {isUser ? PERSONA.USER.displayName : PERSONA.BOT.displayName}
                </ParaGraph>
                {!isUser && isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  !isUser && (
                    <div className="flex gap-2">
                      {audioPlayer}
                      {copyButton}
                    </div>
                  )
                )}
              </div>
            </div>
            <CustomCard
              className={`flex flex-col ml-0 my-3 ${isUser ? `self-end` : ""} ${
                !isUser ? "dark:border-primary-400" : "dark:border-slate-400"
              } rounded-3xl w-full`}>
              <div className={`p-0 w-full min-w-[180px]`}>
                <MarkdownRenderer
                  markdownContent={currentMessage ?? ""}
                  ref={parent2}
                />
              </div>
            </CustomCard>
          </div>
        );
      })}
      <div ref={bottomOfChatRef} />
      {totalTokensUsed ? (
        <div>
          <ParaGraph className="text-center text-xs text-gray-500">
            {totalTokensUsed} / 1,000,000 tokens used
          </ParaGraph>
        </div>
      ) : null}
    </div>
  ) : (
    <NoSelectedChat />
  );
};
