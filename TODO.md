[syntax] optional `,` in node definition

# error report

improve error report about type checking

# type

`defn` -- can be a sequence of words that build a net

- need to design syntax to declare input and output types

  ```inet
  defn <name>: ...<output> do
    ...
  end

  defn <name>: ...<input> -- ...<output> do
    ...
  end
  ```

- `do` should be preserved word

`defnode` -- check type -- arity of defined types

# unify

`unifyTypes` -- occur check

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
