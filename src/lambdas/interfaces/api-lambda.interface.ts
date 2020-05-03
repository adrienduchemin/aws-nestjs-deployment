export interface IApiLambda {
    name: string;
    zipPath: string;
    withHistory?: boolean;
    handler?: string;
}