/* eslint-disable @typescript-eslint/no-explicit-any */
import "./dashboard-nav.scss";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import Bell from "../../assets/bell.svg";
import { Col, Dropdown, MenuProps, Row } from "antd";
import DropdownIcon from "../../assets/angle-down.svg";
import { useAuth0 } from "@auth0/auth0-react";

export const DashboardNav = () => {
  const [user, setUser] = useState<any>();
  const [profilePic, setProfilePic] = useState<any>();
  const { logout } = useAuth0();
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
      const picture = JSON.stringify(user.picture)
        .replace('"', "")
        .replace('"', "");

      setProfilePic(picture);
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
            {profilePic && (
              <>
                <img
                  src={profilePic}
                  alt="user"
                  className="dashboard-nav__id dashboard-nav__user-card-pic"
                  loading="lazy"
                />
              </>
            )}
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
        <div
          className="dashboard-nav__id dashboard-nav__user-logout"
          onClick={() => logout()}
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
          {profilePic && (
            <>
              <img
                src={profilePic}
                onClick={() => setDropdown(!dropdown)}
                alt="user"
                loading="lazy"
                className="dashboard-nav__user-profile"
              />
            </>
          )}
          {navDropdown()}
        </li>
      </ul>
    </nav>
  );
};
