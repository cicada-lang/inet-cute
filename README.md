# Interaction Nets

An implementation of [Interaction Nets](https://en.wikipedia.org/wiki/Interaction_nets) in JavaScript.

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax.
- Use Forth-like postfix stack-based syntax to build Interaction Nets.

## Introduction

Interaction nets is an interesting computation model designed by Yves Lafont at 1990,
It uses undirected graph and graph rewriting to express computations.

It is interesting because:

> Our interaction nets are deterministic in a strong sense:
>
> not only the result, but also the computation is unique,
> up to trivial commutations.
>
> -- Interaction Combinators, Yves Lafont, 1997

A _net_ is a (maybe typed) undirected graph.
in which a node has a fixed numebr of (typed) _ports_.

When we want to connect two nodes by an edge,
the connection must go through the ports of the nodes,
(and if typed, the types of the ports must match with each other).

One connection will consume two ports.

We can use _rules_ to specify interactions between nodes.

First we need some constraints:

- A node's ports are split into two lists -- _input ports_ and _output ports_.
- A node has one _principal port_, which might be in input ports or in output ports.

If two nodes are connected through their principal ports (a.k.a. active pair),
we can write a _rule_ to specify how to disconnect these two nodes
and reconnect them, during the reconnection we might add new nodes and edges.

> **Documentation work in progress.**

## References

Papers:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/papers/interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/papers/interaction-combinators.pdf).

Books:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Installation

```
npm -g i @cicada-lang/inet
```

The command line program is called `inet`.

## Examples

### Natual number

```clojure
(define-cons zero 0)
(define-cons add1 1)

(define-elim add 2)
(define-rule (zero add))
(define-rule (add1 add) add add1)

(define-net two
  zero add1
  zero add1
  add)
```

```
inet render docs/tests/nat.inet
```

| two.initial                                | two.finial                                |
| ------------------------------------------ | ----------------------------------------- |
| ![](./docs/tests/nat.inet.two.initial.svg) | ![](./docs/tests/nat.inet.two.finial.svg) |

### List

```clojure
;; A trivial data for testing.
(define-cons sole 0)

(define-cons null 0)
(define-cons cons 2)

(define-elim append 2)
(define-rule (null append))
(define-rule (cons append) (let head) append head cons)

(define-net six-soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append)
```

```
inet render docs/tests/list.inet
```

| six-soles.initial                                 | six-soles.finial                                 |
| ------------------------------------------------- | ------------------------------------------------ |
| ![](./docs/tests/list.inet.six-soles.initial.svg) | ![](./docs/tests/list.inet.six-soles.finial.svg) |

### Difference list

[Wikipedia / Difference list](https://en.wikipedia.org/wiki/Difference_list).

```clojure
(define-cons diff 2)

(define-elim diff-append 2)
(define-rule (diff diff-append)
  (let that left right)
  left that diff-open right diff)

(define-elim diff-open 2)
(define-rule (diff diff-open)
  (let right) connect right)

(define-net one-two-soles
  wire sole cons diff
  wire sole cons sole cons diff
  diff-append)

(define-net two-two-soles
  wire sole cons sole cons diff
  wire sole cons sole cons diff
  diff-append)
```

```
inet render docs/tests/diff-list.inet
```

| one-two-soles.initial                                      | one-two-soles.finial                                      |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| ![](./docs/tests/diff-list.inet.one-two-soles.initial.svg) | ![](./docs/tests/diff-list.inet.one-two-soles.finial.svg) |

| two-two-soles.initial                                      | two-two-soles.finial                                      |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| ![](./docs/tests/diff-list.inet.two-two-soles.initial.svg) | ![](./docs/tests/diff-list.inet.two-two-soles.finial.svg) |

## Development

```
npm install    // Install dependencies
npm run build  // Compile `src/` to `lib/`
npm run watch  // Watch the compilation
npm run test   // Run test
```

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
