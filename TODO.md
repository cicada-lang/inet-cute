`(cons)` -- unconnected node as value -- redesign syntax of rearrange

```
(cons) @ports $value $tail $head
zero head @connect value zero cons diff $value tail @connect value
(cons) @ports $value $tail $head
zero head @connect value zero cons diff $value tail @connect value
diff_append
```

```
(cons) @ports $value $tail zero @connect
value zero cons diff $value tail @connect value
(cons) @ports $value $tail zero @connect
value zero cons diff $value tail @connect value
diff_append
```

```
(diff) @ports $front $back $value
back zero cons zero cons front @connect value
(diff) @ports $front $back $value
back zero cons zero cons front @connect value
diff_append
```

```
(diff) @ports $front $back
back zero cons zero cons front @connect
(diff) @ports $front $back
back zero cons zero cons front @connect
diff_append
```

```
(diff) @ports $front zero cons zero cons front @connect
(diff) @ports $front zero cons zero cons front @connect
diff_append
```

`(cons)-tail` -- in rule `(cons)` is like a linear store
