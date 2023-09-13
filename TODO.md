update article -- for `@spread`

[note] about spread vs rearrange

`(cons)` -- unconnected node as value -- redesign syntax of rearrange

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

[note] about `(cons)-tail` -- in rule `(cons)` is like a linear store
