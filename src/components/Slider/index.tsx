import { Slider } from "@nextui-org/react";
import React from "react";
// Assuming Slider is imported from its respective library

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  maxValue?: number;
  minValue?: number;
  defaultValue?: number;
  className?: string;
  color?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  step = 0.25, // Default value if not provided
  maxValue = 2,
  minValue = 0.25,
  defaultValue = 1,
  className = "max-w-md", // Default class if not provided
  color = "primary", // Default color if not provided
  ...props
}) => (
  <Slider
    classNames={{
      base: "max-w-md gap-3",
      track: "border-s-primary-100",
      filler: "bg-gradient-to-r from-primary-100 to-primary-500",
    }}
    label={label}
    size="lg"
    showSteps
    step={step}
    maxValue={maxValue}
    minValue={minValue}
    defaultValue={defaultValue}
    className={className}
    color={color}
    value={value}
    onChange={onChange}
    {...props}
  />
);

export default CustomSlider;
