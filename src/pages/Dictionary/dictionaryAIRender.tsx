import Collocations from "./collocations";
import Etymology from "./etymology";
import FollowUpActions from "./followupChatSuggestedActions";
import Idioms from "./idioms";
import Meanings from "./meanings";
import { DictionarySampleData, SampleAIDictionaryData } from "./sampleData";
import Thesaurus from "./thesaurus";
import Usages from "./usages";
const DictionaryAIRender = ({ data }) => {
  const res = data.response;
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{res?.word}</h1>
      <p className="text-lg italic">{res?.phonetics[0]}</p>
      <Meanings meanings={res?.meanings} />
      <Usages usages={res?.usages} />
      <Idioms idioms={res?.idiomsAndPhrases} />
      <Collocations collocations={res?.collocations} />
      <Thesaurus thesaurus={res?.thesaurus} />
      <FollowUpActions actions={res?.followUpSuggestedChatActions} />
      <Etymology etymology={res?.etymology} />
    </div>
  );
};

export default DictionaryAIRender;
