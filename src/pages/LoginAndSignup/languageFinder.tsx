import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ScrollShadow, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import CustomButton from "../../components/Button";
import { CustomCard } from "../../components/Card";
import Flag from "../../components/Flag";
import CustomInput from "../../components/Input";
import ParaGraph from "../../components/Paragraph";
import { GetAllLanguages } from "../../utilities/countryIcons";
import {
  RemoveNullValuesFromArray,
  SearchMatchHighlighter,
} from "../../utilities/utilities";

interface LanguageFinderProps {}

const allLangs = Object.values(GetAllLanguages);

const LanguageFinder: FunctionComponent<LanguageFinderProps> = ({
  selectedLangs,
  setSelectedLangs,
  inputProps = {},
  messageForNoSelection = "Come on! You definitely know atleast one language. Select it to proceed.",
  messageForConfirmation = "So you know these languages right?",
  messageForNoSuchLanguageExists = "Hey! We don't think any such language exists. Try something else.",
}) => {
  const selectedLanguages = RemoveNullValuesFromArray(
    Object.keys(selectedLangs),
    (k) => selectedLangs[k]
  );

  const updatedSelectedLangsObj = selectedLanguages.map((lang) => {
    return GetAllLanguages[lang];
  });
  const [langInput, setlangInput] = useState("");
  const filteredLangs = [
    ...updatedSelectedLangsObj,
    ...allLangs
      .filter((lang) => {
        return !updatedSelectedLangsObj.find(
          (sLang) => sLang.languageCode === lang.languageCode
        );
      })
      .filter((lang) => {
        return JSON.stringify({
          name: lang.languageName,
          code: lang.languageCode,
          country: lang?.usedIn[0]?.displayName,
        })
          ?.toLowerCase()
          .includes(langInput?.toLowerCase());
      }),
  ];

  console.log({ selectedLangs, filteredLangs, selectedLanguages });

  const addOrDeleteLang = (lang) => {
    // console.log({ abc: lang });
    const { [lang.languageCode]: langToRemove, ...otherLangs } = selectedLangs;
    if (selectedLangs[lang.languageCode]) {
      setSelectedLangs({
        ...(Object.keys(otherLangs)?.length >= 1
          ? otherLangs
          : {
              en: {
                read: true,
                write: true,
                speak: true,
              },
            }),
      });
    } else
      setSelectedLangs({
        ...selectedLangs,
        [lang.languageCode]: {
          read: true,
          write: true,
          speak: true,
        },
      });
  };

  const [parent] = useAutoAnimate();
  const [parent2] = useAutoAnimate();
  const [parent3] = useAutoAnimate();
  return (
    <div className="flex flex-col gap-8 w-full" ref={parent}>
      <div className="mx-0">
        <CustomInput
          placeholder="Search the language that you already know"
          value={langInput}
          className="w-full"
          onChange={(e) => {
            setlangInput(e);
          }}
          {...inputProps}></CustomInput>
      </div>

      <ScrollShadow className="h-[45vh] max-w-[100%]">
        <div
          className="flex flex-wrap w-full gap-4 items-start justify-center"
          ref={parent3}>
          {filteredLangs?.length ? (
            filteredLangs.map((lang, index) => {
              // console.log({ lang });
              return (
                <CustomCard
                  as={CustomButton}
                  key={index}
                  className={`flex-1 bg-transparent min-w-[235px] max-w-[300px] h-fit p-0`}>
                  <div
                    className="flex flex-row gap-4 justify-start w-full items-center p-6"
                    onClick={() => addOrDeleteLang(lang)}>
                    <Flag flag={lang.usedIn[0]?.content} className="w-[50px]" />
                    <div className="flex flex-col items-start">
                      <ParaGraph className={"font-bold "}>
                        {SearchMatchHighlighter(lang?.languageName, langInput)}
                      </ParaGraph>
                      <ParaGraph
                        className={
                          "text-small whitespace-break-spaces text-left"
                        }>
                        {lang?.languageCode === "en" ? (
                          "Default"
                        ) : (
                          <>
                            Used in{" "}
                            {SearchMatchHighlighter(
                              lang?.usedIn[0].displayName,
                              langInput
                            )}
                          </>
                        )}
                      </ParaGraph>
                    </div>
                    {selectedLangs[lang.languageCode] ? (
                      <CheckRightTop />
                    ) : (
                      <></>
                    )}
                  </div>
                </CustomCard>
              );
            })
          ) : (
            <div>{messageForNoSuchLanguageExists}</div>
          )}
        </div>
        <Spacer y={8} />
      </ScrollShadow>
      {selectedLanguages?.length ? (
        <div className="flex flex-col gap-2">
          <ParaGraph className="pr-32">{messageForConfirmation}</ParaGraph>
          <div className="flex flex-wrap gap-2" ref={parent2}>
            {selectedLanguages.map((lang, index) => {
              return (
                <CustomButton
                  key={lang}
                  onClick={() => addOrDeleteLang(GetAllLanguages[lang])}
                  className={
                    "rounded-full py-0 px-3 flex justify-center items-center"
                  }>
                  <ParaGraph>{GetAllLanguages[lang].languageName}</ParaGraph>
                  <FaCircleXmark />
                </CustomButton>
              );
            })}
          </div>
        </div>
      ) : (
        <>{messageForNoSelection}</>
      )}
    </div>
  );
};

export const CheckRightTop = ({ className, style = {} }) => (
  <FaCheckCircle
    style={style}
    className={`text-green-500 text-2xl absolute top-3 right-3 ${className}`}
  />
);

export default LanguageFinder;
