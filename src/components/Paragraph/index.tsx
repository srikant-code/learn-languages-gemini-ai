interface ParaGraphProps {}

const ParaGraph: FunctionComponent<ParaGraphProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      //   dark:bg-gray-800 bg-white
      className={`dark:text-white  text-black ${className}`}
      {...props}>
      {children}
    </p>
  );
};

export default ParaGraph;

export const IconHeader = ({ children, icon, className, ...props }) => {
  return (
    <ParaGraph
      className={`headerText sticky top-[4rem] bg-white dark:bg-slate-900 z-30  w-full flex flex-row gap-4 py-4 px-4 mb-4 items-center ${className}`}
      {...props}>
      {icon ?? null}
      {children}
    </ParaGraph>
  );
};
