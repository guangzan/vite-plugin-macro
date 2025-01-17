import { defineMacro } from '@/defineMacro'
import { NO_OP_HANDLER } from './testutils'
import { defineMacroProvider } from '@/defineMacroProvider'

describe('defineMacroProvider', () => {
  // keep test simple since defineMacroProvider is just a wrapper of macroProvider
  it('should work', () => {
    const m = defineMacro('test')
      .withCustomType('type A = string')
      .withSignature('(): void', 'NO_OP')
      .withHandler(NO_OP_HANDLER)
    // check conflict
    expect(() =>
      defineMacroProvider({
        id: 'provider',
        exports: { '@test': { macros: [m] } },
        options: { parserPlugins: [] },
      })
    ).not.toThrow()
    expect(() =>
      defineMacroProvider({
        id: 'provider',
        exports: { '@test': { macros: [m, m] } },
        options: { parserPlugins: [] },
      })
    ).toThrow()
    // allow empty options
    expect(() =>
      defineMacroProvider({
        id: 'provider',
        exports: { '@test': { macros: [m] } },
      })
    ).not.toThrow()
  })
})
