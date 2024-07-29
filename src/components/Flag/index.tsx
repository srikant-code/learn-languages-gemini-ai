import { STRINGS } from "../../utilities/constants";

interface FlagProps {}

const Flag: FunctionComponent<FlagProps> = ({ flag, className, ...props }) => {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: flag,
      }}
      className={`top-1 left-4 w-[140px] ${STRINGS.CLASSES.basicTransitions} ${className}`}></div>
  );
};

export default Flag;
