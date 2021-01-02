import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {
            color: "#ff9900"
        }
    }else{
        return {
            color: "#ffffff"
        }
    }
};


const Menu = ({history}) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link to="/" className="nav-link" style={isActive(history,"/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link" style={isActive(history,"/signin")}>
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" style={isActive(history,"/signup")}>
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
