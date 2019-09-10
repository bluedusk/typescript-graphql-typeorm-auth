import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";
import { Account } from "./modules/account/Account";
import { PaidUsers } from "./modules/account/PaidUsers";
import { SubscribeUser } from "./modules/account/SubscribeUser";
import { Header } from "./shared/Header";
import { MeView } from "./modules/user/MeView";

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
              <div className="column is-half is-offset-one-quarter">
                <Route path="/register" component={RegisterView} />
                <Route path="/me" component={MeView} />
                <Route path="/account" component={Account} />
                <Route path="/paid-users" component={PaidUsers} />
                <Route path="/subscription" component={SubscribeUser} />
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
