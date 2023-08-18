# iNet

[ [WEBSITE](https://inet.cicada-lang.org) ]

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

## Usage

### Online Playground

We have an [online playground](https://inet.cicada-lang.org/playground)
([source code](https://github.com/cicada-lang/inet-website)).

**Nat**:

[ [OPEN PLAYGROUND]() ]

```inet
type Nat -- Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add Nat :target! Nat :addend -- Nat :return end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end

claim one -- Nat end
define one zero add1 end

claim two -- Nat end
define two one one add end

two two add inspect
run inspect
```

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

```sh
npm install          # Install dependencies
npm run build        # Compile `src/` to `lib/`
npm run build:watch  # Watch the compilation
npm run test         # Run test
```

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/papers/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/papers/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

## License

[GPLv3](LICENSE)
