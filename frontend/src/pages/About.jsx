import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
    const manifestoSayings = [
        "Juzzt isn't a record store.",
        "We don't sell records. We sell time.",
        "Listening is like smuggling.",
        "If you don't know what you're listening to, don't ask.",
        "The dust always wins.",
        "No Sync. No Algorithms. No Names.",
        "The store opens when the record ends.",
        "Everything you listen to will be used against you.",
        "If you're listening, you're already inside."
    ];

    const [randomSaying, setRandomSaying] = useState("");
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        setRandomSaying(manifestoSayings[Math.floor(Math.random() * manifestoSayings.length)]);
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFCE8] text-black">
            <Header />

            <section className="py-20">
                <div className="container mx-auto px-6 md:px-16 text-center">
                    {/* Manifesto Header */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl font-bold text-black leading-tight"
                    >
                        {randomSaying}
                    </motion.h1>

                    {/* Record Player Animation */}
                    <motion.div
                        className="mt-10 flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <motion.img
                            src="/davis.webp"
                            alt="Vinyl spinning"
                            className="w-48 md:w-64"
                            whileHover={{ rotate: 360, transition: { duration: 3, repeat: Infinity, ease: "linear" } }}
                        />
                    </motion.div>

                    {/* About Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-10 text-lg max-w-3xl mx-auto text-gray-700"
                    >
                        No Algorithms. No Sync Buttons. No Names. Every track is handpicked. Every record comes with a story. If you don't know what you're listening to — go and ask. (mandatory)
                    </motion.p>

                    {/* Hidden Message */}
                    <motion.div
                        className="mt-8 text-lg font-mono cursor-pointer text-gray-600"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setShowSecret(!showSecret)}
                    >
                        <span className="underline">Click for a secret</span>
                    </motion.div>
                    {showSecret && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="mt-4 text-xl font-bold text-[#DD403A]"
                        >
                            If you're listening, you're already inside.
                        </motion.p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
