import { useAuth0 } from "@auth0/auth0-react";
import "./index.scss";
import { useEffect } from "react";

export const Dashboard = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
    }
  }, [isAuthenticated]);

  return (
    <div className="redirect-page">
      <h1>Redirect Page</h1>
    </div>
  );
};
