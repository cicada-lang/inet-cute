require "DiffList.i"
require "Trivial.i"

claim one_two_soles -- Trivial DiffList end

define one_two_soles
  (diff) @spread $front sole cons front @connect
  (diff) @spread $front sole cons sole cons front @connect
  diff_append
end

one_two_soles @inspect @run @inspect

claim two_two_soles -- Trivial DiffList end

define two_two_soles
  (diff) @spread $front sole cons sole cons front @connect
  (diff) @spread $front sole cons sole cons front @connect
  diff_append
end

two_two_soles @inspect @run @inspect
