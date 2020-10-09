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
    font-size:22px;
  }
`;
const SvgDiv = styled.div`
  width: 100%;
  background-color: #8bd8f3;
  height: 70%;
`;
const BeachDiv = styled.div`
  width: 100%;
  background-color: #dfce9d;
  height: 30%;
  overflow-y: hidden !important; 

`;

const BottomSvg = styled.div`
  width: 100%;
  background-color: #015871;
  height: 30%;
  background: linear-gradient(to top, #479EB1 1%,#479EB1 70%,#015871 100%); 
  overflow-y: hidden !important; 

`;

const TemperatureSection = styled.div`
  display: flex;
  flex-direction: row !important;
  margin-top: 30px;
  justify-content: space-evenly;
  color:orange;
`;
const AirTemp = styled.div``;
const WaterTemp = styled.div`
`;
const SurfInfo = styled.div`
`;


const NumberDiv = styled.div`
font-size: 22px;
color: #333;

`

const ArrowDiv = styled.div`

display:flex;
flex-direction: column;
width:30px;
height:30px;
color:orange;
font-size:30px;
`

const OuterDiv = styled.div`
  
  display: flex;
  flex-grow:1;
  text-align:center;
  align-items: center;
  flex-direction: row;
  background-color: #333;
  margin-bottom: 8px;
  min-width: 275;
  border-radius:4px;
  list-style-type: none;
  padding: 12px;
  font-size: 22px;
  color:  orange;
  justify-content:space-evenly;

`
const ColumnElement = styled.div`
display:flex
  --margin:12px;
  font-size: 22px;



`



const ListDiv = styled.div`

padding:40px;


`
const CardDiv = styled.div`
  margin-bottom: 4px;
  padding: 12px;
  font-size: 22px;
  color:  orange;
  justify-content:center;


`

const StyledH1 = styled.h1`
display: flex;
align-items: center;
justify-content:center;
font-size:50px !important;
`



export {
  Global,
  SvgDiv,
  BottomSvg,
  TemperatureSection,
  AirTemp,
  WaterTemp,
  SurfInfo,
  BeachDiv, NumberDiv, ArrowDiv, CardDiv, OuterDiv, ListDiv, StyledH1,ColumnElement
};
