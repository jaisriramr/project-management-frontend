import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { container } from "tsyringe";
import { ProjectService } from "../../services/project.service";
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedProjectData, userData } from "../../atom/atom";
import {
  Col,
  Input,
  Pagination,
  Popover,
  Row,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";

const Projects = () => {
  const user = useRecoilValue(userData);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [projectsData, setProjectsData] = useState<any>(null);
  const [selectedProject, setSelectedProject] =
    useRecoilState<any>(selectedProjectData);

  const projectService = container.resolve(ProjectService);
  const [page, setPage] = useState<number>(1);

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-projects-query", page],
    queryFn: () => projectService.getProjectsByPage(user?.org_id, page),
    enabled: !!user?.org_id,
    refetchOnWindowFocus: false,
  });

  function handleNavigate(record: any) {
    setSelectedProject(projects?.data[record.key]);
    localStorage.setItem(
      "selected-project",
      JSON.stringify(projects?.data[record.key])
    );
    navigate("/dashboard/board");
  }

  const imageArr = [
    "https://cdn.pixabay.com/photo/2015/12/04/22/20/gear-1077550_1280.png",
    "https://cdn.pixabay.com/photo/2015/12/22/04/00/edit-1103599_1280.png",
    "https://cdn.pixabay.com/photo/2021/03/27/06/31/code-6127616_1280.png",
  ];

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      render: (text: string, record: any) => (
        <div onClick={() => handleNavigate(record)} className="table-link">
          <img
            src={imageArr[Math.floor(Math.random() * imageArr.length)]}
            alt={text}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Key",
      dataIndex: "keyId",
      sorter: (a, b) => a.keyId.localeCompare(b.keyId),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Lead",
      dataIndex: "lead",
      sorter: (a, b) => a.lead.localeCompare(b.lead),
      sortDirections: ["ascend", "descend"],
      render: (text: string, record: any) => (
        <div className="project-table-lead-container">
          <div className="project__table-popup-holder">
            <img
              src={projects?.data[record.key]?.lead?.picture}
              alt={text}
              className="project-table-lead-picture"
            />
            <div className="project-lead-popup">
              <div className="project-lead-popup__bg">
                <h4>{text}</h4>
              </div>
              <div className="project-lead-popup__btn">
                <Link
                  to={"/dashboard/user/" + projects?.data[record.key]?.lead_id}
                  className="project-lead-popup__link"
                >
                  View Profile
                </Link>
              </div>
              <div className="project-lead-popup__profile">
                <img
                  src={projects?.data[record.key]?.lead?.picture}
                  alt={text}
                />
              </div>
            </div>
          </div>
          <label>{text}</label>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (projects?.data?.length) {
      const projectArray: any = [];

      projects?.data?.map((project: any, i: any) => {
        projectArray.push({
          key: i,
          name: project?.name,
          keyId: project?.key,
          lead: project?.lead?.name,
        });
      });

      setProjectsData(projectArray);
    }
  }, [projects]);

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  function changePagination(e: any) {
    setPage(e);
  }

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>
      <Input
        type="text"
        placeholder="Search"
        value={search}
        className="projects-input"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="projects-table">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={projectsData}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
          pagination={false}
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Pagination
            total={Number(projects?.totalPages) * 10}
            defaultCurrent={1}
            onChange={(e) => changePagination(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
