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
    const splitText = doc.splitTextToSize(content, 180);

    // Simple styling based on template
    if (template === "minimal") {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
    } else if (template === "modern") {
        doc.setFont("helvetica", "normal"); // jsPDF has limited fonts by default
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 70);
        // Add a colored bar
        doc.setFillColor(37, 99, 235); // Blue
        doc.rect(0, 0, 10, 297, "F");
    } else if (template === "premium") {
        doc.setFont("times", "roman");
        doc.setFontSize(12);
        doc.setTextColor(20, 20, 20);
    }

    let y = 20;
    if (template === "modern") {
        doc.text(splitText, 25, y);
    } else {
        doc.text(splitText, 15, y);
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
