import { injectable, inject } from "inversify";
import { IHttpService, IHttpServiceRequest } from "../IHttpService";
import { HttpMethod } from "../../enum/HttpMethod";
import { RemoteServiceException } from "../exception/RemoteServiceException";
import { type as serviceCommonTypes } from "../type";

@injectable()
export class HttpService implements IHttpService {
  @inject(serviceCommonTypes.RequestLib)
  private readonly _requestLib: any;

  get(httpRequest: IHttpServiceRequest): Promise<any> {
    httpRequest.method = HttpMethod.get;
    return this.invoke(httpRequest);
  }

  post(httpRequest: IHttpServiceRequest): Promise<any> {
    httpRequest.method = HttpMethod.post;
    return this.invoke(httpRequest);
  }

  invoke(httpRequest: IHttpServiceRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestPayload = {
        url: httpRequest.url,
        headers: undefined,
        method: httpRequest.method || HttpMethod.post,
        json: true,
        body: undefined,
        qs: undefined
      };
      if (requestPayload.method === HttpMethod.post) {
        requestPayload.body = httpRequest.body || {};
      } else {
        requestPayload.qs = httpRequest.body || {};
      }
      requestPayload.headers = httpRequest.header;
      this._requestLib(requestPayload, (error, response, body) => {
        if (error) {
          const message = error.messsage;
          reject(new RemoteServiceException(message));
        } else {
          const status = parseInt(response.statusCode, 10);
          if (status >= 200 && status < 300) {
            resolve({
              status: status,
              headers: response.headers,
              response: body
            });
          }
        }
      });
    });
  }
}
