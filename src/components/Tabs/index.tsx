import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
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
}) => (
  <Tabs
    classNames={{ base: centerTabs && "items-center flex justify-center" }}
    size={size}
    aria-label={ariaLabel}
    className={className}
    {...props}>
    {tabs.map((tab) => {
      const { title, content } = tab;
      return (
        <Tab key={title} title={title} className={tabClassName}>
          {content}
        </Tab>
      );
    })}
  </Tabs>
);

export default CustomTabs;
