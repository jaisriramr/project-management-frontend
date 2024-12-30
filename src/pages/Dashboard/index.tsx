/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import "./index.scss";
import { useEffect } from "react";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import { message } from "antd";
import { DashboardNav } from "../../components/dashboard-nav/dashboard-nav";

export const Dashboard = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const userService = container.resolve(AuthService);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
    }

    if (localStorage.getItem("user")) {
      const userParsed = JSON.parse(localStorage.getItem("user") || "");
      userService
        .getUserByEmail(userParsed?.email)
        .then((response) => {
          console.log("REES ", response);
        })
        .catch((err) => {
          message.error("Error with getting User " + err);
        });
    }
  }, [isAuthenticated]);

  const getAccessToken = async () => {
    const access_token = await getAccessTokenSilently();
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", access_token);
  };

  return (
    <div className="redirect-page">
      <DashboardNav />
      <h1>Redirect Page</h1>
    </div>
  );
};
