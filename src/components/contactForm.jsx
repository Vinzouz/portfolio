'use client'

import { MessageCircle, Linkedin } from "lucide-react";
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export function ContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const modalRef = useRef(null);
    const dragHandleRef = useRef(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [honeypot, setHoneypot] = useState("");
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState();
    const tForm = useTranslations('form');

    // Animation pour la modale
    const modalVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25 } },
        exit: { y: "100%", opacity: 0, transition: { ease: "easeInOut" } },
    };

    const handleDragStart = (e) => {
        // Empêche le comportement par défaut sur mobile
        if ('touches' in e) {
            e.preventDefault();
        }
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStartY(clientY);
        setIsDragging(true);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        // Empêche le comportement par défaut sur mobile
        if ('touches' in e) {
            e.preventDefault();
        }

        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const dragDistance = clientY - dragStartY;

        // Si le glissement vers le bas est suffisant, fermer la modale
        if (dragDistance > 50) { // Augmente le seuil pour éviter les fermetures accidentelles
            setIsOpen(false);
            setIsDragging(false);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Fermer la modale si clic en dehors
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            console.log(document)
            document.children[0].style.overflow = "hidden"
        } else {
            document.children[0].style.overflow = "unset"
        }
        return () => {
            document.children[0].style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <>
            <motion.div
                initial={{ y: -200, opacity: 0 }} // Commence 200px au-dessus (hors écran)
                animate={{ y: 0, opacity: 1 }}     // Descend à sa position finale
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.4
                }}
                className="fixed left-3 bottom-[5%] md:bottom-1/2 md:transform md:-translate-y-1/2"
            >
                <Link target="_blank" href="https://www.linkedin.com/in/vincent-andr%C3%A9-7021b7244/">
                    <div className="size-14 glass-cardHome rounded-full mb-2 flex justify-center items-center hover:scale-110 transition-transform duration-300 hover:fill-current hover:text-violet-800">
                        <Linkedin />
                    </div>
                </Link>
                <div onClick={() => setIsOpen(true)} className="size-14 glass-cardHome rounded-full mb-2 flex justify-center items-center hover:scale-110 transition-transform duration-300 hover:fill-current hover:text-violet-800">
                    <MessageCircle />
                </div>

            </motion.div >
            {/* Modale animée */}
            < AnimatePresence >
                {isOpen && (
                    <>
                        {/* Fond flou/noir avec animation d'opacité */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }} // Durée de l'animation du fond
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                            onClick={handleClickOutside}
                        />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                            className="fixed inset-0 z-50 flex items-end justify-center"
                            onMouseDown={handleClickOutside}
                        >
                            <motion.div
                                ref={modalRef}
                                className="w-full max-w-2xl glass-card3 p-6 border-t"
                                onMouseMove={handleDragMove}
                                onMouseUp={handleDragEnd}
                                onMouseLeave={handleDragEnd}
                                onTouchStart={(e) => handleDragStart(e)}
                                onTouchMove={(e) => handleDragMove(e)}
                                onTouchEnd={handleDragEnd}
                            >
                                {/* Barre de drag (fonctionnelle) */}
                                <div
                                    ref={dragHandleRef}
                                    className="w-12 h-1.5 bg-gray-500 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing touch-none"
                                    onMouseDown={handleDragStart}
                                    onTouchStart={(e) => {
                                        e.preventDefault(); // Empêche le comportement par défaut
                                        handleDragStart(e);
                                    }}
                                />

                                {/* Formulaire */}
                                <form
                                    onSubmit={handleSubmit(async (data) => {
                                        if (honeypot) return;
                                        setIsSubmitting(true);
                                        try {
                                            const response = await fetch("/api/contact", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(data),
                                            });

                                            const result = await response.json();
                                            if (response.ok) {
                                                setSubmitStatus({ success: true, message: result.message });
                                                toast.success(tForm('successMessage')); // Utilise la traduction
                                                reset();
                                                setTimeout(() => setIsOpen(false), 1500);
                                            } else {
                                                setSubmitStatus({ success: false, message: result.message });
                                                toast.error(tForm('errorMessage')); // Utilise la traduction
                                            }
                                        } catch (error) {
                                            setSubmitStatus({ success: false, message: tForm('networkError') });
                                            toast.error(tForm('networkError'));
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    })}
                                    className="space-y-4"
                                >
                                    {/* Honeypot (invisible) */}
                                    <input
                                        type="text"
                                        name="honeypot"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                        className="hidden"
                                    />

                                    {/* Champ Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: tForm('emailRegex'),
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: tForm('emailRegex2'),
                                                },
                                            })}
                                            className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-violet-500"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    {/* Champ Objet */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 ">{tForm('objectLabel')}</label>
                                        <input
                                            type="text"
                                            {...register("subject", {
                                                required: tForm('objectRegex'),
                                                pattern: {
                                                    value: /^[a-zA-Z0-9\s\-_,.!?'"/\\|@#()àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜ;:–—]+$/,
                                                    message: tForm('objectRegex2'),
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: tForm('objectRegex3'),
                                                },
                                            })}
                                            className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-violet-500"
                                        />
                                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 ">Message</label>
                                        <textarea
                                            rows="4"
                                            {...register("message", {
                                                required: tForm('messageRegex'),
                                                pattern: {
                                                    value: /^[a-zA-Z0-9\s\-_,.!?'"/\\|@#()àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜ;\n–—:]+$/,
                                                    message: tForm('messageRegex2'),
                                                },
                                                maxLength: {
                                                    value: 1000,
                                                    message: tForm('messageRegex3'),
                                                },
                                            })}
                                            className="w-full p-2 rounded border border-gray-700 focus:ring-2 focus:ring-violet-500"
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="rgpd-consent"
                                            {...register("rgpdConsent", {
                                                required: tForm('rgpdError'),
                                            })}
                                            className="mr-2 h-4 w-4 rounded border-gray-300 text-violet-600 accent-violet-500"
                                        />
                                        <label htmlFor="rgpd-consent" className="text-sm font-medium ">
                                            {tForm('rgpdLabel')}
                                        </label>

                                    </div>
                                    {errors.rgpdConsent && <p className="text-red-500 text-xs mt-1">{errors.rgpdConsent.message}</p>}

                                    {/* Bouton Envoyer */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition-colors"
                                    >
                                        {isSubmitting ? tForm('sending') : tForm('send')}
                                    </button>

                                    {/* Message de statut */}
                                    {submitStatus.message && (
                                        <p className={`mt-2 text-center text-sm ${submitStatus.success ? "text-green-500" : "text-red-500"}`}>
                                            {submitStatus.message}
                                        </p>
                                    )}
                                </form>
                            </motion.div>
                        </motion.div>
                    </>)
                }
            </AnimatePresence >
        </>
    );
}
