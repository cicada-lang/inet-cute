# Interaction Nets

An implementation of [Interaction Nets](https://en.wikipedia.org/wiki/Interaction_nets) in JavaScript.

- Use Forth-like postfix stack-based syntax to build Interaction Nets.

## Introduction

Interaction nets is an interesting computation model designed by Yves Lafont in 1990,
It uses undirected graphs and graph rewriting to express computations.

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

### Command line tool

The command line program is called `inet`.

Install it by the following command:

```
npm -g i @cicada-lang/inet
```

## Development

```
npm install    // Install dependencies
npm run build  // Compile `src/` to `lib/`
npm run watch  // Watch the compilation
npm run test   // Run test
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

## License

[GPLv3](LICENSE)
