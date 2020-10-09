import React, { useState, useRef, useEffect } from "react";
import { select } from "d3";
import SwellCards from './SwellCards1'
import { useSelector } from "react-redux";


import Time from './Time'

import "./WaveAmimation2.css"
import CloudIcon from "@material-ui/icons/Cloud";
import {
  TemperatureSection,
  AirTemp,
  WaterTemp,
  ListDiv
} from "../styles/styles";

const Animation = () => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const [relevantIndex, setIndex] = useState(null)

  const [data, setData] = useState([25, 50, 50, 105, 240]);
  const [filteredData, setFilteredData] = useState(null);
  const svgRef = useRef();

  const divRef = useRef();

  var mswData = useSelector(state => { return state.swellReducer.swellData })

  var yrData = useSelector(state => { return state.swellReducer.windData })

  function closest(arr, val) {
    return Math.max.apply(null, arr.filter(function (v) { return v <= val }))
  }

  const getClosest = (arr, val) => {
    for (var i = 0; i < arr.length; i++) {

      if (arr[i] > val) {
        return arr[i - 1]
      }
    }
  }
  function* range1(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }


  const performFiltering =  () => {
    var d = new Date();
    const todayUtc = d.getTime()

    const filteredData = mswData.filter(x => (todayUtc - 1000000) <= (x.localTimestamp * 1000));
    
    //console.log(mswData.length - filteredData.length -1)
    //filteredData.unshift(mswData[mswData.length - filteredData.length -1])
    return filteredData.slice(0, 8)
  }


  useEffect(() => {
    const filt = performFiltering()
    setFilteredData(filt)

  }, [mswData])

  useEffect(() => {
    const currentHeight = divRef.current.offsetHeight;
    const currentWidth = divRef.current.offsetWidth;
    setHeight(currentHeight);
    setWidth(currentWidth);


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
      <TemperatureSection>
        <Time />
        <AirTemp>
          <CloudIcon color="primary" fontSize="large" style={{ color: "orange" }} />
          <h2>14°C</h2>
        </AirTemp>
      </TemperatureSection>


      <ListDiv>
        <div>Primary Swell ** Secondary Swell</div>
        <ul style={{ 'listStyleType': 'none','padding':'0px' }}>
          {console.log(filteredData)}
          {
            filteredData !== null &&
            filteredData.map(d => <SwellCards data={d} yrData={yrData} />)
          }
        </ul>
      </ListDiv>
    </div>
  );
};

export default Animation;


/*
      <svg width="100%" height="100%" preserveAspectRatio="none" ref={svgRef}>
        <circle />
        <circle />
      </svg>
*/