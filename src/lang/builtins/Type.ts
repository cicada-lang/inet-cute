import { Env } from "../env"

export function compose(env: Env): void {
  env.stack.push({
    "@type": "Value",
    "@kind": "Type",
  })
}

export function cut(env: Env): void {
  env.stack.push({
    "@type": "Value",
    "@kind": "Type",
  })
}
