import { forwardRef, type AnchorHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type GradientButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  innerClassName?: string
}

export const GradientButton = forwardRef<HTMLAnchorElement, GradientButtonProps>(
  ({ className, innerClassName, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "group relative inline-flex rounded-lg p-[3px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
          className,
        )}
        {...props}
      >
        <span
          className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-500 via-purple-500 to-red-500 opacity-90 bg-size-[200%_200%] group-hover:animate-[gradient-rotate_3s_linear_infinite]"
          aria-hidden="true"
        />
        <span
          className={cn(
            "relative block rounded-[6px] bg-white px-8 py-3 text-sm font-medium text-gray-900 transition-all group-hover:bg-transparent group-hover:text-white",
            innerClassName,
          )}
        >
          {children}
        </span>
      </a>
    )
  },
)

GradientButton.displayName = "GradientButton"

