# iNet

[ [Website](https://inet.run) ]

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

## Usage

### Online Playground

We have an online playground.

Source code of the playground is at
[github.com/cicada-lang/inet-website](https://github.com/cicada-lang/inet-website).

Please see [tests/](./tests) for some example code.

**Nat**:

[ [Open in Playground](https://inet.run/playground/dHlwZSBOYXQgLS0gVHlwZSBlbmQKCm5vZGUgemVybwogIC0tLS0tLS0tLS0tLQogIE5hdCA6dmFsdWUhCmVuZAoKbm9kZSBhZGQxCiAgTmF0IDpwcmV2CiAgLS0tLS0tLS0tLS0tCiAgTmF0IDp2YWx1ZSEKZW5kCgpub2RlIGFkZAogIE5hdCA6dGFyZ2V0IQogIE5hdCA6YWRkZW5kCiAgLS0tLS0tLS0tLS0tCiAgTmF0IDpyZXR1cm4KZW5kCgpydWxlIHplcm8gYWRkCiAgKGFkZCktYWRkZW5kCiAgcmV0dXJuLShhZGQpCmVuZAoKcnVsZSBhZGQxIGFkZAogIChhZGQpLWFkZGVuZAogIChhZGQxKS1wcmV2IGFkZAogIGFkZDEgcmV0dXJuLShhZGQpCmVuZAoKY2xhaW0gb25lIC0tIE5hdCBlbmQKZGVmaW5lIG9uZSB6ZXJvIGFkZDEgZW5kCgpjbGFpbSB0d28gLS0gTmF0IGVuZApkZWZpbmUgdHdvIG9uZSBvbmUgYWRkIGVuZAoKdHdvIHR3byBhZGQKdHdvIHR3byBhZGQgcnVu) ]

```inet
type Nat -- Type end

node zero
  ------------
  Nat :value!
end

node add1
  Nat :prev
  ------------
  Nat :value!
end

node add
  Nat :target!
  Nat :addend
  ------------
  Nat :return
end

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

two two add
two two add run
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
