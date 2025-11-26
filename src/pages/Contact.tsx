import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import contactBot from "@/assets/contact-bot.png";

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error(t("fillAllFields"));
            return;
        }

        toast.success(t("messageSent"));
        setFormData({ name: "", email: "", message: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                        {t("contactTitle")}
                    </h1>
                    <p className="text-lg text-muted-foreground">{t("contactText")}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-effect p-8 rounded-2xl shadow-premium"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                {t("name")}
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="glass-effect border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                {t("email")}
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                className="glass-effect border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium">
                                {t("message")}
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your message here..."
                                rows={6}
                                required
                                className="glass-effect border-border/50 resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full group shadow-premium dark:glow-golden font-semibold"
                        >
                            <Send className="mr-2" size={18} />
                            {t("send")}
                        </Button>
                    </form>
                </motion.div>
            </div>

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
                    src={contactBot}
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

        </div>
    );
};

export default Contact;
