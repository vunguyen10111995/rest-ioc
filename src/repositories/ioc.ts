import { Container } from "inversify";
import { type as commonRepositoryTypes } from "./type";

import { IRestRepository } from "./IRestRepository";
import { RestRepository } from "./implementation/RestRepository";

export function configureCommonRepositories(container: Container): Container {
  container
    .bind<IRestRepository>(
      commonRepositoryTypes.IRestRepository
    )
    .to(RestRepository)
    .inSingletonScope();
  return container;
}
