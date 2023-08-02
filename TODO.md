# type

`cut` -- wire

[cut] `match` -- unification

`freshenTypes` -- consistently add subscript to type variable names

`cutDefinition` -- `NodeDefinition` -- use `freshenTypes`

`cut` -- wire -- use `freshenTypes`

`defrule` -- enable type check

`defnet` -- type check -- cut -- words composition

`defnode` -- check type -- arity of defined types

# example

Nat -- `mul` -- with `nat_dup` and `nat_erase`

Nat -- `max` -- with `max_aux`

use inet to encode lambda calculus

use inet to encode class, object and message sending

# module

module system

# learn

phase space and monoid -- understand the model theory of linear logic

coherent space -- understand the denotational semantics of linear logic

understand proof-nets for all connectives

- proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
- "The linear abstract machine", Lafont, 1990.
- "From proof-nets to interaction net", Lafont, 1995

# value

the stack can take other types of values -- not only port
