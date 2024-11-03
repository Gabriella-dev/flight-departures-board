import { shallowMount } from '@vue/test-utils'
import UpdateStatusForm from './UpdateStatusForm.vue'

describe('UpdateStatusForm.vue', () => {
  const selectedFlight = {
    flightDirection: 'departure',
    scheduledDepartureDateTime: '2022-08-22T10:30:00',
    scheduledArrivalDateTime: '2022-08-22T01:00:00',
    estimatedDepartureDateTime: '2022-08-22T10:51:00',
    actualDepartureDateTime: '2022-08-22T10:49:00',
    arrivalAirport: {
      name: 'Charles de Gaulle Airport',
      cityName: 'Paris',
      countryName: 'France',
      code: 'CDG',
    },
    departureAirport: {
      name: 'Manchester Airport',
      cityName: 'Manchester',
      countryName: 'United Kingdom',
      code: 'MAN',
    },
    flightNumber: 'AF1669',
    airline: {
      name: 'Air France',
      code: 'AF',
    },
    departureGate: {
      name: 'Gate A5',
      number: 'A5',
      action: 'Final Call',
    },
    arrivalTerminal: null,
    departureTerminal: '2',
    status: 'Departed 10:49',
  }

  it('renders the correct flight details', () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    const flightDetailsText = wrapper
      .find('h2')
      .text()
      .trim()
      .replace(/\s+/g, ' ')
    expect(flightDetailsText).toBe(
      'Update Status for Paris - Air France - AF1669'
    )
  })

  it('renders the form elements', () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })
    expect(wrapper.find('select#status-input').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Update Status')
    expect(wrapper.find('button[type="button"]').text()).toBe('Close')
  })

  it('displays custom status input when "Custom" is selected', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    // Set the status to "Custom" and wait for DOM update
    wrapper.setData({ status: 'Custom' })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('#custom-status-input').exists()).toBe(true)
  })

  it('shows a warning message if custom status exceeds 20 characters', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    // Set a long custom status and wait for DOM update
    wrapper.setData({
      status: 'Custom',
      customStatus: 'This is a very long status',
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.warning').text()).toBe(
      '!Custom status must be 20 characters or fewer.'
    )
  })

  it('emits "status-updated" with the correct status on form submission', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    wrapper.setData({ status: 'Departed' })
    await wrapper.vm.$nextTick()

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('status-updated')).toBeTruthy()
    expect(wrapper.emitted('status-updated')[0]).toEqual(['Departed'])
  })

  it('emits "status-updated" with custom status if selected', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    wrapper.setData({ status: 'Custom', customStatus: 'On Hold' })
    await wrapper.vm.$nextTick()

    // Simulate form submission
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('status-updated')).toBeTruthy()
    expect(wrapper.emitted('status-updated')[0]).toEqual(['On Hold'])
  })

  it('resets the form when a new flight is selected', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    // Set some data
    wrapper.setData({ status: 'Delayed', customStatus: 'Test Status' })

    // Change the selectedFlight prop and wait for DOM update
    await wrapper.setProps({
      selectedFlight: { ...selectedFlight, flightNumber: 'XY456' },
    })

    expect(wrapper.vm.status).toBe('')
    expect(wrapper.vm.customStatus).toBe('')
  })

  it('emits "close-form" when the close button is clicked', async () => {
    const wrapper = shallowMount(UpdateStatusForm, {
      propsData: { selectedFlight },
    })

    // Simulate button click
    await wrapper.find('button[type="button"]').trigger('click')

    expect(wrapper.emitted('close-form')).toBeTruthy()
  })
})
