'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// A tiny little set of functional starters.

//- Call the given function with the given parameter.
//+ apply :: (a -> b) -> a -> b
const apply = exports.apply = f => x => f(x);

//- Strict function composition.
//+ compose :: (b -> c) -> (a -> b) -> a -> c
const compose = exports.compose = f => g => x => f(g(x));

//- Compose a number of functions together.
const composeN = exports.composeN = (f, ...fs) => fs.reduce(uncurry(compose), f);

//- Curry a binary function.
//+ curry :: ((a, b) -> c) -> a -> b -> c
const curry = exports.curry = f => a => b => f(a, b);

//- Curry a function with any number of args.
const curryN = exports.curryN = f => {
  const length = f.length;

  const curry_ = acc => x => {
    const args = [...acc, x]; // The new set.

    return args.length == length ? f(...args) : curry_(args);
  };

  return curry_([]);
};

//- Flip the first two arguments to a function.
//+ flip :: (a -> b -> c) -> b -> a -> c
const flip = exports.flip = f => x => y => f(y)(x);

//- Return the input.
//+ id :: a -> a
const id = exports.id = x => x;

//- Ignore the second argument.
//+ K :: a -> b -> a
const K = exports.K = x => _ => x;

//- Transform two arguments, then run a function on them.
//+ on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
const on = exports.on = f => g => x => y => f(g(x))(g(y));

//- Uncurry a binary curried function.
//+ uncurry :: (a -> b -> c) -> (a, b) -> c
const uncurry = exports.uncurry = f => (a, b) => f(a)(b);

//- Sort of uncurry a function.
//- Allow for as many a time as we like.
const uncurryN = exports.uncurryN = f => {
  if (typeof f !== 'function') return f;

  return (...xs) => uncurryN(xs.reduce(uncurry(apply), f));
};

