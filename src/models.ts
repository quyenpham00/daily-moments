export interface Entry {
  id: string
  date: string
  pictureUrl: string
  title: string
  description: string
}

export function toEntry(doc): Entry {
  return { id: doc.id, ...doc.data() } as Entry
}
