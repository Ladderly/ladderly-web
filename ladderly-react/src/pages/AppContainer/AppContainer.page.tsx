import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LaddersPage from "./Ladders.page";
import ProblemListPage from "./ProblemList.page";
import ProfilePage from "./Profile.page";
import TopicsPage from "./Topics.page";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/ladders" exact component={LaddersPage} />
        <Route path="/ladders/:ladderID" exact component={TopicsPage} />
        <Route
          path="/ladders/:ladderID/:topic"
          exact
          component={ProblemListPage}
        />
        <Route path="/profile/:userID" exact component={ProfilePage} />
      </Switch>
    </>
  );
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
