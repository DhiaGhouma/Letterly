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
                            title: "Our Mission",
                            desc: "Empower job seekers with AI technology to create compelling cover letters that get noticed.",
                        },
                        {
                            icon: Zap,
                            title: "Lightning Fast",
                            desc: "Generate professional cover letters in seconds, not hours. Save time and apply to more jobs.",
                        },
                        {
                            icon: Shield,
                            title: "Privacy First",
                            desc: "Your data is secure and private. We never share your information with third parties.",
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
                        Why Letterly?
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            In today's competitive job market, a well-crafted cover letter can
                            be the difference between landing an interview and being
                            overlooked. However, writing a compelling cover letter takes time,
                            effort, and expertise.
                        </p>
                        <p>
                            Letterly combines advanced AI technology with proven writing
                            strategies to help you create personalized, professional cover
                            letters in seconds. Our AI analyzes your experience, the job
                            requirements, and industry best practices to generate letters that
                            highlight your unique value proposition.
                        </p>
                        <p>
                            Whether you're a seasoned professional or just starting your
                            career, Letterly gives you the tools to present yourself in the
                            best possible light and increase your chances of landing your dream
                            job.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
