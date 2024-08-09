import { Button } from "@nextui-org/react";
import { STRINGS } from "../../utilities/constants";
import { Link } from "react-router-dom";

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

export const CustomLinkButton = ({ ...props }) => {
  return <CustomButton as={Link} {...props} />;
};

export const CustomNoWrapButton = ({ className, ...props }) => {
  return (
    <CustomButton
      className={`whitespace-break-spaces text-left overflow-hidden text-ellipsis ${className}`}
      {...props}
    />
  );
};
