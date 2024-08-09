import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ScrollShadow, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck, FaPlus, FaX } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import CustomImage, { AllImages } from "../../components/Image";
import CustomInput from "../../components/Input";
import ParaGraph from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { setSetting } from "../../store/reducer";
import store from "../../store/store";
import { STRINGS } from "../../utilities/constants";
import {
  CopyToClipboard,
  ExtractHeadingFromMarkdown,
  generateUUID,
  Sleep,
} from "../../utilities/utilities";
import { AllChats } from "./allChats";
import Explore from "./explore";
import { OngoingChat } from "./onGoingChat";
import { GeminiChat } from "../../geminiAI/genAI";

interface AIChatProps {}

const STORAGE = STRINGS.STORAGE;
const NEW_CHAT = "New chat";

const CreateAndSaveMToNewChat = ({ message = {}, dispatch }) => {
  const savedChats = store.getState().language.savedChats;
  const newChatID = generateUUID();
  const newChatObj = {
    [newChatID]: {
      startedOn: new Date().toISOString(),
      title: NEW_CHAT,
      id: newChatID,
      lastMessage: message,
      lastMessageTime: new Date().toISOString(),
      messages: [message],
    },
  };
  dispatch(
    setSetting({
      key: STORAGE.SAVED_CHATS,
      value: {
        ...savedChats,
        ...newChatObj,
      },
    })
  );
  return newChatID;
};

const SaveMToExistingChat = ({
  chatID = null,
  message = {},
  title = null,
  dispatch,
  otherData = {},
}) => {
  const savedChats = store.getState().language.savedChats;
  const chatObj = {
    [chatID]: {
      ...savedChats[chatID],
      title:
        // preserve the title if already there, but if it is NEW_CHAT then update it
        savedChats[chatID].title === NEW_CHAT && title
          ? title
          : savedChats[chatID].title,
      lastMessage: message,
      lastMessageTime: new Date().toISOString(),
      otherData,
      messages: [...savedChats[chatID].messages, message],
    },
  };

  dispatch(
    setSetting({
      key: STORAGE.SAVED_CHATS,
      value: {
        ...savedChats,
        ...chatObj,
      },
    })
  );
};

export const DeleteExistingChat = ({ chatID = null, dispatch }) => {
  const savedChats = store.getState().language.savedChats;
  const { [chatID]: chatToBeDeleted, ...otherChats } = savedChats;

  dispatch(
    setSetting({
      key: STORAGE.SAVED_CHATS,
      value: {
        ...otherChats,
      },
    })
  );
};

export const PERSONA = {
  USER: { displayName: "You", id: "user" },
  BOT: { displayName: STRINGS.APP_NAME, id: "model" },
};

