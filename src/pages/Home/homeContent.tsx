import { useEffect, useState } from "react";
import MarkdownRenderer from "../../components/Markdown";

interface HomeContentProps {}

const HomeContent: FunctionComponent<HomeContentProps> = () => {
  const [markDown, setMarkDown] = useState(null);

  useEffect(() => {
    import("../../../README.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => {
          setMarkDown(text);
          console.log(text);
        });
    });
  }, []);

  return (
    <div>
      <MarkdownRenderer markdownContent={markDown ?? ""} />
    </div>
  );
};

export default HomeContent;
