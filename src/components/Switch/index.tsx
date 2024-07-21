import { Switch } from "@nextui-org/react";

interface CustomSwitchProps {}

const CustomSwitch: FunctionComponent<CustomSwitchProps> = ({
  defaultSelected,
  isSelected,
  ...props
}) => {
  return (
    <Switch
      defaultSelected={defaultSelected}
      isSelected={isSelected}
      size="lg"
      color="primary"
      aria-label="Dark mode toggle"
      {...props}
    />
  );
};

export default CustomSwitch;
