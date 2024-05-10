export class ReadConfigFileError extends Error {
  constructor(configFile?: unknown) {
    super('CouldNotReadConfigFile')
    console.error('CouldNotReadConfigFile', configFile)
  }
}
