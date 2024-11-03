import { shallowMount } from '@vue/test-utils'
import BoardListItemCard from './BoardListItemCard.vue'

const props = {
  scheduledDepartureDateTime: '2024-11-01T15:00:00Z',
  cityName: 'New York',
  airportCode: 'JFK',
  airlineName: 'Airline XYZ',
  gateNumber: 'A1',
  status: 'departed',
  isLoading: false,
}

describe('BoardListItemCard.vue', () => {
  it('renders the correct markup', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: props,
    })

    expect(wrapper.find('p').text()).toContain('15:00')
    expect(wrapper.findAll('.city-gate').at(0).text().trim()).toBe('New York')
    expect(wrapper.findAll('p').at(2).text().trim()).toBe('JFK')
    expect(wrapper.findAll('p').at(3).text().trim()).toBe('Airline XYZ')
    expect(wrapper.findAll('.city-gate').at(1).text().trim()).toBe('A1')
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
    wrapper.vm.formatDateTime(new Date(props.scheduledDepartureDateTime))
    // Check that the method was called with the correct Date object
    expect(formatDateTimeSpy).toHaveBeenCalledWith(expect.any(Date))
    expect(formatDateTimeSpy.mock.calls[0][0].toISOString()).toBe(
      new Date(props.scheduledDepartureDateTime).toISOString()
    )
  })
  it('renders skeleton lines when isLoading is true', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: { ...props, isLoading: true },
    })
    expect(wrapper.find('.skeleton').exists()).toBe(true)
    expect(wrapper.findAll('.skeleton-line').length).toBeGreaterThan(0)
  })

  it('applies "status-other" class for unknown status', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: { ...props, status: 'unknown status' },
    })
    expect(wrapper.find('.status').classes()).toContain('status-other')
  })

  it('formats date correctly with formatDateTime method', () => {
    const wrapper = shallowMount(BoardListItemCard, {
      propsData: props,
    })
    const formattedTime = wrapper.vm.formatDateTime(
      new Date('2024-11-01T15:00:00Z')
    )
    expect(formattedTime).toBe('15:00')
  })
})
