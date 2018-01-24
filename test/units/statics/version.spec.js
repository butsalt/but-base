import packageInfo from '../../../package.json'
import ButBase from 'but-base'

describe('version', () => {
  it('version', () => {
    expect(ButBase.version)
      .toBe(packageInfo.version)
  })
})