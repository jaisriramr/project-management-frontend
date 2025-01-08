import { Col, Dropdown, Input, MenuProps, message, Row } from "antd";
import "./task-log.scss";

import TaskIcon from "../../../assets/issues/task.svg";
import StoryIcon from "../../../assets/issues/story.svg";
import BugIcon from "../../../assets/issues/bug.svg";

import DropdownIcon from "../../../assets/angle-down.svg";
import EditIcon from "../../../assets/pen.svg";

import HighestPriority from "../../../assets/priorities/high.svg";
import MediumPriority from "../../../assets/priorities/medium.svg";
import LowPriority from "../../../assets/priorities/low.svg";
import LowestPriority from "../../../assets/priorities/lowest.svg";
import { container } from "tsyringe";
import { TaskService } from "../../../services/task.service";
import { useEffect, useState } from "react";

const TaskLog = ({ taskData }: { taskData: any }) => {
  console.log("taskllll ", taskData);
  const [task, setTask] = useState(taskData);
  const [isStoryPoints, setIsStoryPoints] = useState<boolean>(false);
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(taskData?.title);
  const [storyPoints, setStoryPoints] = useState<number>(
    taskData?.story_points ? taskData?.story_points : 0
  );

  const taskService = container.resolve(TaskService);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const element = e.target as HTMLElement;
      console.log(
        element,
        element.classList,
        element.classList.contains("task-log__col-points-input"),
        element.classList.contains("task-log__col-points")
      );
      if (
        !element.classList.contains("task-log__col-points-input") &&
        !element.classList.contains("task-log__col-points")
      ) {
        setIsStoryPoints(false);
      }

      if (!element.classList.contains("task-log__col-title-input")) {
        setIsTitleEdit(false);
      }
    });
  }, []);

  function handleChangePriority(priority: string) {
    const updateTask = { ...task };
    updateTask.priority = priority;
    taskService
      .updateTask(updateTask?._id, updateTask)
      .then((response) => {
        console.log(response);
        setTask(updateTask);
      })
      .catch(() => message.error("Internal Server Error"));
  }

  function handleUpdateStoryPoints() {
    const updateTask = { ...task };
    updateTask.story_points = storyPoints;
    taskService
      .updateTask(updateTask?._id, updateTask)
      .then((response) => {
        console.log(response);
        setTask(updateTask);
        setIsStoryPoints(false);
      })
      .catch(() => message.error("Internal Server Error"));
  }

  function handleUpdateStatus(status: string) {
    const updateTask = { ...task };
    updateTask.status = status;
    taskService
      .updateTask(updateTask?._id, updateTask)
      .then((response) => {
        console.log(response);
        setTask(updateTask);
        setIsStoryPoints(false);
      })
      .catch(() => message.error("Internal Server Error"));
  }

  function handleUpdateTitle() {
    const updateTask = { ...task };
    updateTask.title = title;
    taskService
      .updateTask(updateTask?._id, updateTask)
      .then((response) => {
        console.log(response);
        setTask(updateTask);
        setIsTitleEdit(false);
      })
      .catch(() => message.error("Internal Server Error"));
  }

  const statusMenu: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <p onClick={() => handleUpdateStatus("To Do")} className="status-text">
          To Do
        </p>
      ),
    },
    {
      key: "1",
      label: (
        <p
          onClick={() => handleUpdateStatus("In Progress")}
          className="status-text"
        >
          In Progress
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p onClick={() => handleUpdateStatus("Qa")} className="status-text">
          Qa
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p
          onClick={() => handleUpdateStatus("Production")}
          className="status-text"
        >
          Production
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <p onClick={() => handleUpdateStatus("Done")} className="status-text">
          Done
        </p>
      ),
    },
  ];

  const priorityMenu: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Row gutter={10} onClick={() => handleChangePriority("highest")}>
          <Col>
            <img
              src={HighestPriority}
              alt="Highest"
              className="task-log__col-priority-m"
            />
          </Col>
          <Col>Highest</Col>
        </Row>
      ),
    },
    {
      key: "1",
      label: (
        <Row gutter={10} onClick={() => handleChangePriority("medium")}>
          <Col>
            <img
              src={MediumPriority}
              alt="medium"
              className="task-log__col-priority-m"
            />
          </Col>
          <Col>Medium</Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: (
        <Row gutter={10} onClick={() => handleChangePriority("low")}>
          <Col>
            <img
              src={LowPriority}
              alt="low"
              className="task-log__col-priority-m"
            />
          </Col>
          <Col>Low</Col>
        </Row>
      ),
    },
    {
      key: "3",
      label: (
        <Row gutter={10} onClick={() => handleChangePriority("lowest")}>
          <Col>
            <img
              src={LowestPriority}
              alt="lowest"
              className="task-log__col-priority-m"
            />
          </Col>
          <Col>Lowest</Col>
        </Row>
      ),
    },
  ];

  return (
    <Row gutter={10} className="task-log__row">
      <Col className="task-log__col">
        {task?.type == "task" ? (
          <img
            src={TaskIcon}
            alt="Task"
            className="dashboard-sprint__table-type"
          />
        ) : task?.type == "story" ? (
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
      </Col>
      <Col className="task-log__col" span={1}>
        {task?.task_no}
      </Col>
      <Col className="task-log__col" flex={1}>
        {isTitleEdit ? (
          <div>
            <Input
              type="text"
              value={title}
              className="task-log__col-title-input"
              onBlur={() => setIsTitleEdit(false)}
              onPressEnter={() => handleUpdateTitle()}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        ) : (
          <Row
            gutter={20}
            className="task-log__col-title-input task-log__col-title-edit-row"
          >
            <Col className="task-log__col-title-input">{title}</Col>
            <img
              onClick={() => setIsTitleEdit(true)}
              src={EditIcon}
              className="task-log__col-dropdown-img task-log__col-title-edit task-log__col-title-input"
              alt="title"
            />
          </Row>
        )}
      </Col>
      <Col className="task-log__col">
        <Dropdown trigger={["click"]} menu={{ items: statusMenu }}>
          <Row
            gutter={2}
            className={
              task?.status == "To Do"
                ? "task-log__col-dropdown-status task-log__col-dropdown-status-todo"
                : task?.status == "In Progress"
                ? "task-log__col-dropdown-status task-log__col-dropdown-status-qa"
                : task?.status == "Qa"
                ? "task-log__col-dropdown-status task-log__col-dropdown-status-qa"
                : task?.status == "Production"
                ? "task-log__col-dropdown-status task-log__col-dropdown-status-done"
                : task?.status == "Done"
                ? "task-log__col-dropdown-status task-log__col-dropdown-status-done"
                : "task-log__col-dropdown-status"
            }
          >
            <Col
              style={{
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {task?.status}
            </Col>

            <img
              className="task-log__col-dropdown-img"
              src={DropdownIcon}
              alt="dropdown"
            />
          </Row>
        </Dropdown>
      </Col>
      <Col
        className="task-log__col task-log__col-points-input"
        span={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isStoryPoints ? (
          <div
            className="task-log__col-points"
            onClick={() => setIsStoryPoints(true)}
          >
            {task?.story_points ? task?.story_points : 0}
          </div>
        ) : (
          <Input
            type="number"
            value={storyPoints}
            onChange={(e) => setStoryPoints(Number(e.target.value))}
            onPressEnter={() => handleUpdateStoryPoints()}
            className="task-log__col-points-input"
          />
        )}
      </Col>
      <Col className="task-log__col">
        <div className="task-log__col-priority-box">
          <Dropdown
            trigger={["click"]}
            menu={{ items: priorityMenu }}
            placement="bottomRight"
          >
            {task?.priority == "highest" ? (
              <img
                src={HighestPriority}
                className="task-log__col-priority"
                alt="high"
              />
            ) : task?.priority == "medium" ? (
              <img
                src={MediumPriority}
                alt="medium"
                className="task-log__col-priority"
              />
            ) : task?.priority == "low" ? (
              <img
                src={LowPriority}
                alt="low"
                className="task-log__col-priority"
              />
            ) : task?.priority == "lowest" ? (
              <img
                src={LowestPriority}
                alt="lowest"
                className="task-log__col-priority"
              />
            ) : (
              ""
            )}
          </Dropdown>
        </div>
      </Col>
      <Col className="task-log__col">
        <div className="dashboard-sprint__table-profile">
          <img src={task?.assignee?.picture} alt={task?.assignee?.name} />
        </div>
      </Col>
    </Row>
  );
};

export default TaskLog;
