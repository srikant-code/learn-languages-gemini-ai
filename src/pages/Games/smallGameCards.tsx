import { BgImage, TransformScale } from ".";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import CustomImage from "../../components/Image";
import ParaGraph from "../../components/Paragraph";
import { GamesMetaData } from "./gamesMetadata";

export const SmallGameCards = ({ setActiveGame, customSubTitle = null }) => {
  return (
    <div
      style={{ flex: 1, flexFlow: "row wrap", display: "flex" }}
      className="gap-4">
      {Object.values(GamesMetaData).map((game, index) => {
        const subTitle = customSubTitle
          ? `Start this game using "${customSubTitle}"`
          : null;
        return (
          <CustomCard
            as={CustomButton}
            key={index}
            className={`items-start w-full p-0 py-1 rounded-2xl min-w-[200px] max-w-[220px] h-20`}>
            <BgImage image={game.image} />
            <div
              className={`flex flex-row justify-between items-center w-full px-4 gap-6 relative ${TransformScale}`}
              onClick={() => setActiveGame(game)}>
              <div className="flex flex-col items-start pl-2 ">
                <ParaGraph
                  style={{ color: game?.imageTextColor ? "white" : "black" }}
                  className={`font-bold`}>
                  {game.title}
                </ParaGraph>
                <ParaGraph
                  style={{
                    background: "#00000025",
                    color: game?.imageTextColor ? "white" : "black",
                  }}
                  className={`text-small opacity-85 bg-blend-screen rounded-full px-2 text-ellipsis overflow-hidden max-w-56`}>
                  {subTitle ?? game.gameCategory}
                </ParaGraph>
                <ParaGraph>{game.subtitle}</ParaGraph>
              </div>
              <div className="absolute right-0">
                <CustomImage
                  src={game?.imageText}
                  className={"w-[50px] z-10 m-0"}
                />
              </div>
            </div>
          </CustomCard>
        );
      })}
    </div>
  );
};
