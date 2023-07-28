[mod] extract all methods of `Mod`

[mod] `createMod` -- `Mod` should be a type -- instead of a class

`NodeDefinition` should not have `rules` -- use `RuleDefinition`

`Node` should not have `definition` -- which is used to `getRule`

quit using `Action`

`Action` should be type instead of class

use new syntax

`Node` with optionally named port

- `NetRenderer` show free port names

`NetRenderer` -- format to simple text representation of graph

- learn from knuth's c code

change the `render` command to simple `run` command

# the paper

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets", Lafont, 1995

# simple types

> linear logic as type system of inet

Is linear logic with simple types a first order theory?
i.e. without dependent type -- not as a foundation of mathematics

- compare with simple typed lambda calculus' logic

# linear prolog

From the example of `diff-list`, we know that
inet is like linear logic programming.

# experiments

use inet to encode lambda calculus

use inet to encode class, object and message sending

# type check

`deftype` -- `TermType` -- use `'a` for name of pattern like in haskell

`defnode` -- type check

`defnet` -- type check words composition

`Edge` -- type check the two ports
