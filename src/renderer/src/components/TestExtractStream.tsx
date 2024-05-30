interface ExtractionProps {
  name: string
  inputPaths: string[]
  //   currentDir: string
}
export const TestExtractStream = (props: ExtractionProps): JSX.Element => {
  const handleExtractZip = async (): Promise<void> => {
    const fullPath = props.inputPaths.reduce(
      (acc, curr) => window.api.joinPath(acc, curr),
      window.api.getCurrentDir()
    )
    const message = await window.api.extractZipFileStream(fullPath)
    alert(message)
  }

  return <button onClick={handleExtractZip}>## STREAM Extract {props.name} Zip</button>
}
