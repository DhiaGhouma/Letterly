export type TemplateType = "minimal" | "modern" | "premium";

export interface Template {
    id: TemplateType;
    name: string;
    description: string;
    previewColor: string;
}

export const templates: Template[] = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean and simple, focusing on the content.",
        previewColor: "#ffffff",
    },
    {
        id: "modern",
        name: "Modern",
        description: "Contemporary design with a touch of style.",
        previewColor: "#f3f4f6",
    },
    {
        id: "premium",
        name: "Premium",
        description: "Elegant and sophisticated for high-level roles.",
        previewColor: "#1a1a1a",
    },
];
