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
}
