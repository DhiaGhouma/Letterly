import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Generate = () => {
    const { t } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        postDescription: "",
        experience: "",
        skills: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.jobTitle || !formData.companyName) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsGenerating(true);

        // Simulate AI generation
        setTimeout(() => {
            setIsGenerating(false);
            toast.success("Cover letter generated successfully!");
        }, 2000);
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
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                        {t("generate")}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Fill in the details below to create your perfect cover letter
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-effect p-8 rounded-2xl shadow-premium"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-sm font-medium">
                                {t("jobTitle")} *
                            </Label>
                            <Input
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g., Senior Software Engineer"
                                required
                                className="glass-effect border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-sm font-medium">
                                {t("companyName")} *
                            </Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="e.g., Tech Corp Inc."
                                required
                                className="glass-effect border-border/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postDescription" className="text-sm font-medium">
                                Post Description
                            </Label>
                            <Textarea
                                id="postDescription"
                                name="postDescription"
                                value={formData.postDescription}
                                onChange={handleChange}
                                placeholder="Paste the job posting description here..."
                                rows={4}
                                className="glass-effect border-border/50 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="experience" className="text-sm font-medium">
                                {t("yourExperience")}
                            </Label>
                            <Textarea
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Describe your relevant work experience..."
                                rows={4}
                                className="glass-effect border-border/50 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills" className="text-sm font-medium">
                                {t("skills")}
                            </Label>
                            <Textarea
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="List your key skills..."
                                rows={3}
                                className="glass-effect border-border/50 resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={isGenerating}
                            className="w-full group shadow-premium dark:glow-green font-semibold"
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles className="mr-2 animate-spin" size={18} />
                                    {t("downloading")}
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2" size={18} />
                                    {t("generateLetter")}
                                </>
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Generate;
