type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :return
end

(add) @spread $target $addend $return
target @inspect
addend @inspect
return @inspect
