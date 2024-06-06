# MCM-EMR-OFFLINE

An Electron application with React, TypeScript, Jotai and Mantine

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

* `npm i`to install the dependencies
* `npm i -g ts-node` to install ts-node globally

### Download

1) The java zip goes in the dir `resources -> Java`

https://www.azul.com/downloads/?version=java-8-lts&os=windows&architecture=x86-64-bit&package=jdk#zulu

2) The `mysql` zip goes in the directory `resources -> MySQL`

https://dev.mysql.com/downloads/mysql/8.0.html


3) The `Doctors Data` zip goes in the directory `resources -> MySQL -> MySQL config` and should
be named exactly `Doctors Data.zip`

### Settings

* `electron-builder.config.ts` for tweaking the build params of the app
* `src -> shared -> sharedPaths.ts` to switch between `PROD` and `DEV` mode of the paths
* `resources/Java/SpringBoot config/SpringBoot_Config.json` and `resources/MySQL/MySQL config/MySQL_Config.json` are used to determine the setup of the `MySQL` and `SpringBoot` server params

### Build

* run `npm run build:electron-build` to build the app. But make sure all the `zips` are in their right place, as well as switching to `PROD` at the bottom of the `sharedPaths.ts` file