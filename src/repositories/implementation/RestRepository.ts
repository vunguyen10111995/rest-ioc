import { injectable, inject } from "inversify";
import { IRestRepository } from "../IRestRepository";
import { HttpMethod } from "../../enum/HttpMethod";
import { type as commonServiceTypes } from "../../services/type";
import { IHttpService, IHttpServiceRequest } from "../../services/IHttpService";
import { RepositoryBase } from "./RepositoryBase";

@injectable()
export class RestRepository extends RepositoryBase
  implements IRestRepository {
    @inject(commonServiceTypes.IHttpService)
    protected readonly _httpService: IHttpService;

    request(request: IHttpServiceRequest): Promise<any> {
      const payload = { ...request, url: `https://jsonplaceholder.typicode.com` + request.url };

      console.log(payload);
      const self = this;
      return this._httpService.invoke(payload).then(response => {
        return self._reflectionService.toObject(response.response);
      });
    }

    index(): Promise<any> {
      return this.request({
        url: '/todos',
        method: HttpMethod.get
      });
    }

    findById(value: string): Promise<any> {
      return this.request({
        url: `/todos/${value}`,
        method: HttpMethod.get
      });
    }
}
