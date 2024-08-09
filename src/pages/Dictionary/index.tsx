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
  const userProfile = useSelector((state) => state.language.profile) ?? {};
  const settings = useSelector((state) => state.language) ?? {};
  const dictionarySearchBar =
    useSelector(
      (state) => state.language[STRINGS.STORAGE.DICTIONARY_SEARCH_BAR]
    ) ?? "";
  const dictionaryAllData =
    useSelector((state) => state.language[STRINGS.STORAGE.DICTIONARY_API]) ??
    "";

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

  console.log(dictionaryAllData, error, openedData);

  return (
    <div className={`flex flex-col gap-4 p-10 rounded-3xl ${className}`}>
      <DictionarySearchBar
        setInput={(v) =>
          dispatch(
            setSetting({ key: STRINGS.STORAGE.DICTIONARY_SEARCH_BAR, value: v })
          )
        }
        input={dictionarySearchBar}
        handleSubmit={fetchDefinition}
        isLoading={isLoading}
      />
      <CustomTabs
        // size="sm"
        fullWidth
        ariaLabel="Tabs example"
        tabs={[
          {
            title: "Dictionary API results",
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
            title: STRINGS.APP_NAME,
            content: <DictionaryAIRender data={SampleAIDictionaryData} />,
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
      <ParaGraph className="text-sm">Powered by Google Gemini AI</ParaGraph>
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

const NoSelectedWord = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 items-center">
        <CustomImage src={AllImages.book} className={"w-[50%]"} />
        <ParaGraph>Search for any word to find its meaning.</ParaGraph>
      </div>
      <Spacer y={6} />
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
      <div className="flex flex-col gap-4">
        <ParaGraph className={`text-xl font-semibold`}>
          Use {STRINGS.APP_NAME}
        </ParaGraph>
        <CustomUnOrderedList />
        <Spacer y={4} />
        <AppTryAIButton />
      </div>
    </div>
  );
};
