export interface IRestService {
    index(): Promise<any>;

    findById(value: string): Promise<any>;
}
