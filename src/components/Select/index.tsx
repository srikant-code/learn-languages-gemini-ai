import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

// Assuming Select and SelectItem are imported from their respective libraries

interface CustomSelectProps {
  ariaLabel: string;
  label: string;
  id: string;
  className: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string> | Array<{ name: string }>;
  optionLabelExtractor?: (option: any) => string; // Optional, in case options is an array of objects
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  ariaLabel,
  label,
  id,
  className,
  value,
  onChange,
  options,
  optionLabelExtractor = (option) => option, // Default extractor assumes options is an array of strings
  ...props
}) => (
  <Select
    aria-label={ariaLabel}
    label={label}
    id={id}
    className={className}
    value={value}
    onChange={onChange}
    labelPlacement="outside"
    {...props}>
    {options.map((option, index) => {
      const { label, value } = optionLabelExtractor(option);
      return (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      );
    })}
  </Select>
);

export default CustomSelect;
