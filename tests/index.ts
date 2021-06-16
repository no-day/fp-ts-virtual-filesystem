import * as myLib from '../src'
import { dirData, fileData } from '../src'
import * as fc from 'fast-check'

const fs1 = dirData({
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

const fs2 = dirData({
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

describe('greet', () => {
  it('greets anything', () => {
    expect(fs1).toStrictEqual(fs2)
  })
})
