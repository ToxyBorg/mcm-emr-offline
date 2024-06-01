'use strict'

import * as builder from 'electron-builder'
// import { extraction_script } from './resources/extraction_script'

// Define the configuration options here
const config: builder.Configuration = {
  appId: 'com.electron.app',
  productName: 'electron-app',
  directories: {
    buildResources: 'build'
  },
  // "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
  // compression: 'store',
  // afterAllArtifactBuild: extraction_script,
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
  ],
  asarUnpack: ['resources/**'],
  win: {
    executableName: 'electron-app'
  },
  nsis: {
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: 'always'
    // include: 'post_install.nsh'
  },
  mac: {
    entitlementsInherit: 'build/entitlements.mac.plist',
    extendInfo: [
      { NSCameraUsageDescription: "Application requests access to the device's camera." },
      { NSMicrophoneUsageDescription: "Application requests access to the device's microphone." },
      {
        NSDocumentsFolderUsageDescription:
          "Application requests access to the user's Documents folder."
      },
      {
        NSDownloadsFolderUsageDescription:
          "Application requests access to the user's Downloads folder."
      }
    ],
    notarize: false
  },
  dmg: {
    artifactName: '${name}-${version}.${ext}'
  },
  linux: {
    target: ['dir'],
    maintainer: 'electronjs.org',
    category: 'Utility'
  },
  appImage: {
    artifactName: '${name}-${version}.${ext}'
  },
  npmRebuild: false,
  publish: {
    provider: 'generic',
    url: 'https://example.com/auto-updates'
  }
}

// Build function (optional, see usage below)
const build = async (): Promise<void> => {
  try {
    await builder.build({
      targets: builder.Platform.LINUX.createTarget(),
      config
    })
  } catch (error) {
    console.error(error)
  }
}

// call the electron-builder function
build()

module.exports = config
