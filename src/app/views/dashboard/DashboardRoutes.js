import Loadable from "app/components/Loadable";
import { lazy } from "react";

import Admin from "./admin/Admin";

import "./Style.css";
import Welcome from "./Welcome";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const dashboardRoutes = [
  // { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: "/dashboard/default", element: <Welcome /> },
  { path: "/dashboard/sector", element: <Admin /> },

  // {
  //   path: "/dashboard/cashflow",
  //   element: (
  //     <TotalProvider>
  //       <Cashflow />
  //     </TotalProvider>
  //   ),
  // },
];

export default dashboardRoutes;
