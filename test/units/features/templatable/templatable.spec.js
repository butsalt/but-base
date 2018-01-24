import ButBase from 'but-base'
import DomComponent from './DomComponent'
import SvgComponent from './SvgComponent'

function createContainer() {
  return document.createElement('div')
}

function getStr(obj) {
  return Object.prototype.toString.call(obj)
}

describe('templatable', () => {
  it('getEl', () => {
    const component = new ButBase()
    expect(component.getEl())
      .toBeNull()
  })

  it('getDomEl', () => {
    const component = new DomComponent()
    const el = component.getEl()
    expect(getStr(el))
      .toBe('[object HTMLDivElement]')
  })

  it('getSvgEl', () => {
    const component = new SvgComponent()
    const el = component.getEl()
    expect(getStr(el))
      .toBe('[object SVGPolygonElement]')
  })

  it('mountTo', () => {
    const component = new DomComponent()
    const container = createContainer()
    component.mountTo(container)

    expect(container.firstElementChild)
      .toBe(component.getEl())
  })

  it('unmount', () => {
    const component = new DomComponent()
    const container = createContainer()
    component.mountTo(container)
    component.unmount()

    expect(container.firstElementChild)
      .toBeNull()
  })
})