import { type ImportBinding } from "./ImportBinding.ts"

export function formatImportBinding(binding: ImportBinding): string {
  if (binding.alias) {
    return `${binding.name} as ${binding.alias}`
  } else {
    return `${binding.name}`
  }
}
