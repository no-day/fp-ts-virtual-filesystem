import * as myLib from '../src'
import { dirData, fileData } from '../src'
import * as fc from 'fast-check'

describe('greet', () => {
  it('greets anything', () => {
    fc.assert(
      fc.property(fc.string(), (name) => {
        expect(myLib.greet(name)).toBe(`Hello, ${name}!`)
      })
    )
  })
})

const s = dirData({
  src: dirData({
    'index.ts': fileData([
      'import * as lib from "lib',
      '',
      'const x = 12',
      'const y = 21',
    ]),
  }),
  tests: dirData({
    'index.ts': fileData([]),
  }),
  'README.md': fileData(['# Hello World!']),
})
