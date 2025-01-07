import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import ForgotPassword from "./pages/Auth/forgot-password";
import ResetPassword from "./pages/Auth/reset-password";
import DashboardSummary from "./pages/Dashboard-Summary";
import DashboardBoard from "./pages/Dashboard-Board";
import DashboardList from "./pages/Dashboard-List";
import DashboardBacklog from "./pages/Dashboard-Backlog";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "summary",
          element: <DashboardSummary />,
        },
        {
          path: "board",
          element: <DashboardBoard />,
        },
        {
          path: "list",
          element: <DashboardList />,
        },
        {
          path: "backlog",
          element: <DashboardBacklog />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
