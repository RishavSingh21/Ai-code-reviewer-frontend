import "./Navbar.css";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon-wrapper">
          <FaRobot className="logo-icon" />
          <span className="logo-pulse" />
        </div>
        <span>CodeLens <small>AI</small></span>
      </div>

      <div className="nav-right">
        <div className="nav-status">
          <span className="status-dot" />
          <span>AI Online</span>
        </div>
        <div className="nav-avatar" data-tooltip="Profile">
          <span>R</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;