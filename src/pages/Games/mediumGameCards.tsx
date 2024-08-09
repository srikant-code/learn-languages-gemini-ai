import { GameCardImage } from ".";
import { GamesMetaData } from "./gamesMetadata";

export const MediumGameCards = () => {
  const gamesData = Object.values(GamesMetaData);
  return (
    <div className="gap-4 flex" style={{ flexFlow: "row wrap" }}>
      {gamesData.map((game, index) => {
        return <RenderMediumGameCard game={game} key={index} />;
      })}
    </div>
  );
};

export const RenderMediumGameCard = ({ game }) => {
  return <GameCardImage game={game} className={"h-[100] "} />;
};
