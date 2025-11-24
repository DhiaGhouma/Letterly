import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Download } from "lucide-react";
import { Link } from "react-router-dom";
import letterBot from "@/assets/letter-bot.png";

const Home = () => {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto text-center relative z-10"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect shadow-premium text-sm font-medium mb-8">
                            <Sparkles size={16} className="text-primary" />
                            <span>AI-Powered Cover Letters</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 text-balance leading-tight"
                    >
                        {t("heroTitle")}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
                    >
                        {t("heroSubtitle")}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/generate">
                            <Button size="lg" className="group shadow-premium dark:glow-golden font-semibold px-8">
                                {t("getStarted")}
                                <ArrowRight
                                    size={18}
                                    className="ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button
                                size="lg"
                                variant="outline"
                                className="glass-effect font-semibold px-8"
                            >
                                {t("learnMore")}
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Enhanced Hovering Bot with Shadow & Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        y: [0, -20, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.4 },
                        scale: { duration: 0.6, delay: 0.4 },
                        rotate: { duration: 0.6, delay: 0.4 },
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }
                    }}
                    whileHover={{
                        scale: 1.05,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                    }}
                    className="absolute right-4 lg:right-20 top-40 w-48 lg:w-64 hidden md:block cursor-pointer"
                    style={{
                        filter: "drop-shadow(0 20px 40px rgba(187, 161, 79, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
                    }}
                >
                    {/* Glowing background circle */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 -z-10 rounded-full blur-3xl"
                        style={{
                            background: "radial-gradient(circle, rgba(187, 161, 79, 0.4) 0%, transparent 70%)",
                        }}
                    />

                    {/* Bot Image */}
                    <motion.img
                        src={letterBot}
                        alt="Letterly Bot"
                        className="w-full h-auto relative z-10"
                        animate={{
                            filter: [
                                "drop-shadow(0 0 20px rgba(187, 161, 79, 0.4))",
                                "drop-shadow(0 0 30px rgba(187, 161, 79, 0.6))",
                                "drop-shadow(0 0 20px rgba(187, 161, 79, 0.4))",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Sparkle effects around bot */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-primary rounded-full"
                            style={{
                                top: `${20 + i * 30}%`,
                                left: `${10 + i * 20}%`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                            {t("howItWorks")}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FileText,
                                title: t("step1Title"),
                                desc: t("step1Desc"),
                                delay: 0,
                            },
                            {
                                icon: Sparkles,
                                title: t("step2Title"),
                                desc: t("step2Desc"),
                                delay: 0.2,
                            },
                            {
                                icon: Download,
                                title: t("step3Title"),
                                desc: t("step3Desc"),
                                delay: 0.4,
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: step.delay }}
                                className="glass-effect p-8 rounded-2xl shadow-premium hover:shadow-large transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <step.icon size={28} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;