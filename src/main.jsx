import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, X, FileText,
  BrainCircuit, Database, Eye, Users, FileSearch, Sparkles, Code2, Workflow
} from "lucide-react";
import "./styles.css";

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
    description: "An end-to-end, fully on-premise invoice processing system: OCR plus a locally hosted, fine-tuned LLaMA model extract key fields from invoices, with a manual review interface.",
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
    note: "Group project · Best project 20/20 · 2025",
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
    type: "BUSINESS INTELLIGENCE",
    title: "Snowflake Analytics & Monitoring",
    description: "Power BI dashboards on Snowflake usage data to monitor KPIs, query performance and efficiency, plus optimised data models and automated monitoring.",
    tags: ["Snowflake", "Power BI", "SQL", "Stored Procedures"],
    note: "BI4YOU · 2024–2025",
    repo: "https://github.com/Khadijaenn/Khadijaenn-performance-analyzation-in-Snowflake",
    icon: Database,
    details: {
      problem: "Give business stakeholders clear visibility on usage, performance and operational efficiency of their Snowflake environment.",
      approach: ["Interactive Power BI dashboards on Snowflake usage data", "Designed and optimised data models, SQL queries and warehouse configurations to improve analytics performance and reduce processing times", "Automated monitoring and reporting with Snowflake stored procedures and usage-tracking data", "Worked with stakeholders to turn requirements into analytics solutions"],
      results: []
    }
  },
  {
    number: "08",
    type: "BI · DATA ENGINEERING",
    title: "End-to-End BI Solution",
    description: "A complete BI solution covering data integration, a data warehouse and Power BI visualisations, with classification and regression models deployed through a web interface.",
    tags: ["Talend", "SQL", "Power BI", "Python"],
    note: "Systra Dubai · 2024",
    icon: Workflow,
    details: {
      problem: "Bring scattered business data together and make it usable for reporting and prediction.",
      approach: ["Data integration with Talend and a data warehouse", "Power BI visualisations", "Classification and regression models built and deployed via a user-friendly web interface"],
      results: [],
      disclaimer: "End-of-studies internship at Systra Dubai. The code and data are not public."
    }
  }
];

const experiences = [
  { date: "OCT 2026 — PRESENT", role: "Data Science & AI Intern", company: "Airbus · Lisbon, Portugal",
    bullets: ["Designing and implementing a Retrieval-Augmented Generation (RAG) system that delivers relevant, traceable answers from large, heterogeneous aviation maintenance documentation.", "Comparing alternative retrieval strategies with retrieval metrics, and evaluating generated answers on relevance, faithfulness and usefulness."],
    skills: "Python · LLMs · RAG · NLP · Information retrieval" },
  { date: "JUN 2025 — DEC 2025", role: "Data Science & AI Intern", company: "Welyne · Tunisia",
    bullets: ["Built an end-to-end invoice processing system combining OCR (PaddleOCR, Tesseract, EasyOCR) with a locally hosted, fine-tuned LLaMA model to extract seller, buyer, amounts, currency, addresses and IBAN.", "Designed a fully on-premise pipeline with a regex fallback and batch processing, and a Flask app with a manual review interface, validated on real client invoices."],
    skills: "Python · LLM fine-tuning · NLP · OCR · Flask" },
  { date: "JUN 2024 — MAY 2025", role: "Data Science & AI Consultant", company: "BI4YOU · Tunisia",
    bullets: ["Developed Power BI dashboards on Snowflake usage data to monitor KPIs, query performance and operational efficiency.", "Designed and optimised Snowflake data models, SQL queries and warehouse configurations, and automated monitoring with stored procedures."],
    skills: "Snowflake · Power BI · SQL" },
  { date: "FEB 2024 — JUN 2024", role: "End-of-Studies Intern", company: "Systra Dubai · United Arab Emirates",
    bullets: ["Designed an end-to-end BI solution: data integration, data warehouse and Power BI visualisations.", "Built and deployed classification and regression models through a user-friendly web interface."],
    skills: "Python · Talend · SQL · Power BI" },
  { date: "MAY 2023 — AUG 2023", role: "Business Intelligence Intern", company: "Systra Dubai · United Arab Emirates",
    bullets: ["Performed a full ETL pipeline: data collection, extraction, cleaning and transformation.", "Created interactive Power BI dashboards using DAX and developed a web interface with HTML, CSS and JavaScript."] },
  { date: "2023 — 2025", role: "Volunteer Instructor, English & Computer Science", company: "Seif Center · Tunisia", bullets: [] }
];

