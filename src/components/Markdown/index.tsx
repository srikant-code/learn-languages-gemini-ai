import { useState } from "react";
import { FaCheck, FaClipboard } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyToClipboard, Sleep } from "../../utilities/utilities";
import CustomButton from "../Button";
import ParaGraph from "../Paragraph";
import { STRINGS } from "../../utilities/constants";
import { Code } from "@nextui-org/react";

const Pre = ({ node, children, ...props }) => {
  //   console.log({ props, node });
  const [copied, setCopied] = useState(null);

  return (
    <div
      style={{}}
      className={`py-4 px-6 mb-6 rounded-2xl ${STRINGS.CLASSES.gradientPinkRed} bg-slate-200 dark:bg-slate-700 relative`}
      {...props}>
      <div className="absolute right-3 top-3">
        <CustomButton
          isIconOnly
          onClick={() => {
            setCopied(CopyToClipboard(node?.children[0]?.children[0]?.value));
            Sleep(2000).then(() => setCopied(null));
          }}
          color={copied === false ? "danger" : copied ? "success" : "default"}
          className="">
          {copied === false ? <FaX /> : copied ? <FaCheck /> : <FaClipboard />}
        </CustomButton>
      </div>
      <pre className="font-medium text-white overflow-auto">{children}</pre>
    </div>
  );
};

const commonParaGraph = `font-bold block border-b-2 light:border-slate-100 dark:border-slate-700 pb-2 my-4 pt-2`;

const components = {
  h1: ({ node, ...props }) => (
    <ParaGraph
      style={{}}
      className={`text-4xl ${commonParaGraph}`}
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <ParaGraph
      style={{}}
      className={`text-3xl ${commonParaGraph}`}
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <ParaGraph
      style={{}}
      className={`text-2xl ${commonParaGraph}`}
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <ParaGraph style={{}} className={`text-xl ${commonParaGraph}`} {...props} />
  ),
  h5: ({ node, ...props }) => (
    <ParaGraph style={{}} className={`text-lg ${commonParaGraph}`} {...props} />
  ),
  h6: ({ node, ...props }) => (
    <ParaGraph style={{}} className={`text-md ${commonParaGraph}`} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol style={{}} className="list-decimal p-6" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul style={{}} className="list-disc p-6" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li style={{}} className="list-disc pb-2" {...props} />
  ),
  code: ({ node, ...props }) => (
    <code
      style={{}}
      className="p-1 m-1 rounded-md bg-slate-200 dark:bg-slate-700 "
      {...props}
    />
  ),
  pre: Pre,
  p: ({ node, ...props }) => {
    const { value } = props;
    if (/^\[\d+(,\s*\d+)*\]$/.test(value)) {
      // This is an array, render it in a special way
      return <ParaGraph style={{ color: "red" }} {...props} />;
    }
    // This is not an array, render it normally
    return <ParaGraph {...props} />;
  },
  // Add more components as needed
};

const MarkdownRenderer = ({ markdownContent }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdownContent}
    </ReactMarkdown>
  );
  //  remarkPlugins={["a" ?? remarkGfm]}
};

export default MarkdownRenderer;
