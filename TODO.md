# type

`defrule` -- check type -- cut -- words composition

`Call` -- `cut`
`LocalSet` -- `cut`
`PortPush` -- `cut`
`PortReconnect` -- `cut`

`Definition.cut`

`freshenTypes` -- consistently add subscript to type variable names

`defnet` -- type check -- cut -- words composition

`defnode` -- check type -- arity of defined types

[maybe] `defdata`

```inet
defdata Nat
  case zero -- value!: Nat end
  case add1 prev: Nat -- value!: Nat end
end

defdata List('a)
  case null
    ------
    value! // List('a)
  end

  case cons
    head // 'a
    tail // List('a)
    -------
    value! // List('a)
  end
end
```

# example

Nat -- `mul` -- with `nat_dup` and `nat_drop`

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
