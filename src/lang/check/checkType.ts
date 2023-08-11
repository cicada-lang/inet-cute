import { createChecking } from "../checking/createChecking"
import { collectWords } from "../compose/collectWords"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Value } from "../value"
import { formatValue } from "../value/formatValue"
import { Word } from "../word"

export function checkType(
  mod: Mod,
  input: Array<Word>,
  output: Array<Word>,
): {
  inputValues: Array<Value>
} {
  const checking = createChecking()
  const env = createEnv(mod)

  const inputValues = collectWords(mod, env, input, { checking })
  const outputValues = collectWords(mod, env, output, { checking })

  if (outputValues.length !== 1) {
    throw new Error(
      [
        `[checkType] I expect a type definition to have one and only one claimed output.`,
        ``,
        `  output length: ${outputValues.length}`,
        `  output values: [${outputValues.map(formatValue).join(", ")}]`,
      ].join("\n"),
    )
  }

  const outputType = outputValues[0]
  if (outputType["@kind"] !== "Type") {
    throw new Error(
      [
        `[checkType] I expect the claimed output of a type definition to be Type.`,
        ``,
        `  output value: ${formatValue(outputType)}`,
      ].join("\n"),
    )
  }

  return {
    inputValues,
  }
}
