import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineHome } from "react-icons/md";
import { PiBrainBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSetHeaderTitle } from "../../hooks/useSetHeaderTitle";
import { CustomCopyButton } from "../../pages/Chat";
import { STRINGS } from "../../utilities/constants";
import { AudioPlayer } from "../Audio";
import CustomButton from "../Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ParaGraphProps {}

const ParaGraph: FunctionComponent<ParaGraphProps> = ({
  children,
  className,
  enableHover = false,
  ...props
}) => {
  // const [focus, setFocus] = useState(false);
  return (
    <p
      //   dark:bg-gray-800 bg-white
      className={`dark:text-white  light:text-black text-foreground flex flex-col items-start justify-start text-left group relative ${className}`}
      // isPressable
      // tabIndex={1}
      // onFocus={() => setFocus(true)}
      // onBlur={() => setFocus(false)}
      {...props}>
      <span className="flex items-center w-full gap-4 justify-start">
        {children}
      </span>
      {enableHover && (
        <span
          // style={{
          //   visibility: focus ? "visible" : "hidden",
          //   opacity: focus ? 1 : 0,
          // }}
          className={`opacity-0 transition-opacity duration-200 group-hover:opacity-100 
        ease-in-out flex gap-2 absolute bottom-0 right-0 bg-slate-100 dark:bg-slate-800 rounded-2xl p-2 ${
          enableHover ? "group-hover:opacity-100" : ""
        }`}>
          <CustomCopyButton text={children} size="sm" />
          <AudioPlayer
            text={children}
            buttonProps={{
              size: "sm",
              variant: "flat",
            }}
          />
        </span>
      )}
    </p>
  );
};

export default ParaGraph;

export const IconHeader = ({ children, title, icon, className, ...props }) => {
  useSetHeaderTitle(title);
  const navigate = useNavigate();
  const isInternalRoute =
    window.location.pathname.split("/").filter((i) => i).length > 1;

  const [parent] = useAutoAnimate();
  return (
    <ParaGraph
      className={`headerText z-30 w-full flex flex-row gap-4 py-4 px-0 mb-2 items-center ${className}`}
      {...props}
      ref={parent}>
      {isInternalRoute && (
        <>
          <CustomButton
            isIconOnly
            onClick={() => navigate(-1)}
            variant={"flat"}>
            <FaArrowLeft />
          </CustomButton>
          <CustomButton
            isIconOnly
            onClick={() => navigate("/courses")}
            variant={"flat"}>
            <MdOutlineHome className="text-2xl" />
          </CustomButton>
        </>
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
