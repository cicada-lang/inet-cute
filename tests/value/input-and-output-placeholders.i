type Nat -- Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :return
end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend inspect (add1)-prev add add1
  (add)-return inspect connect
end

zero add1 zero add1 add inspect
