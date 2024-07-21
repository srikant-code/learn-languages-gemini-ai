import { IconHeader } from "../../components/Paragraph";
import { SlideIDs } from "../../utilities/constants";

interface GamesProps {}

const Games: FunctionComponent<GamesProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.games.icon}>Games</IconHeader>
    </div>
  );
};

export default Games;
