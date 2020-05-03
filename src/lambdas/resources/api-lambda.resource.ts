import { IApiLambda } from '../interfaces/api-lambda.interface'

// care when changing the name of lambdas, it wont destroy the previous stack
// so do it before changing : npm run cdk destroy ${old-name}
// that should be taken from the db
export const apiLambdas: IApiLambda[]= [
  {
    name: 'aws-nestjs-api',
    zipPath: '../../../aws-nestjs-api/bundle.zip',
    withHistory: true,
  },
  {
    name: 'aws-nestjs-api2',
    zipPath: '../../../aws-nestjs-api/bundle.zip',
  }
]