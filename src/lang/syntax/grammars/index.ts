import * as pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./import_binding.ts"
export * from "./label.ts"
export * from "./name.ts"
export * from "./stmt.ts"
export * from "./word.ts"
