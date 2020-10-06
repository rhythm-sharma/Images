import React from "react";

import logo from "../../assets/images/logo.svg";

import "./Header.scss";

export default function Header() {
  return (
    <div className="header-container">
      <img class="logo" alt="fleetx" src={logo} />

      <div className="bar">
        <input className="searchbar" type="text" title="Search" />
        <a href="#">
          <img
            className="voice"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
            title="Search by Voice"
          />
        </a>
      </div>
    </div>
  );
}
