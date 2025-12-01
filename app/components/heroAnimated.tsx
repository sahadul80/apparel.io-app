'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

interface HeroProps {
    title: string;
    subtitle: string;
    videoUrl: string;
}

const HeroSection: React.FC = () => {
    const [heroData, setHeroData] = useState<HeroProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [windowHeight, setWindowHeight] = useState(0);
    const [isCentered, setIsCentered] = useState(false);
    const [isInactive, setIsInactive] = useState(false);

    const { scrollYProgress } = useScroll();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inactivityRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        axios.get<HeroProps>('/api/heroAnimated')
            .then(res => {
                setHeroData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load hero content');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const handleActivity = () => {
            setIsInactive(false);
            if (inactivityRef.current) clearTimeout(inactivityRef.current);
            inactivityRef.current = setTimeout(() => setIsInactive(true), 5000);
        };

        const handleScroll = () => {
            handleActivity();
            const heroEl = document.getElementById('hero');
            if (!heroEl) return;

            const { top, bottom } = heroEl.getBoundingClientRect();
            const centered = top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2;

            if (centered && !isCentered) {
                setIsCentered(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsCentered(false), 5000);
            } else if (!centered && isCentered) {
                setIsCentered(false);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
        };

        handleActivity();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (inactivityRef.current) clearTimeout(inactivityRef.current);
        };
    }, [isCentered]);

    const scale = useTransform(scrollYProgress, [0, 0.5], [isInactive ? 0.6 : 1, 1.3]);
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [isInactive ? windowHeight * 0.8 : 0, windowHeight * 0.6]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-amber-50 dark:bg-stone-950 text-emerald-700 dark:text-emerald-300">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }
    if (error || !heroData) {
        return (
            <div className="flex items-center justify-center h-screen bg-amber-50 dark:bg-stone-950 text-amber-600 dark:text-amber-400">
                {error || 'Content unavailable'}
            </div>
        );
    }

    const { title, subtitle, videoUrl } = heroData;

    return (
        <section
            id="hero"
            className="relative h-screen w-full overflow-hidden bg-amber-50 dark:bg-stone-950"
        >
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-100 dark:opacity-90"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            
            {/* Updated gradient overlay with new theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-amber-50/20 to-stone-950/80 dark:from-stone-950/70 dark:via-stone-950/50 dark:to-stone-950/95" />

            <motion.div
                className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
                style={{ y, scale, opacity }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <motion.h1
                    className="text-emerald-900 dark:text-emerald-100 font-bold mb-4"
                    style={{
                        fontSize: isInactive
                            ? 'clamp(1.5rem, 6vw, 3rem)'
                            : 'clamp(2rem, 8vw, 4rem)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="text-emerald-800 dark:text-emerald-200 mb-8 max-w-2xl mx-auto"
                    style={{
                        fontSize: isInactive
                            ? 'clamp(0.9rem, 2vw, 1.2rem)'
                            : 'clamp(1rem, 2.5vw, 1.5rem)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    {subtitle}
                </motion.p>
                <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <a
                        href="/pages/shop"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 duration-300 text-sm shadow-xl font-medium"
                    >
                        Explore Collection
                    </a>
                    <a
                        href="/contact"
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 duration-300 text-sm shadow-xl font-medium"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-emerald-700 dark:text-emerald-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="mb-2 text-sm font-medium">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-4 border-emerald-600 dark:border-emerald-400 rounded-full"
                >
                    <motion.div
                        className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full mx-auto mt-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;