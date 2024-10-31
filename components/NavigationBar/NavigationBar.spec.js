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

  it('should emit "sort" event with "time" when Departure time button is clicked', async () => {
    const button = wrapper.find('button:nth-child(1)')
    await button.trigger('click')
    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort[0]).toEqual(['time'])
  })

  it('should emit "sort" event with "city" when City Name button is clicked', async () => {
    const button = wrapper.find('button:nth-child(2)')
    await button.trigger('click')
    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort[0]).toEqual(['city'])
  })
})
