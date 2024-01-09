/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Homepage from "views/Homepage.js";
import EOQ from "views/EOQ.js";
import Team from "views/Team.js";
import WagnerWhitin from "views/WagnerWhitin.js";
import Proposal from "views/Proposal";

// routes for the different pages
const dashboardRoutes = [
  {
    path: "/homepage",
    name: "Homepage",
    icon: "nc-icon nc-chart-pie-35",
    component: Homepage,
    layout: "/admin",
  },
  {
    path: "/eoq",
    name: "EOQ",
    icon: "nc-icon nc-app",
    component: EOQ,
    layout: "/admin",
  },
  {
    path: "/wagnerwhitin",
    name: "Wagner Whitin",
    icon: "nc-icon nc-spaceship",
    component: WagnerWhitin,
    layout: "/admin",
  },
  {
    path: "/team",
    name: "Team Members",
    icon: "nc-icon nc-circle-09",
    component: Team,
    layout: "/admin",
  },
  {
    path: "/proposal",
    name: "Proposal",
    icon: "nc-icon nc-paper-2",
    component: Proposal,
    layout: "/admin",
  },
];

export default dashboardRoutes;
