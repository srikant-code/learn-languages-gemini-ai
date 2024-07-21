import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    breakpoint: IdentifyBreakPoints(width),
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// 320px — 480px: Mobile devices. //xs
// 481px — 768px: iPads, Tablets. //sm
// 769px — 1024px: Small screens, laptops. //md
// 1025px — 1200px: Desktops, large screens. //lg
// 1201px and more — Extra large screens, TV. //xl

const Breakpoints = {
  xs: {
    minWidth: 0,
    maxWidth: 480,
  },
  sm: {
    minWidth: 481,
    maxWidth: 768,
  },
  md: {
    minWidth: 769,
    maxWidth: 1024,
  },
  lg: {
    minWidth: 1025,
    maxWidth: 1200,
  },
  xl: {
    minWidth: 1201,
    maxWidth: 1501,
  },
  xl2: {
    minWidth: 1501,
    maxWidth: 8000,
  },
};

const IdentifyBreakPoints = (width) => {
  if (width >= Breakpoints.xl2.minWidth && width <= Breakpoints.xl2.maxWidth)
    return { active: "xl2" };
  else if (width >= Breakpoints.xl.minWidth && width <= Breakpoints.xl.maxWidth)
    return { active: "xl" };
  else if (width >= Breakpoints.lg.minWidth && width <= Breakpoints.lg.maxWidth)
    return { active: "lg" };
  else if (width >= Breakpoints.md.minWidth && width <= Breakpoints.md.maxWidth)
    return { active: "md" };
  else if (width >= Breakpoints.sm.minWidth && width <= Breakpoints.sm.maxWidth)
    return { active: "sm" };
  else return { active: "xs" };
};

export const ResponsiveEffect = (breakpoints) => {
  const { breakpoint } = useWindowDimensions();
  return breakpoints[breakpoint.active];
};
