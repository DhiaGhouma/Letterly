import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Zap, Shield } from "lucide-react";

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
                        {t("aboutTitle")}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t("aboutText")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: Target,
                            title: t("ourMission"),
                            desc: t("missionDesc"),
                        },
                        {
                            icon: Zap,
                            title: t("lightningFast"),
                            desc: t("fastDesc"),
                        },
                        {
                            icon: Shield,
                            title: t("privacyFirst"),
                            desc: t("privacyDesc"),
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-effect p-6 rounded-2xl shadow-premium text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <feature.icon size={24} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-display font-bold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-effect p-8 sm:p-12 rounded-2xl shadow-premium"
                >
                    <h2 className="text-3xl font-display font-bold mb-6">
                        {t("whyLetterly")}
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            {t("whyText1")}
                        </p>
                        <p>
                            {t("whyText2")}
                        </p>
                        <p>
                            {t("whyText3")}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
