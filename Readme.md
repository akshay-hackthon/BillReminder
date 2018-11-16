# Guide on Building NodJs Enterprise Applications

## Setting up the enviornment 
Make sure you have yarn package globally installed. 
`npm install -g yarn`

Initialize the project using the command 
`yarn init`

Provide the default values during the init process. 

Create the following config/settings files in the project using the below commands

``` javascript

touch .eslintrc.json
touch .gitignore
touch .npmrc 
touch .nvmtc
touch .prettierrc

```

### Adding the packages required for linting & Formatting code

``` javascript 

yarn add -D  eslint eslint-config-strongloop prettier

```