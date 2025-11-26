import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { TemplateType } from "./templates";
import QRCode from "qrcode";

export const downloadTXT = (content: string, filename: string, authorName?: string) => {
    const element = document.createElement("a");
    const fullContent = authorName ? `${content}\n\n${authorName}` : content;
    const file = new Blob([fullContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const downloadPDF = async (content: string, filename: string, template: TemplateType, authorName?: string, link?: string) => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(content, 170); // Slightly narrower for safety

    // --- Styles Setup ---

    // Executive
    if (template === "executive") {
        // Dark Header
        doc.setFillColor(26, 26, 26); // #1a1a1a
        doc.rect(0, 0, 210, 50, "F"); // Increased height to 50
        // Gold Accent Line
        doc.setDrawColor(202, 138, 4); // yellow-600
        doc.setLineWidth(1);
        doc.line(0, 50, 210, 50);

        // Name in Header
        if (authorName) {
            doc.setFont("times", "bold");
            doc.setFontSize(22);
            doc.setTextColor(255, 255, 255);
            doc.text(authorName.toUpperCase(), 20, 40);
        }

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
        y = 70; // Push down below header
    } else if (template === "modernist") {
        x = 25; // Push right for sidebar
    } else if (template === "classic") {
        y = 40;
    }

    doc.text(splitText, x, y);

    // Signature / Name at bottom
    if (authorName) {
        // Calculate Y position for signature based on text length
        const lines = splitText.length;
        const lineHeight = template === "executive" || template === "classic" || template === "prestige" ? 6 : 5; // Approx line height
        let signatureY = y + (lines * lineHeight) + 20;

        // Ensure signature doesn't go off page (basic check)
        if (signatureY > 270) {
            doc.addPage();
            signatureY = 40;
        }

        if (template === "executive") {
            doc.setFont("times", "bold");
            doc.setFontSize(14);
            doc.setTextColor(30, 30, 30);
            doc.text(authorName, x, signatureY);
            doc.setLineWidth(0.5);
            doc.setDrawColor(200, 200, 200);
            doc.line(x, signatureY - 8, x + 60, signatureY - 8); // Signature line
        } else if (template === "classic") {
            doc.setFont("times", "italic");
            doc.setFontSize(14);
            doc.text(authorName, 105, signatureY, { align: "center" });
            doc.setLineWidth(0.5);
            doc.setDrawColor(200, 200, 200);
            doc.line(85, signatureY - 8, 125, signatureY - 8); // Centered line
        } else {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(authorName, x, signatureY);
        }
    }

    // Classic Bottom Separator (if no name, or below name)
    if (template === "classic" && !authorName) {
        // Estimate end of text (rough calculation)
        const lines = splitText.length;
        const textHeight = lines * 5; // Approx height per line
        doc.line(95, y + textHeight + 10, 115, y + textHeight + 10);
    }

    // QR Code
    if (link) {
        try {
            const qrDataUrl = await QRCode.toDataURL(link, {
                width: 100,
                margin: 1,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            });

            // Add QR Code to PDF
            // Position top right
            doc.addImage(qrDataUrl, 'PNG', 170, 10, 25, 25);

            // Gold border for QR
            doc.setDrawColor(234, 179, 8); // yellow-500
            doc.setLineWidth(0.5);
            doc.rect(170, 10, 25, 25);

        } catch (err) {
            console.error("Failed to generate QR for PDF", err);
        }
    }

    doc.save(`${filename}.pdf`);
};

export const downloadDOCX = async (content: string, filename: string, authorName?: string, link?: string) => {
    const children: any[] = [];

    // QR Code (if link exists)
    if (link) {
        try {
            const qrDataUrl = await QRCode.toDataURL(link, {
                width: 100,
                margin: 1,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            });

            // Convert data URL to buffer/blob for docx
            const response = await fetch(qrDataUrl);
            const blob = await response.blob();
            const buffer = await blob.arrayBuffer();

            children.push(new Paragraph({
                children: [
                    new ImageRun({
                        data: buffer,
                        transformation: {
                            width: 100,
                            height: 100,
                        },
                        type: "png",
                    }),
                ],
                alignment: "right", // Align QR to right
            }));
        } catch (err) {
            console.error("Failed to generate QR for DOCX", err);
        }
    }

    // Content Paragraphs
    const paragraphs = content.split("\n\n").map(text => new Paragraph({
        children: [new TextRun(text)],
        spacing: {
            after: 200,
        },
    }));
    children.push(...paragraphs);

    // Signature
    if (authorName) {
        children.push(new Paragraph({
            children: [new TextRun({ text: authorName, bold: true })],
            spacing: { before: 400 },
        }));
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: children,
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
