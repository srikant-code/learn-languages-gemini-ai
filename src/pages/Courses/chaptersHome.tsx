import { Outlet, useParams } from "react-router-dom";
import CustomTabs from "../../components/Tabs";
import AllChapters from "./allChapters";
import ParaGraph from "../../components/Paragraph";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { STRINGS } from "../../utilities/constants";
import Flag from "../../components/Flag";
import Flashcards from "./FlashCards/flashCards";
import Assessments from "./assesments";
import MarkdownRenderer from "../../components/Markdown";
import Alphabets from "../Alphabets";
import Practice from "./practice";

interface RenderChaptersProps {}

const ChaptersAndLessons: FunctionComponent<RenderChaptersProps> = () => {
  const { course } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pl-2">
        <Flag
          flag={GetAllLanguages[course].usedIn[0].content}
          className="w-[20px]"
        />
        <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
          {GetAllLanguages[course].languageName} Course
        </ParaGraph>
      </div>
      <Outlet />
    </div>
  );
};

export default ChaptersAndLessons;

export const ChaptersAndLessonsHome = () => {
  return (
    <div>
      <CustomTabs
        tabs={[
          {
            title: "All Chapters",
            content: <AllChapters />,
          },
          { title: "Flash Cards", content: <Flashcards /> },
          { title: "Alphabets", content: <Alphabets /> },
          { title: "Practice", content: <Practice /> },
          { title: "Assessments", content: <Assessments /> },
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
