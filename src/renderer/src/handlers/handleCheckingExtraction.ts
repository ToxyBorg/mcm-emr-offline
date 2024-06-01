import { ExtractionFileType } from 'src/shared/types/extractionPath'
import { ExtractionStatus } from 'src/shared/types/extractionStatus'

export const handleCheckingExtraction = async (
  zip: ExtractionFileType
): Promise<ExtractionStatus> => {
  // getting the FULL path to the directory where the ZIPS are supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
  const fullDirPath: string = zip.pathSegmentsToZipDirectory.reduce(
    (acc, curr) => window.api.joinPath(acc, curr),
    window.api.getCurrentDir()
  )

  const tester = async (zipFileName: string): Promise<ExtractionStatus> => {
    // we link the zipFileName with the current FULL path
    // example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array/xyz.zip
    const zipFileNameFullPath = window.api.joinPath(fullDirPath, zipFileName)

    // We check if the zip has already been extracted by removing the .zip at the end
    // and checking if that path already exists
    const checkAlreadyExtracted = window.api.checkPathExists(zipFileNameFullPath.slice(0, -4))

    // If the file has already been extracted we return EXTRACTED
    if (checkAlreadyExtracted) {
      return 'EXTRACTED'
    }

    // If the file hasn't been extracted yet, we try and extract it and return the result
    return await window.api.extractZipFileStream(zipFileNameFullPath)
  }
  const getListZipFiles: string[] = window.api.listZipFiles(fullDirPath)

  if (getListZipFiles.includes(zip.defaultZipFileName)) {
    await tester(zip.defaultZipFileName)
  } else {
    for (const zipFileName of getListZipFiles) {
      await tester(zipFileName)
    }
  }

  return 'EXTRACTED'
}
