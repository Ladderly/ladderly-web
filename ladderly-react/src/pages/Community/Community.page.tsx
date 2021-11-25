import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import CommunityNavbar from "../../components/CommunityNavbar";
import HomePage from "./Home.page";
import QuestionPage from "./Question.page";
import QuestionListPage from "./QuestionList.page";

interface Props {}

const Community: FC<Props> = (props) => {
  return (
    <>
      <CommunityNavbar />
      <Switch>
        <Route path="/community" exact component={HomePage} />
        <Route
          path="/community/questionlist"
          exact
          component={QuestionListPage}
        />
        <Route
          path="/community/question/:questionID"
          exact
          component={QuestionPage}
        />
      </Switch>
    </>
  );
};

Community.defaultProps = {};

export default memo(Community);
