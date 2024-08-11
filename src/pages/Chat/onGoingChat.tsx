import { Spinner } from "@nextui-org/react";
import { CustomCopyButton, NoSelectedChat, PERSONA } from ".";
import { CustomCard } from "../../components/Card";
import MarkdownRenderer from "../../components/Markdown";
import ParaGraph from "../../components/Paragraph";
import { AppIconAndText } from "../LoginAndSignup";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useRef } from "react";
import CustomButton from "../../components/Button";
import { AudioPlayer } from "../../components/Audio";
import { useSelector } from "react-redux";
import { STRINGS } from "../../utilities/constants";

export const OngoingChat = ({ messages, isLoading }) => {
  const [parent] = useAutoAnimate();
  const [parent2] = useAutoAnimate();
  const bottomOfChatRef = useRef(null);

  const settings = useSelector((state) => state.language);

  const savedChats = settings[STRINGS.STORAGE.SAVED_CHATS];
  const ongoingChatID = settings[STRINGS.STORAGE.ONGOING_CHAT_ID];
  const curChat = savedChats[ongoingChatID];
  const totalTokensUsed =
    curChat?.otherData?.usageMetadata?.totalTokenCount ?? undefined;

  useEffect(() => {
    if (bottomOfChatRef.current)
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return messages.length > 0 ? (
    <div ref={parent}>
      {messages.map((message, index) => {
        const isUser = message.role === PERSONA.USER.id;
        const currentMessage = message.parts[0]?.text;

        const copyButton = (
          <CustomCopyButton size={"sm"} text={currentMessage} />
        );

        const audioPlayer = (
          <AudioPlayer
            text={currentMessage}
            src={undefined}
            buttonProps={{
              variant: "flat",
              size: "sm",
            }}
          />
        );

        return (
          <div
            key={index}
            color={isUser ? "primary" : "secondary"}
            className="flex flex-col py-4">
            <div
              className={`flex flex-row${
                isUser ? `-reverse` : ""
              } items-center gap-4`}>
              {!isUser && (
                <AppIconAndText
                  onlyLogo
                  classNames={{
                    parent: "p-0",
                    icon: "m-[-2rem] p-0",
                  }}
                  removeAllClasses
                />
              )}
              <div className="flex gap-4 items-center">
                {isUser && (
                  <div className="flex gap-2">
                    {copyButton} {audioPlayer}
                  </div>
                )}
                <ParaGraph className="font-bold">
                  {isUser ? PERSONA.USER.displayName : PERSONA.BOT.displayName}
                </ParaGraph>
                {!isUser && isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  !isUser && (
                    <div className="flex gap-2">
                      {audioPlayer}
                      {copyButton}
                    </div>
                  )
                )}
              </div>
            </div>
            <CustomCard
              className={`flex flex-col ml-0 my-3 ${isUser ? `self-end` : ""} ${
                !isUser ? "dark:border-primary-400" : "dark:border-slate-400"
              } rounded-3xl`}>
              <div className={`p-0 w-full min-w-[180px]`}>
                <MarkdownRenderer
                  markdownContent={currentMessage ?? ""}
                  ref={parent2}
                />
              </div>
            </CustomCard>
          </div>
        );
      })}
      <div ref={bottomOfChatRef} />
      {totalTokensUsed ? (
        <div>
          <ParaGraph className="text-center text-xs text-gray-500">
            {totalTokensUsed} / 1,000,000 tokens used
          </ParaGraph>
        </div>
      ) : null}
    </div>
  ) : (
    <NoSelectedChat />
  );
};
