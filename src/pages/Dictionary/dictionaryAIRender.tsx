import RenderAlphabetsAndGamesInDic from "./alphaAndGames";
import Collocations from "./collocations";
import Etymology from "./etymology";
import FollowUpActions from "./followupChatSuggestedActions";
import Idioms from "./idioms";
import Meanings from "./meanings";
import { DictionarySampleData, SampleAIDictionaryData } from "./sampleData";
import Thesaurus from "./thesaurus";
import Usages from "./usages";
import { WordHeader } from "./wordHeader";
const DictionaryAIRender = ({ data }) => {
  const res = data.response;
  return (
    <div className="flex flex-col gap-4">
      <WordHeader data={{ word: res?.word, phonetic: res?.phonetics[0] }} />
      {/* <h1 className="text-2xl font-bold">{res?.word}</h1>
      <p className="text-lg italic">{res?.phonetics[0]}</p> */}
      <Meanings meanings={res?.meanings} />
      <Usages usages={res?.usages} />
      <Idioms idioms={res?.idiomsAndPhrases} />
      <Collocations collocations={res?.collocations} />
      <Thesaurus thesaurus={res?.thesaurus} />
      <Etymology etymology={res?.etymology} />
      <FollowUpActions actions={res?.followUpSuggestedChatActions} />
      {/* <RenderAlphabetsAndGamesInDic data={res} /> */}
    </div>
  );
};

export default DictionaryAIRender;
