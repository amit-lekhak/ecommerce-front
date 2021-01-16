import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#ff9900",
    };
  } else {
    return {
      color: "#ffffff",
    };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/">A-ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ml-5" >
          
            <Link to="/" className="nav-link" style={isActive(history, "/")}>
              Home
            </Link>
            <Link
              to="/shop"
              className="nav-link"
              style={isActive(history, "/shop")}
            >
              Shop
            </Link>

            <Link
              to="/cart"
              className="nav-link"
              style={isActive(history, "/cart")}
            >
              Cart
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                to="/user/dashboard"
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                to="/admin/dashboard"
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
              >
                Dashboard
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive(history, "/signin")}
                >
                  Signin
                </Link>
                <Link
                  to="/signup"
                  className="nav-link"
                  style={isActive(history, "/signup")}
                >
                  Signup
                </Link>
              </Fragment>
            )}
            {isAuthenticated() && (
              <span
                onClick={() => signout(() => history.push("/"))}
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Signout
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Menu);
