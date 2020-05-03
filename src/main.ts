import { join } from 'path'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'

// to refacto with lerna lib
import { ApiLambdaWithHistoryStack } from '../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history.stack'
import { ApiLambdaStack, ApiLambdaStackProps } from '../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack'

interface IApiLambda {
  name: string;
  zipPath: string;
  withHistory?: boolean;
  handler?: string;
}

// care when changing the name of lambdas, it wont destroy the previous stack
// so do it before changing : npm run cdk destroy ${old-name}
const apiLambdas: IApiLambda[]= [
  {
    name: 'aws-nestjs-api',
    zipPath: '../../aws-nestjs-api/bundle.zip',
    withHistory: true,
  }
]

const app = new App()

for (const apiLambda of apiLambdas) {
  const { name, zipPath, withHistory, handler = 'dist/lambda.handler' } = apiLambda
  const props: ApiLambdaStackProps = {
    lambdaProps: {
      code: Code.fromAsset(join(__dirname, zipPath)),
      handler,
    }
  }
  if(withHistory) {
    new ApiLambdaWithHistoryStack(app, name, props)
  } else {
    new ApiLambdaStack(app, name, props)
  }
}