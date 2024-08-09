import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
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

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  size = "lg",
  ariaLabel,
  className = "",
  tabClassName = "",
  centerTabs = false,
  ...props
  // Spread any other custom props
}) => {
  const [parent] = useAutoAnimate();
  return (
    <Tabs
      classNames={{ base: centerTabs && "items-center flex justify-center" }}
      size={size}
      aria-label={ariaLabel}
      className={className}
      color="secondary"
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
  );
};

export default CustomTabs;
