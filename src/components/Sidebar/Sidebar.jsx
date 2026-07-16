import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaCode,
  FaHistory,
  FaChartBar,
  FaLayerGroup,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink to="/">
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/editor">
        <FaCode />
        Code Editor
      </NavLink>

      <NavLink to="/batch">
        <FaLayerGroup />
        Batch Review
      </NavLink>

      <NavLink to="/history">
        <FaHistory />
        History
      </NavLink>

      <NavLink to="/analytics">
        <FaChartBar />
        Analytics
      </NavLink>
    </aside>
  );
};

export default Sidebar;