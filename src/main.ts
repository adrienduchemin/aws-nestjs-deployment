import { App } from '@aws-cdk/core'
import { deploy as deployLambdas } from './lambdas'

// should be a nest application with controllers to add a lambda to the db
// or deploy the app or a specific resource, both from the db

const app = new App()

deployLambdas(app)

export default app