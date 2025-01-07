import { atom } from "recoil";

const userData = atom<any>({
  key: "user-data",
  default: {},
});

const selectedProjectData = atom({
  key: "selected-project",
  default: {},
});

export { userData, selectedProjectData };
