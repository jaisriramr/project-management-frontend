import { PubicHttpService } from "./publis.http.service";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";
// import { HttpService } from "./http.service";

@injectable()
export class TaskService {
  constructor(
    // @inject(HttpService) private httpService: HttpService,
    @inject(PubicHttpService) private publicHttpService: PubicHttpService
  ) {}
  namespace = "task";

  createTask = async (taskData: any) => {
    return await this.publicHttpService.post(`${this.namespace}`, taskData);
  };

  getSingleTask = async (task_id: string) => {
    return await this.publicHttpService.get(`${this.namespace}/${task_id}`);
  };

  deleteTask = async (task_id: string) => {
    return await this.publicHttpService.delete(`${this.namespace}/${task_id}`);
  };

  updateTask = async (task_id: string, updateTaskData: any) => {
    return await this.publicHttpService.put(
      `${this.namespace}/${task_id}`,
      updateTaskData
    );
  };

  getSprintTasks = async (sprint_id: string) => {
    return await this.publicHttpService.get(
      `${this.namespace}/sprint/${sprint_id}`
    );
  };
}
