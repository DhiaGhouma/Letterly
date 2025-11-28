import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles, Copy, Download, ChevronDown, Languages } from "lucide-react";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TemplateSelector } from "@/components/templates/TemplateSelector";
import { LetterPreview } from "@/components/templates/LetterPreview";
import { TemplateType } from "@/lib/templates";
import { downloadPDF, downloadDOCX, downloadTXT } from "@/lib/downloadUtils";
import { useLanguage } from "@/contexts/LanguageContext";

const Generate = () => {
    const { t } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("minimalist");
    const [formData, setFormData] = useState({
        fullName: "",
        link: "",
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
        const prompt = `You are an expert HR-focused cover letter writer. Create a concise, impactful cover letter that gets straight to the point and never use placeholders.

Job Title: ${formData.jobTitle}
Company Name: ${formData.companyName}
${formData.postDescription ? `Job Description: ${formData.postDescription}` : ""}
${formData.experience ? `Candidate's Experience: ${formData.experience}` : ""}
${formData.skills ? `Key Skills: ${formData.skills}` : ""}

LANGUAGE: ${getLanguageInstruction(formData.letterLanguage)}

REQUIREMENTS:
- Length: 200-300 words maximum (3-4 paragraphs)
- Opening: One powerful sentence stating the position and key value proposition
- Body: 1-2 paragraphs highlighting ONLY the most relevant achievements/skills with specific examples
- Closing: Brief, confident call to action
- Tone: Professional yet authentic, no fluff or generic statements
- Focus: What value the candidate brings, not what they want from the job

AVOID:
- Generic phrases like "I am writing to apply" or "I am excited about this opportunity"
- Repetition of resume content without context
- Unnecessary adjectives or filler words
- Long-winded explanations

FORMAT:
- No placeholders [Your Name], [Date], etc.
- Start with: Dear Hiring Manager, (or equivalent in target language)
- End with: Best regards, (or equivalent in target language)
- Use short, punchy paragraphs

Make every sentence count. HR managers spend 6-10 seconds scanning - make those seconds matter.`;

        const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
        const URL = "https://api.groq.com/openai/v1/chat/completions";
        const MODEL = "llama-3.3-70b-versatile";

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
                            { role: "system", content: "You are an expert cover letter writer who creates concise, impactful letters optimized for HR professionals. You focus on value proposition and avoid generic filler." },
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
            toast.error(t("errorFillRequired"));
            return;
        }
        setIsGenerating(true);
        setGeneratedLetter("");

        try {
            const letter = await generateCoverLetter();
            setGeneratedLetter(letter);
            toast.success(t("successGenerated"));
        } catch (error: any) {
            console.error("Generation failed:", error);
            toast.error(error.message || t("errorGenerationFailed"));
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
        toast.success(t("successCopied"));
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{t("generate")}</h1>
                    <p className="text-lg text-muted-foreground">{t("fillDetails")}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-effect p-8 rounded-2xl shadow-premium h-fit">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium">{t("fullName")}</Label>
                                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g., John Doe" className="glass-effect border-border/50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link" className="text-sm font-medium">{t("linkOptional")}</Label>
                                <Input id="link" name="link" value={formData.link} onChange={handleChange} placeholder="e.g., GitHub, LinkedIn, Portfolio..." className="glass-effect border-border/50" />
                            </div>

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
                                    <Languages size={16} /> {t("letterLanguage")} *
                                </Label>
                                <Select value={formData.letterLanguage} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="glass-effect border-border/50"><SelectValue placeholder={t("selectLanguage")} /></SelectTrigger>
                                    <SelectContent>
                                        {languageOptions.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postDescription" className="text-sm font-medium">{t("postDescription")}</Label>
                                <Textarea id="postDescription" name="postDescription" value={formData.postDescription} onChange={handleChange} placeholder={t("pasteJobDescription")} rows={4} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm font-medium">{t("yourExperience")}</Label>
                                <Textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder={t("describeExperience")} rows={4} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-sm font-medium">{t("skills")}</Label>
                                <Textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder={t("listSkills")} rows={3} className="glass-effect border-border/50 resize-none" />
                            </div>

                            <Button onClick={handleSubmit} size="lg" disabled={isGenerating} className="w-full group shadow-premium dark:glow-golden font-semibold">
                                {isGenerating ? (
                                    <>
                                        <Sparkles className="mr-2 animate-spin" size={18} /> {t("generating")}
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
                            <h2 className="text-2xl font-display font-bold">{t("generatedLetterHeader")}</h2>
                            {generatedLetter && (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="glass-effect">
                                        <Copy size={16} className="mr-2" /> {t("copy")}
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="glass-effect">
                                                <Download size={16} className="mr-2" /> {t("download")} <ChevronDown size={14} className="ml-1" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => downloadPDF(generatedLetter, `cover-letter-${formData.jobTitle}`, selectedTemplate, formData.fullName, formData.link)}>
                                                {t("downloadPDF")}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => downloadDOCX(generatedLetter, `cover-letter-${formData.jobTitle}`, formData.fullName, formData.link)}>
                                                {t("downloadDOCX")}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => downloadTXT(generatedLetter, `cover-letter-${formData.jobTitle}`, formData.fullName)}>
                                                {t("downloadTXT")}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                        </div>

                        <div className="min-h-[500px]">
                            {isGenerating ? (
                                <div className="flex items-center justify-center h-full min-h-[500px]">
                                    <div className="text-center">
                                        <Sparkles className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                                        <p className="text-muted-foreground">{t("crafting")}</p>
                                    </div>
                                </div>
                            ) : generatedLetter ? (
                                <div className="animate-in fade-in duration-500">
                                    <TemplateSelector
                                        selectedTemplate={selectedTemplate}
                                        onSelectTemplate={setSelectedTemplate}
                                    />
                                    <LetterPreview
                                        content={generatedLetter}
                                        template={selectedTemplate}
                                        authorName={formData.fullName}
                                        link={formData.link}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full min-h-[500px]">
                                    <div className="text-center text-muted-foreground">
                                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>{t("willAppear")}</p>
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