type Nat -- @Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

type Trivial -- @Type end
node sole -- Trivial :value! end

sole add1
