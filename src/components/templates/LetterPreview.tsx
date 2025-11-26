import { TemplateType } from "@/lib/templates";
import { cn } from "@/lib/utils";

interface LetterPreviewProps {
    content: string;
    template: TemplateType;
}

export const LetterPreview = ({ content, template }: LetterPreviewProps) => {
    // Simple parser to handle paragraphs
    const paragraphs = content.split("\n\n").filter(Boolean);

    return (
        <div className={cn(
            "w-full min-h-[600px] p-8 md:p-12 rounded-lg shadow-sm transition-all duration-500",
            template === "minimal" && "bg-white text-gray-900 font-sans",
            template === "modern" && "bg-slate-50 text-slate-800 font-sans border-l-8 border-blue-600",
            template === "premium" && "bg-[#1a1a1a] text-gray-100 font-serif border border-gold-500/20"
        )}>
            <div className={cn(
                "max-w-2xl mx-auto space-y-6 text-base leading-relaxed",
                template === "minimal" && "text-gray-800",
                template === "modern" && "text-slate-700",
                template === "premium" && "text-gray-300"
            )}>
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
            </div>
        </div>
    );
};
