export interface Contact {
    userName: string,
    lastMessage: string
}

export interface Message {
    userName: string | null | undefined,
    message: string,
    uid: string | null | undefined
}