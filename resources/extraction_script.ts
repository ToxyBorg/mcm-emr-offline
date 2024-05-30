import * as fs from 'fs'
// import extract = require('extract-zip')
import * as path from 'path'
import * as unzipper from 'unzipper'

// export const extraction_script = async (): Promise<string[]> => {
//   let totalEntries = 0
//   let extractedEntries = 0
//   const sourcePath = path.join('resources', 'mysql.zip')
//   const outputPath = path.join('resources', 'app.asar.unpacked', 'resources')

//   await new Promise((resolve, reject) => {
//     fs.createReadStream(sourcePath)
//       .pipe(unzip.Parse())
//       .on('entry', function (entry: unzip.Entry) {
//         totalEntries++
//         if (entry.type === 'File') {
//           const filePath = path.join(outputPath, entry.path)
//           entry
//             .pipe(fs.createWriteStream(filePath))
//             .on('finish', () => {
//               extractedEntries++
//               console.log(`Progress: ${Math.round((extractedEntries / totalEntries) * 100)}%`)
//             })
//             .on('error', reject)
//         } else {
//           entry.autodrain()
//         }
//       })
//       .on('finish', resolve)
//       .on('error', reject)
//   }).catch(console.error)

//   console.log('Extraction complete')

//   return
// }

export const extraction_script = async (): Promise<string[]> => {
  const sourcePath = path.join('resources', 'mysql.zip')
  const outputPath = path.join('resources', 'app.asar.unpacked', 'resources')
  try {
    await fs.createReadStream(sourcePath).pipe(unzipper.Extract({ path: outputPath }))
  } catch (err) {
    console.error(err)
  }

  return [`Zip file ${sourcePath} extracted to ${outputPath}`]
}
