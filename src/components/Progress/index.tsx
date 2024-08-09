import { CircularProgress, Progress } from "@nextui-org/react";

interface CustomCircularProgressProps {}

const CustomCircularProgress: FunctionComponent<
  CustomCircularProgressProps
> = ({
  value = 70,
  strokeWidth = 4,
  showValueLabel = true,
  className = "",
  ...props
}) => {
  return (
    <div>
      <CircularProgress
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-3xl font-semibold text-white",
        }}
        aria-label="circular-progress"
        value={value}
        strokeWidth={strokeWidth}
        showValueLabel={showValueLabel}
        className={`${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomCircularProgress;

interface CustomProgressProps {}

export const CustomProgress: FunctionComponent<CustomProgressProps> = ({
  ...props
}) => {
  return <Progress aria-label="progress" {...props} />;
};
