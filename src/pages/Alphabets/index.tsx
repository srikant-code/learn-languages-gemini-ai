import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Spacer } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { STRINGS } from "../../utilities/constants";
import { WordButtons, WordHeader } from "../Dictionary/wordHeader";

interface AlphabetsProps {}

const Alphabets: FunctionComponent<AlphabetsProps> = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const alphabetsObject = {};
  Object.keys(alphabets).forEach((alph) => {
    alphabetsObject[alph] = {
      ...alphabets[alph],
      ...details,
    };
  });
  console.log({ alphabetsObject });
  const subHeading = STRINGS.CLASSES.subHeading;
  const subText = STRINGS.CLASSES.subText;
  const selectedLetterObj = alphabetsObject[selectedLetter];
  const selectedLetterDetail = selectedLetterObj?.details;
  const [parent] = useAutoAnimate();

  return (
    <div>
      {/* <CustomAutocomplete></CustomAutocomplete> */}
      <div>
        <ParaGraph className="text-xl font-bold ml-4">
          English Alphabets
        </ParaGraph>
        <div className="flex flex-row" ref={parent}>
          <div className="flex flex-wrap gap-4 p-4">
            {Object.keys(alphabetsObject).map((letter) => (
              <div key={letter}>
                <CustomButton
                  className={`w-32 h-32 ${
                    letter === selectedLetter
                      ? `border-primary-500 border-3`
                      : ""
                  }`}
                  onClick={() => setSelectedLetter(letter)}>
                  <div className={`flex flex-row gap-2 justify-end items-end `}>
                    <ParaGraph
                      className={`text-6xl font-bold ${
                        letter === selectedLetter ? `text-primary-500` : ""
                      }`}>
                      {alphabetsObject[letter].uppercase}
                    </ParaGraph>
                    {/* <ParaGraph className="text-5xl font-bold">
                      {alphabetsObject[letter].lowercase}
                    </ParaGraph> */}
                  </div>
                </CustomButton>
              </div>
            ))}
          </div>
          {selectedLetter && (
            <CustomCard className="min-w-[50%] p-12" visible>
              <div className="flex gap-4 justify-center items-end">
                <BoundingBox>
                  <ParaGraph
                    style={{ lineHeight: 1 }}
                    className="text-[10rem] font-bold px-5 text-nowrap">
                    <svg
                      height="150"
                      stroke={"hsl(var(--nextui-primary-500))"}
                      stroke-width="2"
                      class="text-line-animation"
                      width="100%">
                      <text
                        x="50%"
                        dominant-baseline="middle"
                        text-anchor="middle"
                        y="47%">
                        {selectedLetterObj.uppercase}
                        {selectedLetterObj.lowercase}
                      </text>
                    </svg>
                  </ParaGraph>
                </BoundingBox>
                {/* <BoundingBox>
                  <ParaGraph className="text-9xl font-bold">
                    {selectedLetterObj.lowercase}
                  </ParaGraph>
                </BoundingBox> */}
              </div>
              <Spacer y={10} />
              <WordHeader
                data={{
                  word: `${selectedLetterObj.uppercase}
                    ${selectedLetterObj.lowercase}`,
                  phonetic: `/'${selectedLetterObj.lowercase}/`,
                }}
              />
              <Spacer y={10} />
              <div className="flex flex-col gap-4">
                <ParaGraph className={subHeading}>Type</ParaGraph>
                <ParaGraph className={subText}>
                  {selectedLetterDetail?.type}
                </ParaGraph>
                {/* <ParaGraph className={subHeading}>Sound</ParaGraph>
                <ParaGraph className={subText}>
                  {selectedLetterDetail?.sound}
                </ParaGraph> */}
                <ParaGraph className={subHeading}>Examples / Usages</ParaGraph>
                <CustomTabs
                  ariaLabel="Examples"
                  tabs={[
                    {
                      title: "Beginning",
                      content: (
                        <WordExamples
                          data={selectedLetterDetail?.examples?.beginning}
                          title="Beginning"
                        />
                      ),
                    },
                    {
                      title: "Middle",
                      content: (
                        <WordExamples
                          data={selectedLetterDetail?.examples?.middle}
                          title="Middle"
                        />
                      ),
                    },
                    {
                      title: "End",
                      content: (
                        <WordExamples
                          data={selectedLetterDetail?.examples?.end}
                          title="End"
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </CustomCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alphabets;

const WordExamples = ({ title = "End", data }) => {
  const subHeading = STRINGS.CLASSES.subHeading;
  const subText = STRINGS.CLASSES.subText;
  return (
    <div className="flex flex-col gap-4">
      <ParaGraph className={subHeading}>{title}</ParaGraph>
      <ParaGraph className={subText}>
        <WordButtons data={data} />
      </ParaGraph>
    </div>
  );
};

const BoundingBox = ({ children }) => {
  const line = "w-full absolute border-1 border-red-300";
  return (
    <div className="relative">
      <span className={`${line} mt-5`} />
      <span className={`${line} mt-12`} />
      <span className={`${line} bottom-[3.8rem]`} />
      <span className={`${line} bottom-[1.8rem]`} />
      <span className="text">{children}</span>
    </div>
  );
};

// Give me details of all english alphabets for a language learning app in json format.
// Okay now if I click on any of the alphabet, then it should give more details on that letter. Give me in JSON format.
const alphabets = {
  A: {
    uppercase: "A",
    lowercase: "a",
  },
  B: {
    uppercase: "B",
    lowercase: "b",
  },
  C: {
    uppercase: "C",
    lowercase: "c",
  },
  D: {
    uppercase: "D",
    lowercase: "d",
  },
  E: {
    uppercase: "E",
    lowercase: "e",
  },
  F: {
    uppercase: "F",
    lowercase: "f",
  },
  G: {
    uppercase: "G",
    lowercase: "g",
  },
  H: {
    uppercase: "H",
    lowercase: "h",
  },
  I: {
    uppercase: "I",
    lowercase: "i",
  },
  J: {
    uppercase: "J",
    lowercase: "j",
  },
  K: {
    uppercase: "K",
    lowercase: "k",
  },
  L: {
    uppercase: "L",
    lowercase: "l",
  },
  M: {
    uppercase: "M",
    lowercase: "m",
  },
  N: {
    uppercase: "N",
    lowercase: "n",
  },
  O: {
    uppercase: "O",
    lowercase: "o",
  },
  P: {
    uppercase: "P",
    lowercase: "p",
  },
  Q: {
    uppercase: "Q",
    lowercase: "q",
  },
  R: {
    uppercase: "R",
    lowercase: "r",
  },
  S: {
    uppercase: "S",
    lowercase: "s",
  },
  T: {
    uppercase: "T",
    lowercase: "t",
  },
  U: {
    uppercase: "U",
    lowercase: "u",
  },
  V: {
    uppercase: "V",
    lowercase: "v",
  },
  W: {
    uppercase: "W",
    lowercase: "w",
  },
  X: {
    uppercase: "X",
    lowercase: "x",
  },
  Y: {
    uppercase: "Y",
    lowercase: "y",
  },
  Z: {
    uppercase: "Z",
    lowercase: "z",
  },
};

const details = {
  details: {
    name: "A",
    type: "vowel",
    sound: "ay",
    examples: {
      beginning: ["apple", "ant", "alligator"],
      middle: ["cake", "lake", "snake"],
      end: ["spa", "sofa", "pea"],
    },
  },
};
