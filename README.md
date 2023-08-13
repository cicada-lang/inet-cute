# iNet

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/papers/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/papers/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Usage

### Command line tool

Install it by the following command:

```
npm -g i @cicada-lang/inet
```

The command line program is called `inet`.

```sh
inet repl         # Open an interactive REPL
inet run [path]   # Run an inet program
inet help [name]  # Display help for a command
```

## Development

```
npm install          // Install dependencies
npm run build        // Compile `src/` to `lib/`
npm run build:watch  // Watch the compilation
npm run test         // Run test
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

## License

[GPLv3](LICENSE)
