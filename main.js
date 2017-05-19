// A tiny little set of functional starters.

//- Call the given function with the given parameter.
//+ apply :: (a -> b) -> a -> b
export const apply = f => x => f (x)

//- Strict function composition.
//+ compose :: (b -> c) -> (a -> b) -> a -> c
export const compose = f => g => x => f (g (x))

//- Compose a number of functions together.
export const composeN = (f, ... fs) =>
  fs.reduce(uncurry(compose), f)

//- Ignore the second argument.
//+ K :: a -> b -> a
export const K = x => _ => x

//- Curry a binary function.
//+ curry :: ((a, b) -> c) -> a -> b -> c
export const curry = f => a => b => f (a, b)

//- Curry a function with any number of args.
//- Behaves as any "regular" curry library.
export const curryN = f => {
  const length = f.length

  const curry_ = acc => x => {
    const args = [... acc, x] // The new set.

    return args.length == length
      ? f (... args) : curry_(args)
  }

  return curry_([])
}

//- Flip the first two arguments to a function.
//+ flip :: (a -> b -> c) -> b -> a -> c
export const flip = f => x => y => f (y) (x)

//- Return the input.
//+ id :: a -> a
export const id = x => x

//- Transform two arguments, then run a function on them.
//+ on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
export const on = f => g => x => y => f (g (x)) (g (y))

//- Left-to-right function composition.
//+ pipe :: (a -> b) -> (b -> c) -> a -> c
export const pipe = f => g => x => g (f (x))

//- Uncurry a binary curried function.
//+ uncurry :: (a -> b -> c) -> (a, b) -> c
export const uncurry = f => (a, b) => f (a) (b)

//- Sort of uncurry a function.
//- Allow for as many a time as we like.
export const uncurryN = f => {
  if (typeof f !== 'function')
    return f

  return (... xs) => uncurryN(
    xs.reduce((f, x) => f(x), f))
}
