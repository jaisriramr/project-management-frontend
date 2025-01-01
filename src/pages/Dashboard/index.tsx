/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import "./index.scss";
import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { message } from "antd";
import { DashboardNav } from "../../components/dashboard-nav/dashboard-nav";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "../../services/project.service";
import DashboardSidebar from "../../components/dashboard-sidebar";

export const Dashboard = () => {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims, user } =
    useAuth0();
  const [userData, setUserData] = useState<any>();
  const [projectsNav, setProjectsNav] = useState<any>();

  const projectService = container.resolve(ProjectService);
  const userService = container.resolve(AuthService);
  const [roles, setRoles] = useState<any>();

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
      console.log(projects, user);
    }
  }, [projects]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
      const fetchRoles = async () => {
        if (isAuthenticated) {
          const claims = await getIdTokenClaims(); // Fetch ID token claims
          console.log(claims);
          const namespace = "pm/"; // Match namespace used in Auth0 Actions
          const userRoles = claims?.[`${namespace}roles`] || [];
          setRoles(userRoles); // Store roles in state
        }
      };
      fetchRoles();
    }

    if (localStorage.getItem("user")) {
      const userParsed = JSON.parse(localStorage.getItem("user") || "");
      setUserData(userParsed);
    }
  }, [isAuthenticated]);

  const getAccessToken = async () => {
    const access_token = await getAccessTokenSilently();
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", access_token);
  };

  return (
    <div className="dashboard-page">
      <DashboardNav />
      <main className="dashboard-main">
        <DashboardSidebar />
        <div className="dashboard-main-board"></div>
      </main>
    </div>
  );
};
