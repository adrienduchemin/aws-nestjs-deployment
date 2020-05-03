import { join } from "path"
import { Code } from "@aws-cdk/aws-lambda"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { IFunctionProps } from "../../../aws-nestjs-generic-deployment/dist/constructs/lambda.construct"
import { IApiLambdaWithHistoryQueueStackProps, ApiLambdaWithHistoryQueueStack } from "../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history-queue.stack"
import { IApiLambdaStackProps, ApiLambdaStack } from "../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack"
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
            const props: IApiLambdaWithHistoryQueueStackProps = {
                lambdaProps,
            }
            new ApiLambdaWithHistoryQueueStack(app, name, props)
        } else {
            const props: IApiLambdaStackProps = {
                lambdaProps
            }
            new ApiLambdaStack(app, name, props)
        }
    }
} 

export const deploy = (app: App): void => {
    deployApiLambdas(app)
}