const skillGroups = [
  { label: "AI & MACHINE LEARNING", items: ["LLM Fine-tuning", "RAG", "NLP", "OCR", "Deep Learning", "Computer Vision", "PyTorch", "TensorFlow", "Scikit-learn"] },
  { label: "DATA & BI", items: ["Python", "SQL / Oracle", "Snowflake", "MongoDB", "Power BI / DAX", "ETL / Talend", "Data Mining"] },
  { label: "DEPLOYMENT & TOOLS", items: ["Flask", "FastAPI", "Streamlit", "MLflow", "Kedro", "Git", "HTML / CSS / JS"] }
];

const education = [
  { title: "MSc Data Science & Advanced Analytics", place: "NOVA IMS · Universidade NOVA de Lisboa · Major in Data Science", date: "2025 — 2027" },
  { title: "Bachelor in Business Intelligence", place: "ESEN · La Manouba, Tunisia", date: "2021 — 2025" }
];

const achievements = [
  ["Best project, Airline Customer Segmentation (20/20)", "2025"],
  ["Crustacean Age Prediction Hackathon · Gradient Boosting", "2024"],
  ["El Maken Hackathon · KNN classification + BI dashboard", "2023"],
  ["Mathematics Competition · Represented Tunisia", "2017"]
];

const certifications = [
  { title: "Azure AI Fundamentals", issuer: "Microsoft Certified", date: "NOV 2024", links: [["Verify", "https://www.credly.com/badges/ebb556e7-5b37-490e-aecb-94eda511aff3/linked_in_profile"]] },
  { title: "TOEIC · 900 / 990", issuer: "Amideast Tunisia", date: "JAN 2025", links: [] },
  { title: "Snowflake Hands-On Essentials", issuer: "Snowflake · 3 workshops: Data Warehousing, Data Application Builders, Collaboration & Cost Estimation", date: "JUL 2024", links: [["Data Warehousing", "https://achieve.snowflake.com/01ac31e3-3f82-43ff-9bc6-47f0af9baa86"], ["Data Apps", "https://achieve.snowflake.com/f2764fc3-bf60-4574-9739-c7683d46873b"], ["Collaboration", "https://achieve.snowflake.com/e72cd4c9-e593-4b36-bb78-0a9f035b02d0"]] },
  { title: "Power Platform Fundamentals", issuer: "Microsoft Certified", date: "DEC 2023", links: [["Verify", "https://www.credly.com/badges/78bcef87-b92a-47e2-88a5-79da90da8e10/linked_in_profile"]] },
  { title: "Google Data Analytics · 3 courses", issuer: "Google via Coursera · Foundations, Ask Questions, Prepare Data", date: "FEB — MAR 2024", links: [["Foundations", "https://www.coursera.org/account/accomplishments/records/F62QFWSAFDWG"], ["Ask Questions", "https://www.coursera.org/account/accomplishments/records/SW5Q9C5UGMW6"], ["Prepare Data", "https://www.coursera.org/account/accomplishments/records/FB4U3T5NGHFN"]] },
  { title: "Power BI & UML", issuer: "LinkedIn Learning · Power BI dashboards, Power Query, database modelling with UML", date: "2023 — 2024", links: [["Power BI", "https://www.linkedin.com/learning/certificates/ccb801d678702058a59a049d92292b50e9c11cadd71a075fc225fcaed517f609/"], ["Power Query", "https://www.linkedin.com/learning/certificates/956646a73a657dae1f0549988bd0e7ac58cf78a84a9c39743cc507c8f721902c/"], ["UML", "https://www.linkedin.com/learning/certificates/66902ac1844902e59821ef1e3379708e53f291762ab2c73f5ecc3be75abec94f/"]] }
];

const languages = [["Arabic", "C2"], ["French", "C2"], ["English", "C1"], ["Portuguese", "A1"]];

