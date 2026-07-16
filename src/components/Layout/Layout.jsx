import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <main className="content">

          {children}

        </main>

      </div>
    </>
  );
};

export default Layout;