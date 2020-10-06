import React, { useEffect, useState, useRef } from "react";
import { line, select, curveCardinal } from "d3";
import PoolIcon from "@material-ui/icons/Pool";
import CloudIcon from "@material-ui/icons/Cloud";
import WavesIcon from "@material-ui/icons/Waves";
import {
  Global,
  SvgDiv,
  BottomSvg,
  TemperatureSection,
  AirTemp,
  WaterTemp,
  SurfInfo,
} from "../styles/styles";

const BeachAnimation = () => {
  var range = function (start, stop, step) {
    step = step || 1;
    var arr = [];
    for (var i = start; i < stop; i += step) {
      arr.push(i);
    }
    return arr;
  };
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const [waveHeight, setWaveheight] = useState(1.2);

  const [data, setData] = useState([25, 50, 50, 105, 240]);
  const svgRef = useRef();

  const divRef = useRef();

  const sine = (x, phase) => {
    // A is the amplitude, x is the point
    return 40 * waveHeight * Math.sin(0.2 * (x - phase)) + 100;
  };

  useEffect(() => {
    const currentHeight = divRef.current.offsetHeight;
    const currentWidth = divRef.current.offsetWidth;
    setHeight(currentHeight);
    setWidth(currentWidth);

    const svg = select(svgRef.current);

    // const windPoints = [...Array(300).keys()];
    console.log("This is the stop value:", currentWidth);
    const windPoints = range(0, currentWidth, 0.1);
    console.log(windPoints);

    const yPoints = [];
    windPoints.forEach((p) => {
      yPoints.push(sine(p, 0));
    });
    console.log(yPoints);

    const myLine = line()
      .x((value, index) => index)
      .y((value) => value);

    svg
      .selectAll("path")
      .data([yPoints])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill-opacity", 1)
      .attr("fill", "white");

    // Now, update the view
  }, []);
  return (
    <div ref={divRef}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        ref={svgRef}
      ></svg>
      <div>OKK</div>
    </div>
  );
};

export default BeachAnimation;
