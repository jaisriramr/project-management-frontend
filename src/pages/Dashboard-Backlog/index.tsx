import { useRecoilValue } from "recoil";
import "./index.scss";
import { selectedProjectData, userData } from "../../atom/atom";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const DashboardBacklog = () => {
  const user = useRecoilValue(userData);
  const selectedProject = useRecoilValue<any>(selectedProjectData);

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
    </div>
  );
};

export default DashboardBacklog;
