import { motion } from "framer-motion";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <motion.div
            className={`relative w-10 h-10 ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-0 bg-primary rounded-xl transform rotate-3 transition-transform duration-300 hover:rotate-6">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary-foreground font-display text-2xl font-bold italic">
                        L
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