const AIChat: FunctionComponent<AIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const savedChats = useSelector((state) => state.language?.savedChats) ?? {};
  const chatInputValue =
    useSelector((state) => state.language[STRINGS.STORAGE.CHAT_INPUT_VALUE]) ??
    "";
  const ongoingChatID =
    useSelector((state) => state.language[STRINGS.STORAGE.ONGOING_CHAT_ID]) ??
    null;

  const handleNewChat = ({}) => {
    setMessages([]);
  };

  const setOngoingChatID = (val) => {
    dispatch(
      setSetting({
        key: STRINGS.STORAGE.ONGOING_CHAT_ID,
        value: val,
      })
    );
  };

  const setChatInputValue = (val) => {
    dispatch(
      setSetting({
        key: STRINGS.STORAGE.CHAT_INPUT_VALUE,
        value: val,
      })
    );
  };

  const handleSend = async () => {
    if (!isLoading && chatInputValue) {
      setIsLoading(true);
      const currentMessage = {
        role: PERSONA.USER.id,
        parts: [{ text: chatInputValue }],
      };

      let isNewCurChatID = null;
      if (!ongoingChatID) {
        // create new chat
        isNewCurChatID = CreateAndSaveMToNewChat({
          message: currentMessage,
          dispatch,
        });
        setOngoingChatID(isNewCurChatID);
      } else {
        SaveMToExistingChat({
          chatID: ongoingChatID,
          message: currentMessage,
          dispatch,
        });
      }

      setMessages((messages) => {
        return [...messages, currentMessage];
      });
      setChatInputValue("");

      const handleResponseFromGemini = (response) => {
        console.log({ response });
        const { text, ...otherData } = response;
        const currentMessage = {
          role: PERSONA.BOT.id,
          parts: [
            {
              text: text || `# ${STRINGS.APP_NAME} AI is thinking...`,
            },
          ],
        };
        SaveMToExistingChat({
          chatID: isNewCurChatID ?? ongoingChatID,
          message: currentMessage,
          otherData,
          dispatch,
          title:
            ExtractHeadingFromMarkdown(text) ??
            (chatInputValue ? chatInputValue?.toProperCase() : undefined),
        });
        // setMessages((messages) => {
        //   return [...messages, currentMessage];
        // });
      };

      try {
        const { response } = await GeminiChat({
          history: isNewCurChatID ? [] : messages,
          msg: chatInputValue,
          json: false,
          callback: (newText) => {
            setMessages((messages) => {
              const newMessages = [...messages];
              if (newMessages.length > 0) {
                const curMessage = {
                  role: PERSONA.BOT.id,
                  parts: [{ text: newText }],
                };
                const lastMessage = newMessages[newMessages.length - 1];
                console.log({ newMessages, lastMessage });
                // Update the last message, if it was user then add it to
                // the end otherwise update the previous bot message itself
                if (lastMessage?.role === PERSONA.USER.id)
                  newMessages[newMessages.length] = curMessage;
                else newMessages[newMessages.length - 1] = curMessage;
              }
              return newMessages;
            });
          },
        });
        handleResponseFromGemini(await response);
      } catch (e) {
        console.log({ e });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ongoingChatID) {
      setMessages(savedChats[ongoingChatID].messages);
    }
  }, [ongoingChatID]);

  console.log({ messages });

  const [parent] = useAutoAnimate();

  return (
    <div className={className}>
      <div
        style={{ height: "88vh" }}
        className="flex flex-col max-h-screen p-4">
        <ChatInterFaceHeader
          showBackButton={ongoingChatID}
          onClickBack={() => {
            setOngoingChatID(null);
          }}
        />
        <div className="flex flex-1 flex-col place-content-between" span={18}>
          <ScrollShadow
            size={50}
            style={{ maxHeight: "74vh" }}
            className="overflow-auto p-4">
            <div ref={parent}>
              <Spacer y={6} />
              {ongoingChatID ? (
                <OngoingChat messages={messages} isLoading={isLoading} />
              ) : (
                <CustomTabs
                  fullWidth
                  tabs={[
                    {
                      title: "All Chats",
                      content: (
                        <div>
                          <AllChats setOngoingChat={setOngoingChatID} />
                        </div>
                      ),
                    },
                    { title: "Explore", content: <Explore /> },
                  ]}
                />
              )}
              <Spacer y={4} />
            </div>
          </ScrollShadow>
        </div>
        <div className="">
          <Spacer y={4} />
          <ChatBar
            {...{
              handleNewChat,
              handleSend,
              isLoading,
              inputValue: chatInputValue,
              setInputValue: setChatInputValue,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;

const ChatBar = ({
  handleNewChat,
  handleSend,
  isLoading,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <CustomButton auto isIconOnly onClick={handleNewChat} loading={isLoading}>
        <FaPlus />
      </CustomButton>
      <CustomInput
        textarea
        placeholder="Ask me anything..."
        labelPlacement="outside"
        isClearable={false}
        // startContent={<FaMessage className="text-white m-2" />}
        value={inputValue}
        variant="bordered"
        onChange={(val) => setInputValue(val)}
        onKeyDown={handleSend}
        width="80%"
        color="default"
        className="my-4"
        size="lg"
        // addonAfter={<ImageUploader />}
      />
      <CustomButton
        auto
        disabled={!inputValue}
        isIconOnly
        onClick={handleSend}
        loading={isLoading}>
        <IoSend />
      </CustomButton>
    </div>
  );
};

export const CustomCopyButton = ({ text, ...props }) => {
  const [copied, setCopied] = useState(null);
  return (
    <CustomButton
      isIconOnly
      onClick={() => {
        setCopied(CopyToClipboard(text));
        Sleep(2000).then(() => setCopied(null));
      }}
      color={copied === false ? "danger" : copied ? "success" : "default"}
      className=""
      {...props}>
      {copied === false ? <FaX /> : copied ? <FaCheck /> : <MdContentCopy />}
    </CustomButton>
  );
};

export const NoSelectedChat = ({}) => {
  return (
    <div className="flex flex-col items-center">
      <CustomImage src={AllImages.chat} />
      <ParaGraph className="">
        Start a conversation! Here are some suggestions
      </ParaGraph>
    </div>
  );
};

const ChatInterFaceHeader = ({ showBackButton, onClickBack, isLoading }) => {
  const [parent] = useAutoAnimate();
  return (
    <div className="flex flex-row justify-between items-center pl-5">
      <div className="flex flex-row gap-4" ref={parent}>
        {showBackButton && (
          <CustomButton
            auto
            isIconOnly
            // onClick={handleNewChat}
            loading={isLoading}
            size="lg"
            onClick={() => onClickBack()}>
            <FaArrowLeft />
          </CustomButton>
        )}
        <div className="flex flex-col" span={6}>
          <ParaGraph className="text-xl font-bold text-foreground-800">
            Chats
          </ParaGraph>
          {/* List of chats */}
          <ParaGraph className="text-foreground-800">Chat Interface</ParaGraph>
        </div>
      </div>
    </div>
  );
};
