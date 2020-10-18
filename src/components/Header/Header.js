import React from "react";

import logo from "../../assets/images/google.png";
import search from "../../assets/images/search.svg";

import "./Header.scss";

export default function Header() {
  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="Google" />

      <div className="bar">
        <input className="searchbar" type="text" title="Search" />
        <a href="#0">
          <img className="voice" src={search} title="Search" alt="search" />
        </a>
      </div>
    </div>
  );
}
