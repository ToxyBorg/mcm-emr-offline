import { ExtractionFileType } from './extractionPath'

export type ExtractionStatus = 'EXTRACTING' | 'EXTRACTED' | 'FAILED_EXTRACTION'

export interface CurrentFileExtractionStatus {
  fileDetails: ExtractionFileType
  fileExtractionStatus: ExtractionStatus
}
