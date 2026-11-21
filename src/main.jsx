import React, { useState, useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, X, FileText, Copy, Check,
  BrainCircuit, Database, Eye, Users, FileSearch, Sparkles, Code2, Workflow, ShieldCheck
} from "lucide-react";
import "./styles.css";
import { UI, FR, LangCtx } from "./i18n.jsx";

const EMAIL = "kennaifer@gmail.com";
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Hello Khadija")}`;
const GITHUB = "https://github.com/Khadijaenn";
const LINKEDIN = "https://www.linkedin.com/in/khadija-ennaifer/";
const CV_URL = "cv.pdf"; // put your CV in /public/cv.pdf (or set to null to hide the button)

const projects = [
  {
    number: "01",
    type: "CURRENT FOCUS · APPLIED AI",
    title: "RAG for Aviation Maintenance",
    description: "Designing a retrieval-augmented generation system that delivers relevant, traceable answers from large and heterogeneous maintenance documentation, with retrieval strategies compared using metrics.",
    tags: ["RAG", "LLMs", "Information Retrieval", "Python"],
    note: "Thesis internship · Airbus · 2026",
    icon: BrainCircuit,
    featured: true,
    details: {
      problem: "Maintenance documentation is large, varied in format and constantly updated. Finding the right passage quickly, and being able to trust and trace the answer, is hard.",
      approach: ["Retrieval-augmented generation over large, heterogeneous technical documentation", "Answers designed to be relevant and traceable to their source", "Alternative retrieval strategies compared using retrieval metrics", "Generated answers evaluated on relevance, faithfulness and usefulness", "Design-science approach combined with experimental evaluation"],
      results: [],
      disclaimer: "Described at a high level. Details of this work are internal to Airbus and not shared publicly."
    }
  },
  {
    number: "02",
    type: "DOCUMENT INTELLIGENCE",
    title: "Invoice Intelligence",
    description: "An end-to-end, fully on-premise invoice processing system: OCR plus a locally hosted, fine-tuned LLaMA model extract 6 key fields from invoices, with a manual review interface.",
    tags: ["PaddleOCR", "Tesseract", "EasyOCR", "LLaMA", "Flask"],
    note: "Welyne · 2025",
    repo: "https://github.com/Khadijaenn/Invoice-Extraction-Project",
    icon: FileSearch,
    details: {
      problem: "Invoices come in many layouts and contain sensitive data, so extraction had to be accurate and run without any external API.",
      approach: ["OCR with PaddleOCR, Tesseract and EasyOCR to read the documents", "A locally hosted, fine-tuned LLaMA model extracts seller, buyer, total amount, currency, addresses and IBAN", "Regex fallback layer and batch processing for robustness", "Flask web application with database storage and a manual review interface", "Validated on real client invoices"],
      results: ["Used successfully on real client invoices"]
    }
  },
  {
    number: "03",
    type: "UNSUPERVISED LEARNING",
    title: "Airline Customer Segmentation",
    description: "Segmented an airline's customer base into 6 behavioural and value-based profiles, then proposed a tailored marketing strategy for each to improve retention and loyalty.",
    tags: ["K-Means", "HDBSCAN", "GMM", "Autoencoders", "Streamlit"],
    note: "Group project · Best project 20/20 · 2026",
    repo: "https://github.com/barbara-sousa-franco/Data-Mining-Project",
    demo: "https://data-mining-project-sqywcswdyuxvbewkvh7uvu.streamlit.app/Value_Based_Segmentation",
    icon: Users,
    details: {
      problem: "Understand an airline's customers well enough to target retention and loyalty actions, instead of treating everyone the same.",
      approach: ["Two perspectives on the customer: value-based and behavioural", "Preprocessing: outlier handling (DBSCAN, capping), feature engineering, scaling", "Compared K-Means, Hierarchical, Mean-Shift, HDBSCAN, GMM, SOM and Autoencoders", "Merged the best solutions into final customer segments and profiled them", "Personalised marketing recommendations for each segment", "Streamlit dashboard to explore the results"],
      results: ["6 customer segments, from \"Jet Lag Legends\" (loyal, high-value) to \"Ghost Passengers\" (at risk of churn)", "K-Means, SOM and Autoencoders gave the best balance of separation, stability and interpretability", "Awarded best project (20/20)"]
    }
  },
  {
    number: "04",
    type: "COMPUTER VISION",
    title: "WikiArt — Painting Classification",
    description: "A deep-learning workflow to classify paintings by artist, from preprocessing and a baseline to transfer learning with DenseNet-121, EfficientNet and Vision Transformer.",
    tags: ["TensorFlow", "DenseNet-121", "EfficientNet", "ViT"],
    note: "Group project · NOVA IMS · 2026 · 13,340 images, 23 artists",
    repo: "https://github.com/mohammadjalali/novaims_deeplearning_project",
    icon: Eye,
    details: {
      problem: "Recognise the artist behind a painting across 23 artists and 13,340 images.",
      approach: ["Preprocessing and a baseline model", "Transfer learning with DenseNet-121, EfficientNet and Vision Transformer (ViT)", "Reusable evaluation utilities (training curves, confusion matrix, classification report) packaged as a Python module"],
      results: []
    }
  },
  {
    number: "05",
    type: "NATURAL LANGUAGE PROCESSING",
    title: "Twitter Sentiment Analysis",
    description: "Fine-tuned a transformer model for sentiment classification and evaluated its performance using validation accuracy and macro F1-score.",
    tags: ["Python", "NLP", "Transformers", "RoBERTa"],
    note: "Academic project",
    icon: Sparkles,
    details: {
      problem: "Classify the sentiment of short, noisy social-media text.",
      approach: ["Fine-tuned a RoBERTa transformer for sentiment classification", "Evaluated with validation accuracy and macro F1-score"],
      results: []
    }
  },
  {
    number: "06",
    type: "MACHINE LEARNING · MLOPS",
    title: "Rainfall Prediction",
    description: "Built an end-to-end machine-learning workflow, from data preparation and experiment tracking to model evaluation and API deployment.",
    tags: ["Kedro", "XGBoost", "MLflow", "FastAPI"],
    note: "Australia weather dataset",
    icon: Workflow,
    details: {
      problem: "Predict rainfall from the Australian weather dataset, with a workflow that is reproducible end to end.",
      approach: ["Kedro pipeline for data preparation and training", "XGBoost for modelling", "MLflow for experiment tracking", "FastAPI to serve the model"],
      results: []
    }
  },
  {
    number: "07",
    type: "BUSINESS INTELLIGENCE · COST & PERFORMANCE",
    title: "Snowflake Monitoring & Cost Optimization",
    description: "A Power BI monitoring tool and optimization work that helped administrators cut the Snowflake budget by about 30% and manage access for a team of 10.",
    tags: ["Snowflake", "Power BI", "DAX", "SQL", "Stored Procedures"],
    note: "BI4YOU · 2024–2025",
    repo: "https://github.com/Khadijaenn/Khadijaenn-performance-analyzation-in-Snowflake",
    icon: Database,
    details: {
      problem: "Give administrators clear visibility on who uses what, what it costs and which queries are slow, beyond the limited native Snowflake views, and act on it.",
      approach: ["SQL views on SNOWFLAKE.ACCOUNT_USAGE in a dedicated database, exposing query type, warehouse and size, duration, credits, user and status", "4-page Power BI dashboard: data model, relationships, DAX measures, filters by period, user, warehouse and status", "An interface centralizing the Power BI reports and the analyses, built to support administrators’ decisions", "Optimization with administrators: query rewrites, warehouse sizing and auto-suspend, clustering, resource monitors", "Roles, users and access rights for a team of 10 (BI consultants, IT, developers), with usage tracked per employee", "Ongoing maintenance: stored procedures, reusable Power BI template (.pbit), functional documentation"],
      results: ["About 30% reduction in the Snowflake budget", "Access and usage managed for a team of 10 users", "Prototype analysis: about 9,400 queries over 6 weeks; SHOW and SELECT about 66% of volume"]
    }
  },
  {
    number: "08",
    type: "BI · DATA ENGINEERING · ML",
    title: "Delivery Tracking BI & Prediction",
    description: "An end-to-end BI solution: 3 Excel sources consolidated in a MySQL data warehouse, an 8-page Power BI dashboard, two predictive models and a web interface.",
    tags: ["MySQL", "Python", "Power BI", "XGBoost"],
    note: "Systra Dubai · End-of-studies project · 2024",
    icon: Workflow,
    details: {
      problem: "Document deliveries on engineering projects were tracked in scattered Excel files: time-consuming, hard to customize, with limited visualization and no way to anticipate delays.",
      approach: ["Consolidated 3 Excel sources (about 5,200 documents) into a MySQL warehouse with a Kimball dimensional model, using an automated Python ETL (pandas, SQLAlchemy)", "8-page Power BI dashboard: average delay, schedule performance index (SPI), progress %, submitted, approved and late documents", "Predictive models (CRISP-DM): delivery status classification and delay-days regression", "Web interface with authentication giving access to the dashboard and the prediction forms"],
      results: ["Delivery status: XGBoost reached 84.7% accuracy (logistic regression 79.9%)", "Delay in days: Random Forest MAE of 3.96 days (linear regression 5.43)"],
      disclaimer: "End-of-studies project at Systra Dubai. The code and data are not public."
    }
  },
  {
    number: "09",
    type: "BIM QUALITY CONTROL · BI",
    title: "eLODy — BIM Quality Dashboard",
    description: "A Power BI dashboard on the quality-control results of eLODy, a tool that checks BIM (IFC) models, built on an ACC test dataset.",
    tags: ["Power BI", "BIM / IFC", "Excel", "Data quality"],
    note: "Systra Dubai · 2024 · ACC test data",
    icon: ShieldCheck,
    details: {
      problem: "eLODy checks BIM models, but the team needed a global view of the results and a clear idea of which data to capture, and how.",
      approach: ["Used eLODy’s detailed Excel KPI exports to define the information needed for global dashboarding", "3-page Power BI dashboard: navigation, overview, error classification details", "Tracked validated, non-validated and unclassified objects, file name, property and IFC errors, and available (249) vs. used (22) classifications", "Compared two ways of capturing the data: directly in eLODy or from Excel files"],
      results: ["273,000 BIM objects and 3.26 million checks analyzed on the test dataset", "Single analytical view of the results: recurring anomalies, BIM compliance and priority corrective actions made visible to project teams", "Errors down by 17% afterwards"],
      disclaimer: "Internal Systra work, shown here with test data only. The code is not public."
    }
  }
];

