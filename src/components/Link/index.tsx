import { Link } from "@nextui-org/react";

interface CustomLinkProps {}

const CustomLink: FunctionComponent<CustomLinkProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <Link className={`cursor-pointer ${className}`} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
