import { handleCheckingExtraction } from '@renderer/handlers/handleCheckingExtraction'
import { handleReset } from '@renderer/handlers/handleReset'
import { files_to_extract } from '@shared/consts/sharedPaths'
import { RemovingDirectoryStatus } from '@shared/types/removingDirectoryStatus'
import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { ExtractionStatus } from 'src/shared/types/extractionStatus'

// Define atoms for each check with the initial state
const initialStep_check1Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check1LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check1Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // We loop through every file needs for extraction
    for (const file_to_extract of files_to_extract) {
      // If we are asked to reset
      if (update == 'NOT_CHECKED') {
        // call the removal of the extracted java and mysql directories
        const removalOfExtractedZipsChecker: RemovingDirectoryStatus = await handleReset({
          pathSegmentsToDirectory: file_to_extract.pathSegmentsToZipDirectory,
          defaultDirectoryName: file_to_extract.defaultZipFileName.slice(0, -4)
        })

        console.log('LOG removalOfExtractedZipsChecker', removalOfExtractedZipsChecker)

        if (removalOfExtractedZipsChecker == 'FAILED_REMOVING') {
          alert(
            `An Error Occurred During The Initialization Step, Error with ${file_to_extract.defaultZipFileName.slice(0, -4)}`
          )
          set(initialStep_check1Atom, 'FAILED')
          return
        }
      }

      // This will return wether the extraction of that file is
      // "EXTRACTING" | "EXTRACTED" | "FAILED_EXTRACTION"
      const extractionCheckerStatus: ExtractionStatus =
        await handleCheckingExtraction(file_to_extract)

      if (extractionCheckerStatus == 'FAILED_EXTRACTION') {
        alert(
          `An Error Occurred During The Initialization Step, Error with ${file_to_extract.defaultZipFileName}`
        )
        set(initialStep_check1Atom, 'FAILED')
        return
      }
    }

    set(initialStep_check1Atom, update)
  }
)

export { initialStep_check1LogicAtom }
