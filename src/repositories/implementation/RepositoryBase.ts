import * as _ from "underscore";
import { injectable, inject } from "inversify";
import { type as commonServiceTypes } from "../../services/type";
import { IReflectionService } from "../../services/IReflectionService";

@injectable()
export abstract class RepositoryBase {
  @inject(commonServiceTypes.IReflectionService)
  protected _reflectionService: IReflectionService;
}
