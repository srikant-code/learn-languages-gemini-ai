import { CustomCard } from "../../components/Card";
import Flag from "../../components/Flag";
import ParaGraph from "../../components/Paragraph";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { ShuffleArray } from "../../utilities/utilities";

const languages = ShuffleArray(Object.values(GetAllLanguages));

const MarqueeAnimation = ({ className = "" }) => {
  const itemsPerRow = 10; // Adjust this number based on your layout preference
  const rows = Math.ceil(languages.length / itemsPerRow);

  return (
    <div
      className={`flex-1 flex items-center justify-center overflow-hidden ${className}`}>
      <CustomCard className="bg-transparent min-h-screen w-full absolute flex flex-col items-center mix-blend-screen justify-center gap-3 rotate-[-20deg] border-none scale-150">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-row justify-center gap-3 ${
              rowIndex % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"
            }`}>
            {languages
              .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
              .map((language, index) => (
                <CustomCard
                  key={index}
                  style={{ background: "#ffffff23" }}
                  className={`flex flex-row gap-4 py-2 px-7 rounded-full items-center
                    border-none`}>
                  <Flag
                    flag={language.usedIn[0]?.content}
                    className="w-[30px]"
                  />
                  <ParaGraph className="font-bold select-none">
                    {language.greet}
                  </ParaGraph>
                </CustomCard>
              ))}
          </div>
        ))}
        {/* <CustomButton className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-full">
          Start Searching
        </CustomButton> */}
      </CustomCard>
    </div>
  );
};

export default MarqueeAnimation;
