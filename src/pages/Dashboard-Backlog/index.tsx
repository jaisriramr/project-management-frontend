import { useRecoilValue } from "recoil";
import "./index.scss";
import { selectedProjectData, userData } from "../../atom/atom";
import { Button, Col, Dropdown, Input, message, Row, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import DashboardSearchbar from "../../components/dashboard-searchbar";
import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { SprintService } from "../../services/sprint.service";
import { useEffect, useState } from "react";
import DashboardSprint from "../../components/dashboard-sprint";

const DashboardBacklog = () => {
  const selectedProject = useRecoilValue<any>(selectedProjectData);
  const sprintService = container.resolve(SprintService);
  const [restart, setRestart] = useState<string>("");

  const {
    data: sprints,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-sprint-for-project", selectedProject?._id, restart],
    queryFn: () => sprintService.getSprintsForProject(selectedProject?._id),
    enabled: !!selectedProject?._id,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <Row gutter={10} style={{ marginBottom: "10px" }}>
        <Col>
          <Link className="dashboard__nav-link" to="/dashboard/projects">
            Projects
          </Link>
        </Col>
        <Col>/</Col>
        <Col>
          <Link className="dashboard__nav-link" to="/dashboard/board">
            {selectedProject?.name}
          </Link>
        </Col>
      </Row>
      <h2 className="projects-title">Backlog</h2>
      <DashboardSearchbar />
      <main className="dashboard-backlog">
        {sprints?.map((sprint: any) => (
          <DashboardSprint sprint_id={sprint?._id} />
        ))}
      </main>
    </div>
  );
};

export default DashboardBacklog;
