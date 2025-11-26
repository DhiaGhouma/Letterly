Letterly – AI-Powered Cover Letter Generator

Letterly is a modern AI-powered web application that helps users create personalized, professional motivation letters in seconds.

Using intelligent text generation, Letterly adapts the tone, structure, and content based on the user’s job description, profile, experience, and selected language.
Designed with a premium black & gold aesthetic, Letterly offers a clean, modern, fast user experience.

✨ Features
AI-Generated Cover Letters

Generate highly personalized cover letters instantly from:

Job description

User experience

Key skills

Extra context (optional)

Multilingual Letter Generation

Create letters in multiple languages:

English

French

Arabic

…and more

Template Selection System (Premium UI)

Users can choose from multiple professional, visually distinct templates:

Minimal Classic

Framed Premium (gold cadres)

Modern Clean

Elegant Serif

Black & Gold Executive

Templates are:

Switchable instantly

Fully responsive

Designed to look premium

Optional Link + QR Code Generator

Add an optional field for:

GitHub

LinkedIn

Website

Portfolio

Custom URL

If a link is provided:

A QR code is generated on the frontend

Displayed inside the letter preview (top-right or bottom-right)

Included in PDF/DOCX exports
If no link is provided, no QR code appears.

Letter Download Options

Users can download their generated letter in:

PDF

DOCX

TXT

Export works with OR without templates.

Light / Dark Theme

Built-in modern theme switcher with:

Soft gradients

Premium gold glow effects

Smooth transitions

Responsive, Clean UI

Perfect experience on:

Desktop

Tablet

Mobile

Reusable Component System

Includes:

TemplateCard

Navigation

ThemeToggle

LanguageSwitch

Modal + Dialog

QR preview

Editor/Preview layout

Fast, Modern Frontend Stack

Powered by React + TypeScript + Vite for optimal development speed and performance.

📁 Project Structure
src/
  assets/                → Images & static assets
  components/
    ui/                  → UI components (Navigation, ThemeToggle, TemplateCard…)
    templates/           → All professional letter templates
  contexts/              → Language & Theme contexts
  hooks/                 → Custom hooks
  lib/                   → Utility functions (AI, QR, export…)
  pages/                 → Main pages (Home, Generate, About…)
  styles/                → Theme system (black & gold, gradients, effects)
  App.tsx                → Root component
  main.tsx               → App entry point

🚀 Installation & Setup
# Clone the repository
git clone https://github.com/your-username/letterly.git

# Navigate to project folder
cd letterly

# Install dependencies
npm install

# Start development server
npm run dev

🛠️ Technologies Used

• React

• TypeScript

• Vite

• TailwindCSS + custom premium design system

• OpenAI / LLM API for text generation

• qrcode (frontend QR generator)

• html2pdf.js / jsPDF for PDF export

• docx for DOCX export