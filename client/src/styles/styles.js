import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden; 
    user-select: none;
    background-color: #eaeaea;
    --padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction:column;
  }
`;
const SvgDiv = styled.div`
  width: 100%;
  background-color: #8bd8f3;
  height: 40%;
`;
const BeachDiv = styled.div`
  width: 100%;
  background-color: #dfce9d;
  height: 30%;
`;

const BottomSvg = styled.div`
  width: 100%;
  background-color: #0099ff;
  height: 30%;
`;

const TemperatureSection = styled.div`
  display: flex;
  flex-direction: row !important;
  margin-top: 0;
  justify-content: space-evenly;
`;
const AirTemp = styled.div``;
const WaterTemp = styled.div``;
const SurfInfo = styled.div``;

export {
  Global,
  SvgDiv,
  BottomSvg,
  TemperatureSection,
  AirTemp,
  WaterTemp,
  SurfInfo,
  BeachDiv,
};
