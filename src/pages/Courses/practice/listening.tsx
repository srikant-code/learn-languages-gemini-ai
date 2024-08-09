import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STRINGS } from "../../../utilities/constants";
import { WordHeader } from "../../Dictionary/wordHeader";
import ParaGraph from "../../../components/Paragraph";
import { CustomCard } from "../../../components/Card";

const WordTable = ({ data, limit = 10 }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const wordCounts = {};
    Object.values(data).forEach((entry) => {
      entry?.text
        ?.split(" ")
        ?.filter((i) => i)
        ?.forEach((word) => {
          const cleanedWord = word.trim();
          wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
        });
    });

    const wordsArray = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    console.log({ wordsArray, data });
    setWords(wordsArray);
  }, [data, limit]);

  console.log({ words });

  return (
    <Table>
      <TableHeader>
        <TableColumn>Rank</TableColumn>
        <TableColumn>Word you have listened to</TableColumn>
        <TableColumn>Number of times you listened</TableColumn>
      </TableHeader>
      <TableBody>
        {words.map(({ word, count }, index) => (
          <TableRow key={word}>
            <TableCell>#{index + 1}</TableCell>
            <TableCell>
              <WordHeader data={{ word }} smallButtons />
            </TableCell>
            <TableCell>{count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const WordData = ({ data }) => {
  const [wordInfo, setWordInfo] = useState({
    totalWordsListened: 0,
    lastListenedTime: "",
    mostUsedWord: "",
  });

  useEffect(() => {
    const wordCounts = {};
    let totalWordsListened = 0;
    let lastListenedTime = "";
    let mostUsedWord = "";

    Object.entries(data.wordsListened).forEach(([time, entry]) => {
      const words = entry.text.split(" ");
      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
      if (time > lastListenedTime) {
        lastListenedTime = time;
        mostUsedWord = words[words.length - 1];
      }
      totalWordsListened += entry.wordsListened;
    });

    setWordInfo({
      totalWordsListened,
      lastListenedTime,
      mostUsedWord,
    });
  }, [data]);

  return (
    <CustomCard
      className={
        "bg-gradient-to-bl from-sky-300 via-blue-300 bg-purple-300 gap-2"
      }>
      <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
        Your Statistics
      </ParaGraph>
      <div className="flex flex-col gap-2">
        <ParaGraph>
          <strong>Total Words you listened till now:</strong>{" "}
          {Math.floor(wordInfo.totalWordsListened)}
        </ParaGraph>
        <ParaGraph>
          <strong>Coins and XP earned:</strong>{" "}
          {Math.floor(wordInfo.totalWordsListened)}
        </ParaGraph>
        <ParaGraph>
          <strong>Medals:</strong>{" "}
          {Math.floor(wordInfo.totalWordsListened) > 100
            ? "Intermediate"
            : "Novice"}
        </ParaGraph>
        <ParaGraph>
          <strong>Last listened time:</strong>{" "}
          {new Date(wordInfo.lastListenedTime).toLocaleString()}
        </ParaGraph>
        <ParaGraph>
          <strong>Last listened word:</strong>{" "}
          {data.wordsListened[wordInfo.lastListenedTime]?.text?.toProperCase()}
        </ParaGraph>
        <ParaGraph>
          <strong>Most listened word:</strong>{" "}
          {wordInfo.mostUsedWord.toProperCase()}
        </ParaGraph>
      </div>
    </CustomCard>
  );
};

export const Listening = () => {
  const settings = useSelector((state) => state.language) ?? {};
  const data = settings[STRINGS.STORAGE.WORDS_LISTENED] ?? {};
  return (
    <div className="flex flex-col gap-4">
      <div>
        <WordData data={data} />

        {/* <ParaGraph>Total Words you listened till now</ParaGraph>
          <ParaGraph className="text-2xl font-bold">{}</ParaGraph> */}
      </div>
      <div className="flex flex-col gap-4">
        <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
          Your Word Graph
        </ParaGraph>
        <ParaGraph className={``}>
          This helps you to understand the most used words in a language which
          you should focus on. Practice them since these words are mostly used
          everywhere.
        </ParaGraph>
      </div>
      <WordTable data={data[STRINGS.STORAGE.WORDS_LISTENED]} />
      <ParaGraph className={``}>How to listen to more data</ParaGraph>
      <ParaGraph className={``}>
        Listening exercises and doubts ask Gemlingua
      </ParaGraph>
    </div>
  );
};
