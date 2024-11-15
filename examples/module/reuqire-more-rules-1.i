type Nat -- @Type end

node zero
  ------
  Nat :value!
end

node add1
  Nat :prev
  ----------
  Nat :value!
end
