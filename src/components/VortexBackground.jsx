'use client'
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export function VortexBackground({ children }) {
    return (
        <div className="w-full mx-auto h-full">
            <Vortex
                backgroundColor="transparent"
                baseHue={220}
                className="flex items-center flex-col justify-center"
                particleCount={100}
                rangeY={800}
            >
                {children}
            </Vortex>
        </div>
    );
}