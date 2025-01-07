import { PubicHttpService } from "./publis.http.service";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "tsyringe";
// import { HttpService } from "./http.service";

@injectable()
export class AuthService {
  constructor(
    // @inject(HttpService) private httpService: HttpService,
    @inject(PubicHttpService) private publicHttpService: PubicHttpService
  ) {}
  namespace = "user";

  getUserByEmail = async (email: string) => {
    return await this.publicHttpService.get(`${this.namespace}/email/${email}`);
  };

  getMembersOfOrg = async (org_id: string) => {
    return await this.publicHttpService.get(`${this.namespace}/orgs/${org_id}`);
  };

  loginUser = async (userData: any) => {
    return await this.publicHttpService.post(
      `${this.namespace}/login`,
      userData
    );
  };

  registerUser = async (userData: any) => {
    return await this.publicHttpService.post(
      `${this.namespace}/register`,
      userData
    );
  };
}
