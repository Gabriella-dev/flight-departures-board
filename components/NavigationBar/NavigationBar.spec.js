import { mount } from '@vue/test-utils'
import NavigationBar from './NavigationBar.vue'

describe('NavigationBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NavigationBar)
  })

  it('should render all the buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(6)
    expect(buttons.at(0)?.text()).toBe('Departure time')
    expect(buttons.at(1)?.text()).toBe('City Name')
    expect(buttons.at(2)?.text()).toBe('Code')
    expect(buttons.at(3)?.text()).toBe('Airline')
    expect(buttons.at(4)?.text()).toBe('Gate')
    expect(buttons.at(5)?.text()).toBe('Status')
  })
})
