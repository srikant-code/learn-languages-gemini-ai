import { ScrollShadow } from "@nextui-org/react";
import CustomTabs from "../../components/Tabs";
import AIChat from "../Chat";
import { DictionaryRender } from "../Dictionary";
import Vocabulary from "../MyVocabulary";
import { STRINGS } from "../../utilities/constants";

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
            content: <ScrollWrapper children={<DictionaryRender />} />,
          },
          {
            title: STRINGS.APP_NAME,
            content: <ScrollWrapper children={<AIChat />} />,
          },
          {
            title: "My Vocabulary",
            content: <ScrollWrapper children={<Vocabulary />} />,
          },
        ]}
      />
    </div>
  );
};

export default RightSideBar;

export const ScrollWrapper = ({ className, children }) => {
  return (
    <ScrollShadow
      className={`h-[88vh] overflow-auto ${className}`}
      visibility="bottom"
      // hideScrollBar
    >
      {children}
    </ScrollShadow>
  );
};
