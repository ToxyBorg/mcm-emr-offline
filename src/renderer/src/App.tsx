import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { CurrentDirectory } from './components/CurrentDirectory'
import { TestExtract } from './components/TestExtract'
import { TestExtractStream } from './components/TestExtractStream'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <CurrentDirectory></CurrentDirectory>
      <TestExtract
        inputPaths={['resources', 'app.asar.unpacked', 'resources', 'mysql.zip']}
        name="mysql"
      />

      <TestExtractStream
        inputPaths={['resources', 'app.asar.unpacked', 'resources', 'mysql.zip']}
        name="mysql"
      />

      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
