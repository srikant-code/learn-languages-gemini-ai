import { useEffect, useState } from "react";
import ParaGraph, { IconHeader } from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { SlideIDs, STRINGS } from "../../utilities/constants";

import RenderMeaningFromDicAPI from "./dictionaryDevAPIRender";
import { DictionarySampleData, SampleAIDictionaryData } from "./sampleData";
import { WordHeader } from "./wordHeader";
import DictionaryAIRender from "./dictionaryAIRender";
import CustomInput from "../../components/Input";
import { FaSearch } from "react-icons/fa";
import CustomButton from "../../components/Button";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Spacer, Spinner } from "@nextui-org/react";
import CustomImage, { AllImages } from "../../components/Image";
import { setSetting } from "../../store/reducer";
import { GeminiPrompt } from "../../geminiAI/genAI";

interface DictionaryProps {}

const Dictionary: FunctionComponent<DictionaryProps> = () => {
  return (
    <div>
      <div className="p-0">
        <DictionaryRender
          className={"light:border-slate-100 dark:border-primary-300 border-2"}
        />
      </div>
    </div>
  );
};

export default Dictionary;

export const DICTIONARY_TABS = {
  API: "Dictionary API results",
  AI: STRINGS.APP_NAME,
  id: "Dictionary",
};

const DictionarySearchBar = ({
  setInput,
  input,
  handleSubmit,
  isLoading,
  ...inputProps
}) => {
  return (
    <CustomInput
      placeholder="Search for any word..."
      value={input}
      className="w-full"
      startContent={
        <FaSearch className="mx-2 light:text-black dark:text-white " />
      }
      onChange={(e) => {
        setInput(e);
      }}
      dontClearOnEnter
      onKeyDown={handleSubmit}
      endContent={
        <CustomButton
          auto
          disabled={!input}
          isIconOnly
          onClick={handleSubmit}
          loading={isLoading}>
          <FaSearch />
        </CustomButton>
      }
      {...inputProps}></CustomInput>
  );
};

