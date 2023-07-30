drop the `net` prefix for `graph/` functions

use unicode for subscript number

rename PortConnect to PortReconnect

`connect` v.s. `reconnect`

- `reconnect` is used in `PortReconnect`

`interact` -- be sure about memeory leak from `port.connection`

# bug

why no active edge in `Nat.inet.four.initial`？

# render

`NetRenderer` -- format to simple text representation of graph

- learn from knuth's c code

change the `render` command to simple `run` command

# simple types

linear logic as type system of inet

`Node` port name can be optional

`deftype` -- `TermType` -- use `'a` for name of pattern like in haskell

`defnode` -- type check

`defnet` -- type check words composition

`Edge` -- type check the two ports

# experiments

read interaction-combinators.pdf

use inet to encode lambda calculus

use inet to encode class, object and message sending

# paper

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets", Lafont, 1995

# value

the stack can take other types of values -- not only port

`"name" set` and `"name" get` for local variable
