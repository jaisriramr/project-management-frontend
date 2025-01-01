import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth0Provider } from "@auth0/auth0-react";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_BASE_URL + "/dashboard",
      }}
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </Auth0Provider>
  );
}

export default App;
