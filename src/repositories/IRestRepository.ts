export interface IRestRepository {
    index(): Promise<any>;

    findById(value: string): Promise<any>;
}