export const DictionaryRender = ({ className }) => {
  const [openedData, setOpenedData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState([]);
  const userProfile = useSelector((state) => state.language.profile) ?? {};
  const settings = useSelector((state) => state.language) ?? {};
  const dictionarySearchBar =
    useSelector(
      (state) => state.language[STRINGS.STORAGE.DICTIONARY_SEARCH_BAR]
    ) ?? "";
  const dictionaryAllData =
    useSelector((state) => state.language[STRINGS.STORAGE.DICTIONARY_API]) ??
    "";
  const dictionaryAIAllData =
    useSelector((state) => state.language[STRINGS.STORAGE.DICTIONARY_AI]) ?? "";

  const dispatch = useDispatch();

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

  const fetchDefinition = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      if (!dictionaryAllData[dictionarySearchBar]) {
        try {
          const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${dictionarySearchBar}`
          );
          console.log(response, response?.data);
          const data = combineAndSort(response?.data);
          if (data?.word)
            dispatch(
              setSetting({
                key: STRINGS.STORAGE.DICTIONARY_API,
                value: {
                  ...(settings[STRINGS.STORAGE.DICTIONARY_API]
                    ? settings[STRINGS.STORAGE.DICTIONARY_API]
                    : {}),
                  [data.word]: data,
                },
              })
            );
          setOpenedData(data);
          setIsLoading(false);
        } catch (error) {
          setError(error?.response);
          setIsLoading(false);
          console.error("Failed to fetch word definition:", error);
        }
      } else {
        setOpenedData(dictionaryAllData[dictionarySearchBar]);
        setIsLoading(false);
      }
    }
  };

  const fetchFromAI = async () => {
    setIsLoading(true);
    const word = dictionarySearchBar;
    const prompt = `CONTEXT: 
This prompt is used to show an AI based dictionary to the user. It is used inside a language learning website. 
The user has selected the below languages to learn
${JSON.stringify(settings[STRINGS.STORAGE.languagesUserWantsToKnow])}

The user already knows the below languages
${JSON.stringify(settings[STRINGS.STORAGE.languagesUserKnows])}

Output should contain array of responses of each of the languages, the user knows
and the ones which user wants to learn.

The user wants to find the dictionary details of the word 
${dictionarySearchBar}

partOfSpeech can be below in the JSON response
["noun","verb","adjective","adverb","pronoun","preposition","conjunction","interjection","article","determiner"]

wordForms can be below in the JSON response
["baseForm","pastTense","pastParticiple","presentParticiple","thirdPersonSingular","plural","comparative","superlative","gerund","infinitive",]


EXAMPLE OUTPUT FORMAT RESPONSE STRUCTURE - but response should be for the word ${dictionarySearchBar}
[
  {
    language: { code: "en", name: "English" },
    response: {
      word: "battle",
      baseAlphabetsPresentWithoutDiacritics: ["B", "A", "T", "T", "L", "E"],
      followUpSuggestedChatActions: [
        "Create a story using 'Battle'",
        "Create a poem about 'Battle'",
        // more follow up relevant actions 
      ],
      phonetics: ["/ˈbætəl/"],
      usages: {
        sentences: {
          beginning: [
            "Battle lines were drawn as the two armies prepared for war.",
            "Battle scars tell the story of a soldier's bravery.",
          ],
          middle: [
            "The hero fought bravely in the battle, never losing hope.",
            "She faced a tough battle against her illness.",
          ],
          end: [
            "They emerged victorious from the fierce battle.",
            "The battle raged on for hours.",
          ],
        },
        word: {
          beginning: ["Battleground", "Battlefield"],
          middle: ["Embattled", "Rebattle"],
          end: ["Gunfire", "Wildfire"], // fill details here
        },
      },
      etymology: "", // fill details here
      idiomsAndPhrases: [""], // fill details here
      collocations: [""], // fill details here
      wordForms: {
        // fill details here
        baseForm: "battle",
        pastTense: "battled",
        pastParticiple: "battling",
        presentParticiple: "battling",
        thirdPersonSingular: "battles",
        plural: "",
        comparative: "",
        superlative: "",
        gerund: "",
        infinitive: "",
      },
      thesaurus: {
        synonyms: [""], // fill details here
        antonyms: [""], // fill details here
      },
      frequency: "common",
      usageNotes: "Often used to illustrate a fight.",
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition: "A contest, a struggle.",
              example: "the battle of life",
            },
            {
              definition:
                "A general action, fight, or encounter, in which all the divisions of an army are or may be engaged; a combat, an engagement.",
              example: "example here",
            },
            {
              definition: "A division of an army; a battalion.",
              example: "example here",
            },
            {
              definition:
                "The main body of an army, as distinct from the vanguard and rear; the battalia.",
              example: "example here",
            },
          ],
          thesaurus: { synonyms: [], antonyms: [] },
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "To join in battle; to contend in fight",
              example: "Scientists always battle over theories.",
            },
            {
              definition: "To fight or struggle; to enter into a battle with.",
              example: "She has been battling cancer for years.",
            },
            {
              definition: "To nourish; feed.",
              example: "example here",
            },
            {
              definition: "To render (for example soil) fertile or fruitful",
              example: "example here",
            },
          ],
          thesaurus: { synonyms: [], antonyms: [] },
        },
        {
          partOfSpeech: "adjective",
          definitions: [
            {
              definition: "Improving; nutritious; fattening.",
              example: "battle grass, battle pasture",
            },
            {
              definition: "Fertile; fruitful.",
              example: "battle soil, battle land",
            },
          ],
          thesaurus: { synonyms: [], antonyms: [] },
        },
        // more parts of speech from the given list (if available)
      ],
    },
  },
  // objects for other languages
];`;

    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      if (!dictionaryAIAllData[dictionarySearchBar]) {
        try {
          const { result } = await GeminiPrompt({
            msg: prompt,
            json: true,
          });
          setAIResponse(result);
          console.log({ result });
          dispatch(
            setSetting({
              key: STRINGS.STORAGE.DICTIONARY_AI,
              value: {
                ...(settings[STRINGS.STORAGE.DICTIONARY_AI]
                  ? settings[STRINGS.STORAGE.DICTIONARY_AI]
                  : {}),
                [word]: result,
              },
            })
          );
          setIsLoading(false);
          // handleResponseFromGemini(await response);
        } catch (error) {
          setError(error?.response);
          setIsLoading(false);
          console.error("Failed to fetch word definition:", error);
        }
      } else {
        setAIResponse(dictionaryAIAllData[dictionarySearchBar]);
        setIsLoading(false);
      }
    }
  };

  // const resFromAI =
  //   '```json\n[\n  {\n    "language": {\n      "code": "en",\n      "name": "English"\n    },\n    "response": {\n      "word": ${dictionarySearchBar},\n      "baseAlphabetsPresentWithoutDiacritics": [\n        "F",\n        "I",\n        "R",\n        "E"\n      ],\n      "followUpSuggestedChatActions": [\n        "Create a story using \'Fire\'",\n        "Create a poem about \'Fire\'",\n        "Create a short conversation using \'Fire\'",\n        "Explain the significance of \'Fire\' in the story of Prometheus",\n        "Describe what happens when we see \'Fire\' in a dream"\n      ],\n      "phonetics": [\n        "/ˈfaɪər/"\n      ],\n      "usages": {\n        "sentences": {\n          "beginning": [\n            "Fire roared in the fireplace, casting a warm glow on the room.",\n            "Firefighters rushed to the scene of the blaze, battling the flames."\n          ],\n          "middle": [\n            "The campers gathered around the campfire, sharing stories and laughter.",\n            "The forest fire raged uncontrollably, threatening to consume everything in its path."\n          ],\n          "end": [\n            "The fire crackled and popped, its warmth a welcome respite from the cold.",\n            "The building was engulfed in flames, the fire spreading rapidly."\n          ]\n        },\n        "word": {\n          "beginning": [\n            "Firearm",\n            "Firebrand",\n            "Firefighter",\n            "Fireplace",\n            "Firewood"\n          ],\n          "middle": [\n            "Backfire",\n            "Crossfire",\n            "Firefly",\n            "Skyfire"\n          ],\n          "end": [\n            "Wildfire",\n            "Gunfire",\n            "Bonfire"\n          ]\n        }\n      },\n      "etymology": "Old English *fȳr, of Germanic origin; related to Dutch vuur and German Feuer.",\n      "idiomsAndPhrases": [\n        "play with fire",\n        "set something on fire",\n        "add fuel to the fire",\n        "under fire",\n        "fire up"\n      ],\n      "collocations": [\n        "fire alarm",\n        "fire escape",\n        "fire engine",\n        "fire hazard",\n        "fire prevention",\n        "fire safety"\n      ],\n      "wordForms": {\n        "baseForm": ${dictionarySearchBar},\n        "pastTense": "",\n        "pastParticiple": "",\n        "presentParticiple": "",\n        "thirdPersonSingular": "",\n        "plural": "",\n        "comparative": "",\n        "superlative": "",\n        "gerund": "",\n        "infinitive": ""\n      },\n      "thesaurus": {\n        "synonyms": [\n          "blaze",\n          "flame",\n          "conflagration",\n          "inferno",\n          "combustion"\n        ],\n        "antonyms": [\n          "water",\n          "ice",\n          "snow",\n          "rain"\n        ]\n      },\n      "frequency": "common",\n      "usageNotes": "Fire can be both destructive and beneficial, depending on the context.",\n      "meanings": [\n        {\n          "partOfSpeech": "noun",\n          "definitions": [\n            {\n              "definition": "The light and heat produced by something burning.",\n              "example": "The fire in the fireplace kept us warm."\n            },\n            {\n              "definition": "A burning or glowing mass of material, especially one that is hot enough to emit light and heat.",\n              "example": "The forest fire raged for days."\n            },\n            {\n              "definition": "The process of burning, or something that is burning.",\n              "example": "The fire is out of control."\n            },\n            {\n              "definition": "A state of great excitement or emotion.",\n              "example": "He spoke with fire in his belly, passionate about his cause."\n            },\n            {\n              "definition": "An act of shooting or firing a gun.",\n              "example": "The officer opened fire on the suspect."\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "blaze",\n              "flame",\n              "conflagration",\n              "inferno",\n              "combustion",\n              "burning",\n              "ignition"\n            ],\n            "antonyms": [\n              "water",\n              "ice",\n              "snow",\n              "rain",\n              "extinction",\n              "quenching"\n            ]\n          }\n        },\n        {\n          "partOfSpeech": "verb",\n          "definitions": [\n            {\n              "definition": "To ignite and burn.",\n              "example": "The candles were fired, filling the room with light."\n            },\n            {\n              "definition": "To shoot a gun or other projectile weapon.",\n              "example": "He fired a shot into the air."\n            },\n            {\n              "definition": "To dismiss someone from their job.",\n              "example": "She was fired from her job for poor performance."\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "ignite",\n              "burn",\n              "shoot",\n              "dismiss",\n              "discharge"\n            ],\n            "antonyms": [\n              "extinguish",\n              "quench",\n              "hire",\n              "employ"\n            ]\n          }\n        }\n      ]\n    }\n  },\n  {\n    "language": {\n      "code": "es",\n      "name": "Spanish"\n    },\n    "response": {\n      "word": "fuego",\n      "baseAlphabetsPresentWithoutDiacritics": [\n        "F",\n        "U",\n        "E",\n        "G",\n        "O"\n      ],\n      "followUpSuggestedChatActions": [\n        "Create a story using \'Fuego\'",\n        "Create a poem about \'Fuego\'",\n        "Create a short conversation using \'Fuego\'",\n        "Explain the importance of \'Fuego\' in ancient cultures",\n        "Describe what happens when we see \'Fuego\' in a dream"\n      ],\n      "phonetics": [\n        "/ˈfweɣo/"\n      ],\n      "usages": {\n        "sentences": {\n          "beginning": [\n            "El fuego crepitaba en la chimenea, arrojando un cálido resplandor sobre la habitación.",\n            "Los bomberos corrieron al lugar del incendio, luchando contra las llamas."\n          ],\n          "middle": [\n            "Los campistas se reunieron alrededor de la fogata, compartiendo historias y risas.",\n            "El incendio forestal ardía incontrolablemente, amenazando con consumir todo a su paso."\n          ],\n          "end": [\n            "El fuego chispeaba y crujía, su calor era un alivio bienvenido del frío.",\n            "El edificio fue envuelto en llamas, el fuego se propagó rápidamente."\n          ]\n        },\n        "word": {\n          "beginning": [\n            "Fuego",\n            "Fuegos artificiales",\n            "Fogata",\n            "Fuego fatuo"\n          ],\n          "middle": [\n            "Incendio",\n          ],\n          "end": [\n            "Incendio"\n          ]\n        }\n      },\n      "etymology": "Del latín *fūgus.",\n      "idiomsAndPhrases": [\n        "jugar con fuego",\n        "prender fuego a algo",\n        "echar leña al fuego",\n        "bajo fuego",\n        "encender el fuego"\n      ],\n      "collocations": [\n        "alarma de incendios",\n        "salida de incendios",\n        "camión de bomberos",\n        "peligro de incendio",\n        "prevención de incendios",\n        "seguridad contra incendios"\n      ],\n      "wordForms": {\n        "baseForm": "fuego",\n        "pastTense": "",\n        "pastParticiple": "",\n        "presentParticiple": "",\n        "thirdPersonSingular": "",\n        "plural": "fuegos",\n        "comparative": "",\n        "superlative": "",\n        "gerund": "",\n        "infinitive": ""\n      },\n      "thesaurus": {\n        "synonyms": [\n          "llama",\n          "incendio",\n          "conflagración",\n          "infierno",\n          "combustión"\n        ],\n        "antonyms": [\n          "agua",\n          "hielo",\n          "nieve",\n          "lluvia"\n        ]\n      },\n      "frequency": "common",\n      "usageNotes": "El fuego puede ser tanto destructivo como beneficioso, dependiendo del contexto.",\n      "meanings": [\n        {\n          "partOfSpeech": "noun",\n          "definitions": [\n            {\n              "definition": "La luz y el calor producidos por algo que se quema.",\n              "example": "El fuego en la chimenea nos mantuvo calientes."\n            },\n            {\n              "definition": "Una masa de material que arde o brilla, especialmente una que está lo suficientemente caliente como para emitir luz y calor.",\n              "example": "El incendio forestal ardió durante días."\n            },\n            {\n              "definition": "El proceso de quemar, o algo que se está quemando.",\n              "example": "El fuego está fuera de control."\n            },\n            {\n              "definition": "Un estado de gran excitación o emoción.",\n              "example": "Habló con fuego en el vientre, apasionado por su causa."\n            },\n            {\n              "definition": "Un acto de disparar un arma de fuego u otra arma proyectil.",\n              "example": "El oficial abrió fuego contra el sospechoso."\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "llama",\n              "incendio",\n              "conflagración",\n              "infierno",\n              "combustión",\n              "arder",\n              "ignición"\n            ],\n            "antonyms": [\n              "agua",\n              "hielo",\n              "nieve",\n              "lluvia",\n              "extinción",\n              "apagar"\n            ]\n          }\n        },\n        {\n          "partOfSpeech": "verb",\n          "definitions": [\n            {\n              "definition": "Encender y quemar.",\n              "example": "Las velas fueron encendidas, llenando la habitación de luz."\n            },\n            {\n              "definition": "Disparar un arma de fuego u otra arma proyectil.",\n              "example": "Disparó un tiro al aire."\n            },\n            {\n              "definition": "Despedir a alguien de su trabajo.",\n              "example": "Fue despedido de su trabajo por bajo rendimiento."\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "encender",\n              "quemar",\n              "disparar",\n              "despedir",\n              "descartar"\n            ],\n            "antonyms": [\n              "extinguir",\n              "apagar",\n              "contratar",\n              "emplear"\n            ]\n          }\n        }\n      ]\n    }\n  },\n  {\n    "language": {\n      "code": "hi",\n      "name": "Hindi"\n    },\n    "response": {\n      "word": "आग",\n      "baseAlphabetsPresentWithoutDiacritics": [\n        "आ",\n        "ग"\n      ],\n      "followUpSuggestedChatActions": [\n        "Create a story using \'आग\'",\n        "Create a poem about \'आग\'",\n        "Create a short conversation using \'आग\'",\n        "Explain the significance of \'आग\' in Hindu mythology",\n        "Describe what happens when we see \'आग\' in a dream"\n      ],\n      "phonetics": [\n        "/ɑːɡ/"\n      ],\n      "usages": {\n        "sentences": {\n          "beginning": [\n            "चूल्हे में आग जल रही थी, जिससे कमरे में गर्माहट फैल रही थी।",\n            "अग्निशामक दल आग लगने की घटनास्थल पर पहुँचे, लपटों से लड़ रहे थे।"\n          ],\n          "middle": [\n            "कैम्पर्स ने अलाव के चारों ओर इकट्ठा होकर कहानियाँ सुनाईं और हँसी।",\n            "जंगल की आग बेकाबू होकर फैल रही थी, जिससे हर चीज जलने का खतरा था।"\n          ],\n          "end": [\n            "आग चटक-चटकी, इसकी गर्माहट ठंड से राहत दिला रही थी।",\n            "इमारत आग की लपटों में घिर गई, आग तेजी से फैल रही थी।"\n          ]\n        },\n        "word": {\n          "beginning": [\n            "आग लगाना",\n            "आग से बचाव"\n          ],\n          "middle": [\n            "आग की लपटें"\n          ],\n          "end": [\n            "अग्नि"\n          ]\n        }\n      },\n      "etymology": "संस्कृत भाषा से *अग्नि से लिया गया है।",\n      "idiomsAndPhrases": [\n        "आग में घी डालना",\n        "आग से खेलना",\n        "आग लगाना",\n        "आग में झोंकना",\n        "आग बुझाना"\n      ],\n      "collocations": [\n        "आग का अलार्म",\n        "आग की सीढ़ी",\n        "आग बुझाने वाला",\n        "आग का खतरा",\n        "आग से बचाव",\n        "आग की सुरक्षा"\n      ],\n      "wordForms": {\n        "baseForm": "आग",\n        "pastTense": "",\n        "pastParticiple": "",\n        "presentParticiple": "",\n        "thirdPersonSingular": "",\n        "plural": "",\n        "comparative": "",\n        "superlative": "",\n        "gerund": "",\n        "infinitive": ""\n      },\n      "thesaurus": {\n        "synonyms": [\n          "ज्वाला",\n          "अग्नि",\n          "ज्वालामुखी",\n          "अग्निपथ"\n        ],\n        "antonyms": [\n          "पानी",\n          "बर्फ",\n          "बर्फानी",\n          "बारिश"\n        ]\n      },\n      "frequency": "common",\n      "usageNotes": "आग नुकसानदेह और फायदेमंद दोनों हो सकती है, यह संदर्भ पर निर्भर करता है।",\n      "meanings": [\n        {\n          "partOfSpeech": "noun",\n          "definitions": [\n            {\n              "definition": "जलने से उत्पन्न प्रकाश और गर्मी।",\n              "example": "चूल्हे में आग जल रही थी, जिससे कमरे में गर्माहट फैल रही थी।"\n            },\n            {\n              "definition": "जलने वाला या चमकने वाला पदार्थ, खासकर जो इतना गर्म हो कि प्रकाश और गर्मी निकलती हो।",\n              "example": "जंगल की आग कई दिनों तक जलती रही।"\n            },\n            {\n              "definition": "जलने की प्रक्रिया, या जो जल रहा है।",\n              "example": "आग बेकाबू हो गई है।"\n            },\n            {\n              "definition": "बड़े उत्साह या भावना की स्थिति।",\n              "example": "वह अपने कारण के लिए उत्साही होकर, अपने पेट में आग लेकर बोलता था।"\n            },\n            {\n              "definition": "बंदूक या अन्य प्रक्षेप्य हथियार से गोली चलाने का कार्य।",\n              "example": "अधिकारी ने संदिग्ध पर गोली चला दी।"\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "ज्वाला",\n              "अग्नि",\n              "ज्वालामुखी",\n              "अग्निपथ",\n              "जलना",\n              "प्रज्वलन"\n            ],\n            "antonyms": [\n              "पानी",\n              "बर्फ",\n              "बर्फानी",\n              "बारिश",\n              "विलुप्त",\n              "बुझाना"\n            ]\n          }\n        },\n        {\n          "partOfSpeech": "verb",\n          "definitions": [\n            {\n              "definition": "प्रज्वलित करना और जलाना।",\n              "example": "मोमबत्तियाँ जलाई गईं, जिससे कमरा रोशनी से भर गया।"\n            },\n            {\n              "definition": "बंदूक या अन्य प्रक्षेप्य हथियार से गोली चलाना।",\n              "example": "उसने हवा में गोली चला दी।"\n            },\n            {\n              "definition": "किसी को नौकरी से निकालना।",\n              "example": "उसे खराब प्रदर्शन के कारण नौकरी से निकाल दिया गया।"\n            }\n          ],\n          "thesaurus": {\n            "synonyms": [\n              "प्रज्वलित करना",\n              "जलाना",\n              "गोली मारना",\n              "निकालना",\n              "छुट्टी देना"\n            ],\n            "antonyms": [\n              "बुझाना",\n              "नियंत्रित करना",\n              "नियुक्त करना",\n              "रोजगार देना"\n            ]\n          }\n        }\n      ]\n    }\n  }\n]\n\n```';

  // let resFromAIParsed = JSON.parse(
  //   resFromAI.replaceAll("```json", "").replaceAll("```", "")
  // );

  // // Preserve newlines, etc. - use valid JSON
  // resFromAIParsed = resFromAIParsed
  //   .replace(/\\n/g, "\\n")
  //   .replace(/\\'/g, "\\'")
  //   .replace(/\\"/g, '\\"')
  //   .replace(/\\&/g, "\\&")
  //   .replace(/\\r/g, "\\r")
  //   .replace(/\\t/g, "\\t")
  //   .replace(/\\b/g, "\\b")
  //   .replace(/\\f/g, "\\f");
  // // Remove non-printable and other non-valid JSON characters
  // resFromAIParsed = resFromAIParsed.replace(/[\u0000-\u001F]+/g, "");
  // resFromAIParsed = JSON.parse(resFromAIParsed);

  console.log(dictionaryAllData, error, openedData);

  useEffect(() => {
    if (settings?.[STRINGS.STORAGE.DICTIONARY_API]?.[dictionarySearchBar])
      setOpenedData(
        settings?.[STRINGS.STORAGE.DICTIONARY_API]?.[dictionarySearchBar]
      );
    if (settings?.[STRINGS.STORAGE.DICTIONARY_AI]?.[dictionarySearchBar])
      setAIResponse(
        settings?.[STRINGS.STORAGE.DICTIONARY_AI]?.[dictionarySearchBar]
      );
  }, [dictionarySearchBar]);

  return (
    <div className={`flex flex-col gap-4 px-4 py-8 rounded-3xl ${className}`}>
      <DictionarySearchBar
        setInput={(v) =>
          dispatch(
            setSetting({ key: STRINGS.STORAGE.DICTIONARY_SEARCH_BAR, value: v })
          )
        }
        input={dictionarySearchBar}
        handleSubmit={() => {
          fetchDefinition();
          fetchFromAI();
        }}
        isLoading={isLoading}
      />
      <CustomTabs
        fullWidth
        ariaLabel="Tabs example"
        id={STRINGS.STORAGE.TABS.dictionary}
        tabs={[
          {
            title: DICTIONARY_TABS.API,
            content: isLoading ? (
              <div className="flex w-full items-center justify-center py-20">
                <Spinner label="Fetching data from Dictionary API (Open source)" />
              </div>
            ) : error ? (
              <div className="flex flex-col gap-4">
                <ParaGraph>
                  {`Hey ${
                    userProfile?.displayName?.split(" ")[0]
                  }, we could not find the meaning of "${dictionarySearchBar}" using`}
                  <Link href="https://dictionaryapi.dev">
                    Dictionary API :(
                  </Link>
                </ParaGraph>
                <AppTryAIButton />
              </div>
            ) : openedData?.word ? (
              <RenderMeaningFromDicAPI data={openedData} />
            ) : (
              <NoSelectedWord />
            ),
          },
          {
            title: DICTIONARY_TABS.AI,
            content: isLoading ? (
              <div className="">
                <Spacer y={6} />
                <ParaGraph className={STRINGS.CLASSES.heading}>
                  Good things does take time... Your patience will be
                  appreciated :)
                </ParaGraph>
                <div className="flex w-full items-center justify-center gap-5 py-6">
                  <Spinner size="lg" />
                  <ParaGraph className={STRINGS.CLASSES.subHeading}>
                    Generating meaning for you in all languages you wish to
                    learn so that you can understand it better.
                  </ParaGraph>
                </div>
              </div>
            ) : aiResponse?.length ? (
              <CustomTabs
                // size="sm"
                fullWidth
                ariaLabel="Tabs example"
                id={"GeminiDictionaryLanguage"}
                tabs={aiResponse?.map((dictionary) => {
                  return {
                    title: dictionary?.language?.name,
                    content: <DictionaryAIRender data={dictionary} />,
                  };
                })}
              />
            ) : (
              <div>
                <NoSelectedWord dontShowNormal />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

const AppTryAIButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center gap-1 ">
      <CustomButton
        variant="solid"
        color="primary"
        className="w-full"
        onClick={onClick}>
        <ParaGraph>Switch to {STRINGS.APP_NAME} instead.</ParaGraph>
      </CustomButton>
      <ParaGraph className="text-sm">Internally uses Gemini API</ParaGraph>
    </div>
  );
};

export const CustomUnOrderedList = ({
  items = [
    "Get complete information of any word",
    "Get word details in literally any language.",
    `Directly ask your questions to the ${STRINGS.APP_NAME} dictionary and get detailed answers.`,
  ],
  showIndex = true,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => {
        return (
          <li key={index} className="flex gap-4">
            {showIndex && (
              <ParaGraph className="text-lg font-bold">{index + 1}</ParaGraph>
            )}
            <ParaGraph>{item}</ParaGraph>
          </li>
        );
      })}
    </ul>
  );
};

const NoSelectedWord = ({ dontShowNormal }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 items-center">
        <CustomImage src={AllImages.book} className={"w-[50%]"} />
        <ParaGraph>Search for any word to find its meaning.</ParaGraph>
      </div>
      <Spacer y={6} />
      {!dontShowNormal && (
        <>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <ParaGraph className={`text-xl font-semibold`}>
                See the Dictionary API results (Open source)
              </ParaGraph>
              <CustomUnOrderedList
                items={[
                  "Many words meaning are not present",
                  "No language support other than English.",
                  `It cannot do the things ${STRINGS.APP_NAME} Dictionary can do 💪`,
                ]}
              />
            </div>
          </div>
          <Spacer y={2} />
          <ParaGraph>So</ParaGraph>
          <Spacer y={2} />
        </>
      )}

      <div className="flex flex-col gap-4">
        <ParaGraph className={`text-xl font-semibold`}>
          Use {STRINGS.APP_NAME}
        </ParaGraph>
        <CustomUnOrderedList />
        <Spacer y={4} />
        {!dontShowNormal && <AppTryAIButton />}
      </div>
    </div>
  );
};
