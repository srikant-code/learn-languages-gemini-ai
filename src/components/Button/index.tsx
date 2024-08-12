import { Button } from "@nextui-org/react";
import { STRINGS } from "../../utilities/constants";
import { Link } from "react-router-dom";
import React from "react";

interface CustomButtonProps {}

const CustomButton = React.forwardRef(
  (
    {
      onClick,
      children,
      color,
      variant,
      size,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled}
        color={color}
        size={size ?? "lg"}
        className={`${disabled ? "cursor-not-allowed" : ""} ${
          color === "primary" && variant === "solid" ? "text-white" : ""
        } ${STRINGS.CLASSES.basicTransitions} ${className}`}
        variant={variant ?? "bordered"}
        {...props}
        tabIndex={0}
        // onPress={onClick}
        onClick={(e) => {
          // if (e.preventDefault) e.preventDefault();
          if (onClick) onClick(e);
        }}>
        {children}
      </Button>
    );
  }
);

export default CustomButton;

export const CustomLinkButton = React.forwardRef(({ ...props }, ref) => {
  return <CustomButton as={Link} ref={ref} {...props} />;
});

export const CustomNoWrapButton = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <CustomButton
        ref={ref}
        className={`whitespace-break-spaces text-left overflow-hidden text-ellipsis ${className}`}
        {...props}
      />
    );
  }
);
