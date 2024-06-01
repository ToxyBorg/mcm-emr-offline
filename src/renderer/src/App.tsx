import { Checker } from './components/Checker'

function App(): JSX.Element {
  return (
    <>
      <Checker />
      {/* {files_to_extract.map((files_to_extract) => {
        return <TestExtractStream key={files_to_extract.name} {...files_to_extract} />
      })} */}

      {/* <TestExtractStream
        inputPaths={[
          'resources',
          'app.asar.unpacked',
          'resources',
          'MySQL',
          'mysql-8.0.37-winx64.zip'
        ]}
        name="MySQL"
      />

      <TestExtractStream
        inputPaths={[
          'resources',
          'app.asar.unpacked',
          'resources',
          'Java',
          'zulu8.78.0.19-ca-jdk8.0.412-win_x64.zip'
        ]}
        name="Java"
      /> */}
    </>
  )
}

export default App
