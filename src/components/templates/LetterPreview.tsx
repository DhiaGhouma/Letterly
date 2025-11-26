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
            "w-full min-h-[800px] p-8 md:p-16 rounded-lg shadow-sm transition-all duration-500 relative overflow-hidden",
            // Base styles
            "text-base leading-relaxed",

            // Minimalist
            template === "minimalist" && "bg-white text-gray-900 font-sans",

            // Executive
            template === "executive" && "bg-white text-gray-900 font-sans",

            // Prestige
            template === "prestige" && "bg-[#fcfcfc] text-gray-800 font-serif",

            // Modernist
            template === "modernist" && "bg-[#f8f9fa] text-slate-800 font-sans",

            // Classic
            template === "classic" && "bg-[#fffbf0] text-gray-900 font-serif",

            // Creative
            template === "creative" && "bg-white text-gray-800 font-sans"
        )}>
            {/* Executive Header Background */}
            {template === "executive" && (
                <div className="absolute top-0 left-0 right-0 h-32 bg-[#1a1a1a] border-b-4 border-yellow-600/80" />
            )}

            {/* Prestige Border */}
            {template === "prestige" && (
                <div className="absolute inset-4 border double-border border-yellow-600/30 pointer-events-none" style={{ borderWidth: "4px" }} />
            )}

            {/* Modernist Sidebar */}
            {template === "modernist" && (
                <div className="absolute top-0 bottom-0 left-0 w-2 bg-yellow-500" />
            )}

            {/* Creative Corners */}
            {template === "creative" && (
                <>
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-yellow-500" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-yellow-500" />
                </>
            )}

            <div className={cn(
                "relative z-10 max-w-2xl mx-auto space-y-6",
                template === "executive" && "mt-12", // Push content down for header
                template === "classic" && "text-center", // Center text for classic
                template === "minimalist" && "max-w-3xl", // Wider for minimalist
            )}>
                {/* Classic Separator */}
                {template === "classic" && (
                    <div className="w-24 h-1 bg-gray-900 mx-auto mb-8 opacity-20" />
                )}

                {paragraphs.map((paragraph, index) => (
                    <p key={index} className={cn(
                        "whitespace-pre-wrap",
                        template === "classic" && "text-justify", // Justify text for classic
                        template === "executive" && index === 0 && "text-lg font-medium text-gray-800", // Emphasize first paragraph in executive
                    )}>{paragraph}</p>
                ))}

                {/* Classic Bottom Separator */}
                {template === "classic" && (
                    <div className="w-24 h-1 bg-gray-900 mx-auto mt-12 opacity-20" />
                )}
            </div>
        </div>
    );
};
