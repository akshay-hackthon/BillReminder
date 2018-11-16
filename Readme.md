# Guide on API Usage

## Pre-requisites

- yarn package manager is used in this application to manage the packages. Make sure you have yarn installed globally on your machine.```language

`npm install yarn -g`

- Install the packages required to run the program using

`yarn install`

## Running the Application

- run the following command in the command line to build the files in dist folder

`yarn dev:build`

The above command will contiously watch for any changes in the source files and re-publish the files in dist folder

- open another terminal window and run the below command to start the node server

`yarn dev`

- browse to the url http://localhost:8000/ to view the application endpoints default message.

## Guide on building NodJs Enterprise Applications

## Setting up the environment

- Make sure you have yarn package globally installed.

`npm install -g yarn`

- Initialize the project using the command

`yarn init`

- Provide the default values during the init process.

- Create the following config/settings files in the project using the below commands

```javascript
touch.eslintrc.json
touch.gitignore
touch.npmrc
touch.nvmtc
touch.prettierrc
```

### Adding the packages required for linting & Formatting code

```javascript

yarn add -D  eslint eslint-config-strongloop prettier

```
