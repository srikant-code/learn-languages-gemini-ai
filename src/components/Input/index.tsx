import { Input } from "@nextui-org/react";

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
  ...props
}) => {
  return (
    <Input
      labelPlacement="outside"
      size="lg"
      disabled={disabled}
      isClearable={isClearable}
      onKeyDown={(e) => {
        // console.log("Enter", e);
        if (e.key === "Enter" && enterEnable) {
          // do something when Enter key is pressed
          if (onKeyDown) {
            onKeyDown(e);
          }
        }
      }}
      classNames={{
        input: `p-4 ${className} ${disabled ? "cursor-not-allowed" : ""}`,
        inputWrapper: "h-[48px]",
        clearButton: "m-2",
      }}
      {...(isClearable
        ? {
            onClear: () => {
              if (isClearable) {
                if (onClear) onClear();
                else if (onChange) onChange("");
              }
            },
          }
        : {})}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      {...props}>
      {children}
    </Input>
  );
};

export default CustomInput;
