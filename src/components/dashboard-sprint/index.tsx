import { useEffect, useState } from "react";
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
  Table,
  Tooltip,
} from "antd";
import dropdownIcon from "../../assets/angle-down.svg";
import plusIcon from "../../assets/plus-icon.svg";

import TaskIcon from "../../assets/issues/task.svg";
import StoryIcon from "../../assets/issues/story.svg";
import BugIcon from "../../assets/issues/bug.svg";
import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { ColumnsType } from "antd/es/table";
import Pen from "../../assets/pen.svg";
import TaskLog from "./TaskLog/task-log";

const DashboardSprint = ({ sprint_id }: { sprint_id: string }) => {
  console.log("SPRINT ", sprint_id);
  const user = useRecoilValue(userData);
  const selectedProject = useRecoilValue<any>(selectedProjectData);
  const [createTask, setCreateTask] = useState({ type: "task", name: "" });
  const [isCreateTask, setIsCreateTask] = useState<boolean>(false);
  const taskService = container.resolve(TaskService);
  const [listTasks, setListTasks] = useState<any>();
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>("");

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

  useEffect(() => {
    if (!isLoading && tasks) {
      const tData: any = [];
      tasks?.map((task: any, i: any) => {
        tData.push({
          key: i,
          type: task?.type,
          task_no: task?.task_no,
          title: task?.title,
          status: task?.status,
          points: task?.story_points,
          assignee: task?.assignee,
        });
      });
      setListTasks(tData);
    }
  }, [tasks]);

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
        picture: user?.picture,
        user_id: user?._id,
      },
    };

    const loading = message.loading("Creating Task...", 0);
    await taskService
      .createTask(taskData)
      .then((response) => {
        setListTasks([
          ...listTasks,
          {
            key: listTasks.length + 1,
            type: response?.type,
            task_no: response?.task_no,
            title: response?.title,
            status: response?.status,
            points: response?.story_points ? response?.story_points : 0,
            assignee: response?.assignee,
          },
        ]);
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
  }

  const dropdownStatus: MenuProps["items"] = [
    {
      key: "0",
      label: "To Do",
      onClick: (e) => console.log(e),
    },
    {
      key: "1",
      label: "In Progress",
    },
    {
      key: "2",
      label: "In Development",
    },
    {
      key: "3",
      label: "Qa",
    },
    {
      key: "4",
      label: "Production",
    },
    {
      key: "5",
      label: "Done",
    },
  ];

  function handleEditChange(record: any) {
    console.log("TEED ", record);
    setIsTitleEdit(true);
  }

  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "type",
      width: "10px",
      render: (text: string) => (
        <div>
          {text == "task" ? (
            <img
              src={TaskIcon}
              alt="Task"
              className="dashboard-sprint__table-type"
            />
          ) : text == "story" ? (
            <img
              src={StoryIcon}
              alt="Story"
              className="dashboard-sprint__table-type"
            />
          ) : (
            <img
              src={BugIcon}
              alt="Bug"
              className="dashboard-sprint__table-type"
            />
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "task_no",
      width: "100px",
      render: (text: string) => <p style={{ fontSize: "12px" }}>{text}</p>,
    },
    {
      title: "",
      dataIndex: "title",
      render: (text: string, record: any) => (
        <div className="dashboard-sprint_table-title">
          <div className="dashboard-sprint_table-title">
            <Tooltip title={text}>
              <p>{text}</p>
            </Tooltip>
            <Tooltip title="Edit Summary">
              <div
                className="dashboard-sprint__table-edit"
                onClick={() => handleEditChange(record)}
              >
                <img src={Pen} alt="Text For title" />
              </div>
            </Tooltip>
          </div>
          {isTitleEdit && (
            <Input
              type="text"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      width: "200px",
      render: (text: any) => (
        <Dropdown trigger={["click"]} menu={{ items: dropdownStatus }}>
          <Row
            gutter={5}
            style={{ cursor: "pointer" }}
            className={
              text == "To Do"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-todo"
                : text == "In Progress"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-qa"
                : text == "In Development"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-qa"
                : text == "QA"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-qa"
                : text == "Production"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-prod"
                : text == "Done"
                ? "dashboard-sprint__table-dropdown dashboard-sprint__table-dropdown-prod"
                : "dashboard-sprint__table-dropdown"
            }
          >
            <p>{text}</p>
            <img src={dropdownIcon} alt="dropdown" />
          </Row>
        </Dropdown>
      ),
    },
    {
      title: "",
      dataIndex: "story_points",
      width: "16px",
      render: (text: any) => (
        <Tooltip title="Story Points">
          <div className="dashboard-sprint__table-points">
            {text?.story_points ? text?.story_points : 0}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "",
      dataIndex: "assignee",
      width: "100px",
      render: (text: any) => (
        <div className="dashboard-sprint__table-profile">
          <img src={text?.picture} alt={text?.name} />
        </div>
      ),
    },
  ];

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
          {/* {tasks && tasks.length > 0 ? (
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
            <div className="dashboard-backlog__no-task">No Task Found</div>
          )} */}
          {tasks?.map((task: any) => (
            <TaskLog taskData={task} />
          ))}
          {/* <Table
            showHeader={false}
            columns={columns}
            pagination={false}
            dataSource={listTasks}
            rowKey="key"
          /> */}
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
