import React from 'react'
import styled from 'styled-components'

import WeatherContainer from './container/weather/WeatherContainer'


const AppContainer = styled.div`
  background-color:  #353d45;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-size: 14px;
  padding: 50px;
  color: #eae3e3;
`
function App() {
  return (
    <AppContainer>
      <WeatherContainer />
    </AppContainer>
  )
}

export default App
