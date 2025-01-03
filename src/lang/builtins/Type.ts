import { type Env } from "../env/index.ts"

export function compose(env: Env): void {
  env.stack.push({
    "@type": "Value",
    "@kind": "Type",
  })
}
