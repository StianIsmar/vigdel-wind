import React, {  useState, useRef } from "react";



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


  return (
    <div ref={divRef}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        ref={svgRef}
      ></svg>
      
    </div>
  );
};

export default BeachAnimation;
