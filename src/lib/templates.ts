export type TemplateType = "executive" | "minimalist" | "prestige" | "modernist" | "classic" | "creative";

export interface Template {
    id: TemplateType;
    name: string;
    description: string;
    previewColor: string;
}

export const templates: Template[] = [
    {
        id: "executive",
        name: "Executive",
        description: "Bold dark header with gold accents. Authoritative and professional.",
        previewColor: "#1a1a1a",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        description: "Ultra-clean layout with refined typography and ample whitespace.",
        previewColor: "#ffffff",
    },
    {
        id: "prestige",
        name: "Prestige",
        description: "Sophisticated double-border frame for high-end applications.",
        previewColor: "#fcfcfc",
    },
    {
        id: "modernist",
        name: "Modernist",
        description: "Contemporary design with a striking gold accent bar.",
        previewColor: "#f8f9fa",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Timeless serif typography with centered elegance.",
        previewColor: "#fffbf0",
    },
    {
        id: "creative",
        name: "Creative",
        description: "Unique corner accents for a distinctive, modern look.",
        previewColor: "#ffffff",
    },
];
