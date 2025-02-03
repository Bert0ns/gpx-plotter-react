import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateUniqueKey(): number {
    return Date.now() % 10_000_000 + Math.floor(Math.random() * 1000)
}