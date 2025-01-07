import { Outlet } from "react-router-dom";
import "./index.scss";
import { DashboardNav } from "../../components/dashboard-nav/dashboard-nav";
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { userData } from "../../atom/atom";

const CrudLayout = () => {
  const [user, setUser] = useRecoilState<any>(userData);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const decoded = jwtDecode.jwtDecode(
        localStorage.getItem("access_token") || ""
      );
      console.log(decoded);
      setUser(decoded);
    }
  }, []);

  return (
    <div>
      <DashboardNav />
      <div className="layout">
        <Outlet />
      </div>
    </div>
  );
};

export default CrudLayout;
