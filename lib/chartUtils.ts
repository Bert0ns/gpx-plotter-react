export function generateUniqueKey(): number {
    return Date.now() + Math.floor(Math.random() * 10000)
}