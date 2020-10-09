import React from "react"
import { useSelector } from "react-redux";
import "./WaveAmimation2.css"
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



const WaveAnimation2 = () => {

  
  const mswData = useSelector(state => {return state.swellReducer.swellData})

  return (
    <div className="ocean-div">

      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
        <TemperatureSection>

          <WaterTemp>
            <PoolIcon
              color="primary"
              fontSize="large"
              style={{ color: "orange" }}
            />
            <h2>16°C</h2>
          </WaterTemp>

        </TemperatureSection>

      </div>
    </div>)

}
export default WaveAnimation2

