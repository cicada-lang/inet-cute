require "List.i"
require "Trivial.i"

claim six_soles -- Trivial List end

define six_soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end

six_soles inspect run inspect
