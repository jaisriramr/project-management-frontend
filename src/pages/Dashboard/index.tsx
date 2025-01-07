/* eslint-disable @typescript-eslint/no-explicit-any */

import "./index.scss";
import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { message } from "antd";
import { DashboardNav } from "../../components/dashboard-nav/dashboard-nav";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "../../services/project.service";
import DashboardSidebar from "../../components/dashboard-sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DashboardSearchbar from "../../components/dashboard-searchbar";

export const Dashboard = () => {
  const [userData, setUserData] = useState<any>();
  const [projectsNav, setProjectsNav] = useState<any>();

  const projectService = container.resolve(ProjectService);
  const userService = container.resolve(AuthService);
  const [roles, setRoles] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjectsOfOrg("org_CQG7EPOyiYzqzWfv"),
    enabled: !!userData?.org_id,
  });

  useEffect(() => {
    if (projects && !isLoading && !isError) {
    }
  }, [projects]);

  return (
    <div className="dashboard-page">
      <DashboardNav />
      <main className="dashboard-main">
        <DashboardSidebar />
        <div className="dashboard-main-board">
          <Outlet />
          {/* <div className="dashboard-main__board-nav">
            <Link to={"/dashboard/projects"}>Projects</Link>
            <span>/</span>
            <Link to={"/dashboard/projects"}>Project Dev</Link>
          </div>
          <h4 className="dashboard-main__board-nav-title">Board</h4>
          <DashboardSearchbar org_id={userData?.org_id} /> */}
        </div>
      </main>
    </div>
  );
};
