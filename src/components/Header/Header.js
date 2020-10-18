import React from "react";

import logo from "../../assets/images/google.png";
import search from "../../assets/images/search.svg";

import "./Header.scss";

export default function Header() {
  return (
    <div className="header-container">
      <img className="logo" alt="fleetx" src={logo} />

      <div className="bar">
        <input className="searchbar" type="text" title="Search" />
        <a href="#">
          <img className="voice" src={search} title="Search" />
        </a>
      </div>
    </div>
  );
}
