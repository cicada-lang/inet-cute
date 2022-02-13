- [manual] class/04-mathematical-structure-as-class.md

  - Mathematical Structure as Class

- [manual] equality/01-equal-utilities.md

- [manual] datatype/02-list.md
- [manual] datatype/03-vector.md

# refactor

- extract `ModuleCache`

# inductive datatype -- questions

- it will be more natural to define fibonacci function by recursion

  - we can do this if we can continue an induction for "the previous of the previous",
    instead of starting a new induction for it.

  - https://readonly.link/manuals/gitlab.com/cicada-lang/cicada/-/datatype/01-nat.md#fibonacci

> If the ambition of this project is too much pressure,
>   use refactoring as a therapy.

- [question] Is it ok that `TypeCtorValue` should be `readback` to `TypeCtorCore`,
  while `DatatypeValue` and `CurriedTypeCtorValue` can only be `readback` to `ApCore`?

- [question] Note that, when we have built-in `Vector`,
  it is easy to implement `vector_head` and `vector_tail` directly,
  but when we try to use `induction` to define `vector_head` and `vector_tail`,
  it became very complicated. Why?

  ``` typescript
  // NOTE `infer` of `vector_head`
  infer(ctx: Ctx): { t: Value; core: Core } {
    const inferred_target = infer(ctx, this.target)
    const vector_t = expect(ctx, inferred_target.t, Exps.VectorValue)
    expect(ctx, vector_t.length, Exps.Add1Value)

    return {
      t: vector_t.elem_t,
      core: new Exps.VectorHeadCore(inferred_target.core),
    }
  }
  ```

- [question] From the type of `List` -- `(E: Type) -> Type`,
  we know we can apply `List` to get a type,
  but we can also `List.null` & `List.cons` to get its constructors,
  should we and how should we show this in the type of `List`?

  - The same situation occurs for fulfilling type, which is of `Type`,
    but can also be applied to get partly fulfilled types.

    - Which can be solved by special `apply` field.

  - Should we support "every thing is object"?

# errors

- improve error classes

  - `SemanticError`
    - `ElaborationError`
    - `EvaluationError`
  - `InternalError`

- improve `expect` error report -- use new error classes

# use `unify` to replace `readback`

- `Value.unify` -- pi/fn-value.ts & pi/implicit-fn-value.ts

  - bidirectional `unify`
  - handle eta-expansion in `unify`

- `Solution.unify` -- occur check

  - not that there is no `free_names` on `Value`

- maybe using `unify` instead of `readback` can handle equivalence between recursive functions.

# built-in

- `sigma/cons`

  - see `docs/tests/vague-pi.md` -- section "my_cons"

- `sigma/car` and `sigma/cdr`

  - see `docs/tests/implicit-pi.md` -- section "my_car & my_cdr"

# subtype

- `check` use `subtype` instead of `conversion`
  - `subtype` should be implemented as a `subtype` function and `Value.subtype` method
  - `subtype` function default to `conversion`
  - `Value.subtype` call `subtype` for recursion

- when we do a typed binding, we need to be able to refine the declared type
  - this is specially needed for `<var>: <fulfilled class> = <object>`
  - this must also recurse into the structure of nested class and object, maybe even for pi type

# quotient type

- learn from lean

# optimization

- [optimization] be able to use native `BigInt`

  - learn from constraint logic programming (CLP)

# refactor

- [refactor] improve normalization from `TypeCtorValue` to `DatatypeValue`
- [refactor] improve normalization from `DataCtorValue` to `DataValue`

# bug

- [bug] avoid using `constructor.name` for it will be changed during a build for frontend

- [bug] in `02.md`, in `nat_ind`'s definition, if return `T` instead of `motive(n)`,
  the error report show some bugs about the scope.

- [bug] `DatatypeValue.build_case_t` -- fix the use of the generated names -- `motive` and `almost`

  - (A) is it enough to generate name that is not valid identifier?
  - (B) pass `free_names` from `TypeCtor` to `TypeCtorCore` and `TypeCtorValue`
  - (C) use `nanoid`

- [bug] When error is in an imported file, error report fail to report the right context.

- [bug] When `Valee.unify` take `ctx` and `t`, the `length` if `VecValue.unify` is wrong

- [bug] `11.md` -- the socpe of implicit argument `length` is wrong

  - if we move definition of `our_vector_ind` after `import { length } ...`,
    lexical scope will fail.

- [bug] fix type check error report on wrong number of elements

  in `07.md`:

  ``` cicada
  drop_last(String, three, Vector.cons("a", Vector.cons("b", Vector.cons("c", Vector.cons("d", Vector.null)))))
  ```

# maybe

- [maybe] `implicit-fn` insertion is handled in `Fn.check`,
  but `vague-fn` insertion is handled in `check`,
  maybe we should make them symmetric.

- [maybe] currently `implicit-pi` and `vague-pi` has the same structure,
  only the inserters are different, if we need the third such feature,
  and the structures are still the same, we should do an abstraction (maybe `decorated-pi`).

- [maybe] we also need `multi-fn` & `multi-pi` to be symmetric with `multi-ap`

- [maybe] offset in `CodeBlock`
- [maybe] support using `let name = exp` to do local definitions in class

- [general macro] `li! [...]` and `vec! [...]` can be general macro,
  maybe `foldRight! (List.cons) [...]` and `foldRight! (Vector.cons) [...]`

- [maybe] extract `readback_type`
- [maybe] extract `ctx.extend_type`

- [maybe] `Fn` be able to annotate argument type and return type

# problem

- [problem] `exps/variable` -- how to handle `span` when doing a `subst`?

# books

- [books] [EWD1240a] A little bit of lattice theory
  - To test our system.
  - This paper is about the relation between PartialOrder and Lattice.
  - Learn from the story line for teaching.

- [book] formalize infinite descent as a consequence of induction on natural number:
  - https://en.wikipedia.org/wiki/Mathematical_induction#Infinite_descent
  - https://en.wikipedia.org/wiki/Proof_by_infinite_descent

- [book] formalize complete induction as a consequence of induction on natural number:
  - https://en.wikipedia.org/wiki/Mathematical_induction#Complete_(strong)_induction

- [books] Algebraic structures -- https://en.wikipedia.org/wiki/Algebraic_structure
- [books] Lattice theory
- [books] Closure system -- for FCA
- [books] Topology theory
- [books] Category of Groups
- [books] Number theroy -- https://en.wikipedia.org/wiki/Number_theory
