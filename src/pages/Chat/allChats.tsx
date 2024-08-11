import { Spacer } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import ParaGraph from "../../components/Paragraph";
import { STRINGS } from "../../utilities/constants";
import CustomButton, { CustomNoWrapButton } from "../../components/Button";
import { FaSortAlphaDown } from "react-icons/fa";
import { CustomCard } from "../../components/Card";
import { DeleteExistingChat, NoSelectedChat, PERSONA } from ".";
import moment from "moment";
import { FaTrash } from "react-icons/fa6";
import SortButton from "../../components/Button/sortButton";
import { useEffect, useState } from "react";

export const AllChats = ({ setOngoingChat }) => {
  const savedChats = useSelector((state) => state.language?.savedChats) ?? {};
  const dispatch = useDispatch();
  const [savedChatsKeys, setSavedChatsKeys] = useState(
    Object.keys(savedChats) ?? []
  );
  const [savedChatsValues, setSavedChatsValues] = useState(
    Object.values(savedChats) ?? []
  );

  useEffect(() => {
    let newChatKeys = [];
    savedChatsValues.forEach((chat) => {
      newChatKeys = [...newChatKeys, chat.id];
    });
    setSavedChatsKeys(newChatKeys);
  }, [savedChatsValues]);

  useEffect(() => {
    setSavedChatsKeys(Object.keys(savedChats) ?? []);
    setSavedChatsValues(Object.values(savedChats) ?? []);
  }, [savedChats]);

  console.log({ savedChatsKeys, savedChatsValues, savedChats });

  return (
    <div>
      <Spacer y={6} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <ParaGraph className={`${STRINGS.CLASSES.heading}`}>
            {savedChatsKeys?.length ? "Recent chats" : "Start a new chat"}
          </ParaGraph>
          <div className={"flex items-center gap-2"}>
            <SortButton
              data={savedChatsValues}
              setData={setSavedChatsValues}
              sortProperty={"startedOn"}
              date
            />
            <SortButton
              data={savedChatsValues}
              setData={setSavedChatsValues}
              sortProperty={"title"}
            />
          </div>
        </div>
        {!savedChatsKeys?.length ? (
          <NoSelectedChat />
        ) : (
          <div className="flex flex-col gap-3">
            {savedChatsKeys.map((chatID, index) => {
              const curChat = savedChats[chatID];
              return (
                <CustomCard as={CustomNoWrapButton} key={index} className="p-0">
                  {curChat ? (
                    <div
                      onClick={() => {
                        setOngoingChat(chatID);
                      }}
                      className="flex flex-row justify-between w-full p-6">
                      <div className="flex flex-col items-start flex-1 w-full">
                        <ParaGraph
                          className={
                            "text-md text-ellipsis overflow-hidden max-h-12"
                          }>
                          {curChat.title}
                        </ParaGraph>
                        <ParaGraph
                          className={`text-md opacity-80 text-ellipsis overflow-hidden max-h-5`}>
                          {curChat.lastMessage.role === PERSONA.USER.id
                            ? `${PERSONA.USER.displayName}: `
                            : ""}
                          {curChat.lastMessage.parts[0].text}
                        </ParaGraph>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <ParaGraph className={`${STRINGS.CLASSES.subText}`}>
                          {moment(curChat.lastMessageTime).fromNow()}
                        </ParaGraph>
                        <CustomButton
                          size="sm"
                          color="danger"
                          variant="flat"
                          isIconOnly
                          onClick={() => {
                            DeleteExistingChat({ chatID, dispatch });
                          }}>
                          <FaTrash />
                        </CustomButton>
                      </div>
                    </div>
                  ) : null}
                </CustomCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
