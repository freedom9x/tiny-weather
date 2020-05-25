//  - Description:
//  Log service for capture information and exceptions
//  for tracking and debug

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line func-names
const LogService = (function () {
  let config = null

  function setConfig(setup) {
    config = setup
  }

  function logError(error) {
    console.log(error)
  }

  return {
    logError,
    setConfig,
  }
}())

export default LogService
