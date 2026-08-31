import { Outlet } from "react-router-dom";
import Sidebar from "../menu-modulos/Sidebar";

function Layout() {
  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;