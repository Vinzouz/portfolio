"use client"

import * as React from "react"
import { useTransition } from "react"
import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
]

export function LanguageToggle() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const tCommon = useTranslations("common")
    const [isPending, startTransition] = useTransition()

    const handleLanguageChange = async (newLocale) => {
        // Avec la stratégie "never", la locale est stockée dans un cookie
        // On utilise une route API pour changer le cookie
        try {
            const response = await fetch('/api/locale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ locale: newLocale }),
            })
            
            if (response.ok) {
                // Navigation sans remonter en haut de la page
                startTransition(() => {
                    router.replace(pathname, { scroll: false })
                })
            }
        } catch (error) {
            console.error('Erreur lors du changement de langue:', error)
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button className="mr-2" variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{tCommon("language")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={locale === lang.code ? "bg-accent" : ""}
                    >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

