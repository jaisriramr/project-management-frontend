/* eslint-disable @typescript-eslint/no-explicit-any */
import "./dashboard-nav.scss";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import Bell from "../../assets/bell.svg";
import {
  Button,
  Col,
  Dropdown,
  Input,
  MenuProps,
  message,
  Modal,
  Row,
  Skeleton,
} from "antd";
import DropdownIcon from "../../assets/angle-down.svg";
import * as jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { container } from "tsyringe";
import { ProjectService } from "../../services/project.service";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedProjectData, userData } from "../../atom/atom";

export const DashboardNav = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userData);

  const projectService = container.resolve(ProjectService);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [projectsDropdown, setProjectDropdown] = useState<boolean>(false);
  const [createProject, setCreateProject] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>();
  const [selectedProject, setSelectedProject] =
    useRecoilState(selectedProjectData);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-project-limit-3"],
    queryFn: () => projectService.ListProjectsByOrgID(user?.org_id),
    enabled: !!user?.org_id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (projects && projects.length > 0 && selectedProject == null) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const element = e.target as HTMLElement;
      if (!element.classList.value.includes("dashboard-nav__id")) {
        setDropdown(false);
        setProjectDropdown(false);
      }
    });

    // if (localStorage.getItem("access_token")) {
    //   const decoded: any = jwtDecode.jwtDecode(
    //     localStorage.getItem("access_token") || ""
    //   );
    //   console.log(decoded);
    //   if (decoded?.picture) {
    //     setProfilePic(decoded?.picture);
    //   }
    //   setUser(decoded);
    // }
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_project_id");
    localStorage.removeItem("current_project");
    navigate("/");
  }

  const navDropdown = () => {
    return (
      <div className="dashboard-nav__id dashboard-nav__user-dropdown">
        <div className="dashboard-nav__id dashboard-nav__user-account">
          <label className="dashboard-nav__id">Account</label>
          <div className="dashboard-nav__id dashboard-nav__user-card">
            {user?.picture ? (
              <>
                <img
                  src={user?.picture}
                  alt="user"
                  className="dashboard-nav__id dashboard-nav__user-card-pic"
                  loading="lazy"
                />
              </>
            ) : (
              <div className="dashboard-nav__user-pic">
                {String(user?.name).slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="dashboard-nav__id dashboard-nav__user-card-row">
              <h6 className="dashboard-nav__id">{user?.name}</h6>
              <p className="dashboard-nav__id">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="dashboard-nav__id dashboard-nav__divider"></div>
        <div className="dashboard-nav__id dashboard-nav__user-link">
          <span className="dashboard-nav__id">Organization</span>
        </div>
        <div className="dashboard-nav__id dashboard-nav__user-link">
          <span className="dashboard-nav__id">Settings</span>
        </div>
        <div className="dashboard-nav__id dashboard-nav__divider"></div>
        <div
          className="dashboard-nav__id dashboard-nav__user-logout"
          onClick={() => handleLogout()}
        >
          <span className="dashboard-nav__id">Log out</span>
        </div>
      </div>
    );
  };

  function handleProjectSelection(project: any) {
    setSelectedProject(project);
    navigate("/dashboard/board");
    setProjectDropdown(false);
  }

  function projectDropdown() {
    return (
      <div className="dashboard-nav__id project-container">
        <p className="dashboard-nav__id">Recent</p>
        {!isLoading ? (
          <ul className="dashboard-nav__id project-container__list">
            {projects?.map((project: any, keyId: any) => (
              <li
                key={keyId}
                className="dashboard-nav__id"
                onClick={() => handleProjectSelection(project)}
              >
                <div className="dashboard-nav__id dashboard-container__details-image">
                  {project?.key}
                </div>
                <div className="dashboard-nav__id project-container__details">
                  <h4 className="dashboard-nav__id">{project?.name}</h4>
                  <p className="dashboard-nav__id">{project?.type}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Skeleton active />
        )}
        <Link
          to="/dashboard/projects"
          className="dashboard-nav__id project-link"
        >
          View All Projects
        </Link>
        <div
          className="dashboard-nav__id project-link"
          onClick={() => {
            setCreateProject(true);
            setProjectDropdown(false);
          }}
        >
          Create Project
        </div>
      </div>
    );
  }

  function handleCreateProject() {
    setCreateProject(false);
    const projectData = {
      org_id: user?.org_id,
      name: projectName,
      type: "Software Project",
      owner_id: user?._id,
      status: "Active",
    };

    const loading = message.loading("Loading...", 0);

    projectService
      .createProject(projectData)
      .then(() => {
        loading();
        message.success("Project created successfully!");
      })
      .catch((err) => {
        console.log("Project err ", err);
        loading();
        message.error("Project Creation Error!");
      });
  }

  return (
    <nav className="dashboard-nav__container">
      <div className="dashboard-nav__links">
        <Link to="/dashboard/board">
          <img src={Logo} alt="Logo" className="dashboard-nav__logo" />
        </Link>
        <Row
          align={"middle"}
          style={{ cursor: "pointer" }}
          onClick={() => setProjectDropdown(!projectsDropdown)}
        >
          <Col style={{ fontSize: "16px", fontWeight: "500" }}>Projects</Col>
          <Col>
            <img
              src={DropdownIcon}
              alt="down"
              className="dashboard-nav__small-svg"
            />
          </Col>
        </Row>
        {projectsDropdown && projectDropdown()}
        {/* <Dropdown trigger={["click"]} menu={{ items }}></Dropdown> */}
      </div>

      <ul className="dashboard-nav__links">
        <li className="dashboard-nav-link">
          <img src={Bell} alt="bell" className="dashboard-nav__bell" />
        </li>
        <li className="dashboard-nav-link">
          {user?.picture ? (
            <>
              <img
                onClick={() => setDropdown(!dropdown)}
                src={user?.picture}
                alt="user"
                style={{ cursor: "pointer" }}
                className="dashboard-nav__id dashboard-nav__user-card-pic"
                loading="lazy"
              />
            </>
          ) : (
            <div
              className="dashboard-nav__user-pic"
              onClick={() => setDropdown(!dropdown)}
            >
              {String(user?.name).slice(0, 2).toUpperCase()}
            </div>
          )}
          {dropdown && navDropdown()}
        </li>
      </ul>

      <Modal
        title="Enter Project Name"
        open={createProject}
        footer={""}
        onCancel={() => setCreateProject(false)}
        onClose={() => setCreateProject(false)}
      >
        <div>
          <Input
            type="text"
            className="project-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Button
            type="primary"
            className="project-btn"
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </div>
      </Modal>
    </nav>
  );
};
