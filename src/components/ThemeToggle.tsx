import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-effect hover:bg-primary/10 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon size={18} className="text-foreground" />
            ) : (
                <Sun size={18} className="text-foreground" />
            )}
        </motion.button>
    );
};
