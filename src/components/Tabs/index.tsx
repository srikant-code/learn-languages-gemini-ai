import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../store/store";
import { setSetting } from "../../store/reducer";
// Adjust the import according to your library

interface TabItem {
  key: string;
  title: string;
  content?: React.ReactNode; // Optional content if you want to render something inside the Tab
}

interface CustomTabsProps {
  tabs: TabItem[];
  size?: "sm" | "md" | "lg"; // Assuming these are the available sizes
  ariaLabel: string;
  className?: string;
  tabClassName?: string;
  // Add any other props for customization
}

export const SetActiveTabInRedux = ({ dispatch, tabID, activeTab }) => {
  const tabs = store.getState().language?.tabs ?? {};
  dispatch(
    setSetting({
      key: "tabs",
      value: {
        ...tabs,
        [tabID]: {
          active: activeTab,
        },
      },
    })
  );
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  size = "lg",
  ariaLabel,
  className = "",
  tabClassName = "",
  centerTabs = false,
  selectedKey,
  onSelectionChange,
  id = "",
  ...props
  // Spread any other custom props
}) => {
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  const dispatch = useDispatch();
  const [parent] = useAutoAnimate();
  const [parent2] = useAutoAnimate();
  return (
    <div ref={parent2}>
      <Tabs
        classNames={{ base: centerTabs && "items-center flex justify-center" }}
        size={size}
        aria-label={ariaLabel ?? "tabs"}
        className={className}
        color="secondary"
        selectedKey={
          selectedKey || settingsFromRedux?.tabs
            ? settingsFromRedux?.tabs?.[id]?.active
            : undefined
        }
        onSelectionChange={(selection) => {
          if (onSelectionChange) onSelectionChange(selection);
          SetActiveTabInRedux({
            activeTab: selection,
            dispatch,
            tabID: id,
          });
        }}
        {...props}>
        {tabs.map((tab) => {
          const { title, content, textValue, route, icon } = tab;
          return (
            <Tab
              as={route ? Link : undefined}
              to={route || undefined}
              key={title}
              ref={parent}
              title={
                <div className="flex items-center space-x-2">
                  {icon}
                  <span>{title}</span>
                </div>
              }
              textValue={
                <div className="flex items-center space-x-2">
                  {icon}
                  <span>{textValue}</span>
                </div>
              }
              className={tabClassName}>
              {content}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
