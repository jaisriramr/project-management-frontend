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
import CrudLayout from "./pages/CRUD-Layout";
import Projects from "./pages/Projects";
import CreateProject from "./pages/Projects/create-project";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import React, { useEffect } from "react";

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
      path: "/dashboard",
      element: <CrudLayout />,
      children: [
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "create/project",
          element: <CreateProject />,
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

  function DebugObserver(): any {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        console.debug(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);
  }

  return (
    <RecoilRoot key={"userId"}>
      <DebugObserver />
      <div>
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  );
}

export default App;
