"use client"

import { cn } from "@/lib/utils"
import { GridPattern } from "@/components/ui/grid-pattern"

export function GridPatternLinearGradient() {
    return (
        <div className="bg-background absolute flex size-full items-center justify-center overflow-hidden rounded-lg p-20">
            <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
                )}
            />
        </div>
    )
}
