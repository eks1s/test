import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const PrivateLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
