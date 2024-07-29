import { Button } from "@nextui-org/react";
import { STRINGS } from "../../utilities/constants";

interface CustomButtonProps {}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  onClick,
  children,
  color,
  variant,
  size,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      color={color}
      size={size ?? "lg"}
      className={`${disabled ? "cursor-not-allowed" : ""} ${
        color === "primary" && variant === "solid" ? "text-white" : ""
      } ${STRINGS.CLASSES.basicTransitions} ${className}`}
      variant={variant ?? "bordered"}
      {...props}
      onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
