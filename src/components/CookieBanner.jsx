// components/CookieBanner.jsx
"use client"; // Important : ce composant utilise des hooks

import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Affiche le volet seulement si l'utilisateur n'a pas encore vu l'information
        const hasSeenBanner = localStorage.getItem('hasSeenCookieBanner');
        if (!hasSeenBanner) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('hasSeenCookieBanner', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 text-white p-4 z-50 border-t border-gray-700" style={{ background: "#302d2dff" }}>
            <div className="container sm:mx-auto flex items-center justify-between md:w-[50%]">
                <p className="text-sm text-center">
                    Ce site utilise uniquement des cookies techniques pour sauvegarder vos préférences (langue et thème). Aucun suivi n'est effectué.
                </p>
                <button
                    onClick={handleClose}
                    className="bg-white text-gray-900 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
