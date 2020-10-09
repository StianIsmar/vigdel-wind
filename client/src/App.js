import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animation from "./components/Animation";
import WaveAnimation2 from "./components/WaveAnimation2";
import BeachAnimation from "./components/BeachAnimation";
import { getSwellFromApi } from "./actions/windActions";
import Time from './components/Time'

import { Button, Card, Typography, Icon } from "@equinor/eds-core-react";
import "./styles/App.css";
import { more_verticle } from "@equinor/eds-icons";
import { Global, SvgDiv, BottomSvg, BeachDiv, StyledH1 } from "./styles/styles";

Icon.add({ more_verticle });

const App = () => {
  var mswData = useSelector(state => { return state.swellReducer.swellData })

  const swell = useSelector((state) => {
    return state.swellReducer.swellData;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSwellFromApi());
  }, []);

  return (
    <>
      <Global />
      <SvgDiv>
        <Time />
        <StyledH1>Bølgevarsel Bore</StyledH1>
        <Animation />
      </SvgDiv>

      <BottomSvg>
        <WaveAnimation2 />
      </BottomSvg>
    </>
  );
};

export default App;


