import React, { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./Login.page";
import SignupPage from "./Signup.page";

interface Props {}

const Auth: FC<Props> = (props) => {
  return (
    <>
      <Switch>
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Switch>
    </>
  );
};

Auth.defaultProps = {};

export default memo(Auth);
