import { join } from "path"
import { Code } from "@aws-cdk/aws-lambda"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { IFunctionProps } from "../../../aws-nestjs-generic-deployment/dist/constructs/lambda.construct"
import { ApiLambdaWithHistoryQueueStack } from "../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history-queue.stack"
import { ApiLambdaStack } from "../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack"
import { apiLambdas } from "./resources/api-lambda.resource"

//should be a class and app should be shared 
// nestsjs ?
const deployApiLambdas = (app: App): void => {
    for (const apiLambda of apiLambdas) {
        const { name, zipPath, withHistory, handler = 'dist/lambda.handler' } = apiLambda
        const lambdaProps: IFunctionProps = {
            code: Code.fromAsset(join(__dirname, zipPath)),
            handler,
        }
        
        if(withHistory) {
            new ApiLambdaWithHistoryQueueStack(app, name, {
                lambdaProps,
            })
        } else {
            new ApiLambdaStack(app, name, {
                lambdaProps
            })
        }
    }
} 

export const deploy = (app: App): void => {
    deployApiLambdas(app)
}
