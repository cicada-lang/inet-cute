extract `netRun`

command change render command to simple run command

quit using `def/` and `defs/`

- `Mod` should have namespaces for
  - types
  - nodes
  - rules
  - nets
  - operators

rule should be part of `Mod` not `Node`

quit using `Action`

`Net` should be type instead of class

`Action` should be type instead of class

use new syntex

use named port

refactor the exp from class to type

should not use `PrincipalType` -- `isPrincipal` is a property of port

`Type` should be type instead of class

`NetRenderer` -- format to simple text representation of graph

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

From the example of `diff-list`,
we know that inet is like linear logic programming.

# later

`Node` with optionally named port

- `NetRenderer` show free port names

stmt.format
exp.format

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
