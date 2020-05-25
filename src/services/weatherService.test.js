import weatherService, { WEATHER_PROVIDER } from './weatherService'
import metaWeather from './metaWeather'

jest.mock('./metaWeather')

describe('Weather singelton service ', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    metaWeather.mockClear()
  })

  it('metaWeather is created', () => {
    weatherService.searchCity('name', WEATHER_PROVIDER.MetaWeather.name)
    expect(metaWeather).toHaveBeenCalledTimes(1)
  })

  it('metaWeather is not called because it is created ', () => {
    weatherService.searchCity('name', WEATHER_PROVIDER.MetaWeather.name)
    weatherService.find5days('name', WEATHER_PROVIDER.MetaWeather.name)
    expect(metaWeather).toHaveBeenCalledTimes(0)
  })
})
