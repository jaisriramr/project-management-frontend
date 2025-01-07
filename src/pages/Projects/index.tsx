import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { container } from "tsyringe";
import { ProjectService } from "../../services/project.service";
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { userData } from "../../atom/atom";
import {
  Col,
  Input,
  Pagination,
  Row,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

const Projects = () => {
  const user = useRecoilValue(userData);
  const [search, setSearch] = useState<string>("");
  const [projectsData, setProjectsData] = useState<any>(null);

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

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
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
