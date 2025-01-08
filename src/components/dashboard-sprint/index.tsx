import { useState } from "react";
import { useRecoilValue } from "recoil";
import { TaskService } from "../../services/task.service";
import { container } from "tsyringe";
import { selectedProjectData, userData } from "../../atom/atom";
import {
  Button,
  Col,
  Dropdown,
  Input,
  MenuProps,
  message,
  Row,
  Tooltip,
} from "antd";
import dropdownIcon from "../../assets/angle-down.svg";
import plusIcon from "../../assets/plus-icon.svg";

import TaskIcon from "../../assets/issues/task.svg";
import StoryIcon from "../../assets/issues/story.svg";
import BugIcon from "../../assets/issues/bug.svg";
import { useQuery } from "@tanstack/react-query";
import "./index.scss";

const DashboardSprint = ({ sprint_id }: { sprint_id: string }) => {
  console.log("SPRINT ", sprint_id);
  const user = useRecoilValue(userData);
  const selectedProject = useRecoilValue<any>(selectedProjectData);
  const [createTask, setCreateTask] = useState({ type: "task", name: "" });
  const [isCreateTask, setIsCreateTask] = useState<boolean>(false);
  const taskService = container.resolve(TaskService);

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-taskss-for-sprint", sprint_id],
    queryFn: () => taskService.getSprintTasks(sprint_id),
    enabled: !!sprint_id,
    refetchOnWindowFocus: false,
  });

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div
          className="dashboard-backlog__issue-menu"
          onClick={() => setCreateTask({ ...createTask, type: "task" })}
        >
          <img
            className="dashboard-backlog__issue-icon"
            src={TaskIcon}
            alt="task"
          />{" "}
          <p>Task</p>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div
          className="dashboard-backlog__issue-menu"
          onClick={() => setCreateTask({ ...createTask, type: "story" })}
        >
          <img
            className="dashboard-backlog__issue-icon"
            src={StoryIcon}
            alt="story"
          />{" "}
          <p>Story</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="dashboard-backlog__issue-menu"
          onClick={() => setCreateTask({ ...createTask, type: "bug" })}
        >
          <img
            className="dashboard-backlog__issue-icon"
            src={BugIcon}
            alt="bug"
          />{" "}
          <p>Bug</p>
        </div>
      ),
    },
  ];

  async function handleCreateTask() {
    const taskData = {
      org_id: user?.org_id,
      type: createTask?.type,
      project_name: selectedProject?.name,
      project_id: selectedProject?._id,
      sprint_id: "677e645903e861467ffe75d0",
      title: createTask?.name,
      status: "To Do",
      priority: "medium",
      assignee: {
        name: user?.name,
        user_id: user?._id,
      },
    };

    const loading = message.loading("Creating Task...", 0);
    await taskService
      .createTask(taskData)
      .then((response) => {
        loading();
        message.success("Task Created Successfully!");
      })
      .catch((err) => {
        loading();
        message.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Internal Server Error"
        );
      });

    console.log(taskData);
  }

  return (
    <div className="dashboard-backlog__container">
      <div className="dashboard-backlog__header">
        <div className="dashboard-backlog__header-left">
          <div className="dashboard-backlog__header-toggle-icon">
            <img src={dropdownIcon} alt="dropdown icon" />
          </div>
          <h4>Backlog</h4>
        </div>
        <div className="dashboard-backlog__header-right">
          <Tooltip title="Todo: 0 of 0 (story points)">
            <div className="dashboard-backlog__points dashboard-backlog__todo-points">
              0
            </div>
          </Tooltip>
          <Tooltip title="In Progress: 0 of 0 (story points)">
            <div className="dashboard-backlog__points dashboard-backlog__inprogress-points">
              0
            </div>
          </Tooltip>
          <Tooltip title="Done: 0 of 0 (story points)">
            <div className="dashboard-backlog__points dashboard-backlog__done-points">
              0
            </div>
          </Tooltip>
          <Button className="dashboard-backlog__btn">Create Sprint</Button>
        </div>
      </div>
      <div>
        <div className="dashboard-backlog__table">
          {tasks ? (
            tasks?.map((task: any) => (
              <div className="dashboard-backlog__row-container">
                <Row gutter={10} className="dashboard-backlog__row">
                  <Col>
                    <img
                      className="dashboard-backlog__row-type"
                      src={
                        task?.type == "task"
                          ? TaskIcon
                          : task?.type == "story"
                          ? StoryIcon
                          : BugIcon
                      }
                      alt="task type"
                    />
                  </Col>
                  <Col lg={18}>{task?.title}</Col>
                  <Col sm={1}>{task?.status}</Col>
                  <Col sm={2}>
                    {task?.story_points ? task?.story_points : 0}
                  </Col>
                  <Col sm={2}>{task?.assignee?.name}</Col>
                </Row>
              </div>
            ))
          ) : (
            <div>No Task Found</div>
          )}
        </div>
        <div className="dashboard-backlog__create-issue">
          {!isCreateTask && (
            <div
              className="dashboard-backlog__create-issue-btn"
              onClick={() => setIsCreateTask(true)}
            >
              <img src={plusIcon} alt="plus icon" />
              <h6>Create Issue</h6>
            </div>
          )}
          {isCreateTask && (
            <div className="dashboard-backlog__create-form">
              <Dropdown
                trigger={["click"]}
                menu={{ items }}
                className="dashboard-backlog__create-dropdown-container"
              >
                <img
                  src={TaskIcon}
                  alt="task"
                  className="dashboard-backlog__issue-icon"
                />
              </Dropdown>
              <Input
                onBlur={() => setIsCreateTask(false)}
                onPressEnter={handleCreateTask}
                autoFocus={true}
                onChange={(e) =>
                  setCreateTask({ ...createTask, name: e.target.value })
                }
                type="text"
                placeholder="What need to be done?"
                className="dashboard-backlog__create-input"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSprint;
