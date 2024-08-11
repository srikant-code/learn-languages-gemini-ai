import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSetHeaderTitle } from "../../hooks/useSetHeaderTitle";
import CustomButton from "../Button";
import { PiBrainBold } from "react-icons/pi";
import { STRINGS } from "../../utilities/constants";

interface ParaGraphProps {}

const ParaGraph: FunctionComponent<ParaGraphProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      //   dark:bg-gray-800 bg-white
      className={`dark:text-white  light:text-black text-foreground ${className}`}
      {...props}>
      {children}
    </p>
  );
};

export default ParaGraph;

export const IconHeader = ({ children, title, icon, className, ...props }) => {
  useSetHeaderTitle(title);
  const navigate = useNavigate();
  const isInternalRoute =
    window.location.pathname.split("/").filter((i) => i).length > 1;

  return (
    <ParaGraph
      className={`headerText z-30 w-full flex flex-row gap-4 py-4 px-0 mb-2 items-center ${className}`}
      {...props}>
      {isInternalRoute && (
        <CustomButton isIconOnly onClick={() => navigate(-1)} variant={"flat"}>
          <FaArrowLeft />
        </CustomButton>
      )}
      {icon ?? null}
      {children}
    </ParaGraph>
  );
};

export const IconHeaderNonSticky = ({
  children,
  title = "Practice here",
  Icon = PiBrainBold,
  className,
  ...props
}) => {
  return (
    <div className={"flex items-center gap-2 py-2"} {...props}>
      {Icon ? <Icon className="text-2xl" /> : null}
      <ParaGraph className={`${STRINGS.CLASSES.heading} ${className}`}>
        {title}
      </ParaGraph>
      {children}
    </div>
  );
};
