import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FunctionalVsClass from "./Pages/FunctionalVsClass";
import HooksState from "./Pages/HooksState";
import test from "./Pages/HooksState/test";
import useMemo from "./Pages/HooksState/UseMemo";
import CustomHook from "./Pages/CustomHook";

function Routes() {
    return (
      <Router>
        <Switch>
          <Route exact path="/1" component={FunctionalVsClass} />
          <Route exact path="/2" component={HooksState} />
          <Route exact path="/usememo" component={useMemo} />
          <Route exact path="/3" component={CustomHook} />
          <Route exact path="/4" component={test} />
        </Switch>
      </Router>
    );
}

export default Routes;