const experiences = [
  { date: "OCT 2026 — PRESENT", role: "Data Science & AI Intern", company: "Airbus · Lisbon, Portugal",
    bullets: ["Designing and implementing a Retrieval-Augmented Generation (RAG) system that delivers relevant, traceable answers from large, heterogeneous aviation maintenance documentation.", "Comparing retrieval strategies with information retrieval metrics, and evaluating generated answers on relevance, faithfulness and usefulness.", "Applying a design-science approach combined with experimental evaluation."],
    skills: "Python · LLMs · RAG · NLP · Information retrieval" },
  { date: "JUN 2025 — DEC 2025", role: "Data Scientist, AI (Fixed-Term Contract)", company: "Welyne · Tunisia, then remote from Portugal",
    bullets: ["Designed and deployed an automated invoice extraction system (PDF, JPG, PNG): OCR (PaddleOCR, Tesseract, EasyOCR), text preprocessing, then a locally hosted, fine-tuned LLaMA model returning structured JSON with 6 fields (seller, buyer, total amount, currency, addresses, IBAN).", "Added a regex fallback and batch processing; fully on-premise (no external API) to protect clients’ financial data.", "Built a Flask app (Bootstrap) with database storage (SQLite / PostgreSQL) and a manual review interface, used on real client invoices."],
    skills: "Python · LLM fine-tuning · NLP · OCR · Flask" },
  { date: "JUN 2024 — MAY 2025", role: "Data Science & AI Consultant (Permanent Contract)", company: "BI4YOU · Tunisia",
    bullets: ["Designed end to end a Snowflake monitoring tool for administrators: SQL views on SNOWFLAKE.ACCOUNT_USAGE, data model and a 4-page Power BI dashboard (DAX measures, filters by period, user, warehouse and status).", "Built an interface centralizing the Power BI reports and the performance and cost analyses, to support administrators’ decisions (budget, resources, optimizations).", "Cut the Snowflake budget by about 30%: identified the slowest and costliest queries and warehouses, then optimized with administrators (query rewrites, warehouse sizing and auto-suspend, clustering, resource monitors).", "Managed access and tracked usage for a team of 10 users (BI consultants, IT, developers): roles, permissions, queries, duration and credits per user, warehouse and database.", "Maintained and evolved the tool: automated monitoring with stored procedures, a reusable Power BI template (.pbit) and functional documentation; contributed to decision-support and digital transformation initiatives."],
    skills: "Snowflake · SQL · Query optimization · Access management · Power BI · DAX" },
  { date: "FEB 2024 — JUN 2024", role: "Business Intelligence Intern (End-of-Studies Internship)", company: "Systra Dubai · United Arab Emirates",
    bullets: ["Consolidated 3 Excel sources (about 5,200 documents) into a MySQL data warehouse (Kimball model) through an automated Python ETL, to track engineering document deliveries.", "Built an 8-page Power BI dashboard: average delay, schedule performance index (SPI), progress %, submitted, approved and late documents.", "Developed predictive models: delivery status (XGBoost, 84.7% accuracy) and delay in days (Random Forest, MAE of 3.96 days), deployed through a web interface with authentication.", "Built a Power BI quality-control dashboard for BIM models (eLODy, ACC test data)."],
    skills: "Python · MySQL · Dimensional modeling · Power BI · XGBoost" },
  { date: "MAY 2023 — AUG 2023", role: "Business Intelligence Intern", company: "Systra Dubai · United Arab Emirates",
    bullets: ["Cleaned and extracted unstructured data (Excel, PDF, plans) on thousands of SYSTRA bridges through an ETL pipeline (collection, extraction, cleaning, transformation) into a MySQL database.", "Contributed to AiSYSTance, an internal tool combining databases and AI to recommend solutions to engineers in bridge design: worked within a team on the AI algorithm and built the web interface (search and filters) cataloguing past projects.", "Built Power BI dashboards (DAX) for the department head and his manager (live bridge project, team workload) to save time and give a clear view."],
    skills: "Python · MySQL · ETL · Power BI · DAX · HTML / CSS / JS" },
  { date: "2023 — 2025", role: "Volunteer Instructor, English & Computer Science", company: "Seif Center · Tunisia", bullets: [] }
];

