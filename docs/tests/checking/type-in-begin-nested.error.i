type Trivial -- Type end
node sole -- Trivial :value! end

type List Type -- Type end

node null
  --------
  'A List :value!
end

node cons
  'A :head
  'A List :tail
  --------
  'A List :value!
end

begin sole sole cons end