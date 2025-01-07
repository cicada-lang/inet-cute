change naming convention -- back to lisp-case -- use -t for types

ambr @Type @type-t
ambr Nat nat-t
ambr List list-t
ambr DiffList diff-list-t
ambr Trivial trivial-t

ambs @Type
ambs Nat
ambs List
ambs DiffList

add define- to statement keywords

drop @ from builtin
static import should handled by an extra pass -- instead of injecting a `Loader` to `Mod`
`NodeId` vs `Node` -- instead of `Node` vs `NodeEntry` -- the same for `HalfEdge`
