// - This is out Service for get weather information
// - Build by adapter pattern which allow change to any weather provider
// but don't need to  change apis.
// - Build by singleton  pattern, so in everywhere, every time you only have 1 instance
import MetaWeather from './metaWeather'

export const WEATHER_PROVIDER = {
  MetaWeather: {
    name: 'MetaWeather',
    config: {
      baseUrl: 'https://www.metaweather.com/',
      endPoints: {
        searchCity: 'api/location/search/?query=',
        find5days: 'api/location/',
        icon: 'static/img/weather/',
      },
    },
  },
}

// eslint-disable-next-line func-names
const WeatherService = (function () {
  let service = null
  let serviceName = null


  function getService(provider) {
    if (service && serviceName === provider) {
      return service
    }
    switch (provider) {
      case WEATHER_PROVIDER.MetaWeather.name:
        serviceName = provider
        service = new MetaWeather(WEATHER_PROVIDER.MetaWeather.config)
        return service
      default:
        serviceName = WEATHER_PROVIDER.MetaWeather.name
        service = new MetaWeather(WEATHER_PROVIDER.MetaWeather.config)
        return service
    }
  }

  function searchCity(name, provider) {
    const instance = getService(provider)
    return instance.searchCity(name)
  }

  function find5days(id, provider) {
    const instance = getService(provider)
    return instance.find5days(id)
  }

  function normalizeData(weathers, provider) {
    const instance = getService(provider)
    return instance.normalizeData(weathers)
  }

  return {
    searchCity,
    find5days,
    normalizeData,
  }
}())

export default WeatherService
