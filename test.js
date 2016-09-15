var test  = require('tape')
var widget = require('.')

test('apply', assert => {
  assert.same(widget.apply(x => x)(2), 2, 'Applies functions')
  assert.same(widget.apply(x => y => x + y)(2)(1), 3, 'Works with partials')

  assert.end()
})

test('compose', assert => {
  assert.same(widget.compose(x => x / 3)(x => x + 2)(4), 2, 'Runs chain')
  assert.same(widget.compose(x => y => x / y)(x => x + 2)(4)(2), 3, 'Works with partials')

  assert.end()
})

test('composeN', assert => {
  assert.same(widget.composeN(x => x / 3, x => x + 2, x => x % 5)(9), 2, 'Runs chain')
  assert.same(widget.composeN(x => y => x / y, x => x + 2, x => x % 5)(9)(2), 3, 'Works with partials')

  assert.end()
})

test('curry', assert => {
  assert.same(widget.curry((a, b) => a + b)(4)(5), 9, 'Curries')
  assert.same(widget.curry((a, b) => c => a + b + c)(4)(5)(6), 15, 'Works with partials')

  assert.end()
})

test('curryN', assert => {
  assert.same(widget.curryN((a, b, c) => a + b - c)(5)(6)(7), 4, 'Curries')
  assert.same(widget.curryN((a, b, c) => d => a + b - c - d)(9)(8)(7)(6), 4, 'Works with partials')

  assert.end()
})

test('flip', assert => {
  assert.same(widget.flip(x => y => x - y)(5)(9), 4, 'Flips')
  assert.same(widget.flip(x => y => z => x - y + z)(8)(7)(6), 5, 'Works with partials')

  assert.end()
})

test('id', assert => {
  const val = Symbol()

  assert.same(widget.id(val), val, 'Returns its input')
  assert.same(widget.id(x => x + 1)(2), 3, 'Works with partials')

  assert.end()
})

test('K', assert => {
  const val = Symbol()

  assert.same(widget.K(val)(undefined), val, 'Returns the first value')
  assert.same(widget.K(x => x + 1)(NaN)(2), 3, 'Works with partials')

  assert.end()
})

test('on', assert => {
  assert.same(widget.on(x => y => x == -y / 2)(x => -x)(2)(-4), true, 'Compares')
  assert.same(
    widget.on
      (x => y => widget.compose(x)(y))
      (widget.compose(x => -x))
      (x => x + 1)
      (x => x + 2)
      (3),
    4,
    'Works with multi-layered composition'
  )

  assert.end()
})

test('uncurry', assert => {
  assert.same(widget.uncurry(x => y => x + y)(1, 3), 4, 'Uncurries')
  assert.same(widget.uncurry(x => y => z => x + y + z)(1, 3)(2), 6, 'Works with partials')

  assert.end()
})

test('uncurryN', assert => {
  assert.same(widget.uncurryN(x => y => z => x + y + z)(1, 2, 3), 6, 'Applies all')
  assert.same(widget.uncurryN(x => y => z => x + y + z)(1)(2)(3), 6, 'Applies piecemeal')

  assert.end()
})
