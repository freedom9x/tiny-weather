
## About

This project build for show current day and next 5 forecast days base on the city, which user can input

### Use cases
Because https://www.metaweather.com/ don't allow outside request, so we need to disable web security in your browser. Here is guide for [chrome](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome) 

- Home page: https://freedom9x.github.io/tiny-weather
- Search :  https://freedom9x.github.io/tiny-weather/?q=london
- Search suggestion: https://freedom9x.github.io/tiny-weather/?q=ber

![Search suggestion][image1]


## Structures

### 1. UI
- Use react, styled-component for handler render
- Use jest, enzyme for testing react component, services

### 2. Services
- Design [Weather service](https://github.com/freedom9x/tiny-weather/blob/master/src/services/weatherService.js), which adapter and singleton pattern approach.
- Design [Meta Weather service](https://github.com/freedom9x/tiny-weather/blob/master/src/services/weatherService.js)  which can be used by Weather service.

## Get started

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you can't access `metaweather` apis because `https`, please [disable web security](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome) 

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deployment

The project is deploy with [github page](https://pages.github.com/)

[image1]: https://user-images.githubusercontent.com/5037791/82836512-d1f42700-9ef0-11ea-8acf-75eb592f50d9.PNG
