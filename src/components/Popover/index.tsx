import { Popover } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { WordHeader } from "../../pages/Dictionary/wordHeader";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { Sleep } from "../../utilities/utilities";
import CustomButton from "../Button";
import { CustomProgress } from "../Progress";

//I have this code now, I am wrapping the whole applicatiion(children) with popover. But still the popover is not working properly - it is not visible on screen and also the clicks are not logging the events.. Answer from the opened page documention -
// https://nextui.org/docs/components/popover#popover-props

export const TextSelectionPopover = ({ children }) => {
  const progressReset = 100;
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(progressReset); // Add this line
  const popoverRef = useRef(null);
  let interval = useRef(null); // Use a ref to store the interval id

  const location = useLocation();

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    // exclude in the login page
    setText(
      location.pathname === SlideIDs.login.route ? "" : selection.toString()
    );
  };

  const handleMouseDown = () => {};
  const totalTime = 50000;
  const step = 100;

  const clearTimer = () => {
    clearInterval(interval.current);
    setProgress(progressReset);
  };

  useEffect(() => {
    if (text?.trim()) {
      clearTimer();
      interval.current = setInterval(() => {
        setProgress((prevProgress) => {
          //prevProgress
          return prevProgress > 0
            ? prevProgress - progressReset / (totalTime / step)
            : 0;
        }); // decrease progress by 5% every second
      }, totalTime / (totalTime / step));
    } else {
      // If text is empty (popup is closed), clear the interval and reset the progress
      clearTimer();
    }
  }, [text]);

  useEffect(() => {
    if (progress <= 0) {
      Sleep(500).then(() => {
        setText("");
      });
      clearTimer();
    }
  }, [progress]);

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {children}
      <Popover showArrow>
        {
          <div
            ref={popoverRef}
            className={`${STRINGS.CLASSES.basicTransitions} ${
              progress < 99 && progress > 4 ? "opacity-100" : "opacity-0"
            } w-full flex items-end justify-center h-5`}
            style={{
              position: "fixed",
              bottom: 30,
            }}>
            <div
              className={`flex items-center justify-end py-4 px-6 border-3 shadow-xl dark:border-primary-300 absolute bg-white dark:bg-slate-950 rounded-3xl max-w-[80%] w-fit`}>
              <CustomButton
                isIconOnly
                className="shadow-lg rounded-full absolute right-[-5px] top-[-1rem] border-3 border-red-300"
                color="danger"
                size="sm"
                variant="solid"
                onClick={() => setProgress(0)}>
                <FaX />
              </CustomButton>
              <div className="text-small font-bold">
                <WordHeader data={{ word: text }} />
              </div>
              {/* <div className="text-tiny">This is the popover content</div> */}
              <CustomProgress
                size="sm"
                radius="sm"
                classNames={{
                  base: "absolute bottom-[-3px] w-[92%] left-[4%]",
                  track: "drop-shadow-md ",
                  indicator: STRINGS.CLASSES.gradientPinkYellow,
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                value={progress} // Use the progress state here
                // showValueLabel={true}
              />
            </div>
          </div>
        }
      </Popover>
    </div>
  );
};
