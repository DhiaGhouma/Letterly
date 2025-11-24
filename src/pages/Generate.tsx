import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Sparkles, Copy, Download, Languages } from "lucide-react";
import { toast } from "sonner";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Generate = () => {
    const { t } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        postDescription: "",
        experience: "",
        skills: "",
        letterLanguage: "english",
    });

    const languageOptions = [
        { value: "english", label: "English" },
        { value: "french", label: "Français (French)" },
        { value: "spanish", label: "Español (Spanish)" },
        { value: "german", label: "Deutsch (German)" },
        { value: "italian", label: "Italiano (Italian)" },
        { value: "portuguese", label: "Português (Portuguese)" },
        { value: "arabic", label: "العربية (Arabic)" },
        { value: "chinese", label: "中文 (Chinese)" },
        { value: "japanese", label: "日本語 (Japanese)" },
    ];

    const getLanguageInstruction = (lang: string) => {
        const instructions: Record<string, string> = {
            english: "Write the cover letter in English.",
            french: "Write the cover letter in French (Français). Use proper French business letter etiquette.",
            spanish: "Write the cover letter in Spanish (Español). Use proper Spanish business letter etiquette.",
            german: "Write the cover letter in German (Deutsch). Use proper German business letter etiquette.",
            italian: "Write the cover letter in Italian (Italiano). Use proper Italian business letter etiquette.",
            portuguese: "Write the cover letter in Portuguese (Português). Use proper Portuguese business letter etiquette.",
            arabic: "Write the cover letter in Arabic (العربية). Use proper Arabic business letter etiquette and right-to-left formatting.",
            chinese: "Write the cover letter in Simplified Chinese (简体中文). Use proper Chinese business letter etiquette.",
            japanese: "Write the cover letter in Japanese (日本語). Use proper Japanese business letter etiquette.",
        };
        return instructions[lang] ?? instructions.english;
    };

    const generateCoverLetter = async () => {
        const prompt = `You are a professional cover letter writer. Create a compelling, personalized cover letter based on the following information:

Job Title: ${formData.jobTitle}
Company Name: ${formData.companyName}
${formData.postDescription ? `Job Description: ${formData.postDescription}` : ""}
${formData.experience ? `Candidate's Experience: ${formData.experience}` : ""}
${formData.skills ? `Key Skills: ${formData.skills}` : ""}

IMPORTANT: ${getLanguageInstruction(formData.letterLanguage)}

Write a professional cover letter that:
1. Has a strong opening that captures attention
2. Highlights relevant experience and skills
3. Shows enthusiasm for the role and company
4. Demonstrates knowledge of the company (if job description provided)
5. Includes a compelling closing statement
6. Is formatted professionally with proper paragraphs
7. Is between 250-400 words

Do not include placeholder text like [Your Name], [Your Address], or [Date]. Start directly with the salutation and end with "Sincerely," (or the appropriate closing in the target language) followed by a blank line for the signature.`;

        const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
        const URL = "https://api.groq.com/openai/v1/chat/completions";
        const MODEL = "llama-3.3-70b-versatile"; // Updated model

        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: MODEL,
                        messages: [
                            { role: "system", content: "You are a helpful assistant that writes business cover letters." },
                            { role: "user", content: prompt },
                        ],
                        temperature: 0.7,
                        max_tokens: 1024,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const content = data.choices?.[0]?.message?.content;
                    if (content) return content;
                    else throw new Error("No content in response");
                } else {
                    const errorBody = await response.text();
                    console.error("Groq API error:", response.status, errorBody);
                    if (response.status === 429) {
                        attempts++;
                        await delay(1000 * Math.pow(2, attempts));
                        continue;
                    }
                    throw new Error(`API error ${response.status}: ${errorBody}`);
                }
            } catch (err: any) {
                if (attempts >= maxAttempts - 1) throw err;
                attempts++;
                await delay(500 * attempts);
            }
        }

        throw new Error("Failed to generate after multiple attempts");
    };

    const handleSubmit = async () => {
        if (!formData.jobTitle || !formData.companyName) {
            toast.error("Please fill in all required fields");
            return;
        }
        setIsGenerating(true);
        setGeneratedLetter("");

        try {
            const letter = await generateCoverLetter();
            setGeneratedLetter(letter);
            toast.success("Cover letter generated successfully!");
        } catch (error: any) {
            console.error("Generation failed:", error);
            toast.error(error.message || "Failed to generate cover letter.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleLanguageChange = (value: string) => {
        setFormData({ ...formData, letterLanguage: value });
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter);
        toast.success("Copied to clipboard!");
    };
    const downloadAsText = () => {
        const a = document.createElement("a");
        const file = new Blob([generatedLetter], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = `cover-letter-${formData.jobTitle.replace(/\s+/g, "-").toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Downloaded successfully!");
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("generate")}</h1>
                    <p className="text-lg text-muted-foreground">Fill in the details below to create your perfect cover letter</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-effect p-8 rounded-2xl shadow-premium h-fit">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle" className="text-sm font-medium">{t("jobTitle")} *</Label>
                                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Senior Software Engineer" className="glass-effect border-border/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyName" className="text-sm font-medium">{t("companyName")} *</Label>
                                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g., Tech Corp Inc." className="glass-effect border-border/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="letterLanguage" className="text-sm font-medium flex items-center gap-2">
                                    <Languages size={16} /> Letter Language *
                                </Label>
                                <Select value={formData.letterLanguage} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="glass-effect border-border/50"><SelectValue placeholder="Select language" /></SelectTrigger>
                                    <SelectContent>
                                        {languageOptions.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postDescription" className="text-sm font-medium">Post Description</Label>
                                <Textarea id="postDescription" name="postDescription" value={formData.postDescription} onChange={handleChange} placeholder="Paste the job posting description here..." rows={4} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm font-medium">{t("yourExperience")}</Label>
                                <Textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="Describe your relevant work experience..." rows={4} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-sm font-medium">{t("skills")}</Label>
                                <Textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="List your key skills..." rows={3} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <Button onClick={handleSubmit} size="lg" disabled={isGenerating} className="w-full group shadow-premium dark:glow-golden font-semibold">
                                {isGenerating ? (
                                    <>
                                        <Sparkles className="mr-2 animate-spin" size={18} /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2" size={18} /> {t("generateLetter")}
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="glass-effect p-8 rounded-2xl shadow-premium">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold">Generated Letter</h2>
                            {generatedLetter && (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="glass-effect">
                                        <Copy size={16} className="mr-2" /> Copy
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={downloadAsText} className="glass-effect">
                                        <Download size={16} className="mr-2" /> Download
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="min-h-[500px]">
                            {isGenerating ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <Sparkles className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                                        <p className="text-muted-foreground">Crafting your perfect cover letter...</p>
                                    </div>
                                </div>
                            ) : generatedLetter ? (
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <pre className="whitespace-pre-wrap font-body text-foreground bg-transparent border-0 p-0">
                                        {generatedLetter}
                                    </pre>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-muted-foreground">
                                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Your generated cover letter will appear here</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Generate;
