require "List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList @Type -- @Type end

node diff
  'A List :front
  -------
  'A List :back
  'A DiffList :value!
end

node diffAppend
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :result
end

node diffOpen
  'A DiffList :target!
  'A List :newBack
  ----------
  'A List :oldBack
end

rule diff diffAppend
  (diff)-front diff result-(diffAppend)
  (diffAppend)-rest diffOpen back-(diff)
end

rule diff diffOpen
  (diff)-back newBack-(diffOpen)
  (diff)-front oldBack-(diffOpen)
end
