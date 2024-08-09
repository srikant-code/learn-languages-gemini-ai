import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSetHeaderTitle } from "../../hooks/useSetHeaderTitle";
import CustomButton from "../Button";

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
        <CustomButton isIconOnly onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </CustomButton>
      )}
      {icon ?? null}
      {children}
    </ParaGraph>
  );
};
