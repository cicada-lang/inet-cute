import { createChecking } from "../checking/createChecking.js"
import { collectWords } from "../compose/collectWords.js"
import { createEnv } from "../env/createEnv.js"
import { type Mod } from "../mod/index.js"
import { type PortExp } from "../port/PortExp.js"
import { formatValue } from "../value/formatValue.js"
import { type Value } from "../value/index.js"
import { type Word } from "../word/index.js"
import { checkAllLocalsAreUsed } from "./checkAllLocalsAreUsed.js"

export function checkNode(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
): {
  inputPortExps: Array<PortExp>
  outputPortExps: Array<PortExp>
} {
  const checking = createChecking()
  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, { checking })
  const outputValues = collectWords(mod, env, output, { checking })

  checkAllLocalsAreUsed(env.locals)

  const inputPortExps = inputValues.map(portExpFromValue)
  const outputPortExps = outputValues.map(portExpFromValue)

  const principalPorts = [...inputPortExps, ...outputPortExps].filter(
    (port) => port.isPrincipal,
  )

  if (principalPorts.length !== 1) {
    throw new Error(
      [
        `[checkNode] I expect a node to have one and only one principal port.`,
        ``,
        `  declared principal ports: [${principalPorts
          .map((port) => port.name)
          .join(", ")}]`,
      ].join("\n"),
    )
  }

  return {
    inputPortExps,
    outputPortExps,
  }
}

function portExpFromValue(value: Value): PortExp {
  if (value["@kind"] !== "Labeled") {
    throw new Error(
      [
        `[portExpFromValue] I expect the value to be a Labeled Value`,
        ``,
        `  value: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  return {
    "@type": "PortExp",
    name: value.label,
    t: value.value,
    isPrincipal: Boolean(value.isImportant),
  }
}
