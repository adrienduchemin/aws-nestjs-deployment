import { IApiLambda } from '../interfaces/api-lambda.interface'

// that should be taken from the db
export const apiLambdas: IApiLambda[]= [
  {
    name: 'aws-nestjs-api',
    zipPath: '../../../aws-nestjs-api/bundle.zip',
    withHistory: true,
  },
  // the next one is not deployed
  {
    name: 'aws-nestjs-api2',
    zipPath: '../../../aws-nestjs-api/bundle.zip',
  }
]