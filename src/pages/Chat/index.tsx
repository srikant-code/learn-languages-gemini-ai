import { Avatar, ScrollShadow, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft, FaMessage, FaPlus } from "react-icons/fa6";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/Input";
import ParaGraph from "../../components/Paragraph";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ScrollToBottom } from "../../utilities/utilities";

interface AIChatProps {}

const AIChat: FunctionComponent<AIChatProps> = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parent] = useAutoAnimate();

  const PERSONA = {
    USER: "You",
    BOT: "GemAI",
  };

  const handleNewChat = () => {
    setMessages([]);
  };
  const handleSend = () => {
    if (inputValue) {
      setIsLoading(true);
      setMessages((messages) => [
        ...messages,
        { user: PERSONA.USER, text: inputValue },
      ]);
      // Simulate bot response delay
      setTimeout(() => {
        setMessages((messages) => [
          ...messages,
          { user: PERSONA.BOT, text: "Bot is replying..." },
        ]);
        setInputValue("");
        setIsLoading(false);
        ScrollToBottom();
      }, 50);
      ScrollToBottom();
    }
  };

  return (
    <div className={className}>
      <div
        style={{ height: "88vh" }}
        className="flex flex-col max-h-screen p-4">
        <div className="flex flex-row gap-4">
          <CustomButton
            auto
            isIconOnly
            onClick={handleNewChat}
            loading={isLoading}
            size="lg">
            <FaArrowLeft />
          </CustomButton>
          <div className="flex flex-col" span={6}>
            <ParaGraph className="text-xl font-bold text-foreground-800">
              Chats
            </ParaGraph>
            {/* List of chats */}
            <ParaGraph className="text-foreground-800">
              Chat Interface
            </ParaGraph>
          </div>
        </div>
        <div className="flex flex-1 flex-col place-content-between" span={18}>
          <ScrollShadow
            hideScrollBar
            size={50}
            style={{ maxHeight: "74vh" }}
            className="overflow-auto p-4">
            {messages.length > 0 ? (
              <div ref={parent}>
                {messages.map((message, index) => {
                  const isUser = message.user === PERSONA.USER;
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
                          <Avatar
                            src={
                              isUser
                                ? "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                : ""
                            }
                          />
                        )}
                        <p className="font-bold">{message.user}</p>
                      </div>
                      <p
                        className={`ml-0 my-3 ${
                          !isUser
                            ? "dark:border-primary-400"
                            : "dark:border-slate-400"
                        } light:border-slate-100 border-1 rounded-2xl p-4 w-[180px] ${
                          isUser ? `self-end` : ""
                        }`}>
                        {message.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ParaGraph className="text-foreground-800">
                Start a conversation! Here are some suggestions...
              </ParaGraph>
            )}
            <Spacer y={4} />
          </ScrollShadow>
        </div>
        <div className="">
          <Spacer y={4} />
          <div className="flex flex-row items-center gap-4">
            <CustomInput
              placeholder="Ask me anything..."
              labelPlacement="outside"
              isClearable={false}
              startContent={<FaMessage className="text-foreground-800 m-2" />}
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
              isIconOnly
              onClick={handleNewChat}
              loading={isLoading}
              size="lg">
              <FaPlus />
            </CustomButton>
            <CustomButton
              auto
              disabled={!inputValue}
              isIconOnly
              onClick={handleSend}
              loading={isLoading}
              size="lg">
              <FaSearch />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
