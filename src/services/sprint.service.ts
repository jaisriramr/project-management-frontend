import { PubicHttpService } from "./publis.http.service";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";
// import { HttpService } from "./http.service";

@injectable()
export class SprintService {
  constructor(
    // @inject(HttpService) private httpService: HttpService,
    @inject(PubicHttpService) private publicHttpService: PubicHttpService
  ) {}
  namespace = "sprint";

  getSingleSprint = async (sprint_id: string) => {
    return await this.publicHttpService.get(`${this.namespace}/${sprint_id}`);
  };

  getSprintsForProject = async (project_id: string) => {
    return await this.publicHttpService.get(
      `${this.namespace}/project/${project_id}`
    );
  };

  deleteSprint = async (sprint_id: string) => {
    return await this.publicHttpService.delete(
      `${this.namespace}/${sprint_id}`
    );
  };

  deleteAllSprintForProject = async (project_id: string) => {
    return await this.publicHttpService.delete(
      `${this.namespace}/project/${project_id}`
    );
  };

  updateSprint = async (sprint_id: string, updateData: any) => {
    return await this.publicHttpService.put(
      `${this.namespace}/${sprint_id}`,
      updateData
    );
  };
}
