import React from 'react'
import weatherService, { WEATHER_PROVIDER } from 'services/weatherService'
import styled from 'styled-components'

import { ReactComponent as SearchIcon } from 'components/icons/search.svg'
import WeatherTile from 'components/weather/WeatherTile'

const SearchInput = styled.input`
    background-color: #2c313b;
    border-style: none;
    padding: 10px 30px 10px 20px;
    border-radius: 5px;
    font-weight: 700;
    color: #d6cfcf;
    width: 100%;
    border-radius: 7px;
  &:focus {
    outline: none;
  }
  &::placeholder  {
    color: #8a8080;
  }
`
const SearchContainer = styled.div`
    width: 290px;
    position: relative;
    padding: 20px 0;
    margin: 0 auto;
`

const StyledSearchIcon = styled(SearchIcon)`
    width: 24px;
    height: 24px;
    top: 25px;
    right: 5px;
    position: absolute;
`

const SuggestionCities = styled.div`
  padding-top: 32px;
`

const SuggestCity = styled.span`
    display: inline-block;
    padding: 7px;
    font-style: italic;
    text-decoration: underline;
    color: cadetblue;
    font-size: 15px;
    cursor: pointer;
`

const SkeletonSuggestCity = styled(SuggestCity)`
  width: 60px;
  height: 20px; 
  margin: 5px;
  margin-top: 20px;
  background: linear-gradient(to right,#ffffff, #b7b7b7);
  background-size: 400% 400%;
  animation: gradient 0.5s ease infinite;
`

const WeatherList = styled.div`
  display: flex;
  justify-content: center;
`

const SuggestionLabel = styled.div`
  text-align: center;
`

const SuggestCityList = styled.div`
  display: flex;
  justify-content: center;
`

const WeatherLabel = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 15px 0;
`
const ErrorMessage = styled.div`
  text-align: center;
  color: red;
`

const Notification = styled.div`
  text-align: center;
`


let searchDelay
const weatherConfig = WEATHER_PROVIDER.MetaWeather
function getQ() {
  const { search } = window.location
  const params = new URLSearchParams(search)
  const q = params.get('q')
  return q
}

function setQ(value) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set('q', value)
  const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`
  // eslint-disable-next-line no-restricted-globals
  history.pushState(null, '', newRelativePathQuery)
}

class WeatherContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      suggestCities: [],
      weathers: [],
      searchTerm: '',
      isFetching: false,
      city: '',
    }
  }

  componentDidMount() {
    const q = getQ()
    if (q && q.length > 0) {
      this.setState({ searchTerm: q })
      this.searchCity(q)
    }
  }

  searchCity(q) {
    const debounceSearchTime = 500
    this.setState({ searchTerm: q })
    clearTimeout(searchDelay)
    if (q && q.trim().length > 0) {
      searchDelay = setTimeout(async () => {
        setQ(q)
        this.setState({ isFetching: true })
        const cites = await weatherService.searchCity(q.trim(), weatherConfig.name)
        if (cites.errorMessage) {
          this.setState({ error: cites.errorMessage, isFetching: false })
        } else {
          this.setState({
            suggestCities: cites,
            error: '',
            notification: cites.length === 0 ? 'Could not found city with you input. Please try again' : '',
            weathers: [],
          })
          if (cites.length === 1) {
            this.getForecast(cites[0].woeid, cites[0].title)
          } else {
            this.setState({ isFetching: false })
          }
        }
      }, debounceSearchTime)
    }
  }

  async getForecast(woeid, city) {
    this.setState({ isFetching: true })
    const data = await weatherService.find5days(woeid, weatherConfig.name)
    if (data.errorMessage) {
      this.setState({ error: data.errorMessage, isFetching: false })
    } else {
      this.setState({
        weathers: weatherService.normalizeData(data.consolidated_weather, weatherConfig.name),
        isFetching: false,
        city,
        error: '',
      })
    }
  }

  renderSuggestCities(n) {
    const { suggestCities, isFetching } = this.state
    if (suggestCities.length > 1 && !isFetching) {
      return (
        <SuggestionCities>
          <SuggestionLabel>
            Are you looking for:
          </SuggestionLabel>
          <SuggestCityList>
            {suggestCities.slice(0, n).map(
              (city) => <SuggestCity
                  key={city.woeid}
                  onClick={this.getForecast.bind(this, city.woeid, city.title)}
                >
                {city.title}
              </SuggestCity>,
            )}
          </SuggestCityList>
        </SuggestionCities>
      )
    }
    if (isFetching) {
      return (
        <SuggestionCities>
          <SuggestCityList>
            {
              [...Array(5)].map((_, i) => <SkeletonSuggestCity key={i}/>)
            }
          </SuggestCityList>
        </SuggestionCities>
      )
    }
    return null
  }

  renderForecastWeathers(n) {
    const { weathers, isFetching, city } = this.state
    if (isFetching) {
      return (
        <WeatherList>
          { [...Array(n)].map((_, i) => <WeatherTile key={i} isFetching/>)}
        </WeatherList>
      )
    }
    if (weathers.length > 0) {
      return (
        <div>
          <WeatherLabel> {`In ${city}, the next days forecast weather are: `}</WeatherLabel>
          <WeatherList>
            { weathers.slice(0, n).map((weather) => <WeatherTile
            key={weather.id}
            statusIcon={weather.iconUrl}
            dayName={weather.dayName}
            min={weather.minTemp}
            max={weather.maxTemp}
            unit='C'
          />)}
          </WeatherList>
        </div>


      )
    }

    return null
  }

  render() {
    const {
      isFetching, error, notification, searchTerm,
    } = this.state
    return (
      <div>
        <SearchContainer>
          <SearchInput
            disabled={isFetching}
            onChange={(e) => this.searchCity(e.target.value)}
            placeholder="Search city..."
            value={searchTerm}
          />
          <ErrorMessage>
            {error}
          </ErrorMessage>
          <Notification>
            {notification}
          </Notification>
          <StyledSearchIcon />
        </SearchContainer>
        {this.renderSuggestCities(10)}
        {this.renderForecastWeathers(6)}
      </div>
    )
  }
}
export default WeatherContainer