const skillGroups = [
  { label: "AI & MACHINE LEARNING", items: ["LLM Fine-tuning", "RAG", "NLP", "OCR", "Deep Learning", "Computer Vision", "Azure AI", "GCP", "Transformers", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"] },
  { label: "DATA & DATABASES", items: ["SQL / Oracle", "MySQL", "MongoDB", "Snowflake", "ETL", "Data Modeling", "Data Warehousing", "Data Mining"] },
  { label: "BI & VISUALISATION", items: ["Power BI", "DAX", "Power Query", "Streamlit", "Qlik Sense", "Excel", "Power Platform"] },
  { label: "DEVELOPMENT & MLOPS", items: ["Python", "Flask", "FastAPI", "HTML / CSS / JS", "MLflow", "Kedro", "Git", "UML / Draw.io"] }
];

const education = [
  { title: "MSc Data Science & Advanced Analytics", place: "NOVA IMS · Universidade NOVA de Lisboa · Major in Data Science", date: "2025 — 2027" },
  { title: "Master 1 (evening classes)", place: "ESEN · La Manouba, Tunisia · alongside a full-time permanent job", date: "2024 — 2025" },
  { title: "Bachelor in Business Intelligence", place: "ESEN · La Manouba, Tunisia · Graduated with “Très Bien” and the jury’s congratulations", date: "2021 — 2024" }
];

const achievements = [
  ["Best project, Airline Customer Segmentation (20/20)", "2026"],
  ["Crustacean Age Prediction Hackathon · Gradient Boosting", "2024"],
  ["El Maken Hackathon · KNN classification + BI dashboard", "2023"],
  ["Mathematics Competition · Represented Tunisia", "2017"]
];

const certifications = [
  { title: "Qlik Sense", issuer: "Udemy", date: "2026", links: [] },
  { title: "Azure AI Fundamentals", issuer: "Microsoft Certified", date: "NOV 2024", links: [["Verify", "https://www.credly.com/badges/ebb556e7-5b37-490e-aecb-94eda511aff3/linked_in_profile"]] },
  { title: "TOEIC · 900 / 990", issuer: "Amideast Tunisia", date: "JAN 2025", links: [] },
  { title: "Snowflake Hands-On Essentials", issuer: "Snowflake · 3 workshops: Data Warehousing, Data Application Builders, Collaboration & Cost Estimation", date: "JUL 2024", links: [["Data Warehousing", "https://achieve.snowflake.com/01ac31e3-3f82-43ff-9bc6-47f0af9baa86"], ["Data Apps", "https://achieve.snowflake.com/f2764fc3-bf60-4574-9739-c7683d46873b"], ["Collaboration", "https://achieve.snowflake.com/e72cd4c9-e593-4b36-bb78-0a9f035b02d0"]] },
  { title: "Power Platform Fundamentals", issuer: "Microsoft Certified", date: "DEC 2023", links: [["Verify", "https://www.credly.com/badges/78bcef87-b92a-47e2-88a5-79da90da8e10/linked_in_profile"]] },
  { title: "Google Data Analytics · 3 courses", issuer: "Google via Coursera · Foundations, Ask Questions, Prepare Data", date: "FEB — MAR 2024", links: [["Foundations", "https://www.coursera.org/account/accomplishments/records/F62QFWSAFDWG"], ["Ask Questions", "https://www.coursera.org/account/accomplishments/records/SW5Q9C5UGMW6"], ["Prepare Data", "https://www.coursera.org/account/accomplishments/records/FB4U3T5NGHFN"]] },
  { title: "Power BI & UML", issuer: "LinkedIn Learning · Power BI dashboards, Power Query, database modelling with UML", date: "2023 — 2024", links: [["Power BI", "https://www.linkedin.com/learning/certificates/ccb801d678702058a59a049d92292b50e9c11cadd71a075fc225fcaed517f609/"], ["Power Query", "https://www.linkedin.com/learning/certificates/956646a73a657dae1f0549988bd0e7ac58cf78a84a9c39743cc507c8f721902c/"], ["UML", "https://www.linkedin.com/learning/certificates/66902ac1844902e59821ef1e3379708e53f291762ab2c73f5ecc3be75abec94f/"]] }
];

const community = [
  { date: "2023 — 2025", title: "Volunteer Instructor", place: "Seif Center · Tunisia", text: "Taught English and computer science as a volunteer instructor." },
  { date: "2026", title: "Best Project · 20/20", place: "NOVA IMS · Data Mining", text: "Airline customer segmentation, awarded the top grade for the class project." },
  { date: "2024", title: "Crustacean Age Prediction Hackathon", place: "Hackathon", text: "Built a Gradient Boosting model to predict crustacean age." },
  { date: "2023", title: "El Maken Hackathon", place: "Hackathon", text: "KNN classification combined with a BI dashboard. Our team won the prize." },
  { date: "2017", title: "Mathematics Competition", place: "National team", text: "Represented Tunisia in a mathematics competition." }
];

const recommendations = [
  {
    quote: "Khadija showed remarkable seriousness and great diligence throughout her project. She approached each task with rigour, demonstrating a real mastery of Business Intelligence concepts and an ability to propose innovative solutions to complex problems.",
    name: "Ghaith Manita", title: "Assistant Professor, ESEN Manouba", org: "Supervisor of her final-year project", date: "October 2024", translated: true
  },
  {
    quote: "Her ability to master these sophisticated tools and apply them effectively was particularly impressive. She not only demonstrated a deep understanding of the technical issues, but also proposed creative and relevant solutions.",
    name: "Mohamed Oussama Bribech", title: "Software Engineer, BI4YOU", org: "Snowflake, Power BI and Python project", date: "September 2024", translated: true
  },
  {
    quote: "Ms. Khadija exhibited exceptional proficiency and dedication. [...] She has clearly a sharp mind and very good abilities to communicate, learn quickly and progress in a positive trajectory.",
    name: "Samy Chakroun", title: "Head of Geotechnical & Underground, SYSTRA IBT", org: "Dubai", date: "August 2023", translated: false
  },
  {
    quote: "Khadija integrated perfectly into our teams and always satisfied her supervisors through her seriousness, her commitment and her ability to meet expectations. [...] A person of trust on whom the team could count.",
    name: "Aymen Cheikh Mhamed", title: "Group Chief Development Officer, Pini Group", org: "Formerly Senior Vice President, Systra Dubai", date: "", translated: true
  },
  {
    quote: "She distinguished herself through her academic excellence and her passion for data analysis and Business Intelligence. Her work has always been characterised by meticulous attention to detail and scientific rigour.",
    name: "Dr. Hamida Amdouni", title: "Assistant Professor and Director of Studies, ESEN", org: "University of La Manouba", date: "October 2024", translated: true
  }
];

const languages = [["French", "C2"], ["English", "C1 · TOEIC 900/990"], ["Arabic", "C2"], ["Portuguese", "A1"]];

const EN_DATA = { projects, experiences, skillGroups, education, certifications, community, recommendations, languages };
const merge = (en, fr) => en.map((x, i) => ({ ...x, ...(fr?.[i] || {}), ...(x.details ? { details: { ...x.details, ...(fr?.[i]?.details || {}) } } : {}) }));
const getData = (lang) => lang === "fr" ? {
  projects: merge(projects, FR.projects), experiences: merge(experiences, FR.experiences), skillGroups: merge(skillGroups, FR.skillGroups),
  education: merge(education, FR.education), certifications: merge(certifications, FR.certifications), community: merge(community, FR.community),
  recommendations: merge(recommendations, FR.recommendations), languages: FR.languages
} : EN_DATA;

function SectionHeading({ eyebrow, title, text }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function ProjectModal({ project, onClose }) {
  const { t } = useContext(LangCtx);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  const Icon = project.icon;
  const d = project.details;
  return (
    <motion.div className="modal-backdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e)=>e.stopPropagation()} initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16}}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
        <div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><span className="project-icon"><Icon size={19}/></span></div>
        <h3>{project.title}</h3>
        <span className="modal-note">{project.note}</span>
        <h4>{t.problem}</h4><p>{d.problem}</p>
        <h4>{t.built}</h4>
        <ul>{d.approach.map(a=><li key={a}>{a}</li>)}</ul>
        {d.results.length>0 && <><h4>{t.results}</h4><ul>{d.results.map(r=><li key={r}>{r}</li>)}</ul></>}
        {d.disclaimer && <p className="modal-disclaimer">{d.disclaimer}</p>}
        <div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        {!d.disclaimer && <div className="modal-actions"><a className="button button-primary" href={project.repo || GITHUB} target="_blank" rel="noreferrer"><Github size={16}/> {project.repo ? t.code : t.gh}</a>{project.demo && <a className="button button-ghost" href={project.demo} target="_blank" rel="noreferrer">{t.demo} <ArrowUpRight size={15}/></a>}</div>}
      </motion.div>
    </motion.div>
  );
}

function ContactActions() {
  const { t } = useContext(LangCtx);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch { const t = document.createElement("textarea"); t.value = EMAIL; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    setCopied(true); setTimeout(() => setCopied(false), 2200);
  };
  return (
    <>
      <div className="contact-email">{EMAIL}</div>
      <div className="contact-actions">
        <a className="button button-primary" href={`mailto:${EMAIL}`}>{t.hello} <ArrowUpRight size={16}/></a>
        <button className="button button-ghost" onClick={copy}>{copied ? <>{t.copied} <Check size={15}/></> : <>{t.copyBtn} <Copy size={15}/></>}</button>
        <a className="button button-ghost" href={GMAIL} target="_blank" rel="noreferrer">{t.gmail} <ArrowUpRight size={15}/></a>
      </div>
    </>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [lang, setLang] = useState(() => { try { const v = localStorage.getItem("lang"); if (v) return v; } catch {} return (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en"; });
  useEffect(() => { document.documentElement.lang = lang; try { localStorage.setItem("lang", lang); } catch {} }, [lang]);
  const t = UI[lang];
  const { projects, experiences, skillGroups, education, certifications, community, recommendations, languages } = getData(lang);
  const links = ["#about", "#experience", "#projects", "#skills", "#certifications"].map((h, i) => [t.nav[i], h]);
  return (
    <LangCtx.Provider value={{ lang, t }}>
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="nav wrap">
        <a className="brand" href="#home">KE<span>.</span></a>
        <nav>{links.map(([l,h])=><a key={l} href={h}>{l}</a>)}</nav>
        <button className="lang-toggle" onClick={()=>setLang(lang==="en"?"fr":"en")} aria-label="Language">{lang==="en"?"FR":"EN"}</button>
        <a className="nav-contact" href="#contact">{t.talk} <ArrowUpRight size={14}/></a>
        <button className="menu-toggle" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
        {menuOpen && <div className="mobile-menu">{links.map(([l,h])=><a key={l} href={h} onClick={()=>setMenuOpen(false)}>{l}</a>)}<a href="#contact" onClick={()=>setMenuOpen(false)}>{t.contact}</a></div>}
      </header>

      <main>
        <section className="hero wrap" id="home">
          <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="availability"><span className="pulse" /> {t.avail}</div>
            <p className="hero-kicker">{t.kicker}</p>
            <h1>{t.h1}</h1>
            <p className="hero-description">{t.heroDesc}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.explore} <ArrowUpRight size={16}/></a>
              <a className="button button-ghost" href="#contact">{t.touch} <Mail size={15}/></a>
              <a className="button button-ghost" href={lang==="fr"?"cv-fr.pdf":"cv-en.pdf"} target="_blank" rel="noreferrer">CV <FileText size={15}/></a>
              <a className="button button-icon" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
              <a className="button button-icon" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
            </div>
            <div className="hero-meta"><span><MapPin size={14}/> {t.loc}</span><span className="meta-separator">·</span><span>{t.langsLine}</span></div>
          </motion.div>

          <motion.div className="portrait-wrap" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.15}}>
            <div className="portrait-frame">
              <img className="portrait-image" src="portrait.jpg" alt="Khadija Ennaifer" />
              <div className="portrait-caption"><span className="caption-mark">✳</span><span>{t.caption}</span></div>
            </div>
            <div className="floating-chip chip-top"><BrainCircuit size={15}/> {t.chipA}</div>
            <div className="floating-chip chip-bottom"><Code2 size={15}/> {t.chipB}</div>
          </motion.div>
          <a href="#about" className="scroll-cue"><span>{t.scroll}</span><ArrowDown size={14}/></a>
        </section>

        <section className="about section wrap" id="about">
          <SectionHeading eyebrow={t.aboutEy} title={t.aboutTitle} />
          <div className="about-grid">
            <p className="about-lead">{t.lead}</p>
            <div className="about-body"><p>{t.p1}</p><p>{t.p2}</p><div className="about-facts"><div><strong>5</strong><span>{t.facts[0]}</span></div><div><strong>20/20</strong><span>{t.facts[1]}</span></div><div><strong>4</strong><span>{t.facts[2]}</span></div></div></div>
          </div>
        </section>

        <section className="experience section wrap" id="experience">
          <SectionHeading eyebrow={t.expEy} title={t.expTitle} text={t.expText} />
          <div className="timeline">{experiences.map((item,i)=><motion.article className="timeline-item" key={item.date} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{delay:i*.05}}><div className="timeline-date">{item.date}</div><div className="timeline-marker"><span/></div><div className="timeline-content"><h3>{item.role}</h3><div className="company">{item.company}</div>{item.bullets.length>0 && <ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul>}{item.skills && <div className="timeline-skills">{item.skills}</div>}</div></motion.article>)}</div>
        </section>

        <section className="projects section wrap" id="projects">
          <SectionHeading eyebrow={t.projEy} title={t.projTitle} text={t.projText} />
          <div className="project-grid">{projects.map((project,i)=>{const Icon=project.icon;return <motion.article className={`project-card ${project.featured?"featured":""}`} key={project.number} role="button" tabIndex={0} onClick={()=>setActive(project)} onKeyDown={(e)=>(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),setActive(project))} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:(i%2)*.08}}><div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><span className="project-icon"><Icon size={19}/></span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-bottom"><span>{project.note}</span><span className="project-arrow"><ArrowUpRight size={17}/></span></div></motion.article>})}</div>
        </section>

        <section className="skills section wrap" id="skills">
          <SectionHeading eyebrow={t.skEy} title={t.skTitle} text={t.skText} />
          <div className="skills-grid">{skillGroups.map(group=><div className="skill-group" key={group.label}><span className="eyebrow">{group.label}</span><div className="skill-list">{group.items.map(item=><span key={item}>{item}</span>)}</div></div>)}</div>
          <div className="education-list">{education.map(e=><div className="education-card" key={e.title}><div><span className="eyebrow">{t.edu}</span><h3>{e.title}</h3><p>{e.place}</p></div><span className="education-date">{e.date}</span></div>)}</div>
          <div className="extras-grid">
            <div className="skill-group"><span className="eyebrow">{t.langs}</span><ul className="plain-list">{languages.map(([l,lv])=><li key={l}><span>{l}</span><em>{lv}</em></li>)}</ul></div>
          </div>
        </section>

        <section className="certs section wrap" id="certifications">
          <SectionHeading eyebrow={t.certEy} title={t.certTitle} text={t.certText} />
          <div className="certs-grid">{certifications.map(c=><div className="cert-card" key={c.title}><span className="cert-date">{c.date}</span><h3>{c.title}</h3><p>{c.issuer}</p>{c.links.length>0 && <div className="cert-links">{c.links.map(([l,u])=><a key={u} href={u} target="_blank" rel="noreferrer">{l} <ArrowUpRight size={12}/></a>)}</div>}</div>)}</div>
        </section>

        <section className="community section wrap" id="community">
          <SectionHeading eyebrow={t.comEy} title={t.comTitle} text={t.comText} />
          <div className="certs-grid">{community.map(c=><div className="cert-card" key={c.title}><span className="cert-date">{c.date}</span><h3>{c.title}</h3><p className="cert-place">{c.place}</p><p>{c.text}</p></div>)}</div>
        </section>

        {recommendations.length>0 && <section className="recs section wrap" id="recommendations">
          <SectionHeading eyebrow={t.recEy} title={t.recTitle} text={t.recText} />
          <div className="recs-grid">{recommendations.map(r=><figure className="rec-card" key={r.name}><blockquote>“{r.quote}”</blockquote><figcaption><strong>{r.name}</strong><span>{r.title}{r.org ? ` · ${r.org}` : ""}</span>{r.date && <em>{r.date}</em>}{r.translated && <small>{t.translated}</small>}</figcaption></figure>)}</div>
        </section>}

        <section className="contact section wrap" id="contact">
          <span className="eyebrow">{recommendations.length>0 ? "08" : "07"} / {t.next}</span>
          <h2>{t.contactH}</h2>
          <p>{t.contactP}</p>
          <ContactActions />
          <div className="socials"><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href={GITHUB} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="mailto:kennaifer@gmail.com"><Mail size={17}/> Email</a></div>
        </section>
      </main>
      <AnimatePresence>{active && <ProjectModal project={active} onClose={()=>setActive(null)} />}</AnimatePresence>
      <footer className="footer wrap"><a className="brand" href="#home">KE<span>.</span></a><span>{t.footer}</span><span>© {new Date().getFullYear()} Khadija Ennaifer</span></footer>
    </div>
    </LangCtx.Provider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
