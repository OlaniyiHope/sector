import chartsRoute from "app/views/charts/ChartsRoute";
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import NotFound from "app/views/sessions/NotFound";

import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/SessionRoutes";
import AuthGuard from "./auth/AuthGuard";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes],
  },
  ...sessionRoutes,

  // { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
