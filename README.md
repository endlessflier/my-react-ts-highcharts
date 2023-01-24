# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all the dependencies listed within package.json in the local `node_modules` folder.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Description

## Fake Server

The fake server you provided has a cors issue. So I used Heroku to migrate the fake server.\
The address is https://skip-select-server.herokuapp.com

## Config

• Interfont installed\
• Webpack configuration - Craco was installed to configure Pathalias.\
• To apply the lint rule, .eslintrc, .eslintrc.js was added\
• To apply the editorial rules, .prettierrc was installed

## libraries

• [@mui/material](https://mui.com/) – provides a simple, customizable, and accessible library of React components.\
• [highcharts](https://www.highcharts.com/) – Charting library for Javascript, Angular, React, VueJS, iOS, R, .NET, Python, and more.\
• [MobX](https://mobx.js.org/react-integration.html) – a battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming.

Route was used in App.tsx for page management\
Mobx was used for status management and data processing and processed as a store\
Adding ThemeProvider will make css processing easier

## Program Description

The project has the following holder structure\
• api – communicates with the backend\
• Components – create shared components\
• Icons – a set of re-used Icons\
• Pages – manage pages.
