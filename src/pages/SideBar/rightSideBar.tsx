import { ScrollShadow } from "@nextui-org/react";
import CustomTabs from "../../components/Tabs";
import AIChat from "../Chat";
import { DictionaryRender } from "../Dictionary";

interface RightSideBarProps {}

const RightSideBar: FunctionComponent<RightSideBarProps> = ({ ...props }) => {
  return (
    <div className="w-full flex items-center" {...props}>
      <CustomTabs
        ariaLabel="Tabs example"
        centerTabs
        tabs={[
          {
            title: "Dictionary",
            content: <Wrapper children={<DictionaryRender />} />,
          },
          { title: "Gem AI", content: <Wrapper children={<AIChat />} /> },
          {
            title: "My Vocabulary",
            content: <Wrapper children={<DictionaryRender />} />,
          },
        ]}
      />
    </div>
  );
};

export default RightSideBar;

const Wrapper = ({ children }) => {
  return (
    <ScrollShadow className="h-[88vh] overflow-auto">{children}</ScrollShadow>
  );
};
