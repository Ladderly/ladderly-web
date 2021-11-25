import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AppContainerPage from "./pages/AppContainer/AppContainer.page";
import AuthPage from "./pages/Auth/Auth.page";
import CommunityPage from "./pages/Community/Community.page";
import NotFoundPage from "./pages/NotFound.page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/ladders" />
          </Route>
          <Route path={["/signin", "/signup"]} exact component={AuthPage} />
          <Route
            path={[
              "/ladders",
              "/ladders/:ladderID",
              "/ladders/:ladderID/:topic",
              "/profile/:userID",
            ]}
            exact
            component={AppContainerPage}
          />
          <Route
            path={[
              "/community",
              "/community/questionList",
              "/community/question/:questionID",
            ]}
            exact
            component={CommunityPage}
          />
          <Route path="/404" exact component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
