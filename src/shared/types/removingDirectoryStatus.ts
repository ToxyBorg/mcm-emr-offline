import { DirectoryPathType } from './directoryPath'

export type RemovingDirectoryStatus = 'REMOVING' | 'REMOVED' | 'FAILED_REMOVING'

export interface CurrentRemovingDirectoryStatus {
  directoryDetails: DirectoryPathType
  removingDirectoryStatus: RemovingDirectoryStatus
}
