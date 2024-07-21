import { useEffect, useState } from "react";
import { FooterSlogans, STRINGS } from "../../utilities/constants";
import ParaGraph from "../Paragraph";
import { useLocation } from "react-router-dom";

const Footer = ({}) => {
  const location = useLocation();
  const initializeSlogan = () => {
    return FooterSlogans[location.pathname] || FooterSlogans["/"];
  };
  const [footerObj, setFooterObj] = useState(initializeSlogan());
  useEffect(() => {
    setFooterObj(initializeSlogan());
  }, [location.pathname]);
  return (
    <div className="p-4 flex flex-col gap-3">
      <ParaGraph className="text-2xl sriracha">{footerObj?.slogan}</ParaGraph>
      <ParaGraph className="uppercase text-sm">{footerObj?.subtext}</ParaGraph>
      <ParaGraph className="text-xs">{STRINGS.TEXT.FOOTER_MADE_BY}</ParaGraph>
    </div>
  );
};

export default Footer;
