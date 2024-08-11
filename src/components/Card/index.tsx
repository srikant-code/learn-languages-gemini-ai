import { Card } from "@nextui-org/react";
import React from "react";
import ParaGraph from "../Paragraph";
import { STRINGS } from "../../utilities/constants";
import CustomButton from "../Button";

const GradientBackground = ({
  gradientColors = [
    "#000000",
    "#1d3022",
    "#3b6144",
    "#599266",
    "#77c388",
    "#95f4ab",
  ],
  children,
  ...props
}) => {
  const gradientStyle = {
    background: `linear-gradient(45deg, ${gradientColors.join(",")})`,
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
  };

  return <div style={gradientStyle} children={children} {...props} />;
};

export default GradientBackground;

export const CustomCard = React.forwardRef(
  ({ className, border = true, removeAllClasses = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={
          removeAllClasses
            ? className
            : `shadow-none ${
                border ? "border dark:border-slate-600" : ""
              } rounded-3xl relative p-6 pb-8 min-w-fit bg-gradient-to-bl from-white  to-slate-100 dark:bg-gradient-to-tr dark:from-slate-900  dark:to-slate-800 ${className}`
        }
        {...props}
      />
    );
  }
);

export const CustomCardHeaderChild = ({ header, child, rightContent }) => {
  return (
    <CustomCard
      as={CustomButton}
      className={
        "flex flex-row p-4 px-6 justify-between items-center gap-4 min-w-fit"
      }>
      <div className="flex flex-col items-start">
        <ParaGraph className={`${STRINGS.CLASSES.subText}`}>{header}</ParaGraph>
        <ParaGraph className={`${STRINGS.CLASSES.subHeading}`}>
          {child}
        </ParaGraph>
      </div>
      {rightContent && <div>{rightContent}</div>}
    </CustomCard>
  );
};
