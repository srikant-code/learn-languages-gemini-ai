import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { AudioPlayer } from "../../components/Audio";
import CustomButton from "../../components/Button";
import ParaGraph, { IconHeader } from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { SlideIDs, STRINGS } from "../../utilities/constants";

interface DictionaryProps {}

const Dictionary: FunctionComponent<DictionaryProps> = () => {
  return (
    <div>
      <IconHeader icon={SlideIDs.dictionary.icon}>Dictionary</IconHeader>
      <div className="p-0">
        <DictionaryRender
          className={"light:border-slate-100 dark:border-primary-300 border-2"}
        />
      </div>
    </div>
  );
};

export default Dictionary;

export const DictionaryRender = ({ word, className }) => {
  const [data, setData] = useState(null);

  function combineAndSort(data) {
    const combinedPhonetics = [];
    const combinedMeanings = [];

    data.forEach((item) => {
      item.phonetics.forEach((phonetic) => {
        if (!combinedPhonetics.find((p) => p.text === phonetic.text)) {
          combinedPhonetics.push(phonetic);
        }
      });

      item.meanings.forEach((meaning) => {
        if (
          !combinedMeanings.find((m) => m.partOfSpeech === meaning.partOfSpeech)
        ) {
          combinedMeanings.push(meaning);
        }
      });
    });

    combinedPhonetics.sort((a, b) => a.text.localeCompare(b.text));
    combinedMeanings.sort((a, b) =>
      a.partOfSpeech.localeCompare(b.partOfSpeech)
    );

    return {
      ...data[0],
      phonetics: combinedPhonetics,
      meanings: combinedMeanings,
    };
  }

  useEffect(() => {
    setData(combineAndSort(DictionarySampleData));
  }, [word]);

  return (
    <div className={`flex flex-col gap-4 p-10 rounded-3xl ${className}`}>
      <WordHeader data={data} />
      {/* <div>
      {data?.phonetics.map((phonetic, index) => (
        <div key={index} className="flex flex-row items-center gap-4">
          <ParaGraph>{phonetic.text}</ParaGraph>
          <AudioPlayer
            text={phonetic.audio ? undefined : phonetic.text}
            src={phonetic.audio}></AudioPlayer>
        </div>
      ))}
    </div> */}
      <CustomTabs
        ariaLabel="Tabs example"
        tabs={[
          {
            title: "Meaning",
            content: <RenderMeaningFromDicAPI data={data} />,
          },
          { title: "Web results" },
          { title: "GemAI" },
        ]}
      />
    </div>
  );
};

const RenderMeaningFromDicAPI = ({ data }) => {
  const subHeadingClasses = STRINGS.CLASSES.subHeading;
  return (
    <div>
      <div className="flex flex-col gap-4">
        {data?.meanings.map((meaning, index) => (
          <div key={index} className="flex flex-col gap-4">
            <ParaGraph className={subHeadingClasses}>
              {meaning.partOfSpeech}
            </ParaGraph>
            {meaning.definitions.map((definition, index) => (
              <div key={index} className="flex gap-4">
                <ParaGraph className="ml-3">{index + 1}</ParaGraph>
                <div>
                  <ParaGraph>{definition.definition}</ParaGraph>
                  <ParaGraph className={STRINGS.CLASSES.subText}>
                    {definition.example}
                  </ParaGraph>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <ParaGraph className={subHeadingClasses}>Synonyms</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Antonyms</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Games</ParaGraph>
        <ParaGraph className={subHeadingClasses}>Alphabets</ParaGraph>
        <ParaGraph className={subHeadingClasses}>
          Tools - Translations
        </ParaGraph>
      </div>
    </div>
  );
};

export const WordHeader = ({
  data = { word: "A", phonetic: "/'a", audio: undefined },
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <ParaGraph className="text-2xl font-bold first-letter:uppercase pr-4">
          {data?.word}
        </ParaGraph>
        {data?.phonetic && (
          <ParaGraph className="text-sm text-gray-500">
            {data?.phonetic}
          </ParaGraph>
        )}
      </div>
      <div className="flex gap-3">
        {data?.word?.split(" ")?.length <= 4 && (
          <CustomButton isIconOnly children={<FaBookmark />} />
        )}
        <AudioPlayer
          text={data?.audio ? undefined : data?.phonetic ?? data?.word}
          src={data?.audio}
        />
      </div>
    </div>
  );
};

export const WordButton = ({
  data = { word: "A", phonetic: "/'a", audio: undefined },
}) => {
  return (
    <div className="flex flex-1 justify-between border rounded-2xl py-2 px-4">
      <WordHeader data={data} />
    </div>
  );
};
export const WordButtons = ({ data = ["A", "B", "C", "D", "E", "F"] }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {data?.map((word, ind) => {
        return <WordButton key={ind} data={{ word }} />;
      })}
    </div>
  );
};

const DictionarySampleData =
  // Create a UI for this JSON response in React amd tailwind.
  // Create a JS function to combine the meanings in different object and the phonetics(using key of text) if they are same, if not then add to array, and sort the phonetics by text. Do the same for meanings and sort the meanings by partOfSpeech
  [
    {
      word: "battle",
      phonetic: "/ˈbætəl/",
      phonetics: [
        {
          text: "/ˈbætəl/",
          audio: "",
        },
        {
          text: "/ˈbætl̩/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/battle-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1229238",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition: "A contest, a struggle.",
              synonyms: [],
              antonyms: [],
              example: "the battle of life",
            },
            {
              definition:
                "A general action, fight, or encounter, in which all the divisions of an army are or may be engaged; a combat, an engagement.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "A division of an army; a battalion.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                "The main body of an army, as distinct from the vanguard and rear; the battalia.",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To join in battle; to contend in fight",
              synonyms: [],
              antonyms: [],
              example: "Scientists always battle over theories.",
            },
            {
              definition: "To fight or struggle; to enter into a battle with.",
              synonyms: [],
              antonyms: [],
              example: "She has been battling cancer for years.",
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/battle"],
    },
    {
      word: "battle",
      phonetic: "/ˈbætəl/",
      phonetics: [
        {
          text: "/ˈbætəl/",
          audio: "",
        },
        {
          text: "/ˈbætl̩/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/battle-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1229238",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To nourish; feed.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "To render (for example soil) fertile or fruitful",
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: "adjective",
          definitions: [
            {
              definition: "Improving; nutritious; fattening.",
              synonyms: [],
              antonyms: [],
              example: "battle grass, battle pasture",
            },
            {
              definition: "Fertile; fruitful.",
              synonyms: [],
              antonyms: [],
              example: "battle soil, battle land",
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/battle"],
    },
  ];
