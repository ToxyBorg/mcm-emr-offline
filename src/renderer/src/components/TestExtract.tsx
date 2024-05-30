interface ExtractionProps {
  name: string
  inputPaths: string[]
  //   currentDir: string
}
export const TestExtract = (props: ExtractionProps): JSX.Element => {
  const handleExtractZip = async (): Promise<void> => {
    const fullPath = props.inputPaths.reduce(
      (acc, curr) => window.api.joinPath(acc, curr),
      window.api.getCurrentDir()
    )
    const message = await window.api.extractZipFile(fullPath)
    alert(message)
  }

  return <button onClick={handleExtractZip}>## Extract {props.name} Zip</button>
}
