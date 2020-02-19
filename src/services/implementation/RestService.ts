import { IRestService } from "../IRestService";
import { type as serviceTypes } from "../type";
import { IReflectionService } from "../IReflectionService";
import { IRestRepository } from "../../repositories/IRestRepository";
import { type as repositoryTypes } from "../../repositories/type";
import { injectable, inject } from "inversify";

@injectable()
export class RestService implements IRestService {
    @inject(repositoryTypes.IRestRepository)
    private _restRepository: IRestRepository;

    @inject(serviceTypes.IReflectionService)
    protected _reflectionService: IReflectionService;

    index(): Promise<any> {
        return this._restRepository
            .index()
            .then(async response => {
                return response
            });
    }

    findById(value: string): Promise<any> {
        return this._restRepository
            .findById(value)
            .then(async response => {
                return response
            });
    }
}