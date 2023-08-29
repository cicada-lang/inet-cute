import { expect, test } from "vitest"
import { Fetcher } from "../../fetcher"
import { Loader } from "../../loader"
import { formatNet } from "../net/formatNet"
import { presentNodeAsNet } from "./presentNodeAsNet"

test("presentNodeAsNet", async () => {
  const text = `
  
  type Nat -- Type end

  node add
    Nat :target!
    Nat :addend
    --------
    Nat :return
  end

  `

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL("test://presentNodeAsNet")
  const mod = await loader.load(url, { text })
  const net = presentNodeAsNet(mod, "add")
  const output = formatNet(net)

  expect(output).toMatchInlineSnapshot(`
    "(add₀)-addend covering-(@output_port_cap₀)
    (add₀)-return covering-(@input_port_cap₀)"
  `)
})
