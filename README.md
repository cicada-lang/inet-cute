# Interaction Nets

[ [PLAYGROUND](https://inet.cicada-lang.org/playground) ]

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

## References

Papers:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/papers/interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/papers/interaction-combinators.pdf).

Books:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Usage

### Online playground

Visit the [INet Playground](https://inet.cicada-lang.org/playground).

### Command line tool

The command line program is called `inet`.

Install it by the following command:

```
npm -g i @cicada-lang/inet
```

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

[ [PLAYGROUND](https://inet.cicada-lang.org/playground/KGRlZmluZS1jb25zIHplcm8gMCkKKGRlZmluZS1jb25zIGFkZDEgMSkKCihkZWZpbmUtZWxpbSBhZGQgMikKKGRlZmluZS1ydWxlICh6ZXJvIGFkZCkpCihkZWZpbmUtcnVsZSAoYWRkMSBhZGQpIGFkZCBhZGQxKQoKKGRlZmluZS1uZXQgdHdvCiAgemVybyBhZGQxCiAgemVybyBhZGQxCiAgYWRkKQoKKGRlZmluZS1uZXQgZm91cgogIHR3byB0d28gYWRkKQo) ]

| two.initial                                | two.finial                                |
| ------------------------------------------ | ----------------------------------------- |
| ![](./docs/tests/nat.inet.two.initial.svg) | ![](./docs/tests/nat.inet.two.finial.svg) |

### List

```clojure
(define-cons sole 0) ;; Trivial data for testing.

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

[ [PLAYGROUND](https://inet.cicada-lang.org/playground/KGRlZmluZS1jb25zIHNvbGUgMCkgOzsgVHJpdmlhbCBkYXRhIGZvciB0ZXN0aW5nLgoKKGRlZmluZS1jb25zIG51bGwgMCkKKGRlZmluZS1jb25zIGNvbnMgMikKCihkZWZpbmUtZWxpbSBhcHBlbmQgMikKKGRlZmluZS1ydWxlIChudWxsIGFwcGVuZCkpCihkZWZpbmUtcnVsZSAoY29ucyBhcHBlbmQpIChsZXQgaGVhZCkgYXBwZW5kIGhlYWQgY29ucykKCihkZWZpbmUtbmV0IHNpeC1zb2xlcwogIG51bGwgc29sZSBjb25zIHNvbGUgY29ucyBzb2xlIGNvbnMKICBudWxsIHNvbGUgY29ucyBzb2xlIGNvbnMgc29sZSBjb25zCiAgYXBwZW5kKQ) ]

| six-soles.initial                                 | six-soles.finial                                 |
| ------------------------------------------------- | ------------------------------------------------ |
| ![](./docs/tests/list.inet.six-soles.initial.svg) | ![](./docs/tests/list.inet.six-soles.finial.svg) |

### Difference list

[Wikipedia / Difference list](https://en.wikipedia.org/wiki/Difference_list).

```clojure
(define-cons sole 0) ;; Trivial data for testing.

(define-cons null 0)
(define-cons cons 2)

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

[ [PLAYGROUND](https://inet.cicada-lang.org/playground/KGRlZmluZS1jb25zIHNvbGUgMCkgOzsgVHJpdmlhbCBkYXRhIGZvciB0ZXN0aW5nLgoKKGRlZmluZS1jb25zIG51bGwgMCkKKGRlZmluZS1jb25zIGNvbnMgMikKCihkZWZpbmUtY29ucyBkaWZmIDIpCgooZGVmaW5lLWVsaW0gZGlmZi1hcHBlbmQgMikKKGRlZmluZS1ydWxlIChkaWZmIGRpZmYtYXBwZW5kKQogIChsZXQgdGhhdCBsZWZ0IHJpZ2h0KQogIGxlZnQgdGhhdCBkaWZmLW9wZW4gcmlnaHQgZGlmZikKCihkZWZpbmUtZWxpbSBkaWZmLW9wZW4gMikKKGRlZmluZS1ydWxlIChkaWZmIGRpZmYtb3BlbikKICAobGV0IHJpZ2h0KSBjb25uZWN0IHJpZ2h0KQoKKGRlZmluZS1uZXQgb25lLXR3by1zb2xlcwogIHdpcmUgc29sZSBjb25zIGRpZmYKICB3aXJlIHNvbGUgY29ucyBzb2xlIGNvbnMgZGlmZgogIGRpZmYtYXBwZW5kKQoKKGRlZmluZS1uZXQgdHdvLXR3by1zb2xlcwogIHdpcmUgc29sZSBjb25zIHNvbGUgY29ucyBkaWZmCiAgd2lyZSBzb2xlIGNvbnMgc29sZSBjb25zIGRpZmYKICBkaWZmLWFwcGVuZCk) ]

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
