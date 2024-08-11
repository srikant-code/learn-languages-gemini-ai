import { FaBookmark } from "react-icons/fa";
import { AudioPlayer } from "../../components/Audio";
import CustomButton from "../../components/Button";
import ParaGraph from "../../components/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../store/reducer";
import { STRINGS } from "../../utilities/constants";
export const WordHeader = ({
  data = { word: "A", phonetic: "/'a", audio: undefined },
  smallButtons = false,
  showWord = true,
}) => {
  const dispatch = useDispatch();
  const myVocabulary =
    useSelector((state) => state.language[STRINGS.STORAGE.MY_VOCABULARY]) ?? {};

  const setMyVocabulary = (vData) => {
    if (myVocabulary[data?.word]) {
      const { [data?.word]: word, ...other } = myVocabulary;
      dispatch(
        setSetting({
          key: STRINGS.STORAGE.MY_VOCABULARY,
          value: other,
        })
      );
    } else
      dispatch(
        setSetting({
          key: STRINGS.STORAGE.MY_VOCABULARY,
          value: {
            ...myVocabulary,
            [vData.word?.toLowerCase()]: {
              ...vData.data,
              savedOn: new Date().toISOString(),
            },
          },
        })
      );
  };

  const isAlreadyPresentInVocab = myVocabulary[data?.word?.toLowerCase()];

  return (
    <div
      className={`flex ${
        !showWord ? "" : "justify-between"
      } items-center w-full`}>
      <div className="flex flex-col">
        {showWord && (
          <ParaGraph
            className={`${
              !smallButtons ? "text-2xl" : "text-lg"
            } font-bold first-letter:uppercase pr-4 text-ellipsis truncate max-w-[60vw]`}>
            {data?.word}
          </ParaGraph>
        )}
        {data?.phonetic && (
          <ParaGraph className="text-sm text-gray-500">
            {data?.phonetic}
          </ParaGraph>
        )}
      </div>
      <div className="flex gap-3">
        {data?.word && (
          <CustomButton
            isIconOnly
            children={<FaBookmark />}
            variant={
              smallButtons || isAlreadyPresentInVocab ? "flat" : "bordered"
            }
            size={smallButtons ? "sm" : undefined}
            color={isAlreadyPresentInVocab ? `success` : "default"}
            onClick={() => {
              setMyVocabulary({ word: data?.word, data });
            }}
          />
        )}
        <AudioPlayer
          text={data?.audio ? undefined : data?.phonetic ?? data?.word}
          src={data?.audio}
          buttonProps={
            smallButtons
              ? {
                  variant: "flat",
                  size: "sm",
                }
              : {}
          }
        />
      </div>
    </div>
  );
};

export const WordButton = ({
  data = { word: "A", phonetic: "/'a", audio: undefined },
  smallButtons = false,
}) => {
  return (
    <div
      className={`flex flex-1 justify-between border dark:border-slate-600 rounded-2xl py-2 px-4 ${
        smallButtons ? "p-1" : ""
      }`}>
      <WordHeader data={data} smallButtons={smallButtons} />
    </div>
  );
};
export const WordButtons = ({
  data = ["A", "B", "C", "D", "E", "F"],
  smallButtons = true,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {data?.map((word, ind) => {
        return (
          <WordButton key={ind} data={{ word }} smallButtons={smallButtons} />
        );
      })}
    </div>
  );
};
