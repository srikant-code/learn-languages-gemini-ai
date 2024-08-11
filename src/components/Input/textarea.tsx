import { Textarea } from "@nextui-org/react";

interface CustomTextAreaProps {}

const CustomTextArea: FunctionComponent<CustomTextAreaProps> = ({
  ...props
}) => {
  return (
    <Textarea
      maxRows={10}
      minRows={0}
      size="sm"
      style={{ margin: 0 }}
      classNames={{ input: "my-0" }}
      {...props}
    />
  );
};

export default CustomTextArea;
