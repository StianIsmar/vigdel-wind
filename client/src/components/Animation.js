import React, { useState, useRef, useEffect, useCallback } from "react";
import { select, hsl } from "d3";

const Animation = () => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const [data, setData] = useState([25, 50, 50, 105, 240]);
  const svgRef = useRef();

  const divRef = useRef();

  useEffect(() => {
    const currentHeight = divRef.current.offsetHeight;
    const currentWidth = divRef.current.offsetWidth;
    setHeight(currentHeight);
    setWidth(currentWidth);

    console.log(divRef.current.offsetWidth);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join((enter) =>
        enter
          .append("circle")
          .attr("cy", (ycoord) => ycoord)
          .attr("r", 5)
      )
      .transition()
      .duration(2000)
      .attr("cx", 40)
      .attr("fill", "blue")
      .transition()
      .duration(10000)
      .attr("cx", currentWidth);
  }, []);

  return (
    <div ref={divRef}>
      <svg width="100%" height="100%" preserveAspectRatio="none" ref={svgRef}>
        <circle />
        <circle />
      </svg>
    </div>
  );
};

export default Animation;
