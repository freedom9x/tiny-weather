// That service is build for communication for MetaWeather api provider
// MetaWeather provides an API that delivers JSON over HTTPS for access to our data.
// https://www.metaweather.com/api/
import logService from 'services/logService'

class MetaWeather {
  constructor({ baseUrl, endPoints }) {
    this.baseUrl = baseUrl
    this.endPoints = endPoints
    this.normalizeData = this.normalizeData.bind(this)
  }

  async searchCity(name) {
    const endPoint = `${this.baseUrl}${this.endPoints.searchCity}${name}`
    const response = await fetch(endPoint)
    if (response.status === 200) {
      return response.json()
    }
    const error = `${response.status} : ${response.statusText}`
    logService.logError(error)
    return { errorMessage: error }
  }

  async find5days(id) {
    const endPoint = `${this.baseUrl}${this.endPoints.find5days}${id}`
    const response = await fetch(endPoint)

    if (response.status === 200) {
      return response.json()
    }

    const error = `${response.status} : ${response.statusText}`
    logService.logError(error)
    return { errorMessage: error }
  }

  // get name of day base on yyyy-mm-dd
  getDayName(applicableDate) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const parts = applicableDate.split('-')
    const date = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2])
    return dayNames[date.getDay()]
  }

  // normalize specific response data
  normalizeData(weathers) {
    const result = weathers.map((weather) => ({
      minTemp: parseFloat(weather.min_temp),
      maxTemp: parseFloat(weather.max_temp),
      dayName: this.getDayName(weather.applicable_date),
      iconUrl: `${this.baseUrl}${this.endPoints.icon}${weather.weather_state_abbr}.svg`,
      id: weather.id,
    }))
    return result
  }
}

export default MetaWeather
