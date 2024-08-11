import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ParaGraph from "../Paragraph";
import { useRef } from "react";

interface CustomPopoverProps {}

const CustomPopover: FunctionComponent<CustomPopoverProps> = ({
  contentProps = {},
  popoverProps = {},
  content,
  children,
}) => {
  return (
    <Popover
      showArrow
      backdrop="opaque"
      placement="right"
      triggerType="dialog"
      classNames={{
        base: [
          // arrow color
          "before:bg-default-200",
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-gradient-to-br from-white to-default-300",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
      {...popoverProps}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="">
        {(titleProps) => (
          <div className="px-1 py-2" {...contentProps}>
            <ParaGraph className="text-small font-bold" {...titleProps}>
              {content ?? "hello"}
            </ParaGraph>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;

export const PopOverProps = {
  showArrow: false,
  // backdrop: "transparen",
  placement: "bottom",
  triggerType: "dialog",
  shouldCloseOnBlur: true,
  classNames: {
    base: [
      // arrow color
      "before:bg-default-200",
    ],
    content: [
      "py-3 px-4 border border-default-200",
      "bg-gradient-to-br from-white to-default-300",
      "dark:from-default-100 dark:to-default-50",
    ],
  },
};
