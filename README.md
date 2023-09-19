# iNet Cute

[ [Website](https://inet.run) ]

An implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

- ASCII art inspired syntax.
- Pure postfix expression.
- Using a stack-based low-layer language to build nets.

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @cicada-lang/inet-cute
```

The command line program is called `inet-cute`.

```sh
inet-cute repl         # Open an interactive REPL
inet-cute run [path]   # Run an inet program
inet-cute help [name]  # Display help for a command
```

### Online Playground

We have an online playground.

Source code of the playground is at
[github.com/cicada-lang/inet-website](https://github.com/cicada-lang/inet-website).

Please see [tests/](./tests) for some example code.

## Examples

### Nat

[ [Goto The Playground](https://inet.run/playground/dHlwZSBOYXQgLS0gQFR5cGUgZW5kCgpub2RlIHplcm8KICAtLS0tLS0tLS0tLS0KICBOYXQgOnZhbHVlIQplbmQKCm5vZGUgYWRkMQogIE5hdCA6cHJldgogIC0tLS0tLS0tLS0tLQogIE5hdCA6dmFsdWUhCmVuZAoKbm9kZSBhZGQKICBOYXQgOnRhcmdldCEKICBOYXQgOmFkZGVuZAogIC0tLS0tLS0tLS0tLQogIE5hdCA6cmVzdWx0CmVuZAoKcnVsZSB6ZXJvIGFkZAogIChhZGQpLWFkZGVuZAogIHJlc3VsdC0oYWRkKQplbmQKCnJ1bGUgYWRkMSBhZGQKICAoYWRkKS1hZGRlbmQKICAoYWRkMSktcHJldiBhZGQKICBhZGQxIHJlc3VsdC0oYWRkKQplbmQKCmNsYWltIG9uZSAtLSBOYXQgZW5kCmRlZmluZSBvbmUgemVybyBhZGQxIGVuZAoKY2xhaW0gdHdvIC0tIE5hdCBlbmQKZGVmaW5lIHR3byBvbmUgb25lIGFkZCBlbmQKCmNsYWltIHRocmVlIC0tIE5hdCBlbmQKZGVmaW5lIHRocmVlIHR3byBvbmUgYWRkIGVuZAoKY2xhaW0gZm91ciAtLSBOYXQgZW5kCmRlZmluZSBmb3VyIHR3byB0d28gYWRkIGVuZAoKdHdvIHR3byBhZGQKdHdvIHR3byBhZGQgQHJ1biAkcmVzdWx0) ]

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
  Nat :result
end

rule zero add
  (add)-addend
  result-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 result-(add)
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

### List

[ [Goto The Playground](https://inet.run/playground/dHlwZSBMaXN0IEBUeXBlIC0tIEBUeXBlIGVuZAoKbm9kZSBudWxsCiAgLS0tLS0tLS0KICAnQSBMaXN0IDp2YWx1ZSEKZW5kCgpub2RlIGNvbnMKICAnQSA6aGVhZAogICdBIExpc3QgOnRhaWwKICAtLS0tLS0tLQogICdBIExpc3QgOnZhbHVlIQplbmQKCm5vZGUgYXBwZW5kCiAgJ0EgTGlzdCA6dGFyZ2V0IQogICdBIExpc3QgOnJlc3QKICAtLS0tLS0tLQogICdBIExpc3QgOnJlc3VsdAplbmQKCnJ1bGUgbnVsbCBhcHBlbmQKICAoYXBwZW5kKS1yZXN0CiAgcmVzdWx0LShhcHBlbmQpCmVuZAoKcnVsZSBjb25zIGFwcGVuZAogIChhcHBlbmQpLXJlc3QgKGNvbnMpLXRhaWwgYXBwZW5kCiAgKGNvbnMpLWhlYWQgY29ucwogIHJlc3VsdC0oYXBwZW5kKQplbmQKCmltcG9ydCB6ZXJvIGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWN1dGUuZmlkYi5hcHAvdGVzdHMvZGF0YXR5cGUvTmF0LmkiCgpudWxsIHplcm8gY29ucyB6ZXJvIGNvbnMKbnVsbCB6ZXJvIGNvbnMgemVybyBjb25zCmFwcGVuZAoKbnVsbCB6ZXJvIGNvbnMgemVybyBjb25zCm51bGwgemVybyBjb25zIHplcm8gY29ucwphcHBlbmQgQHJ1biAkcmVzdWx0) ]

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
  'A List :result
end

rule null append
  (append)-rest
  result-(append)
end

rule cons append
  (append)-rest (cons)-tail append
  (cons)-head cons
  result-(append)
end

import zero from "https://code-of-inet-cute.fidb.app/tests/datatype/Nat.i"

null zero cons zero cons
null zero cons zero cons
append

null zero cons zero cons
null zero cons zero cons
append @run $result
```

### DiffList

[ [Goto The Playground](https://inet.run/playground/aW1wb3J0IExpc3QgZnJvbSAiaHR0cHM6Ly9jb2RlLW9mLWluZXQtY3V0ZS5maWRiLmFwcC90ZXN0cy9kYXRhdHlwZS9MaXN0LmkiCgovLyBDb25jYXRlbmF0aW9uIG9mIGxpc3RzIGlzIHBlcmZvcm1lZCBpbiBsaW5lYXIgdGltZQovLyB3aXRoIHJlc3BlY3QgdG8gaXRzIGZpcnN0IGFyZ3VtZW50LgovLyBDb25zdGFudCB0aW1lIGNvbmNhdGVuYXRpb24gaXMgcG9zc2libGUKLy8gd2l0aCBkaWZmZXJlbmNlLWxpc3RzOiB0aGUgaWRlYSBjb25zaXN0cyBpbgovLyBwbHVnZ2luZyB0aGUgZnJvbnQgb2YgdGhlIHNlY29uZCBhcmd1bWVudAovLyBhdCB0aGUgYmFjayBvZiB0aGUgZmlyc3Qgb25lLgoKdHlwZSBEaWZmTGlzdCBAVHlwZSAtLSBAVHlwZSBlbmQKCm5vZGUgZGlmZgogICdBIExpc3QgOmZyb250CiAgLS0tLS0tLQogICdBIExpc3QgOmJhY2sKICAnQSBEaWZmTGlzdCA6dmFsdWUhCmVuZAoKbm9kZSBkaWZmQXBwZW5kCiAgJ0EgRGlmZkxpc3QgOnRhcmdldCEKICAnQSBEaWZmTGlzdCA6cmVzdAogIC0tLS0tLS0tCiAgJ0EgRGlmZkxpc3QgOnJlc3VsdAplbmQKCm5vZGUgZGlmZk9wZW4KICAnQSBEaWZmTGlzdCA6dGFyZ2V0IQogICdBIExpc3QgOm5ld0JhY2sKICAtLS0tLS0tLS0tCiAgJ0EgTGlzdCA6b2xkQmFjawplbmQKCnJ1bGUgZGlmZiBkaWZmQXBwZW5kCiAgKGRpZmYpLWZyb250IGRpZmYgcmVzdWx0LShkaWZmQXBwZW5kKQogIChkaWZmQXBwZW5kKS1yZXN0IGRpZmZPcGVuIGJhY2stKGRpZmYpCmVuZAoKcnVsZSBkaWZmIGRpZmZPcGVuCiAgKGRpZmYpLWJhY2sgbmV3QmFjay0oZGlmZk9wZW4pCiAgKGRpZmYpLWZyb250IG9sZEJhY2stKGRpZmZPcGVuKQplbmQKCmltcG9ydCB6ZXJvIGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWN1dGUuZmlkYi5hcHAvdGVzdHMvZGF0YXR5cGUvTmF0LmkiCmltcG9ydCBjb25zIGZyb20gImh0dHBzOi8vY29kZS1vZi1pbmV0LWN1dGUuZmlkYi5hcHAvdGVzdHMvZGF0YXR5cGUvTGlzdC5pIgoKKGRpZmYpIEBzcHJlYWQgJGZyb250ICRiYWNrICR2YWx1ZQpiYWNrIHplcm8gY29ucyB6ZXJvIGNvbnMgZnJvbnQgQGNvbm5lY3QgdmFsdWUKKGRpZmYpIEBzcHJlYWQgJGZyb250ICRiYWNrICR2YWx1ZQpiYWNrIHplcm8gY29ucyB6ZXJvIGNvbnMgZnJvbnQgQGNvbm5lY3QgdmFsdWUKZGlmZkFwcGVuZAoKLy8gQnkgdXNpbmcgb25lIGxlc3MgbG9jYWwgdmFyaWFibGUgYCR2YWx1ZWAsCi8vIHdlIGNhbiBzaW1wbGlmeSB0aGUgYWJvdmUgY29kZToKCihkaWZmKSBAc3ByZWFkICRmcm9udCAkYmFjawpiYWNrIHplcm8gY29ucyB6ZXJvIGNvbnMgZnJvbnQgQGNvbm5lY3QKKGRpZmYpIEBzcHJlYWQgJGZyb250ICRiYWNrCmJhY2sgemVybyBjb25zIHplcm8gY29ucyBmcm9udCBAY29ubmVjdApkaWZmQXBwZW5kCgovLyBCeSB1c2luZyBvbmUgbGVzcyBsb2NhbCB2YXJpYWJsZSBgJGJhY2tgLAovLyB3ZSBjYW4gZnVydGhlciBzaW1wbGlmeSB0aGUgYWJvdmUgY29kZToKCihkaWZmKSBAc3ByZWFkICRmcm9udCB6ZXJvIGNvbnMgemVybyBjb25zIGZyb250IEBjb25uZWN0CihkaWZmKSBAc3ByZWFkICRmcm9udCB6ZXJvIGNvbnMgemVybyBjb25zIGZyb250IEBjb25uZWN0CmRpZmZBcHBlbmQKCkBydW4gJHJlc3VsdA) ]

```inet
import List from "https://code-of-inet-cute.fidb.app/tests/datatype/List.i"

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

node diffAppend
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :result
end

node diffOpen
  'A DiffList :target!
  'A List :newBack
  ----------
  'A List :oldBack
end

rule diff diffAppend
  (diff)-front diff result-(diffAppend)
  (diffAppend)-rest diffOpen back-(diff)
end

rule diff diffOpen
  (diff)-back newBack-(diffOpen)
  (diff)-front oldBack-(diffOpen)
end

import zero from "https://code-of-inet-cute.fidb.app/tests/datatype/Nat.i"
import cons from "https://code-of-inet-cute.fidb.app/tests/datatype/List.i"

(diff) @spread $front $back $value
back zero cons zero cons front @connect value
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
diffAppend

// By using one less local variable `$value`,
// we can simplify the above code:

(diff) @spread $front $back
back zero cons zero cons front @connect
(diff) @spread $front $back
back zero cons zero cons front @connect
diffAppend

// By using one less local variable `$back`,
// we can further simplify the above code:

(diff) @spread $front zero cons zero cons front @connect
(diff) @spread $front zero cons zero cons front @connect
diffAppend

@run $result
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

## Community

GitHub:

- Organization: [github.com/cicada-lang](https://github.com/cicada-lang)

Telegram:

- English chat group: [CicadaLanguage](https://t.me/CicadaLanguage)
- Chinese chat group: [CicadaLanguageCN](https://t.me/CicadaLanguageCN)

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
