require "DiffList.i"
require "Trivial.i"

claim oneTwoSoles -- Trivial DiffList end

define oneTwoSoles
  (diff) @spread $front sole cons front @connect
  (diff) @spread $front sole cons sole cons front @connect
  diffAppend
end

oneTwoSoles @inspect @run @inspect

claim twoTwoSoles -- Trivial DiffList end

define twoTwoSoles
  (diff) @spread $front sole cons sole cons front @connect
  (diff) @spread $front sole cons sole cons front @connect
  diffAppend
end

twoTwoSoles @inspect @run @inspect
