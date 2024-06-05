import React, { useEffect, useState } from 'react'

export const CurrentDirectory: React.FC = () => {
  const [currentDir, setCurrentDir] = useState<string>('')
  const [inputPaths, setInputPaths] = useState<string[]>([''])
  const [isValidPath, setIsValidPath] = useState<boolean | null>(null)
  const [isExtracting, setIsExtracting] = useState<boolean>(false)
  const [isZipFile, setIsZipFile] = useState<boolean | null>(null)

  useEffect(() => {
    // Fetch the current directory on initial render
    setCurrentDir(window.api.getCurrentDir())
  }, [])

  const fetchCurrentDir = (): void => {
    setCurrentDir(window.api.getCurrentDir())
  }

  const handleInputChange = (index: number, value: string): void => {
    const newInputPaths = [...inputPaths]
    newInputPaths[index] = value
    setInputPaths(newInputPaths)
    setIsZipFile(null) // Reset isZipFile state when input changes
  }

  const handleAddPath = (): void => {
    setInputPaths([...inputPaths, ''])
  }

  const handleRemovePath = (index: number): void => {
    const newInputPaths = inputPaths.filter((_, i) => i !== index)
    setInputPaths(newInputPaths)
  }

  const handleCheckPath = (): void => {
    const fullPath = inputPaths.reduce((acc, curr) => window.api.joinPath(acc, curr), currentDir)
    setIsValidPath(window.api.checkPathExists(fullPath))
  }

  const handleCheckZip = (): void => {
    const fullPath = inputPaths.reduce((acc, curr) => window.api.joinPath(acc, curr), currentDir)
    setIsZipFile(window.api.isZipFile(fullPath))
  }

  const handleExtractZip = async (): Promise<void> => {
    setIsExtracting(true)
    const fullPath = inputPaths.reduce((acc, curr) => window.api.joinPath(acc, curr), currentDir)
    const message = await window.api.extractZipFile(fullPath)
    alert(message)
    setIsExtracting(false)
  }

  return (
    <div>
      <h1>Current Directory</h1>
      <p>{currentDir}</p>
      {inputPaths.map((inputPath, index) => (
        <div key={index}>
          <input
            type="text"
            value={inputPath}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => handleRemovePath(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddPath}>Add Path Segment</button>
      <button onClick={handleCheckPath}>Check Path</button>
      {isValidPath !== null && <p>Path is {isValidPath ? 'valid' : 'invalid'}</p>}
      <button onClick={fetchCurrentDir}>Reload Current Directory</button>

      <button onClick={handleCheckZip} disabled={isValidPath === null}>
        Check Zip
      </button>
      <button onClick={handleExtractZip} disabled={!isZipFile || isExtracting}>
        Extract Zip
      </button>
    </div>
  )
}
