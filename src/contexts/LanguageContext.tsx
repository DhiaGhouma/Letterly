import { createContext, useContext, useState } from "react";

export type Language = "en" | "fr" | "de" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: "Home",
        generate: "Generate Letter",
        about: "About",
        contact: "Contact",
        heroTitle: "Craft Perfect Cover Letters",
        heroSubtitle: "AI-powered cover letter generation that makes you stand out. Professional, tailored, and ready in seconds.",
        getStarted: "Get Started",
        learnMore: "Learn More",
        howItWorks: "How It Works",
        step1Title: "Enter Your Details",
        step1Desc: "Share your professional background and the job you're applying for.",
        step2Title: "AI Magic",
        step2Desc: "Our advanced AI analyzes and crafts a personalized cover letter.",
        step3Title: "Download & Apply",
        step3Desc: "Get your polished cover letter ready to send to employers.",
        aboutTitle: "About Letterly",
        aboutText: "Letterly is an AI-powered platform designed to help job seekers create compelling, professional cover letters in seconds. We combine cutting-edge AI technology with proven writing strategies to give you the competitive edge in your job search.",
        contactTitle: "Get in Touch",
        contactText: "Have questions or feedback? We'd love to hear from you.",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        jobTitle: "Job Title",
        companyName: "Company Name",
        yourExperience: "Your Experience",
        skills: "Key Skills",
        generateLetter: "Generate Cover Letter",
        downloading: "Generating...",
    },
    fr: {
        home: "Accueil",
        generate: "Générer une Lettre",
        about: "À Propos",
        contact: "Contact",
        heroTitle: "Créez des Lettres de Motivation Parfaites",
        heroSubtitle: "Génération de lettres de motivation alimentée par l'IA qui vous démarque. Professionnel, personnalisé et prêt en quelques secondes.",
        getStarted: "Commencer",
        learnMore: "En Savoir Plus",
        howItWorks: "Comment Ça Marche",
        step1Title: "Entrez Vos Détails",
        step1Desc: "Partagez votre parcours professionnel et l'emploi pour lequel vous postulez.",
        step2Title: "Magie de l'IA",
        step2Desc: "Notre IA avancée analyse et crée une lettre de motivation personnalisée.",
        step3Title: "Téléchargez et Postulez",
        step3Desc: "Obtenez votre lettre de motivation soignée prête à envoyer aux employeurs.",
        aboutTitle: "À Propos de Letterly",
        aboutText: "Letterly est une plateforme alimentée par l'IA conçue pour aider les chercheurs d'emploi à créer des lettres de motivation convaincantes et professionnelles en quelques secondes.",
        contactTitle: "Contactez-Nous",
        contactText: "Vous avez des questions ou des commentaires? Nous aimerions vous entendre.",
        name: "Nom",
        email: "Email",
        message: "Message",
        send: "Envoyer",
        jobTitle: "Titre du Poste",
        companyName: "Nom de l'Entreprise",
        yourExperience: "Votre Expérience",
        skills: "Compétences Clés",
        generateLetter: "Générer la Lettre",
        downloading: "Génération...",
    },
    de: {
        home: "Startseite",
        generate: "Brief Erstellen",
        about: "Über Uns",
        contact: "Kontakt",
        heroTitle: "Perfekte Bewerbungsschreiben Erstellen",
        heroSubtitle: "KI-gestützte Erstellung von Bewerbungsschreiben, die Sie hervorheben. Professionell, maßgeschneidert und in Sekunden fertig.",
        getStarted: "Loslegen",
        learnMore: "Mehr Erfahren",
        howItWorks: "Wie Es Funktioniert",
        step1Title: "Details Eingeben",
        step1Desc: "Teilen Sie Ihren beruflichen Hintergrund und die Stelle, auf die Sie sich bewerben.",
        step2Title: "KI-Magie",
        step2Desc: "Unsere fortschrittliche KI analysiert und erstellt ein personalisiertes Bewerbungsschreiben.",
        step3Title: "Herunterladen & Bewerben",
        step3Desc: "Erhalten Sie Ihr ausgefeiltes Bewerbungsschreiben bereit zum Versenden.",
        aboutTitle: "Über Letterly",
        aboutText: "Letterly ist eine KI-gestützte Plattform, die Arbeitssuchenden hilft, überzeugende, professionelle Bewerbungsschreiben in Sekunden zu erstellen.",
        contactTitle: "Kontaktieren Sie Uns",
        contactText: "Haben Sie Fragen oder Feedback? Wir würden gerne von Ihnen hören.",
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        send: "Nachricht Senden",
        jobTitle: "Berufsbezeichnung",
        companyName: "Firmenname",
        yourExperience: "Ihre Erfahrung",
        skills: "Wichtige Fähigkeiten",
        generateLetter: "Brief Generieren",
        downloading: "Wird Generiert...",
    },
    ar: {
        home: "الرئيسية",
        generate: "إنشاء خطاب",
        about: "عن المنصة",
        contact: "اتصل بنا",
        heroTitle: "اصنع خطابات تقديم مثالية",
        heroSubtitle: "إنشاء خطابات تقديم بالذكاء الاصطناعي تجعلك متميزاً. احترافي، مخصص، وجاهز في ثوانٍ.",
        getStarted: "ابدأ الآن",
        learnMore: "اعرف المزيد",
        howItWorks: "كيف يعمل",
        step1Title: "أدخل تفاصيلك",
        step1Desc: "شارك خلفيتك المهنية والوظيفة التي تتقدم لها.",
        step2Title: "سحر الذكاء الاصطناعي",
        step2Desc: "يقوم الذكاء الاصطناعي المتقدم بتحليل وصياغة خطاب تقديم مخصص.",
        step3Title: "حمّل وتقدّم",
        step3Desc: "احصل على خطاب التقديم المصقول جاهزاً للإرسال.",
        aboutTitle: "عن ليترلي",
        aboutText: "ليترلي هي منصة مدعومة بالذكاء الاصطناعي مصممة لمساعدة الباحثين عن عمل على إنشاء خطابات تقديم مقنعة واحترافية في ثوانٍ.",
        contactTitle: "تواصل معنا",
        contactText: "هل لديك أسئلة أو ملاحظات؟ نود أن نسمع منك.",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال",
        jobTitle: "المسمى الوظيفي",
        companyName: "اسم الشركة",
        yourExperience: "خبرتك",
        skills: "المهارات الأساسية",
        generateLetter: "إنشاء الخطاب",
        downloading: "جارٍ الإنشاء...",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};
