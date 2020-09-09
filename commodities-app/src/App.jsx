import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

// Components
import Navbar from "./components/Navbar";
import Commodities from "./components/Commodities";
import AdminCommodities from "./components/AdminCommodities";
import SurveyorCommodities from "./components/SurveyorCommodities";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column width="2" />
            <Grid.Column width="12">
              <Route path="/*" component={Navbar} />
              <Route exact path="/" component={Commodities} />
              <Route path="/home" component={Commodities} />
              <Route path="/admin" component={AdminCommodities} />
              <Route path="/surveyor" component={SurveyorCommodities} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Grid.Column>
            <Grid.Column width="2" />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
