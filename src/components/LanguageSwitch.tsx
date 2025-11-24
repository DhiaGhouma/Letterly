import { useLanguage, Language } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
];

export const LanguageSwitch = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg glass-effect hover:bg-primary/10 transition-colors"
                    aria-label="Change language"
                >
                    <Globe size={18} className="text-foreground" />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect bg-background-secondary z-[100]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary" : ""
                            }`}
                    >
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
