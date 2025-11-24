import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { path: "/", label: t("home") },
        { path: "/generate", label: t("generate") },
        { path: "/about", label: t("about") },
        { path: "/contact", label: t("contact") },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <Logo />
                        <span className="font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            Letterly
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors relative ${location.pathname === link.path
                                        ? "text-primary"
                                        : "text-foreground hover:text-primary"
                                    }`}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitch />
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden py-4 border-t border-border/50"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${location.pathname === link.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground hover:bg-muted"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
};
