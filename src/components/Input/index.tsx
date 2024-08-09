import { Input } from "@nextui-org/react";
import CustomTextArea from "./textarea";

interface CustomInputProps {}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  children,
  onKeyDown,
  enterEnable = true,
  className = "",
  isClearable = false,
  onClear,
  disabled,
  onChange,
  dontClearOnEnter = false,
  textarea = false,
  ...props
}) => {
  const myProps = {
    labelPlacement: "outside",
    size: "lg",
    disabled: disabled,
    isClearable: isClearable,
    onKeyDown: (e) => {
      // console.log("Enter", e);
      if (e.key === "Enter" && e.shiftKey === false && enterEnable) {
        // do something when Enter key is pressed
        if (e.preventDefault) e.preventDefault();
        if (onKeyDown) {
          onKeyDown(e);
        }
        if (onChange && !dontClearOnEnter) onChange("");
      }
    },
    classNames: {
      input: `p-4 text-black dark:text-white ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`,
      inputWrapper: "h-[48px]",
      clearButton: "m-2",
    },
    ...(isClearable
      ? {
          onClear: () => {
            if (isClearable) {
              if (onClear) onClear();
              else if (onChange) onChange("");
            }
          },
        }
      : {}),
    onChange: (e) => {
      if (onChange) {
        onChange(e.target.value);
      }
    },
    ...props,
  };
  return textarea ? (
    <CustomTextArea {...myProps}>{children}</CustomTextArea>
  ) : (
    <Input {...myProps}>{children}</Input>
  );
};

export default CustomInput;
