import { atom } from "recoil";

const userData = atom<any>({
  key: "user-data",
  default: {},
});

const selectedProjectData = atom({
  key: "selected-project",
  default: null,
});

const filterTasksQuery = atom({
  key: "filter-task-query",
  default: {
    title: null,
    assignees_ids: null,
    type: null,
    sprint_id: null,
    epics_id: null,
    labels: null,
  },
});

export { userData, selectedProjectData, filterTasksQuery };
