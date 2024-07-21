import { Button } from "@nextui-org/react";

interface CustomButtonProps {}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
