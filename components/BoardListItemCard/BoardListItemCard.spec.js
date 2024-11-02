import { shallowMount } from '@vue/test-utils'
import BoardListItemCard from './BoardListItemCard.vue'

describe('BoardListItemCard.vue', () => {
  const props = {
    scheduledDepartureDateTime: '2024-11-01T15:00:00Z',
    cityName: 'New York',
    airportCode: 'JFK',
    airlineName: 'Airline XYZ',
    gateNumber: 'A1',
    status: 'departed',
  }

  it('renders the correct markup', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: props,
    })

    expect(wrapper.find('p').text()).toContain('15:00')
    expect(wrapper.findAll('.city-gate').at(0).text().trim()).toBe('New York')
    expect(wrapper.findAll('p').at(2).text().trim()).toBe('JFK') // Adjust index for airport code

    // Test for airline name
    expect(wrapper.findAll('p').at(3).text().trim()).toBe('Airline XYZ') // Adjust index for airline name

    // Test for gate number
    expect(wrapper.findAll('.city-gate').at(1).text().trim()).toBe('A1')

    // Test for status
    expect(wrapper.find('.status').text().trim()).toBe('departed')
  })

  it('uses the correct status class', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: props,
    })

    expect(wrapper.find('.status').classes()).toContain('departed')
  })

  it('displays "TBD" when gateNumber is not provided', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: { ...props, gateNumber: undefined },
    })

    expect(wrapper.findAll('.city-gate').at(1).text()).toBe('TBD')
  })

  it('calls formatDateTime method with correct argument', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: props,
    })

    const formatDateTimeSpy = jest.spyOn(wrapper.vm, 'formatDateTime')

    // Call the method from the component to trigger the internal call
    wrapper.vm.formatDateTime(new Date(props.scheduledDepartureDateTime)) // Pass Date object directly

    // Check that the method was called with the correct Date object
    expect(formatDateTimeSpy).toHaveBeenCalledWith(expect.any(Date)) // Check that it was called with a Date object
    expect(formatDateTimeSpy.mock.calls[0][0].toISOString()).toBe(
      new Date(props.scheduledDepartureDateTime).toISOString()
    )
  })
})
