import { useEffect, useState } from "react";
import { IconHeader } from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { SlideIDs } from "../../utilities/constants";

import RenderMeaningFromDicAPI from "./dictionaryDevAPIRender";
import { DictionarySampleData, SampleAIDictionaryData } from "./sampleData";
import { WordHeader } from "./wordHeader";
import DictionaryAIRender from "./dictionaryAIRender";

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
      <CustomTabs
        // size="sm"
        ariaLabel="Tabs example"
        tabs={[
          {
            title: "Meaning",
            content: <RenderMeaningFromDicAPI data={data} />,
          },
          { title: "Web results" },
          {
            title: "GemAI",
            content: <DictionaryAIRender data={SampleAIDictionaryData} />,
          },
        ]}
      />
    </div>
  );
};
