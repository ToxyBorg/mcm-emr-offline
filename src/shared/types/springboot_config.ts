export interface JavaProcessInfo {
  names: string[]
  binaryPathSegments: string[]
}

export interface SpringBootConfig {
  springboot_sever_info: {
    started: boolean
    port: 2200
    host: 'localhost'
    processes: {
      java: JavaProcessInfo
    }
  }
}
