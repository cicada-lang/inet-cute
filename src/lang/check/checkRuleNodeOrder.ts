import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"

export function checkRuleNodeOrder(
  mod: Mod,
  firstName: string,
  secondName: string,
): void {
  const first = createNodeFromDefinition(lookupDefinitionOrFail(mod, firstName))

  if (!first.output.some((port) => port.isPrincipal)) {
    throw new Error(
      [
        `[checkRuleNodeOrder] The first node of a rule must have its principal port in the output.`,
        ``,
        ` first node: ${firstName}`,
        ` second node: ${secondName}`,
      ].join("\n"),
    )
  }

  const second = createNodeFromDefinition(
    lookupDefinitionOrFail(mod, secondName),
  )

  if (!second.input.some((port) => port.isPrincipal)) {
    throw new Error(
      [
        `[checkRuleNodeOrder] The second node of a rule must have its principal port in the input.`,
        ``,
        ` first node: ${firstName}`,
        ` second node: ${secondName}`,
      ].join("\n"),
    )
  }
}
