type List @Type -- @Type end

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

node append
  'A List :target!
  'A List :rest
  --------
  'A List :return
end

rule null append
  (append)-rest
  return-(append)
end

rule cons append
  (cons)-head
  (append)-rest (cons)-tail append
  cons
  return-(append)
end

// The correct definition is:

// rule cons append
//   (append)-rest (cons)-tail append
//   (cons)-head cons
//   return-(append)
// end
