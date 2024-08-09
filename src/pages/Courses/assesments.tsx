import { FaBook } from "react-icons/fa6";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";

interface AssessmentsProps {}

const Assessments: FunctionComponent<AssessmentsProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ParaGraph
          className={`${STRINGS.CLASSES.heading} flex gap-4 items-center`}>
          <FaBook />
          Assessments
        </ParaGraph>
        <ParaGraph>
          Below are the assesments available based on your recent learnings. It
          shows how you perform, where you are lacking and a lot of other
          helpful information related to you.
        </ParaGraph>
        <ParaGraph>
          Games, Challenges, Suggestions for next actions, practice here
        </ParaGraph>
      </div>
    </div>
  );
};

export default Assessments;
