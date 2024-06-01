import { DirectoryPathType } from '@shared/types/directoryPath'
import { RemovingDirectoryStatus } from '@shared/types/removingDirectoryStatus'

export const handleReset = async (
  directory: DirectoryPathType
): Promise<RemovingDirectoryStatus> => {
  // getting the FULL path to the directory where the EXTRACTED ZIPS are supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToDirectory/array
  const fullDirPathWithoutExtractedFolderName: string = directory.pathSegmentsToDirectory.reduce(
    (acc, curr) => window.api.joinPath(acc, curr),
    window.api.getCurrentDir()
  )

  const tester = async (extractedDirectory: string): Promise<RemovingDirectoryStatus> => {
    // We check if the zip has already been extracted by checking if that directory
    // path already exists
    const checkAlreadyExtracted = window.api.checkPathExists(extractedDirectory)

    // If the file has already been extracted we return EXTRACTED
    if (checkAlreadyExtracted) {
      const fullPathToDataDirectory = window.api.joinPath(extractedDirectory, 'data')
      const fullPathToBackupDataDirectory = window.api.joinPath(
        fullDirPathWithoutExtractedFolderName,
        'backup'
      )
      const checkDataExists = window.api.checkPathExists(fullPathToDataDirectory)
      if (checkDataExists) {
        const copyingToBackup = await window.api.copyDataToBackUp(
          fullPathToDataDirectory,
          fullPathToBackupDataDirectory
        )

        if (copyingToBackup == 'FAILED_COPYING') {
          return 'FAILED_REMOVING'
        }
      }

      return await window.api.removingDirectory(extractedDirectory)
    }

    return 'REMOVED'
  }

  return await tester(
    window.api.joinPath(fullDirPathWithoutExtractedFolderName, directory.defaultDirectoryName)
  )
}
