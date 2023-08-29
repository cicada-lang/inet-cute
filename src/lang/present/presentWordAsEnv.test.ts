import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentWordAsEnv } from "./presentWordAsEnv"

test("presentWordAsEnv", async () => {
  const text = `

type Nat -- Type end

node zero
  ------
  Nat :value!
end

node add1
  Nat :prev
  ----------
  Nat :value!
end

node add
  Nat :target!
  Nat :addend
  --------
  Nat :return
end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end


claim one -- Nat end
define one zero add1 end

claim two -- Nat end
define two one one add end

claim addadd Nat Nat Nat -- Nat end
define addadd add add end

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentNodeAsNet")
  const mod = await loader.load(url, { text })

  expect(formatNet(presentWordAsEnv(mod, "two").net)).toMatchInlineSnapshot(`
    "(zero₄)-value prev-(add1₅)
    (add1₅)-value addend-(add₆)
    (zero₅)-value prev-(add1₆)
    (add1₆)-value!target-(add₆)"
  `)

  expect(formatNet(presentWordAsEnv(mod, "addadd").net)).toMatchInlineSnapshot(`
    "(@type_cap₃)-covering addend-(add₈)
    (@type_cap₄)-covering addend-(add₇)
    (@type_cap₅)-covering!target-(add₇)
    (add₇)-return target-(add₈)"
  `)
})
