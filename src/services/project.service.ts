import { inject, injectable } from "tsyringe";
import { PubicHttpService } from "./publis.http.service";

@injectable()
export class ProjectService {
  constructor(
    @inject(PubicHttpService) private publicHttpService: PubicHttpService
  ) {}
  namespace = "project";

  getProjectsOfOrg = async (org_id: string) => {
    return await this.publicHttpService.get(`${this.namespace}/org/${org_id}`);
  };

  createProject = async (projectData: any) => {
    return await this.publicHttpService.post(`${this.namespace}`, projectData);
  };

  getSingleProject = async (projectId: string) => {
    return await this.publicHttpService.get(`${this.namespace}/${projectId}`);
  };

  ListProjectsByOrgID = async (org_id: string) => {
    return await this.publicHttpService.get(
      `${this.namespace}/list/by/org/${org_id}`
    );
  };

  getProjectsByPage = async (org_id: string, page: number) => {
    return await this.publicHttpService.get(
      `${this.namespace}/project/list/projects/${org_id}?page=${page}`
    );
  };

  deleteSingleProject = async (projectId: string) => {
    return await this.publicHttpService.delete(
      `${this.namespace}/${projectId}`
    );
  };
}
