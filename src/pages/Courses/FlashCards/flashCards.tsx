import { FaBoltLightning } from "react-icons/fa6";
import ParaGraph from "../../../components/Paragraph";
import { STRINGS } from "../../../utilities/constants";
import { FlashCardsData } from "./flashCardsData";
import { CustomCard } from "../../../components/Card";
import CustomImage, { AllImages } from "../../../components/Image";
import CustomButton from "../../../components/Button";

interface FlashcardsProps {}

const Flashcards: FunctionComponent<FlashcardsProps> = ({}) => {
  const flashCards = FlashCardsData;
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph
        className={`${STRINGS.CLASSES.heading} flex gap-4 items-center`}>
        <FaBoltLightning />
        Flash Cards categories
      </ParaGraph>
      <ParaGraph>All Flashcards</ParaGraph>
      <div className="flex flex-row gap-4 flex-wrap">
        {flashCards.categories.map((category, index) => {
          return (
            <CustomCard
              key={index}
              as={CustomButton}
              className={`w-[47%] flex flex-row justify-between items-start gap-4`}>
              <div className="flex flex-col gap-4 items-start">
                <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
                  {category.heading}
                </ParaGraph>
                <ParaGraph>{category.completedCards}</ParaGraph>
              </div>
              <div className="">
                <CustomImage src={AllImages.book} className={"w-[35px]"} />
              </div>
            </CustomCard>
          );
        })}
      </div>
    </div>
  );
};

export default Flashcards;
