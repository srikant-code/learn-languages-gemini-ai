import { Button } from "@nextui-org/react";

interface CustomButtonProps {}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  onClick,
  children,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      className={`${disabled ? "cursor-not-allowed" : ""} ${className}`}
      variant="bordered"
      {...props}
      onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
