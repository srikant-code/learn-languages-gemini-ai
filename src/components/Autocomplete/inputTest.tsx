import {
  Autocomplete,
  AutocompleteItem,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { STRINGS } from "../../utilities/constants";
import { SearchMatchHighlighter } from "../../utilities/utilities";
import ParaGraph from "../Paragraph";
import { FaSearch } from "react-icons/fa";
import CustomInput from "../Input";
import { CustomCard } from "../Card";
import { NoCourses } from "../../pages/Courses";
import { NoVocabWordFound } from "../../pages/MyVocabulary";
import { AllImages } from "../Image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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

const CustomAutocompleteInput: React.FC<CustomAutocompleteProps> = ({
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
  const [itemsToDisplay, setItemsToDisplay] = useState(items);
  const [inputValue, setInputValue] = useState("");
  const [parent] = useAutoAnimate();

  console.log({ itemsToDisplay });

  return (
    <div className="p-4">
      <CustomInput
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
        // listboxProps={{
        //   hideSelectedIcon: true,
        //   variant: "flat",
        //   color: "primary",
        //   classNames: {
        //     base: [
        //       "light:bg-white",
        //       "dark:bg-slate-800",
        //       "rounded-xl",
        //       "h-fit",
        //     ],
        //   },
        //   itemClasses: {
        //     base: ["p-4"],
        //   },
        // }}
        // classNames={{
        //   popoverContent: {},
        // }}
        // clearButtonProps={{
        //   className: "mx-4",
        // }}
        // selectorButtonProps={{
        //   className: "mx-4",
        // }}
        radius="md"
        size="lg"
        className={`max-w-full ${className}`}
        onSelectionChange={(e) => onSelectionChange(e)}
        onChange={(input) => {
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
        {/* {(item) => {
        console.log({ item });
        return <RenderAItem key={item.value} item={item} />;
      }} */}
      </CustomInput>
      <ScrollShadow className=" max-h-[69vh]">
        <Spacer y={6} />
        <div className="flex flex-col gap-3" ref={parent}>
          {itemsToDisplay?.length ? (
            itemsToDisplay.map((item) => {
              return (
                <CustomCard
                  className={"p-0"}
                  key={item.value}
                  as={item?.route ? Link : null}
                  to={item?.route ? item.route : null}
                  textValue={item.label}
                  tabIndex={"0"}
                  role="button">
                  <div className="flex flex-row justify-between items-center p-4 pr-5">
                    <div className="flex items-center gap-4">
                      <div>{item?.icon ? item.icon : null}</div>
                      <div className="flex flex-col">
                        <ParaGraph className={"font-bold"}>
                          {SearchMatchHighlighter(item.label, inputValue)}
                        </ParaGraph>
                        {item?.description && (
                          <ParaGraph className="text-sm text-gray-500 text-wrap">
                            {SearchMatchHighlighter(
                              `${item.description?.slice(0, 100)}...`,
                              inputValue
                            )}
                          </ParaGraph>
                        )}
                      </div>
                    </div>
                    {/* <ParaGraph className="uppercase text-tiny">
                      {SearchMatchHighlighter(
                        item?.route
                          ? item?.route
                              ?.split("#")[0]
                              ?.replaceAll("/", STRINGS.SEPARATOR.BULL)
                          : "",
                        inputValue
                      )}
                    </ParaGraph> */}
                  </div>
                </CustomCard>
              );
            })
          ) : (
            <div className="p-4">
              <NoVocabWordFound image={AllImages.app.archived} />
              {/* <ParaGraph>
                Oops! No such data can be found using "{inputValue}"
              </ParaGraph> */}
            </div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default CustomAutocompleteInput;

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
