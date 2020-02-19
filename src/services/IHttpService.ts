import { HttpMethod } from "../enum/HttpMethod";

export interface IHttpServiceRequest {
    url: string;
    method?: HttpMethod;
    header?: any;
    body?: any;
}
  
export interface IHttpService {
    get(request: IHttpServiceRequest): Promise<any>;
    post(request: IHttpServiceRequest): Promise<any>;
    invoke(request: IHttpServiceRequest): Promise<any>;
}
  