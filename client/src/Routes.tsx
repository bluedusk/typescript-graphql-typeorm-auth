import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";
import { Account } from "./modules/account/Account";
import { PaidUsers } from "./modules/account/PaidUsers";
import { Header } from "./shared/Header";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route
          path="/"
          render={() => (
            <>
              <Header />
              <div>
                <Route path="/register" component={RegisterView} />
                <Route path="/account" component={Account} />
                <Route path="/paid-users" component={PaidUsers} />
                <Route
                  exact={true}
                  path="/"
                  render={() => <div>homepage</div>}
                />
              </div>
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
