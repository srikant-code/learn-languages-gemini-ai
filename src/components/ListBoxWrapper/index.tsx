import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
export const ListboxWrapper = ({ children }) => (
  <div className="w-full px-2 py-2 rounded-small">{children}</div> // min-w-[260px]
);

export const CustomListbox = ({ items }) => {
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Listbox Variants"
        // color={selectedColor}
        // variant={selectedVariant}
      >
        {items.map((section, index) => {
          const { items, ...props } = section;
          return (
            <ListboxSection key={index} {...props}>
              {(items ?? []).map((item, index) => {
                const props = {
                  // description: item.description,
                  startContent: <span className="px-4">{item.icon}</span>,
                  endContent: (
                    <span className="px-2 py-0 h-0 mt-[-1rem]">
                      {item.EndContent}
                    </span>
                  ),
                  className: `text-foreground p-4 ${
                    window.location.pathname === item.route ? "" : ""
                  }`,
                };
                return (
                  <ListboxItem
                    {...props}
                    as={item.route ? Link : undefined}
                    to={item.route ? item.route : undefined}
                    role="button"
                    color="default"
                    tabIndex={"0"}
                    key={item.name + index}
                    onClick={() => {
                      item?.onClick ? item.onClick() : "";
                    }}>
                    {item.name ?? item?.children}
                  </ListboxItem>
                );
              })}
            </ListboxSection>
          );
        })}
      </Listbox>
    </ListboxWrapper>
  );
};
