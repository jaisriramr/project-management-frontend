/* eslint-disable @typescript-eslint/no-explicit-any */

import "./index.scss";
import { useEffect } from "react";
import { DashboardNav } from "../../components/dashboard-nav/dashboard-nav";
import DashboardSidebar from "../../components/dashboard-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../../atom/atom";
import * as jwtDecode from "jwt-decode";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<any>(userData);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }
    {
      const decoded = jwtDecode.jwtDecode(
        localStorage.getItem("access_token") || ""
      );
      setUser(decoded);
    }
  }, []);

  return (
    <div className="dashboard-page">
      <DashboardNav />
      <main className="dashboard-main">
        <DashboardSidebar />
        <div className="dashboard-main-board">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
