# Wi-Jit [![Build Status](https://travis-ci.org/i-am-tom/wi-jit.svg?branch=master)](https://travis-ci.org/i-am-tom/wi-jit)

```
npm install wi-jit
```

A very minimal set of functional utilities. Just enough to get you going.

## API

### Strict

```haskell
apply :: (a -> b) -> a -> b
```

```haskell
compose :: (b -> c) -> (a -> b) -> a -> c
```

```haskell
constant :: a -> b -> a
```

```haskell
curry :: ((a, b) -> c) -> a -> b -> c
```

```haskell
flip :: (a -> b -> c) -> b -> a -> c
```

```haskell
id :: a -> a
```

```haskell
on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
```

```haskell
pipe :: (a -> b) -> (b -> c) -> a -> c
```

```haskell
uncurry :: (a -> b -> c) -> (a, b) -> c
```

### Non-Strict

There are also some helpful variations on these functions included to be a bit better-suited to the style of JavaScript's syntax:

- `composeN`: takes any number of functions and composes them all together.

```javascript
composeN(f, g, h) == compose(compose(f, g), h)
```

- `curryN`:  take an n-ary function, and return a totally curried version (unlike standard `curry`, which only works on binary functions).

```javascript
curryN((a, b, c) => a + b + c)(1)(2)(3) == 6
```

- `uncurryN`: take a curried function, and return a function that takes some (or all) of the arguments. If not given the total list, the result will be `uncurryN(f)`, where `f` is function that takes the remainder of the arguments.

```javascript
uncurryN(f)(a, b, c)
  == uncurryN(f)(a, b)(c)
  == uncurryN(f)(a)(b, c)
  == uncurryN(f)(a)(b)(c)
```

## Contributing

Send PRs! Get involved!
