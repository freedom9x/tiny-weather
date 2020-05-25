import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'


import WeatherTile from './WeatherTile'

// import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('WeatherTile ', () => {
  it('render skeleton style correct', () => {
    const tree = mount(<WeatherTile isFetching={true} />)
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('render normal style correct', () => {
    const tree = mount(
      <WeatherTile
        isFetching={false}
        statusIcon='icon.svg'
        dayName='2020-05-25'
        min={10.21}
        max= {21.10}
        unit='C'
        />,
    )
    expect(toJson(tree)).toMatchSnapshot()
  })
})
