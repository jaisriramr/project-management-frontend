/* eslint-disable @typescript-eslint/no-explicit-any */
import "./dashboard-nav.scss";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import Bell from "../../assets/bell.svg";

export const DashboardNav = () => {
  const [user, setUser] = useState<any>();
  const [dropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const element = e.target as HTMLElement;
      if (!element.classList.value.includes("dashboard-nav__id")) {
        setDropdown(false);
      }
    });

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const dropdownElement = document.querySelector(
      ".dashboard-nav__user-dropdown"
    ) as HTMLElement;
    if (dropdown) {
      dropdownElement.style.display = "block";
    } else {
      dropdownElement.style.display = "none";
    }
  }, [dropdown]);

  const navDropdown = () => {
    return (
      <div className="dashboard-nav__id dashboard-nav__user-dropdown">
        <div className="dashboard-nav__id dashboard-nav__user-account">
          <label className="dashboard-nav__id">Account</label>
          <div className="dashboard-nav__id dashboard-nav__user-card">
            <img
              src={user?.picture}
              alt="user"
              className="dashboard-nav__id dashboard-nav__user-card-pic"
            />
            <div className="dashboard-nav__id dashboard-nav__user-card-row">
              <h6 className="dashboard-nav__id">{user?.nickname}</h6>
              <p className="dashboard-nav__id">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="dashboard-nav__id dashboard-nav__divider"></div>
        <div className="dashboard-nav__id dashboard-nav__user-link">
          <span className="dashboard-nav__id">Organization</span>
        </div>
        <div className="dashboard-nav__id dashboard-nav__user-link">
          <span className="dashboard-nav__id">Settings</span>
        </div>
        <div className="dashboard-nav__id dashboard-nav__divider"></div>
        <div className="dashboard-nav__id dashboard-nav__user-logout">
          <span className="dashboard-nav__id">Log out</span>
        </div>
      </div>
    );
  };

  return (
    <nav className="dashboard-nav__container">
      <img src={Logo} alt="Logo" className="dashboard-nav__logo" />

      <ul className="dashboard-nav__links">
        <li className="dashboard-nav-link">
          <img src={Bell} alt="bell" className="dashboard-nav__bell" />
        </li>
        <li className="dashboard-nav-link">
          <img
            src={user?.picture}
            onClick={() => setDropdown(!dropdown)}
            alt="user"
            className="dashboard-nav__user-profile"
          />
          {navDropdown()}
        </li>
      </ul>
    </nav>
  );
};
