import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LaddersPage from "./Ladders.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/ladders" exact component={LaddersPage} />
      </Switch>
    </>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
