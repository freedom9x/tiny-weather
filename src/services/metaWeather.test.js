import MetaWeather from './metaWeather'

describe('Meta Weather service ', () => {
  let metaService
  beforeEach(() => {
    metaService = new MetaWeather({ baseUrl: '', endPoints: { icon: '' } })
  })

  it('getDay function work correct', () => {
    const applicableDate = '2020-05-25'
    const dayName = metaService.getDayName(applicableDate)
    expect(dayName).toEqual('Monday')
  })

  it('normalizeData function work correct', () => {
    const weathers = [{
      min_temp: '30.01',
      max_temp: '40.01',
      applicable_date: '2020-05-25',
      weather_state_abbr: 'icon',
      id: 1,
    }]

    const expectedWeathers = metaService.normalizeData(weathers)
    expect(expectedWeathers[0].minTemp).toEqual(30.01)
    expect(expectedWeathers[0].maxTemp).toEqual(40.01)
    expect(expectedWeathers[0].dayName).toEqual('Monday')
    expect(expectedWeathers[0].iconUrl).toEqual('icon.svg')
    expect(expectedWeathers[0].id).toEqual(1)
  })
})
