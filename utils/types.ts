export type User = {
  name: string,
  id: string,
  last_seen: Date,
}

export type Message = {
  id: number,
  text: string,
  created_at: Date,
  user: User
}