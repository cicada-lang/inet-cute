import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"

export function checkRuleNodeOrder(
  mod: Mod,
  firstName: string,
  secondName: string,
): void {
  const first = lookupDefinitionOrFail(mod, firstName)

  if (first["@kind"] !== "NodeDefinition") {
    throw new Error(
      [
        `[checkRuleNodeOrder] I expect the first name to be a NodeDefinition.`,
        ``,
        ` first node: ${firstName}`,
        ` second node: ${secondName}`,
      ].join("\n"),
    )
  }

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

  const second = lookupDefinitionOrFail(mod, secondName)

  if (second["@kind"] !== "NodeDefinition") {
    throw new Error(
      [
        `[checkRuleNodeOrder] I expect the first name to be a NodeDefinition.`,
        ``,
        ` first node: ${firstName}`,
        ` second node: ${secondName}`,
      ].join("\n"),
    )
  }

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
