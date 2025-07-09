import {
  LogOut,
  Settings,
  ChartColumn,
  CircleGauge,
  UserRoundPen,
} from "lucide-react";

function Sidemenu() {
  return (
    <div className="sidebar">
      <div className="logo"></div>
      <ul className="main-navigation">
        <li className="active">
          <a href="#">
            <CircleGauge />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#">
            <UserRoundPen />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="#">
            <ChartColumn />
            <span>Statistics</span>
          </a>
        </li>
        <li>
          <a href="#">
            <Settings />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <LogOut />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidemenu;
