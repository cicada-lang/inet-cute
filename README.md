# iNet

[ [Website](https://inet.run) ]

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

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

### Online Playground

We have an online playground.

Source code of the playground is at
[github.com/cicada-lang/inet-website](https://github.com/cicada-lang/inet-website).

Please see [tests/](./tests) for some example code.

#### Nat

[ [Goto The Playground](https://inet.run/playground/dHlwZSBOYXQgLS0gQFR5cGUgZW5kCgpub2RlIHplcm8KICAtLS0tLS0tLS0tLS0KICBOYXQgOnZhbHVlIQplbmQKCm5vZGUgYWRkMQogIE5hdCA6cHJldgogIC0tLS0tLS0tLS0tLQogIE5hdCA6dmFsdWUhCmVuZAoKbm9kZSBhZGQKICBOYXQgOnRhcmdldCEKICBOYXQgOmFkZGVuZAogIC0tLS0tLS0tLS0tLQogIE5hdCA6cmV0dXJuCmVuZAoKcnVsZSB6ZXJvIGFkZAogIChhZGQpLWFkZGVuZAogIHJldHVybi0oYWRkKQplbmQKCnJ1bGUgYWRkMSBhZGQKICAoYWRkKS1hZGRlbmQKICAoYWRkMSktcHJldiBhZGQKICBhZGQxIHJldHVybi0oYWRkKQplbmQKCmNsYWltIG9uZSAtLSBOYXQgZW5kCmRlZmluZSBvbmUgemVybyBhZGQxIGVuZAoKY2xhaW0gdHdvIC0tIE5hdCBlbmQKZGVmaW5lIHR3byBvbmUgb25lIGFkZCBlbmQKCmNsYWltIHRocmVlIC0tIE5hdCBlbmQKZGVmaW5lIHRocmVlIHR3byBvbmUgYWRkIGVuZAoKY2xhaW0gZm91ciAtLSBOYXQgZW5kCmRlZmluZSBmb3VyIHR3byB0d28gYWRkIGVuZAoKdHdvIHR3byBhZGQKdHdvIHR3byBhZGQgQHJ1biAkcmVzdWx0) ]

```inet
type Nat -- @Type end

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

claim three -- Nat end
define three two one add end

claim four -- Nat end
define four two two add end

two two add
two two add @run $result
```

#### List

[ [Goto The Playground](https://inet.run/playground/dHlwZSBMaXN0IEBUeXBlIC0tIEBUeXBlIGVuZAoKbm9kZSBudWxsCiAgLS0tLS0tLS0KICAnQSBMaXN0IDp2YWx1ZSEKZW5kCgpub2RlIGNvbnMKICAnQSA6aGVhZAogICdBIExpc3QgOnRhaWwKICAtLS0tLS0tLQogICdBIExpc3QgOnZhbHVlIQplbmQKCm5vZGUgYXBwZW5kCiAgJ0EgTGlzdCA6dGFyZ2V0IQogICdBIExpc3QgOnJlc3QKICAtLS0tLS0tLQogICdBIExpc3QgOnJldHVybgplbmQKCnJ1bGUgbnVsbCBhcHBlbmQKICAoYXBwZW5kKS1yZXN0CiAgcmV0dXJuLShhcHBlbmQpCmVuZAoKcnVsZSBjb25zIGFwcGVuZAogIChhcHBlbmQpLXJlc3QgKGNvbnMpLXRhaWwgYXBwZW5kCiAgKGNvbnMpLWhlYWQgY29ucwogIHJldHVybi0oYXBwZW5kKQplbmQKCmltcG9ydCB6ZXJvIGZyb20gImh0dHBzOi8vY2RuLmluZXQucnVuL3Rlc3RzL2RhdGF0eXBlL05hdC5pIgoKbnVsbCB6ZXJvIGNvbnMgemVybyBjb25zCm51bGwgemVybyBjb25zIHplcm8gY29ucwphcHBlbmQKCm51bGwgemVybyBjb25zIHplcm8gY29ucwpudWxsIHplcm8gY29ucyB6ZXJvIGNvbnMKYXBwZW5kIEBydW4gJHJlc3VsdA) ]

```inet
type List @Type -- @Type end

node null
  --------
  'A List :value!
end

node cons
  'A :head
  'A List :tail
  --------
  'A List :value!
end

node append
  'A List :target!
  'A List :rest
  --------
  'A List :return
end

rule null append
  (append)-rest
  return-(append)
end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  return-(append)
end

import zero from "https://cdn.inet.run/tests/datatype/Nat.i"

null zero cons zero cons
null zero cons zero cons
append

null zero cons zero cons
null zero cons zero cons
append @run $result
```

#### DiffList

[ [Goto The Playground](https://inet.run/playground/aW1wb3J0IExpc3QgZnJvbSAiaHR0cHM6Ly9jZG4uaW5ldC5ydW4vdGVzdHMvZGF0YXR5cGUvTGlzdC5pIgoKLy8gQ29uY2F0ZW5hdGlvbiBvZiBsaXN0cyBpcyBwZXJmb3JtZWQgaW4gbGluZWFyIHRpbWUKLy8gd2l0aCByZXNwZWN0IHRvIGl0cyBmaXJzdCBhcmd1bWVudC4KLy8gQ29uc3RhbnQgdGltZSBjb25jYXRlbmF0aW9uIGlzIHBvc3NpYmxlCi8vIHdpdGggZGlmZmVyZW5jZS1saXN0czogdGhlIGlkZWEgY29uc2lzdHMgaW4KLy8gcGx1Z2dpbmcgdGhlIGZyb250IG9mIHRoZSBzZWNvbmQgYXJndW1lbnQKLy8gYXQgdGhlIGJhY2sgb2YgdGhlIGZpcnN0IG9uZS4KCnR5cGUgRGlmZkxpc3QgQFR5cGUgLS0gQFR5cGUgZW5kCgpub2RlIGRpZmYKICAnQSBMaXN0IDpmcm9udAogIC0tLS0tLS0KICAnQSBMaXN0IDpiYWNrCiAgJ0EgRGlmZkxpc3QgOnZhbHVlIQplbmQKCm5vZGUgZGlmZl9hcHBlbmQKICAnQSBEaWZmTGlzdCA6dGFyZ2V0IQogICdBIERpZmZMaXN0IDpyZXN0CiAgLS0tLS0tLS0KICAnQSBEaWZmTGlzdCA6cmV0dXJuCmVuZAoKbm9kZSBkaWZmX29wZW4KICAnQSBEaWZmTGlzdCA6dGFyZ2V0IQogICdBIExpc3QgOmxpc3QKICAtLS0tLS0tLS0tCiAgJ0EgTGlzdCA6cmV0dXJuCmVuZAoKcnVsZSBkaWZmIGRpZmZfYXBwZW5kCiAgKGRpZmYpLWZyb250IGRpZmYgcmV0dXJuLShkaWZmX2FwcGVuZCkKICAoZGlmZl9hcHBlbmQpLXJlc3QgZGlmZl9vcGVuIGJhY2stKGRpZmYpCmVuZAoKcnVsZSBkaWZmIGRpZmZfb3BlbgogIChkaWZmKS1iYWNrIGxpc3QtKGRpZmZfb3BlbikKICAoZGlmZiktZnJvbnQgcmV0dXJuLShkaWZmX29wZW4pCmVuZAoKaW1wb3J0IHplcm8gZnJvbSAiaHR0cHM6Ly9jZG4uaW5ldC5ydW4vdGVzdHMvZGF0YXR5cGUvTmF0LmkiCmltcG9ydCBjb25zIGZyb20gImh0dHBzOi8vY2RuLmluZXQucnVuL3Rlc3RzL2RhdGF0eXBlL0xpc3QuaSIKCnplcm8gKGNvbnMgOnRhaWwpIHplcm8gY29ucyBkaWZmIEByb3QgQHJvdCBAY29ubmVjdAp6ZXJvIChjb25zIDp0YWlsKSB6ZXJvIGNvbnMgZGlmZiBAcm90IEByb3QgQGNvbm5lY3QKZGlmZl9hcHBlbmQKCnplcm8gKGNvbnMgOnRhaWwpIHplcm8gY29ucyBkaWZmIEByb3QgQHJvdCBAY29ubmVjdAp6ZXJvIChjb25zIDp0YWlsKSB6ZXJvIGNvbnMgZGlmZiBAcm90IEByb3QgQGNvbm5lY3QKZGlmZl9hcHBlbmQgQHJ1biAkcmVzdWx0) ]

```inet
import List from "https://cdn.inet.run/tests/datatype/List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList @Type -- @Type end

node diff
  'A List :front
  -------
  'A List :back
  'A DiffList :value!
end

node diff_append
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :return
end

node diff_open
  'A DiffList :target!
  'A List :list
  ----------
  'A List :return
end

rule diff diff_append
  (diff)-front diff return-(diff_append)
  (diff_append)-rest diff_open back-(diff)
end

rule diff diff_open
  (diff)-back list-(diff_open)
  (diff)-front return-(diff_open)
end

import zero from "https://cdn.inet.run/tests/datatype/Nat.i"
import cons from "https://cdn.inet.run/tests/datatype/List.i"

zero (cons :tail) zero cons diff @rot @rot @connect
zero (cons :tail) zero cons diff @rot @rot @connect
diff_append

zero (cons :tail) zero cons diff @rot @rot @connect
zero (cons :tail) zero cons diff @rot @rot @connect
diff_append @run $result
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
