"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-md shadow-2xl group hover:scale-105 duration-300",
    {
        variants: {
            variant: {
                primary: "bg-gradient-to-br from-cyan-500 to-blue-500 text-white",
                secondary: "bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-2xl",
            },
            size: {
                default: "text-base",
                sm: "text-sm",
                lg: "text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return (
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">{props.children}</span>
            <svg className="w-6 h-6 transition-transform duration-500  group-hover:translate-y-1 rotate-90"
                 data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fillRule="evenodd"/>
            </svg>
        </button>
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }

