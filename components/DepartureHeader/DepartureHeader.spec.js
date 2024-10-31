import { mount } from '@vue/test-utils'
import DepartureHeader from './DepartureHeader.vue'

describe('DepartureHeader.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(DepartureHeader)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the header logo', () => {
    const wrapper = mount(DepartureHeader)
    expect(wrapper.findComponent({ name: 'HeaderLogo' }).exists()).toBe(true)
  })

  it('renders the title', () => {
    const wrapper = mount(DepartureHeader)
    expect(wrapper.find('h1').text()).toBe('Departures')
  })
})
