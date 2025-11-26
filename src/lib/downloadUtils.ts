import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { TemplateType } from "./templates";

export const downloadTXT = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const downloadPDF = (content: string, filename: string, template: TemplateType) => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(content, 170); // Slightly narrower for safety

    // --- Styles Setup ---

    // Executive
    if (template === "executive") {
        // Dark Header
        doc.setFillColor(26, 26, 26); // #1a1a1a
        doc.rect(0, 0, 210, 40, "F");
        // Gold Accent Line
        doc.setDrawColor(202, 138, 4); // yellow-600
        doc.setLineWidth(1);
        doc.line(0, 40, 210, 40);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
    }
    // Minimalist
    else if (template === "minimalist") {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(20, 20, 20);
    }
    // Prestige
    else if (template === "prestige") {
        // Double Border
        doc.setDrawColor(202, 138, 4); // yellow-600
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277); // Outer
        doc.rect(12, 12, 186, 273); // Inner

        doc.setFont("times", "roman");
        doc.setFontSize(12);
        doc.setTextColor(20, 20, 20);
    }
    // Modernist
    else if (template === "modernist") {
        // Side Bar
        doc.setFillColor(234, 179, 8); // yellow-500
        doc.rect(0, 0, 8, 297, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 70);
    }
    // Classic
    else if (template === "classic") {
        doc.setFont("times", "roman");
        doc.setFontSize(12);
        doc.setTextColor(10, 10, 10);

        // Top Separator
        doc.setDrawColor(50, 50, 50);
        doc.setLineWidth(0.5);
        doc.line(95, 25, 115, 25); // Centered small line
    }
    // Creative
    else if (template === "creative") {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);

        // Corner Accents
        doc.setDrawColor(234, 179, 8); // yellow-500
        doc.setLineWidth(1);
        // Top Left
        doc.line(15, 15, 35, 15);
        doc.line(15, 15, 15, 35);
        // Bottom Right
        doc.line(175, 282, 195, 282);
        doc.line(195, 262, 195, 282);
    }

    // --- Content Rendering ---

    let y = 30; // Default start
    let x = 20; // Default margin

    if (template === "executive") {
        y = 55; // Push down below header
    } else if (template === "modernist") {
        x = 25; // Push right for sidebar
    } else if (template === "classic") {
        y = 40;
    }

    doc.text(splitText, x, y);

    // Classic Bottom Separator
    if (template === "classic") {
        // Estimate end of text (rough calculation)
        const lines = splitText.length;
        const textHeight = lines * 5; // Approx height per line
        doc.line(95, y + textHeight + 10, 115, y + textHeight + 10);
    }

    doc.save(`${filename}.pdf`);
};

export const downloadDOCX = async (content: string, filename: string) => {
    const paragraphs = content.split("\n\n").map(text => new Paragraph({
        children: [new TextRun(text)],
        spacing: {
            after: 200,
        },
    }));

    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs,
        }],
    });

    const blob = await Packer.toBlob(doc);
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `${filename}.docx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
