import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";

// Components
import Navbar from "./components/Navbar";
import Commodities from "./components/Commodities";
import AdminCommodities from "./components/AdminCommodities";
import SurveyorCommodities from "./components/SurveyorCommodities";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Router>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column width="2" />
            <Grid.Column width="12">
              {/* <Navbar /> */}
              <Route exact path="/*" component={Navbar} />
              <Route exact path="/" component={Commodities} />
              <Route exact path="/home" component={Commodities} />
              <Route exact path="/admin" component={AdminCommodities} />
              <Route exact path="/surveyor" component={SurveyorCommodities} />
              <Route exact path="/login" component={Login} />
            </Grid.Column>
            <Grid.Column width="2" />
          </Grid.Row>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
