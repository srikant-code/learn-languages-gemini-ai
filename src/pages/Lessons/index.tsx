import { IconHeader } from "../../components/Paragraph";
import { SlideIDs } from "../../utilities/constants";

interface LessonsProps {}

const Lessons: FunctionComponent<LessonsProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.lessons.icon}>Lessons</IconHeader>
    </div>
  );
};

export default Lessons;
