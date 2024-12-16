import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher/index.ts"
import { Loader } from "../../loader/index.ts"
import { formatEnv } from "../env/formatEnv.ts"
import { presentWordAsEnv } from "./presentWordAsEnv.ts"

test("presentWordAsEnv", async () => {
  const text = `

type Nat -- @Type end

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

  expect(formatEnv(presentWordAsEnv(mod, "two"))).toMatchInlineSnapshot(`
    "env
      net
        (zero₄)-value prev-(add1₅)
        (add1₅)-value addend-(add₆)
        (zero₅)-value prev-(add1₆)
        (add1₆)-value!target-(add₆)
      end
      stack
        (add₆)-return
      end
      locals end
    end"
  `)

  expect(formatEnv(presentWordAsEnv(mod, "addadd"))).toMatchInlineSnapshot(`
    "env
      net
        (@typeCap₃)-covering addend-(add₈)
        (@typeCap₄)-covering addend-(add₇)
        (@typeCap₅)-covering target-(add₇)
        (add₇)-return target-(add₈)
      end
      stack
        (add₈)-return
      end
      locals end
    end"
  `)
})
