export type Node = {
  "@type": "Value"
  "@kind": "Node"
  id: string
  url: URL
  name: string
}

export type NodeWithoutId = {
  url: URL
  name: string
}
