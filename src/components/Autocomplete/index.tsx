import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/react";
import React from "react";
import ParaGraph from "../Paragraph";

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
  autoCompleteItemClassName = "",
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
  return (
    <Autocomplete
      // isRequired
      // defaultSelectedKey="cat"
      defaultItems={items}
      // defaultItems={items.map((item) => {
      //   return { label: item.label, value: item.value };
      // })}
      placeholder={placeholder}
      labelPlacement="outside"
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
      {...props}>
      {(item) => {
        console.log({ item });
        return (
          <AutocompleteItem
            className={autoCompleteItemClassName}
            key={item.value}
            textValue={item.label}>
            <div>
              <ParaGraph>{item.label}</ParaGraph>
              {item?.description && (
                <ParaGraph className="text-sm text-gray-500">
                  {item.description}
                </ParaGraph>
              )}
            </div>
          </AutocompleteItem>
        );
      }}
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
