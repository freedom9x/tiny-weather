import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const propTypes = {
  statusIcon: PropTypes.string,
  dayName: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  isFetching: PropTypes.bool,
  unit: PropTypes.string,
}

const Weather = styled.div`
    display: flex;
    padding: 5px;
    height: 160px;
    width: 160px;
    background: lightblue;
    margin: 5px;
    color: grey;
    border-radius: 5px;
    font-weight: 600;
    
`

const DayName = styled.div`
  text-align: center;
  font-size: 16px;
`

const TemperatureTree = styled.div`
    padding: 10px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DayInfo = styled.div`
    flex-direction: column;
    padding: 10px;
    flex: 1;
    display: flex;
`

const Temperature = styled.div`

`
const Tree = styled.div`
  width: 6px;
  border-radius: 20px;
  background: linear-gradient(to top, #95ca3d, #bf2b1c);
  height: 100%;
  ${({ isCool }) => (isCool ? css` background: linear-gradient(to top,#2da3e4,#c8d018);` : '')
}
`
const WeatherStatusIcon = styled.div`
  background: url(${(props) => props.iconPath}) center no-repeat;
  flex: 1;
`

const SkeletonWeather = styled(Weather)`
  background: linear-gradient(to right,#ffffff, #b7b7b7);
  background-size: 400% 400%;
  animation: gradient 0.5s ease infinite;
`

const WeatherTile = ({
  statusIcon, dayName, min, max, isFetching, unit,
}) => {
  if (isFetching) {
    return (<SkeletonWeather />)
  }
  return (
    <Weather>
      <DayInfo>
        <DayName> {dayName} </DayName>
        <WeatherStatusIcon iconPath={statusIcon}/>
      </DayInfo>
      <TemperatureTree>
        <Temperature> {`${max.toFixed(0)}${String.fromCharCode('0176')}${unit}`}</Temperature>
        <Tree isCool={max < 30}/>
        <Temperature>{`${min.toFixed(0)}${String.fromCharCode('0176')}${unit}`}</Temperature>
      </TemperatureTree>
    </Weather>
  )
}

WeatherTile.propTypes = propTypes
export default WeatherTile
