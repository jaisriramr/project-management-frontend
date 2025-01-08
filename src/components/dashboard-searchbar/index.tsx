import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Select,
} from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { AuthService } from "../../services/auth.service";
import DropDownIcon from "../../assets/angle-down.svg";
import { useRecoilValue } from "recoil";
import { userData } from "../../atom/atom";
const { Option } = Select;

const DashboardSearchbar = () => {
  const userService = container.resolve(AuthService);
  const [addUser, setAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<any>("");

  const [filter, setFilter] = useState<any>({
    assignees: [],
    type: [],
    search: "",
  });

  const user = useRecoilValue(userData);

  const { data: members } = useQuery({
    queryKey: ["members_of_orgs"],
    queryFn: () => userService.getMembersOfOrg(user?.org_id),
    enabled: !!user?.org_id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (members?.length > 0) {
      const members = document.querySelectorAll(".dashboard-member");
      members.forEach((member) => {
        const m = member as HTMLElement;
        m.addEventListener("click", (e) => {
          m.classList.toggle("dashboard-member-active");
        });
      });
    }
  }, [members]);

  const showMembersList = () => {
    return (
      <div className="dashboard-search__user-list">
        {members?.map((member: any) => (
          <div className="dashboard-member">
            <img src={member?.picture} alt={member?.name} />
          </div>
        ))}
      </div>
    );
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="dashboard-flex-gap-10">
          <Checkbox />
          <span>Bug</span>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="dashboard-flex-gap-10">
          <Checkbox />
          <span>Story</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="dashboard-flex-gap-10">
          <Checkbox />
          <span>Task</span>
        </div>
      ),
      key: "2",
    },
  ];

  return (
    <div className="dashboard-search__container">
      <div className="dashboard-search__box">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.41667 11.0833C8.994 11.0833 11.0833 8.994 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833Z"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.25 12.25L9.71252 9.71249"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Input placeholder="Search" className="dashboard-search__input" />
      </div>

      <div className="dashboard-search__user-container">
        <div className="dashboard-search__user-filter">
          <div className="dashboard-search__user-unassigned">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_54_2)">
                <path
                  d="M12.5 14.0625C16.3818 14.0625 19.5312 10.9131 19.5312 7.03125C19.5312 3.14941 16.3818 0 12.5 0C8.61816 0 5.46875 3.14941 5.46875 7.03125C5.46875 10.9131 8.61816 14.0625 12.5 14.0625ZM18.75 15.625H16.0596C14.9756 16.123 13.7695 16.4062 12.5 16.4062C11.2305 16.4062 10.0293 16.123 8.94043 15.625H6.25C2.79785 15.625 0 18.4229 0 21.875V22.6562C0 23.9502 1.0498 25 2.34375 25H22.6562C23.9502 25 25 23.9502 25 22.6562V21.875C25 18.4229 22.2021 15.625 18.75 15.625Z"
                  fill="#F1F1F1"
                />
              </g>
              <defs>
                <clipPath id="clip0_54_2">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="dashboard-search__user-list">{showMembersList()}</div>
        </div>
        {/* <div
          className="dashboard-search__user-add"
          onClick={() => setAddUser(true)}
        >
          <svg
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.375 8.625H21.875V6.125C21.875 5.78125 21.5938 5.5 21.25 5.5H20C19.6562 5.5 19.375 5.78125 19.375 6.125V8.625H16.875C16.5312 8.625 16.25 8.90625 16.25 9.25V10.5C16.25 10.8438 16.5312 11.125 16.875 11.125H19.375V13.625C19.375 13.9688 19.6562 14.25 20 14.25H21.25C21.5938 14.25 21.875 13.9688 21.875 13.625V11.125H24.375C24.7188 11.125 25 10.8438 25 10.5V9.25C25 8.90625 24.7188 8.625 24.375 8.625ZM8.75 10.5C11.5117 10.5 13.75 8.26172 13.75 5.5C13.75 2.73828 11.5117 0.5 8.75 0.5C5.98828 0.5 3.75 2.73828 3.75 5.5C3.75 8.26172 5.98828 10.5 8.75 10.5ZM12.25 11.75H11.5977C10.7305 12.1484 9.76562 12.375 8.75 12.375C7.73438 12.375 6.77344 12.1484 5.90234 11.75H5.25C2.35156 11.75 0 14.1016 0 17V18.625C0 19.6602 0.839844 20.5 1.875 20.5H15.625C16.6602 20.5 17.5 19.6602 17.5 18.625V17C17.5 14.1016 15.1484 11.75 12.25 11.75Z"
              fill="#333333"
            />
          </svg>
        </div> */}
      </div>

      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="dashboard-search__type">
          <span>Type</span>
          <img src={DropDownIcon} alt="Dropdown" />
        </div>
      </Dropdown>

      {/* <Modal
        open={addUser}
        title="Add User to the Organisation"
        footer={null}
        onCancel={() => setAddUser(false)}
        onClose={() => setAddUser(false)}
        width={"320px"}
      >
        <div className="add-user-group">
          <label>Email</label>
          <Input
            type="text"
            placeholder="Enter email ID"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
        </div>
        <div className="add-user-group">
          <label>Role</label>
          <Select>
            <Option value="677bcbee2877d9b3dc87b775">Admin</Option>
            <Option value="677e4539a6442a01dbbeb133">Developer</Option>
            <Option value="677e455aa6442a01dbbeb135">DevOps</Option>
            <Option value="677e4570a6442a01dbbeb137">QA Engineer</Option>
          </Select>
        </div>
        <Button >Invite User</Button>
      </Modal> */}
    </div>
  );
};

export default DashboardSearchbar;
