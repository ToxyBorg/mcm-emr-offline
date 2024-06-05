export const handleCheckingMySQLDataDirectory = async (
  pathSegmentsToMySQLDataDirectory: string[]
): Promise<boolean> => {
  // getting the FULL path to the directory where the DATA folder is supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToMySQLDataDirectory/array
  const fullDataDirPath: string = await pathSegmentsToMySQLDataDirectory.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleCheckingMySQLDataDirectory fullDataDirPath:', fullDataDirPath)

  const doesMySQLDataDirExists = window.api.checkPathExists(fullDataDirPath)
  console.log('- handleCheckingMySQLDataDirectory doesMySQLDataDirExists:', doesMySQLDataDirExists)

  return doesMySQLDataDirExists
}
