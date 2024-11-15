type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :result
end

(add) @spread $target $addend $result
target @inspect
addend @inspect
result @inspect
