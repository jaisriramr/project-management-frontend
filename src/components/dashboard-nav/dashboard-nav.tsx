/* eslint-disable @typescript-eslint/no-explicit-any */
import "./dashboard-nav.scss";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import Bell from "../../assets/bell.svg";
import { Col, Dropdown, MenuProps, Row } from "antd";
import DropdownIcon from "../../assets/angle-down.svg";
import * as jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const DashboardNav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [profilePic, setProfilePic] = useState<any>();

  const [dropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const element = e.target as HTMLElement;
      if (!element.classList.value.includes("dashboard-nav__id")) {
        setDropdown(false);
      }
    });

    if (localStorage.getItem("access_token")) {
      const decoded: any = jwtDecode.jwtDecode(
        localStorage.getItem("access_token") || ""
      );
      console.log(decoded);
      if (decoded?.picture) {
        setProfilePic(decoded?.picture);
      }
      setUser(decoded);
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

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  const navDropdown = () => {
    return (
      <div className="dashboard-nav__id dashboard-nav__user-dropdown">
        <div className="dashboard-nav__id dashboard-nav__user-account">
          <label className="dashboard-nav__id">Account</label>
          <div className="dashboard-nav__id dashboard-nav__user-card">
            {profilePic ? (
              <>
                <img
                  src={profilePic}
                  alt="user"
                  className="dashboard-nav__id dashboard-nav__user-card-pic"
                  loading="lazy"
                />
              </>
            ) : (
              <div className="dashboard-nav__user-pic">
                {String(user?.name).slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="dashboard-nav__id dashboard-nav__user-card-row">
              <h6 className="dashboard-nav__id">{user?.name}</h6>
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
        <div
          className="dashboard-nav__id dashboard-nav__user-logout"
          onClick={() => handleLogout()}
        >
          <span className="dashboard-nav__id">Log out</span>
        </div>
      </div>
    );
  };

  const items: MenuProps["items"] = [
    {
      label: "One",
      key: "0",
    },
  ];

  return (
    <nav className="dashboard-nav__container">
      <div className="dashboard-nav__links">
        <img src={Logo} alt="Logo" className="dashboard-nav__logo" />
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Row align={"middle"} style={{ cursor: "pointer" }}>
            <Col style={{ fontSize: "16px", fontWeight: "500" }}>Projects</Col>
            <Col>
              <img
                src={DropdownIcon}
                alt="down"
                className="dashboard-nav__small-svg"
              />
            </Col>
          </Row>
        </Dropdown>
      </div>

      <ul className="dashboard-nav__links">
        <li className="dashboard-nav-link">
          <img src={Bell} alt="bell" className="dashboard-nav__bell" />
        </li>
        <li className="dashboard-nav-link">
          {profilePic ? (
            <>
              <img
                onClick={() => setDropdown(!dropdown)}
                src={profilePic}
                alt="user"
                className="dashboard-nav__id dashboard-nav__user-card-pic"
                loading="lazy"
              />
            </>
          ) : (
            <div
              className="dashboard-nav__user-pic"
              onClick={() => setDropdown(!dropdown)}
            >
              {String(user?.name).slice(0, 2).toUpperCase()}
            </div>
          )}
          {navDropdown()}
        </li>
      </ul>
    </nav>
  );
};
