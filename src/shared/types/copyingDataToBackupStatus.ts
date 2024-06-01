import { DirectoryPathType } from './directoryPath'

export type CopyingStatus = 'COPYING' | 'COPIED' | 'FAILED_COPYING'

export interface CurrentDataDirectoryBackupStatus {
  directoryDetails: DirectoryPathType
  typeCopyingStatus: CopyingStatus
}
