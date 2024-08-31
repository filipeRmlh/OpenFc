import { ChildProcessWithoutNullStreams } from 'node:child_process'
import { spawn } from 'child_process'
import { ConnectionError } from '../errors/ConnectionError'

export interface IOutputData {
  data: Buffer
  error: boolean
}

export const command = (
  commandString: string,
  argumentsArray: string[],
  onDataOutput: (outputData: IOutputData) => void,
  onFinish: (error?: Error, code?: number) => void
):
  | {
      commandObject: ChildProcessWithoutNullStreams
      abortController: AbortController
    }
  | undefined => {
  try {
    const abortController = new AbortController()
    console.log('RUN', commandString, argumentsArray)
    const commandObject = spawn(commandString, argumentsArray)

    commandObject.stdout.on('data', (data: Buffer) => {
      console.log(data.toString())
      onDataOutput({ data, error: false })
    })

    commandObject.on('error', (error: Error) => {
      if (error.message.includes('EPERM')) {
        console.log('EPERM', error)
        return
      }
      onFinish(error)
    })

    commandObject.on('close', (code: number) => {
      if (code !== 0) {
        onFinish(new ConnectionError(`Unexpected connection exit: code = ${code}`), code)
      } else {
        onFinish()
      }
    })

    return { commandObject, abortController }
  } catch (e) {
    console.log('TryError', e)
    onFinish(e as Error)
    return undefined
  }
}
