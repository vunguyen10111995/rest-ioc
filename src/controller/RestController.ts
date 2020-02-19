import "reflect-metadata";
import { Container } from 'inversify';
import { type as serviceTypes } from '../services/type';
import { configureCommonServices } from '../services/ioc';
import { configureCommonRepositories } from '../repositories/ioc';
import { IRestService } from "../services/IRestService";
import { Router, Request, Response } from 'express';

const container = new Container();

configureCommonServices(container);
configureCommonRepositories(container);

const restService = container.get<IRestService>(serviceTypes.IRestService);

export class RestController {
    router = Router();

    constructor() {
        this.router = Router();
        this.init();
    }

    public async getAll(req: Request, res: Response) {
        let id = req.params.id;
        console.log(id);
        let employees = await restService.index();
        res.status(200).json(employees);
    }

    public async findById(req: Request, res: Response) {
        let id = req.params.id;
        let employee = await restService.findById(id);
        res.status(200).json(employee);
    }
   
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.findById);
    }
}

const restRoutes = new RestController();
restRoutes.init();

export default restRoutes.router;
