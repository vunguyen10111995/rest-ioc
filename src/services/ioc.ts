import { Container } from "inversify";

import * as request from "request";

import { type as serviceTypes } from "./type";

import { IRestService } from "./IRestService";
import { RestService } from "./implementation/RestService";

import { IHttpService } from "./IHttpService";
import { HttpService } from "./implementation/HttpService";

import { IReflectionService } from "./IReflectionService";
import { ReflectionService } from "./implementation/ReflectionService";

export function configureCommonServices(container: Container): Container {
    container.bind<any>(serviceTypes.RequestLib).toConstantValue(request);
    container
    .bind<IHttpService>(serviceTypes.IHttpService)
    .to(HttpService)
    .inSingletonScope();
    container
    .bind<IRestService>(serviceTypes.IRestService)
    .to(RestService)
    .inSingletonScope();
    container
    .bind<IReflectionService>(serviceTypes.IReflectionService)
    .to(ReflectionService)
    .inSingletonScope();

    return container;
}