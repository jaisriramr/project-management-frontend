import "./index.scss";
import SoftwareProjectIcon from "../../assets/software-project.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedProjectData } from "../../atom/atom";

const DashboardSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("board");
  const selectedProject = useRecoilValue<any>(selectedProjectData);

  const location = useLocation();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  return (
    <div className="dashboard-sidebar__container">
      {selectedProject ? (
        <div className="dashboard-sidebar__project-container">
          <img src={SoftwareProjectIcon} alt="software icon" />
          <div className="dashboard-sidebar__project-text">
            <h6>{selectedProject?.name}</h6>
            <p>{selectedProject?.type}</p>
          </div>
        </div>
      ) : (
        <div className="dashboard-sidebar__project-container">
          <img src={SoftwareProjectIcon} alt="software icon" />
          <div className="dashboard-sidebar__project-text">
            <h6>Project Name</h6>
            <p>Project Type</p>
          </div>
        </div>
      )}

      <div className="dashboard-sidebar__project-links">
        <h4>PLANNING</h4>
        <Link
          to="/dashboard/summary"
          onClick={() => setActiveMenu("/dashboard/summary")}
          className={
            activeMenu !== "/dashboard/summary"
              ? "dashboard-sidebar__project-link"
              : "dashboard-sidebar__project-link dashboard-sidebar__project-link-active"
          }
        >
          <svg
            fill="none"
            viewBox="0 0 16 16"
            role="presentation"
            className="css-1rmmprl"
          >
            <path
              stroke="currentcolor"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15.25 8A7.25 7.25 0 0 1 8 15.25M15.25 8A7.25 7.25 0 0 0 8 .75M15.25 8H.75M8 15.25A7.25 7.25 0 0 1 .75 8M8 15.25c1.657 0 3-3.246 3-7.25S9.657.75 8 .75m0 14.5c-1.657 0-3-3.246-3-7.25S6.343.75 8 .75M.75 8A7.25 7.25 0 0 1 8 .75"
            ></path>
          </svg>
          <span>Summary</span>
        </Link>
        <Link
          to="/dashboard/backlog"
          onClick={() => setActiveMenu("/dashboard/backlog")}
          className={
            activeMenu !== "/dashboard/backlog"
              ? "dashboard-sidebar__project-link"
              : "dashboard-sidebar__project-link dashboard-sidebar__project-link-active"
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <g fill="currentcolor">
              <path d="M5 19.002C5 19 17 19 17 19v-2.002C17 17 5 17 5 17zm-2-2.004C3 15.894 3.895 15 4.994 15h12.012c1.101 0 1.994.898 1.994 1.998v2.004A1.997 1.997 0 0 1 17.006 21H4.994A2 2 0 0 1 3 19.002z"></path>
              <path d="M5 15h12v-2H5zm-2-4h16v6H3z"></path>
              <path d="M7 11.002C7 11 19 11 19 11V8.998C19 9 7 9 7 9zM5 8.998C5 7.894 5.895 7 6.994 7h12.012C20.107 7 21 7.898 21 8.998v2.004A1.997 1.997 0 0 1 19.006 13H6.994A2 2 0 0 1 5 11.002z"></path>
              <path d="M5 5v2h12V5zm-2-.002C3 3.894 3.895 3 4.994 3h12.012C18.107 3 19 3.898 19 4.998V9H3z"></path>
            </g>
          </svg>
          <span>Backlog</span>
          {/* </div> */}
        </Link>
        <Link
          to="/dashboard/board"
          onClick={() => setActiveMenu("/dashboard/board")}
          className={
            activeMenu !== "/dashboard/board"
              ? "dashboard-sidebar__project-link"
              : "dashboard-sidebar__project-link dashboard-sidebar__project-link-active"
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <g fill="currentcolor">
              <path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18M2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006z"></path>
              <path d="M8 6v12h2V6zm6 0v12h2V6z"></path>
            </g>
          </svg>
          <span>Board</span>
        </Link>
        <Link
          to="/dashboard/list"
          onClick={() => setActiveMenu("/dashboard/list")}
          className={
            activeMenu !== "/dashboard/list"
              ? "dashboard-sidebar__project-link"
              : "dashboard-sidebar__project-link dashboard-sidebar__project-link-active"
          }
        >
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <g fill="currentcolor" fill-rule="evenodd">
              <rect width="8" height="2" x="10" y="15" rx="1"></rect>
              <rect width="2" height="2" x="6" y="15" rx="1"></rect>
              <rect width="8" height="2" x="10" y="11" rx="1"></rect>
              <rect width="2" height="2" x="6" y="11" rx="1"></rect>
              <rect width="8" height="2" x="10" y="7" rx="1"></rect>
              <rect width="2" height="2" x="6" y="7" rx="1"></rect>
            </g>
          </svg>
          <span>List</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
