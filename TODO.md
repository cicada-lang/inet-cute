remove syntax of rearrange

update docs about using `@spread` to do rearrange

`(cons)` -- unconnected node as value -- redesign syntax of rearrange

```
(cons) @spread $value $tail $head
zero head @connect value zero cons diff $value tail @connect value
(cons) @spread $value $tail $head
zero head @connect value zero cons diff $value tail @connect value
diff_append
```

```
(cons) @spread $value $tail zero @connect
value zero cons diff $value tail @connect value
(cons) @spread $value $tail zero @connect
value zero cons diff $value tail @connect value
diff_append
```

```
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
diff_append
```

```
(diff) @spread $front $back
back zero cons zero cons front @connect
(diff) @spread $front $back
back zero cons zero cons front @connect
diff_append
```

```
(diff) @spread $front zero cons zero cons front @connect
(diff) @spread $front zero cons zero cons front @connect
diff_append
```

`(cons)-tail` -- in rule `(cons)` is like a linear store
