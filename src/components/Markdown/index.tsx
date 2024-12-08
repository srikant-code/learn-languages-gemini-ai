import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CustomCopyButton } from "../../pages/Chat";
import { AudioPlayer } from "../Audio";
import ParaGraph from "../Paragraph";

const Pre = ({ node, children, ...props }) => {
  //   console.log({ props, node });

  return (
    <div
      style={{}}
      className={`py-4 px-6 mb-6 rounded-2xl bg-gradient-to-tr from-slate-50 to-slate-200  dark:from-slate-800 dark:to-slate-900 relative`}
      {...props}>
      <div className="absolute right-3 top-3">
        <CustomCopyButton text={node?.children[0]?.children[0]?.value} />
      </div>
      <pre className="font-medium overflow-auto">{children}</pre>
    </div>
  );
};

const commonParaGraph = `font-bold block border-b-2 light:border-slate-100 dark:border-slate-700 pb-2 my-4 pt-2`;
const lineHeight = {
  lineHeight: "1.9rem",
};
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
    <ol style={{ ...lineHeight }} className="list-decimal p-6" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul style={{ ...lineHeight }} className="list-disc p-6" {...props} />
  ),
  li: ({ node, ...props }) => {
    const { children, ...other } = props;
    return (
      <li
        style={{ ...lineHeight }}
        className="list-disc pb-2 group relative"
        {...props}>
        <span className="group">{children} </span>
        {true && (
          <span
            // style={{
            //   visibility: focus ? "visible" : "hidden",
            //   opacity: focus ? 1 : 0,
            // }}
            className={`opacity-0 transition-opacity duration-200 group-hover:opacity-100 
        ease-in-out flex gap-2 absolute bottom-0 right-0 bg-slate-100 dark:bg-slate-800 rounded-2xl p-2 ${
          true ? "group-hover:opacity-100" : ""
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
      </li>
    );
  },
  code: ({ node, ...props }) => (
    <code
      style={{ ...lineHeight }}
      className="p-1 m-1 rounded-md  "
      {...props}
    />
  ),
  pre: Pre,
  p: ({ node, ...props }) => {
    const { children, ...other } = props;
    // console.log({ children, props });
    if (/^\[\d+(,\s*\d+)*\]$/.test(children)) {
      // This is an array, render it in a special way
      return <ParaGraph style={{ color: "red" }} {...props} />;
    }
    // This is not an array, render it normally
    return (
      <ParaGraph
        style={{ ...lineHeight }}
        className="py-1"
        enableHover
        {...other}>
        {children}
      </ParaGraph>
    );
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
