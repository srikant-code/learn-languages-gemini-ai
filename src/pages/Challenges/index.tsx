import { IconHeader } from "../../components/Paragraph";
import { SlideIDs } from "../../utilities/constants";

interface ChallengesProps {}

const Challenges: FunctionComponent<ChallengesProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.challenges.icon}>Challenges</IconHeader>
    </div>
  );
};

export default Challenges;
