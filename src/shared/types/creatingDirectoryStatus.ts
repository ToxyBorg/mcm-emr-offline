import { DirectoryPathType } from './directoryPath'

export type CreatingDirectoryStatus = 'CREATING' | 'CREATED' | 'FAILED_CREATION'

export interface CurrentCreatingDirectoryStatus {
  directoryDetails: DirectoryPathType
  creatingDirectoryStatus: CreatingDirectoryStatus
}
