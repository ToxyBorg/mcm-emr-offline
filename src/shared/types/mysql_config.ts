export interface ProcessInfo {
  names: string[]
  binaryPathSegments: string[]
}

export interface MySQLConfig {
  Initialized: boolean
  sqlDataDumped: boolean
  user: 'root'
  password: 'root' | null
  mysql_sever_info: {
    started: boolean
    port: 3306
    host: 'localhost'
    processes: {
      mysqld: ProcessInfo
      mysql: ProcessInfo
      mysqladmin: ProcessInfo
    }
  }
}