function SectionHeading({ eyebrow, title, text }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function ProjectModal({ project, onClose }) {
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
        <h4>The problem</h4><p>{d.problem}</p>
        <h4>What I built</h4>
        <ul>{d.approach.map(a=><li key={a}>{a}</li>)}</ul>
        {d.results.length>0 && <><h4>Results</h4><ul>{d.results.map(r=><li key={r}>{r}</li>)}</ul></>}
        {d.disclaimer && <p className="modal-disclaimer">{d.disclaimer}</p>}
        <div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        {!d.disclaimer && <div className="modal-actions"><a className="button button-primary" href={project.repo || GITHUB} target="_blank" rel="noreferrer"><Github size={16}/> {project.repo ? "View the code" : "See my GitHub"}</a>{project.demo && <a className="button button-ghost" href={project.demo} target="_blank" rel="noreferrer">Live dashboard <ArrowUpRight size={15}/></a>}</div>}
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const links = [["About","#about"],["Experience","#experience"],["Projects","#projects"],["Skills","#skills"],["Certifications","#certifications"]];
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="nav wrap">
        <a className="brand" href="#home">KE<span>.</span></a>
        <nav>{links.map(([l,h])=><a key={l} href={h}>{l}</a>)}</nav>
        <a className="nav-contact" href="mailto:kennaifer@gmail.com">LET'S TALK <ArrowUpRight size={14}/></a>
        <button className="menu-toggle" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
        {menuOpen && <div className="mobile-menu">{links.map(([l,h])=><a key={l} href={h} onClick={()=>setMenuOpen(false)}>{l}</a>)}<a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></div>}
      </header>

      <main>
        <section className="hero wrap" id="home">
          <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="availability"><span className="pulse" /> OPEN TO AI & DATA OPPORTUNITIES</div>
            <p className="hero-kicker">HELLO, I'M KHADIJA ENNAIFER</p>
            <h1>Building at the<br/><span>intersection</span> of<br/>data & intelligence<span className="dot">.</span></h1>
            <p className="hero-description">I’m a Data Science graduate student passionate about turning complex data into intelligent, useful solutions — from machine learning to applied AI.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={16}/></a>
              <a className="button button-ghost" href="mailto:kennaifer@gmail.com">Get in touch <Mail size={15}/></a>
              {CV_URL && <a className="button button-ghost" href={CV_URL} target="_blank" rel="noreferrer">CV <FileText size={15}/></a>}
              <a className="button button-icon" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
              <a className="button button-icon" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
            </div>
            <div className="hero-meta"><span><MapPin size={14}/> Lisbon, Portugal</span><span className="meta-separator">·</span><span>Arabic · French · English · Portuguese</span></div>
          </motion.div>

          <motion.div className="portrait-wrap" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.15}}>
            <div className="portrait-frame">
              <img className="portrait-image" src="portrait.jpg" alt="Khadija Ennaifer" />
              <div className="portrait-caption"><span className="caption-mark">✳</span><span>Curious mind.<br/>Human-centered AI.</span></div>
            </div>
            <div className="floating-chip chip-top"><BrainCircuit size={15}/> Applied AI</div>
            <div className="floating-chip chip-bottom"><Code2 size={15}/> Data Science</div>
          </motion.div>
          <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
        </section>

        <section className="about section wrap" id="about">
          <SectionHeading eyebrow="01 / A LITTLE ABOUT ME" title={<>Curiosity, meet<br/><span className="muted-title">real-world problems.</span></>} />
          <div className="about-grid">
            <p className="about-lead">I’m interested in building technology that does more than look impressive — it should solve a real problem, support people and make information more accessible.</p>
            <div className="about-body"><p>With a Bachelor in Business Intelligence and a Master’s in Data Science & Advanced Analytics at NOVA IMS, I’ve worked across data engineering, machine learning, NLP, OCR, computer vision and generative AI, in Tunisia, Dubai and now Portugal.</p><p>Recently, my focus has shifted toward applied AI: combining retrieval, language models and structured data to make complex knowledge easier to use — especially in demanding operational environments.</p><div className="about-facts"><div><strong>5</strong><span>ROLES IN DATA & AI</span></div><div><strong>20/20</strong><span>BEST PROJECT AWARD</span></div><div><strong>4</strong><span>LANGUAGES SPOKEN</span></div></div></div>
          </div>
        </section>

        <section className="experience section wrap" id="experience">
          <SectionHeading eyebrow="02 / WHERE I'VE BEEN" title="Experience" text="A mix of data, engineering and applied problem-solving." />
          <div className="timeline">{experiences.map((item,i)=><motion.article className="timeline-item" key={item.date} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{delay:i*.05}}><div className="timeline-date">{item.date}</div><div className="timeline-marker"><span/></div><div className="timeline-content"><h3>{item.role}</h3><div className="company">{item.company}</div>{item.bullets.length>0 && <ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul>}{item.skills && <div className="timeline-skills">{item.skills}</div>}</div></motion.article>)}</div>
        </section>

        <section className="projects section wrap" id="projects">
          <SectionHeading eyebrow="03 / SELECTED WORK" title="Things I've built." text="A selection of projects where I explored, experimented and turned ideas into working solutions." />
          <div className="project-grid">{projects.map((project,i)=>{const Icon=project.icon;return <motion.article className={`project-card ${project.featured?"featured":""}`} key={project.number} role="button" tabIndex={0} onClick={()=>setActive(project)} onKeyDown={(e)=>(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),setActive(project))} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:(i%2)*.08}}><div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><span className="project-icon"><Icon size={19}/></span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-bottom"><span>{project.note}</span><span className="project-arrow"><ArrowUpRight size={17}/></span></div></motion.article>})}</div>
        </section>

        <section className="skills section wrap" id="skills">
          <SectionHeading eyebrow="04 / MY TOOLKIT" title="Tools of the trade." text="Technologies I use to explore ideas and build practical solutions." />
          <div className="skills-grid">{skillGroups.map(group=><div className="skill-group" key={group.label}><span className="eyebrow">{group.label}</span><div className="skill-list">{group.items.map(item=><span key={item}>{item}</span>)}</div></div>)}</div>
          <div className="education-list">{education.map(e=><div className="education-card" key={e.title}><div><span className="eyebrow">EDUCATION</span><h3>{e.title}</h3><p>{e.place}</p></div><span className="education-date">{e.date}</span></div>)}</div>
          <div className="extras-grid">
            <div className="skill-group"><span className="eyebrow">ACHIEVEMENTS</span><ul className="plain-list">{achievements.map(([t,y])=><li key={t}><span>{t}</span><em>{y}</em></li>)}</ul></div>
            <div className="skill-group"><span className="eyebrow">LANGUAGES</span><ul className="plain-list">{languages.map(([l,lv])=><li key={l}><span>{l}</span><em>{lv}</em></li>)}</ul></div>
          </div>
        </section>

        <section className="certs section wrap" id="certifications">
          <SectionHeading eyebrow="05 / CREDENTIALS" title="Licences & certifications." text="Continuous learning across AI, cloud, data platforms and BI." />
          <div className="certs-grid">{certifications.map(c=><div className="cert-card" key={c.title}><span className="cert-date">{c.date}</span><h3>{c.title}</h3><p>{c.issuer}</p>{c.links.length>0 && <div className="cert-links">{c.links.map(([l,u])=><a key={u} href={u} target="_blank" rel="noreferrer">{l} <ArrowUpRight size={12}/></a>)}</div>}</div>)}</div>
        </section>

        <section className="contact section wrap" id="contact">
          <span className="eyebrow">06 / WHAT'S NEXT?</span>
          <h2>Have a good problem<br/>to <span>solve?</span></h2>
          <p>I’d love to connect, exchange ideas or explore how data and AI can make a difference.</p>
          <a className="button button-primary" href="mailto:kennaifer@gmail.com">Say hello <ArrowUpRight size={16}/></a>
          <div className="socials"><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href={GITHUB} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="mailto:kennaifer@gmail.com"><Mail size={17}/> Email</a></div>
        </section>
      </main>
      <AnimatePresence>{active && <ProjectModal project={active} onClose={()=>setActive(null)} />}</AnimatePresence>
      <footer className="footer wrap"><a className="brand" href="#home">KE<span>.</span></a><span>Designed & built with curiosity.</span><span>© {new Date().getFullYear()} Khadija Ennaifer</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
