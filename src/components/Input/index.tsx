import { Input } from "@nextui-org/react";

interface CustomInputProps {}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  children,
  onKeyDown,
  enterEnable = true,
  className = "",
  ...props
}) => {
  return (
    <Input
      labelPlacement="outside"
      size="lg"
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
        input: `p-4 ${className}`,
        inputWrapper: "h-[48px]",
      }}
      {...props}>
      {children}
    </Input>
  );
};

export default CustomInput;
