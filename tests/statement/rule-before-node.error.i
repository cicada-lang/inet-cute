type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

rule zero add
  (add)-addend
  return-(add)
end

node add
  Nat :target!
  Nat :addend
  ----------
  Nat :return
end
