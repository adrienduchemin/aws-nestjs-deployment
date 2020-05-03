import { CloudAssembly } from '@aws-cdk/cx-api'
import app from '../src/main'

describe('Main', () => {
  let synth: CloudAssembly

  beforeAll(()=> {
    synth = app.synth()
  })

  it('should not have changed', () => {
    expect(synth.stacks.length).toEqual(2)
  })

  it('should not have changed', () => {
    expect(synth).toMatchSnapshot()
  })
})