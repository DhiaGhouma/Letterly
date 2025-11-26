import { Template, templates, TemplateType } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
    selectedTemplate: TemplateType;
    onSelectTemplate: (template: TemplateType) => void;
}

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {templates.map((template) => (
                <button
                    key={template.id}
                    onClick={() => onSelectTemplate(template.id)}
                    className={cn(
                        "relative group p-4 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-md",
                        selectedTemplate === template.id
                            ? "border-primary bg-primary/5 shadow-premium"
                            : "border-border/50 hover:border-primary/50 bg-card/50"
                    )}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
                            selectedTemplate === template.id ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"
                        )}>
                            {template.name[0]}
                        </div>
                        {selectedTemplate === template.id && (
                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check size={12} />
                            </div>
                        )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                </button>
            ))}
        </div>
    );
};
