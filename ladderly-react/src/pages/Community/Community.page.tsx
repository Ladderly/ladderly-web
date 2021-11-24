import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HomePage from "./Home.page";

interface Props {}

const Community: FC<Props> = (props) => {
  return <>
  <Navbar />
    <Switch>
      <Route path="/community" exact component={HomePage}/>
    </Switch>
  </>;
};

Community.defaultProps = {};

export default memo(Community);
