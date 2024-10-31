import { mount } from '@vue/test-utils'
import NavigationBar from '../NavigationBar/NavigationBar.vue'
import BoardWrapper from './BoardWrapper.vue'

describe('BoardWrapper', () => {
  const mockFlightData = [
    { flightNumber: 'AA123', airline: 'Airline A', status: 'On Time' },
    { flightNumber: 'BB456', airline: 'Airline B', status: 'Delayed' },
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(BoardWrapper, {
      props: {
        flightData: mockFlightData,
      },
      components: {
        NavigationBar,
      },
    })
  })

  it('should render the NavigationBar component', () => {
    const navBar = wrapper.findComponent(NavigationBar)
    expect(navBar.exists()).toBe(true)
  })

  it.skip('should render the flight data as a list', () => {
    const listItems = wrapper.findAll('ul > li')
    expect(listItems.length).toBe(mockFlightData.length)

    listItems.wrappers.forEach((itemWrapper, index) => {
      const flight = mockFlightData[index]
      expect(itemWrapper.text()).toContain(flight.flightNumber)
      expect(itemWrapper.text()).toContain(flight.airline)
      expect(itemWrapper.text()).toContain(flight.status)
    })
  })

  it.skip('should render the correct number of flight items', () => {
    const flightItems = wrapper.findAll('li')
    expect(flightItems.length).toBe(2)
  })

  it.skip('should display flight details correctly', () => {
    const firstFlight = wrapper.find('li:first-child')
    expect(firstFlight.text()).toBe('AA123 - Airline A - On Time')

    const secondFlight = wrapper.find('li:last-child')
    expect(secondFlight.text()).toBe('BB456 - Airline B - Delayed')
  })
})
