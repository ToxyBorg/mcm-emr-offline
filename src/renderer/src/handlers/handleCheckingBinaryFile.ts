import { BinariesType } from '@shared/types/binariesPath'

export const handleCheckingBinaryFile = async (binary: BinariesType): Promise<boolean> => {
  // getting the FULL path to the directory where the BINARIES are supposed to be.
  // for example .../something/something/path/segments/in/pathSegmentsToBinaryDirectory/array
  const fullDirPath: string = await binary.pathSegmentsToBinaryDirectory.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleCheckingBinaryFile fullDirPath: ', fullDirPath)

  const tester = async (binary: string): Promise<boolean> => {
    // we link the binary with the current FULL path
    // example .../something/something/path/segments/in/pathSegmentsToBinaryDirectory/array/xyz.exe
    const binaryFullPath = await window.api.joinPath(fullDirPath, binary)

    console.log('- handleCheckingBinaryFile binaryFullPath: ', binaryFullPath)

    // We check if the binary at the specified path exists
    const doesBinaryAtPathExists = window.api.checkPathExists(binaryFullPath)
    console.log('- handleCheckingBinaryFile doesBinaryAtPathExists: ', doesBinaryAtPathExists)

    return doesBinaryAtPathExists
  }

  return tester(binary.nameOfBinary)
}
