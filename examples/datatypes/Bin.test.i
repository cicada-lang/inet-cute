require "./Bin.i"

bend b1 b1 b0                                // = 0b110 = 4+2 = 6
zero add1 add1 add1 add1 add1 add1 add1 ntob // 8 Nat -> 8 Bin
bmul                                         // = 6 * 7 = 42
// -> takes 61 steps; doing the same with Nat mul takes 125 steps

@inspect @run @inspect
