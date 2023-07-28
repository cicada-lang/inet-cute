should not use `PrincipalType` -- `isPrincipal` is a property of port

- `NodeDef` has `kind`
- `createNode` take `kind`

`createTrivialTypes`

`Type` should be type instead of class

[maybe] quit using `def/` and `defs/`

- but maybe to use `def/` is to have one namespace -- which is better

  - maybe we should use `values`

- `Mod` should have namespaces for

  - types
  - nodes
  - rules
  - nets
  - operators

`rules` should be part of `Mod` not `Node`

`Node` should not have `def` -- which is used to `getRule`

quit using `Action`

`Action` should be type instead of class

use new syntex

use named port

`NetRenderer` -- format to simple text representation of graph

# the paper

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets", Lafont, 1995

command change render command to simple run command

# simple types

> linear logic as type system of inet

Is linear logic with simple types a first order theory?
i.e. without dependent type -- not as a foundation of mathematics

- compare with simple typed lambda calculus' logic

# linear prolog

From the example of `diff-list`,
we know that inet is like linear logic programming.

# later

`Node` with optionally named port

- `NetRenderer` show free port names

stmt.format

`NetRenderer` control order

- need to use builder pattern, just like building SQL query

# experiments

use inet to encode lambda calculus
use inet to encode class, object and message sending

# dependent types

Two levels of computations, execute and cut.

`Word.cut` & `Word.execute`

equality between `Net`
use `Net` as type

# type check

`type-def.ts` -- `apply`

`deftype` -- `TermType`

`forall` for generic type variables

`defnode` -- type check
`defnet` -- type check words composition

`Edge` -- type check the two ports
