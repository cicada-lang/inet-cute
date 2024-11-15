type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

type Trivial -- @Type end
node sole -- Trivial :value! end

check
  Trivial -- Nat
then
  add1 add1
end
