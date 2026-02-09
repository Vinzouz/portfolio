"use client"


import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/toggleTheme"
import { LanguageToggle } from "@/components/languageToggle"
import { useState } from "react"
import { motion } from "framer-motion";

export function Navigation() {
    const pathname = usePathname();
    const t = useTranslations("common");

    const navItems = [
        { href: "/", label: t("home"), exact: true },
        { href: "/#about", label: t("about"), exact: false },
        { href: "/projects", label: t("projects"), exact: false },
    ]

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
        >
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4">
                {/* Menu mobile (hamburger) - visible uniquement sur mobile */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Contenu de la navbar - centré sur desktop */}
                <div className="flex-1 flex items-center justify-center sm:justify-center">
                    <div className="hidden sm:flex items-center gap-2 border border-border rounded-full bg-background/80 backdrop-blur-sm font-sans neon-soft">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        isActive && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <ModeToggle />
                    </div>
                </div>

                {/* Menu mobile (contenu) - apparaît quand isOpen est true */}
                {isOpen && (
                    <div className="sm:hidden absolute top-16 left-0 right-0 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block px-4 py-2 rounded-md text-sm font-medium transition-colors mb-2",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        isActive && "bg-accent text-accent-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <ModeToggle />


                    </div>
                )}
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                </div>
            </nav>
        </motion.div>
    );
}


