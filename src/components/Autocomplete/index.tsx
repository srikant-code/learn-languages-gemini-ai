import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { STRINGS } from "../../utilities/constants";
import { SearchMatchHighlighter } from "../../utilities/utilities";
import ParaGraph from "../Paragraph";
import { FaSearch } from "react-icons/fa";

interface Item {
  label: string;
  value: string;
}

interface CustomAutocompleteProps {
  placeholder?: string;
  items: Item[];
  onSelectionChange: (value: string) => void; // Callback function when an item is selected
  className?: string;
  inputClassName?: string;
  autoCompleteItemClassName?: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  placeholder = "Search...",
  items,
  onSelectionChange = (value) => {
    console.log(value);
  },
  //   sectionsEnable = false,
  className = "max-w-full",
  inputClassName = "",
  label,
  autoCompleteItemClassName = "",
  startContent,
  ...props
}) => {
  //   const headingClasses =
  //     "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  //   const RenderAItem = ({ item }) => {
  //     return (
  //       <AutocompleteItem
  //         className={autoCompleteItemClassName}
  //         key={item.value}
  //         textValue={item.label}>
  //         <div>
  //           <ParaGraph>{item.label}</ParaGraph>
  //           {item?.description && (
  //             <ParaGraph className="text-sm text-gray-500">
  //               {item.description}
  //             </ParaGraph>
  //           )}
  //         </div>
  //       </AutocompleteItem>
  //     );
  //   };

  // const myFilter = (textValue: string, inputValue: string) => {
  //   console.log({ textValue, inputValue });
  //   if (inputValue.length === 0) {
  //     return true;
  //   }

  //   // Normalize both strings so we can slice safely
  //   // take into account the ignorePunctuation option as well...
  //   // textValue = textValue.normalize("NFC").toLocaleLowerCase();
  //   inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

  //   return inputValue;
  //   // return textValue.slice(0, inputValue.length) === inputValue;
  // };

  const [itemsToDisplay, setItemsToDisplay] = useState(items);
  const [inputValue, setInputValue] = useState("");

  console.log({ itemsToDisplay });

  return (
    <Autocomplete
      // isRequired
      // defaultSelectedKey="cat"
      items={itemsToDisplay}
      // defaultItems={items.map((item) => {
      //   return { label: item.label, value: item.value };
      // })}
      aria-label={label ?? placeholder ?? "autocomplete"}
      placeholder={placeholder}
      label={label}
      labelPlacement="outside"
      // defaultFilter={myFilter}
      inputProps={{
        classNames: {
          input: `ml-1 pl-3 ${inputClassName}`,
          inputWrapper: "h-[48px]",
        },
      }}
      variant="flat"
      popoverProps={{
        classNames: {
          content: ["light:bg-white", "dark:bg-slate-950", "p-2", "h-fit"],
        },
      }}
      scrollShadowProps={{
        className: "h-fit",
      }}
      listboxProps={{
        hideSelectedIcon: true,
        variant: "flat",
        color: "primary",
        classNames: {
          base: ["light:bg-white", "dark:bg-slate-800", "rounded-xl", "h-fit"],
        },
        itemClasses: {
          base: [
            "p-4",
            // "rounded-medium",
            // "fill-background",
            // "bg-black",
            // "text-default-500",
            // "transition-opacity",
            // "data-[hover=true]:text-foreground",
            // "dark:data-[hover=true]:bg-default-50",
            // "data-[pressed=true]:opacity-70",
            // "data-[hover=true]:bg-default-200",
            // "data-[selectable=true]:focus:bg-default-100",
            // "data-[focus-visible=true]:ring-default-500",],
          ],
        },
      }}
      classNames={{
        popoverContent: {},
      }}
      clearButtonProps={{
        className: "mx-4",
      }}
      selectorButtonProps={{
        className: "mx-4",
      }}
      radius="md"
      size="lg"
      className={`max-w-full ${className}`}
      onSelectionChange={(e) => onSelectionChange(e)}
      onInputChange={(input) => {
        console.log({ input });
        // const input = e.target.value;
        setInputValue(input);
        if (input?.trim() === "") {
          setItemsToDisplay(items);
        } else {
          setItemsToDisplay(
            items?.filter((item) => {
              const { icon, ...others } = item;
              const matches = JSON.stringify(others)
                ?.toLowerCase()
                .includes(input?.trim()?.toLowerCase());
              if (matches) {
                return true;
              }
              return false;
            })
          );
        }
      }}
      startContent={
        startContent || (
          <FaSearch
            className="mx-2 text-default-40"
            strokeWidth={2}
            size={14}
          />
        )
      }
      {...props}>
      {itemsToDisplay.map((item) => {
        return (
          <AutocompleteItem
            className={autoCompleteItemClassName}
            key={item.value}
            as={item?.route ? Link : null}
            to={item?.route ? item.route : null}
            textValue={item.label}
            tabIndex={"0"}
            role="button">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <div>{item?.icon ? item.icon : null}</div>
                <div className="flex flex-col">
                  <ParaGraph>
                    {SearchMatchHighlighter(item.label, inputValue)}
                  </ParaGraph>
                  {item?.description && (
                    <ParaGraph className="text-sm text-gray-500 text-wrap">
                      {SearchMatchHighlighter(item.description, inputValue)}
                    </ParaGraph>
                  )}
                </div>
              </div>
              <ParaGraph className="uppercase text-tiny">
                {SearchMatchHighlighter(
                  item?.route
                    ? item?.route
                        ?.split("#")[0]
                        ?.replaceAll("/", STRINGS.SEPARATOR.BULL)
                    : "",
                  inputValue
                )}
              </ParaGraph>
            </div>
          </AutocompleteItem>
        );
      })}
      {/* {(item) => {
        console.log({ item });
        return <RenderAItem key={item.value} item={item} />;
      }} */}
    </Autocomplete>
  );
};

export default CustomAutocomplete;

//   sectionsEnable
//     ? items.map((section) => {
//         const { items, ...props } = section;
//         console.log({ section, items });
//         return (
//           <AutocompleteSection
//             classNames={{
//               heading: headingClasses,
//             }}
//             items={items}
//             {...props}>
//             {/* {items.map((item) => (
//               <RenderAItem item={item} />
//             ))} */}
//           </AutocompleteSection>
//         );
//       })
//     :
