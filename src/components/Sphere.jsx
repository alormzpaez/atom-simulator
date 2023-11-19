import React, { useEffect, useRef } from "react";

const Sphere = ({ color = "#5cabff", show, isStatic = false, handleDimension = () => {}}) => {
  const ref = useRef(null)

  const handleDimensions = (element) => {
    const rect = element.getBoundingClientRect();
    handleDimension(rect.top + window.scrollY)
  }

  useEffect(() => {
    if (ref !== null && isStatic) {
      handleDimensions(ref.current)
    }
  }, [ref])

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        borderRadius: "50%",
        height: "37.5px",
        width: "37.5px",
        margin: "0",
        background: `radial-gradient(circle at 12.5px 12.5px, ${color}, #000)`,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <span>{show}</span>
    </div>
  );
};

export default Sphere;
