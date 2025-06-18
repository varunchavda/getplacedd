import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//helps you combine Tailwind CSS class names
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
