interface FlagProps {}

const Flag: FunctionComponent<FlagProps> = ({ flag, ...props }) => {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: flag,
      }}></div>
  );
};

export default Flag;
