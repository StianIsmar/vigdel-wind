import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animation from "./components/Animation";
import WaveAnimation from "./components/WaveAnimation";
import BeachAnimation from "./components/BeachAnimation";

import { getWindFromApi } from "./actions/windActions";

import { Button, Card, Typography, Icon } from "@equinor/eds-core-react";
import "./styles/App.css";
import { more_verticle } from "@equinor/eds-icons";
import { Global, SvgDiv, BottomSvg, BeachDiv } from "./styles/styles";

Icon.add({ more_verticle });

const App = () => {
  const wind = useSelector((state) => {
    return state.windReducer.windData;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWindFromApi());
  }, []);

  return (
    <React.Fragment>
      <Global />
      <SvgDiv>
        <Animation />
      </SvgDiv>
      <BeachDiv>
        <BeachAnimation />
      </BeachDiv>
      <BottomSvg>
        <WaveAnimation />
      </BottomSvg>
    </React.Fragment>
  );
};

export default App;
