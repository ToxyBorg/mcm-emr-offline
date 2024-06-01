import { BinariesType } from '@shared/types/binariesPath'

export const handleCheckingBinaryFile = (binary: BinariesType): boolean => {
  // getting the FULL path to the directory where the BINARIES are supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToBinaryDirectory/array
  const fullDirPath: string = binary.pathSegmentsToBinaryDirectory.reduce(
    (acc, curr) => window.api.joinPath(acc, curr),
    window.api.getCurrentDir()
  )

  const tester = (binary: string): boolean => {
    // we link the binary with the current FULL path
    // example .../something/something/path/segments/in/pathSegmentsToBinaryDirectory/array/xyz.exe
    const binaryFullPath = window.api.joinPath(fullDirPath, binary)

    // We check if the binary at the specified path exists
    return window.api.checkPathExists(binaryFullPath)
  }

  return tester(binary.nameOfBinary)
}
