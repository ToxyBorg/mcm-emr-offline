export const handleCreatingMySQLDataDirectory = async (
  pathSegmentsToMySQLDataDirectory: string[]
): Promise<boolean> => {
  // getting the FULL path to the directory where the DATA folder is supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToMySQLDataDirectory/array
  const fullDataDirPath: string = await pathSegmentsToMySQLDataDirectory.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleCreatingMySQLDataDirectory fullDataDirPath:', fullDataDirPath)

  const tryingCreatingMySQLDataDirectory = await window.api.creatingDirectory(fullDataDirPath)
  console.log(
    '- handleCreatingMySQLDataDirectory tryingCreatingMySQLDataDirectory:',
    tryingCreatingMySQLDataDirectory
  )

  if (tryingCreatingMySQLDataDirectory == 'FAILED_CREATION') {
    return false
  }
  return true
}
