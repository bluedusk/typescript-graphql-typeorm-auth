import React from "react";
import { Link } from "react-router-dom";
import { meQuery } from "../graphql/queries/me";
import { useQuery } from "@apollo/react-hooks";
import { MeQuery } from "../graphql/queries/__generated__/MeQuery";

export const Header = () => {
  const { data, loading } = useQuery<MeQuery>(meQuery);
  return (
    <div className="container is-fluid">
      <div className="notification">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              Home
            </a>

            <a className="navbar-item">About</a>

            {!data || loading ? null : !data.me ? (
              <div className="buttons">
                <Link to="/register" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/login" className="button is-light">
                  <strong>Log in</strong>
                </Link>
              </div>
            ) : (
              <Link className="navbar-item" to="/account">
                account
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
