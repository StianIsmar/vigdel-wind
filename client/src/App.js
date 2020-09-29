import React from "react";
import { Button, Card, Typography, Icon} from "@equinor/eds-core-react";
import './styles/App.css'
import {
    more_verticle
} from "@equinor/eds-icons";
import { Global } from "./styles/styles";

Icon.add({ more_verticle });



const App = () => {
  return (
    <>
      <Global />
      <div>
        <Button variant="outlined" color="secondary">
          This is the button
        </Button>
        <Card>
          <Card.CardHeader>
            <Card.CardHeaderTitle>
              <Typography variant="overline">Overline</Typography>
              <Typography variant="h6">Title goes here</Typography>
            </Card.CardHeaderTitle>
            <Button variant="ghost_icon">
              <Icon name="more_verticle" title="more action" size={48}></Icon>
            </Button>
          </Card.CardHeader>
        </Card>
      </div>
    </>
  );
};

export default App;
