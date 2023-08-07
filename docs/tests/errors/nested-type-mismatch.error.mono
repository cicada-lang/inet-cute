type Trivial 0 end
node sole value!: Trivial end

type Nat 0 end
node zero value!: Nat end
node add1 prev: Nat -- value!: Nat end

type List 1 end
node null value!: List('A) end
node cons head: 'A tail: List('A) -- value!: List('A) end

node append target!: List('A) rest: List('A) -- return: List('A) end


show
  null sole cons sole cons
  null zero cons zero cons
  append
end
