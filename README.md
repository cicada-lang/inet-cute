# iNet Cute

[ [website](https://inet.xieyuheng.com)
| [inet-forth](https://github.com/cicada-lang/inet-forth)
| [inet-js](https://github.com/cicada-lang/inet-js) ]

An implementation of [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

- Simply typed.
- ASCII art inspired syntax.
- Using a stack-based meta language to build nets.

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @cicada-lang/inet-cute
```

The command-line program is called `inet-cute`.

```sh
inet-cute repl         # Open an interactive REPL
inet-cute run [path]   # Run an inet program
inet-cute help [name]  # Display help for a command
```

## Examples

Please see [examples/](./tests) for some example code.

### Nat

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

import zero from "https://code-of-inet-cute.xieyuheng.com/examples/datatypes/Nat.i"

null zero cons zero cons
null zero cons zero cons
append

null zero cons zero cons
null zero cons zero cons
append @run $result
```

### DiffList

```inet
import List from "https://code-of-inet-cute.xieyuheng.com/examples/datatypes/List.i"

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

import zero from "https://code-of-inet-cute.xieyuheng.com/examples/datatypes/Nat.i"
import cons from "https://code-of-inet-cute.xieyuheng.com/examples/datatypes/List.i"

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

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
