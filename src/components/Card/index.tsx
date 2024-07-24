import React from "react";

const GradientBackground = ({
  gradientColors = [
    "#000000",
    "#1d3022",
    "#3b6144",
    "#599266",
    "#77c388",
    "#95f4ab",
  ],
  children,
  ...props
}) => {
  const gradientStyle = {
    background: `linear-gradient(45deg, ${gradientColors.join(",")})`,
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
  };

  return <div style={gradientStyle} children={children} {...props} />;
};

export default GradientBackground;
