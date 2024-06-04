import { ElectronAPI } from '@electron-toolkit/preload'
import { API } from '@shared/types/window.api.types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
