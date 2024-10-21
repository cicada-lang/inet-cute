import { type ImportBinding } from "./ImportBinding.js"

export function formatImportBinding(binding: ImportBinding): string {
  if (binding.alias) {
    return `${binding.name} as ${binding.alias}`
  } else {
    return `${binding.name}`
  }
}
