import { Col, Row } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectedProjectData } from "../../atom/atom";

const DashboardSummary = () => {
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
      <h2 className="projects-title">Summary</h2>
    </div>
  );
};

export default DashboardSummary;
