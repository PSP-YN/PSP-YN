"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness,
  CheckCircle2, Code2, Cpu, Github, GraduationCap, Layers3,
  Linkedin, Mail, Menu, Search, ShieldCheck, Smartphone, Sparkles, Workflow, X, Instagram, AtSign, MessageCircle
} from "lucide-react";

type Category = "Product" | "AI & Automation" | "Systems" | "Security" | "Prototypes";
type Project = {
  rank: number; name: string; category: Category; status: string; summary: string;
  stack: string[]; evidence: string; interview: string; next: string; live?: string;
  priority: "Lead" | "Technical" | "Prototype" | "Archive";
};

const projects: Project[] = [
  {rank:1,name:"CareerOS",category:"Product",status:"Deployed · CI passing",summary:"A career-planning workspace connecting role definition, skill-gap analysis, learning roadmaps, interview practice and application tracking.",stack:["JavaScript","Supabase","Vercel","Gemini"],evidence:"Live product surface and recent successful main-branch verification. Guest mode, resume tools, interview rounds and optional authenticated AI reviews are documented. Payments and some cloud integrations still require configuration.",interview:"Product architecture, user journeys, local-first guest mode, Supabase RLS, server-side AI quota controls and monetisation boundaries.",next:"Validate the complete sign-in and cloud-sync journey, finish legal launch details, and run end-to-end tests for any enabled paid flow.",live:"https://careeros-intelligence.vercel.app",priority:"Lead"},
  {rank:2,name:"DaemonX",category:"AI & Automation",status:"Local platform · CI passing",summary:"A Linux-controlled Android automation and personal knowledge platform combining ADB, accessibility trees, OCR, computer vision and an MCP interface.",stack:["Python","MCP","ADB","Tesseract","OpenCV","SQLite"],evidence:"Latest main-branch CI passed on 30 October 2026. The project documentation 27 tests, resumable task execution and a local dashboard; real-device workflows still need a repeatable demonstration.",interview:"Observe–act–verify loops, multimodal perception, task checkpointing, idempotent actions, MCP tool design and safe file quarantine.",next:"Record a complete workflow on a physical Android device, publish a reproducible benchmark and document device-specific limitations.",priority:"Lead"},
  {rank:3,name:"LangAssist",category:"Systems",status:"Linux desktop · CI passing",summary:"An offline, non-LLM grammar assistant for GNOME Wayland that uses accessibility APIs to inspect text and apply corrections in place.",stack:["Rust","Harper","AT-SPI","GTK4","Libadwaita"],evidence:"Main-branch CI passed. The implementation documents password/terminal exclusions, stale-offset guards, a live AT-SPI verification script and local performance benchmarks.",interview:"Linux accessibility, event-driven desktop integration, transactional edits, privacy boundaries, Rust architecture and performance measurement.",next:"Publish a compatibility matrix from real GTK, Chromium and Electron tests, plus a short screen recording of the edit workflow.",priority:"Lead"},
  {rank:4,name:"NexHelp",category:"Product",status:"Pilot candidate · CI passing",summary:"A trust-first home-services marketplace for customers and verified local professionals, initially scoped to plumbing and electrical services in Bengaluru.",stack:["Flutter","Supabase","PostgreSQL","Next.js","RLS"],evidence:"Latest main-branch CI passed. project documentation mobile customer/provider flows, database migrations, RLS, an operations dashboard and 50 automated tests. Supabase, messaging and store-release steps remain.",interview:"Marketplace workflows, role-based access, database invariants, provider verification, dispatch operations and staged geographic rollout.",next:"Provision the backend, test customer-to-provider fulfilment with real pilot users, and validate dispute and cancellation handling.",priority:"Lead"},
  {rank:5,name:"SyncSphere",category:"Product",status:"App prototype · CI and release passing",summary:"A campus event network with student, faculty and admin roles, event discovery, moderation, team formation, chat and reminders.",stack:["Expo","React Native","TypeScript","Supabase","PostgreSQL"],evidence:"Main-branch CI and automatic release workflows passed. A public web presence exists; the mobile experience still depends on Supabase project setup and deployment configuration.",interview:"Postgres RLS, role separation, moderation workflows, realtime messaging, atomic rate limits and mobile product architecture.",next:"Run a controlled campus pilot, test RLS with adversarial role cases and measure event creation-to-attendance conversion.",live:"https://syncsphere-campus.vercel.app",priority:"Lead"},
  {rank:6,name:"NOVA",category:"AI & Automation",status:"Active build · integrations need verification",summary:"A Linux desktop AI agent concept with a persistent command centre, accessibility-tree perception, automation, local knowledge retrieval and a stateful orb interface.",stack:["Python","Linux","AT-SPI","Ollama","SQLite","Wayland"],evidence:"Recently updated repository and a README claim of 168 passing tests. No recent GitHub Actions run was found, so the full integration set and test claim need direct reproduction.",interview:"Desktop agent architecture, accessibility-based perception, event loops, tool execution, memory retrieval and human approval states.",next:"Publish a clean installation path, test every advertised integration on a fresh Fedora environment and record a complete end-to-end task.",priority:"Lead"},
  {rank:7,name:"Aegis Agent",category:"Security",status:"Advanced prototype · CI currently failing",summary:"An application-security platform exploring browser and IDE discovery, application-state graphs, threat modelling, deterministic evidence and remediation.",stack:["Python","FastAPI","Chrome MV3","VS Code","SARIF"],evidence:"The repository describes 89 tests and a multi-surface security workflow, but the latest main-branch CI and deployment workflows failed. Treat the README badge as unverified until the failures are fixed.",interview:"BOLA/IDOR threat modelling, state graphs, exploit evidence, SARIF reporting, patch review and false-positive control.",next:"Fix the failing CI and deployment pipelines, then publish a reproducible authorised test target with verified findings and safe remediation.",priority:"Lead"},
  {rank:8,name:"UIPath_automate",category:"AI & Automation",status:"Runnable local workflow demos",summary:"Two local business workflow demonstrations for invoice review and customer-support triage, with explicit human approval before sensitive actions.",stack:["Python","SQLite","Ollama","Workflow automation"],evidence:"README provides executable CLI commands, sample data, audit events, idempotency checks and a unittest suite. It explicitly states that it is not yet a deployed UiPath Maestro project.",interview:"Human-in-the-loop automation, deterministic rules, auditability, idempotency, retries and safe separation of analysis from approval.",next:"Import or recreate both flows in UiPath Maestro and record the required end-to-end contest demonstration.",priority:"Technical"},
  {rank:9,name:"smiriti",category:"AI & Automation",status:"Android prototype · release unverified",summary:"An offline-first Android notebook for importing documents, extracting text, searching semantically and asking questions with citations.",stack:["Flutter","ObjectBox","llama.cpp","TFLite","ML Kit"],evidence:"project documentation local inference, OCR, embeddings, biometric lock and a Flutter build path. A signed release or verified store distribution was not established in this audit.",interview:"On-device RAG, document chunking, vector retrieval, mobile inference constraints, privacy and secure local storage.",next:"Build and install a release APK on a real Android phone, measure memory/latency and test citation faithfulness on a fixed document set.",priority:"Technical"},
  {rank:10,name:"RoadSoS",category:"Product",status:"Hackathon prototype · integrations pending",summary:"A mobile emergency-response workflow combining location sharing, emergency contacts, structured first-aid guidance and an incident summary.",stack:["Flutter","Firebase","Maps","SMS"],evidence:"The README describes SOS and offline-first workflows, but also identifies a simulated ambulance API call and dependencies for messaging and live place data. It is not a validated emergency service.",interview:"Critical-path UX, offline design, location permissions, deterministic triage, fail-safe messaging and safety testing.",next:"Test failure modes with emergency-service stakeholders, validate medical content and replace simulated integrations before real-world use.",priority:"Technical"},
  {rank:11,name:"FRAS",category:"AI & Automation",status:"GPU service concept · deployment unverified",summary:"A GPU-accelerated face-recognition attendance and access-monitoring microservice designed for camera streams and campus systems.",stack:["Python","FastAPI","YOLOv8","InsightFace","FAISS","Redis"],evidence:"The README specifies a detailed camera-to-embedding-to-event pipeline. No live deployment, camera acceptance test or measured field accuracy was established in this review.",interview:"Computer-vision pipeline design, vector similarity, camera ingestion, event streams, multi-tenancy and operational monitoring.",next:"Use consented test data, publish false-match/false-reject metrics and complete privacy, retention, access-control and bias reviews before any pilot.",priority:"Technical"},
  {rank:12,name:"JunctionOptima",category:"AI & Automation",status:"Simulation prototype · optimizer needs verification",summary:"A railway-junction digital-twin concept intended to simulate conflicts and generate explainable dispatch recommendations.",stack:["React","Vite","FastAPI","Python","Simulation"],evidence:"Repository contains a frontend, backend API, simulation and recommendation structure. Some optimization modules appear skeletal, and the claimed recommendation latency is not independently measured.",interview:"Constraint modelling, simulation design, API boundaries, map visualisation and explainable operational decisions.",next:"Implement and test a baseline optimizer, compare it with a documented heuristic and publish scenario-based evaluation results.",priority:"Technical"},
  {rank:13,name:"Girakshar — Speech Platform",category:"AI & Automation",status:"Integration-heavy prototype · accuracy unverified",summary:"A speech platform concept spanning transcription, translation, speaker diarization, text-to-speech and export workflows.",stack:["Node.js","Express","Python","Whisper","pyannote","Coqui"],evidence:"README describes a multi-service architecture and several model/provider options. Accuracy and language-count claims are not supported by a reproducible evaluation in the repository overview.",interview:"Model serving, streaming media, diarization, service orchestration, file processing and latency/cost trade-offs.",next:"Publish a small evaluation corpus, measure word error rate and translation quality, and demonstrate one complete local workflow without paid APIs.",priority:"Technical"},
  {rank:14,name:"AirLLM GUI",category:"AI & Automation",status:"Inference tooling · benchmark claims unverified",summary:"A cross-platform interface and runtime experiments around memory-efficient large-language-model inference.",stack:["Python","AirLLM","Android","Docker","GPU inference"],evidence:"The repository includes desktop/runtime code, an Android client and tests. The 4 GB GPU / 70B inference claim requires a reproducible model, quantisation, latency and memory benchmark.",interview:"Model loading, layer-wise offloading, memory constraints, platform integration and inference profiling.",next:"Publish benchmark scripts and results on named hardware; clearly separate supported model configurations from theoretical maximums.",priority:"Technical"},
  {rank:15,name:"Particle Motion",category:"Prototypes",status:"Interactive web demo",summary:"A gesture-controlled particle visualisation with hand tracking, touch fallback, visual presets and audio-reactive effects.",stack:["React","TypeScript","Three.js","MediaPipe"],evidence:"README includes a concrete project structure and local npm build/run instructions. Public deployment and measured device compatibility were not established.",interview:"WebGL rendering, gesture recognition, real-time interaction, rendering performance and graceful input fallbacks.",next:"Publish a live demo and record frame-rate tests on integrated and mobile GPUs.",priority:"Prototype"},
  {rank:16,name:"GeoAlarm",category:"Prototypes",status:"Mobile/backend prototype · architecture incomplete",summary:"A Flutter alarm concept that triggers on entering, leaving or dwelling within a geographic area.",stack:["Flutter","Dart","Node.js","TypeScript","Maps"],evidence:"README describes a broad microservice and cloud architecture, but marks PostgreSQL and Redis as planned and retains placeholder organisation links. Production deployment is not verified.",interview:"Geofencing, background execution, battery-aware location sampling, notification reliability and mobile permission design.",next:"Complete persistence and background geofence tests, replace placeholder references and document an actual deployment before claiming production readiness.",priority:"Prototype"},
  {rank:17,name:"DFRG",category:"Security",status:"Early scaffold · core screens are placeholders",summary:"An Android-first digital-footprint privacy concept with authentication, language support and a planned scan-to-insight workflow.",stack:["FastAPI","Expo","React Native","Supabase"],evidence:"The repository has backend/auth and database scaffolding, but scan, insights and action screens are explicitly placeholders in the documented project structure.",interview:"Privacy product design, API boundaries, authentication, mobile/backend integration and consent-driven data handling.",next:"Implement one real data-source integration and one complete user-visible risk-to-action workflow before expanding scope.",priority:"Prototype"},
  {rank:18,name:"Sampark",category:"Systems",status:"Application shell · core automation unavailable",summary:"A cross-platform device-management interface with a local SQLite registry, automation definitions and settings.",stack:["Flutter","Dart","SQLite"],evidence:"The README explicitly says pairing, connectivity, messaging, automation execution, secure credential storage and transfers are not operational. CI failures also appeared in recent dependency-update runs.",interview:"Cross-platform app structure, local persistence, capability boundaries and staged systems integration.",next:"Implement one secure end-to-end device pairing and command workflow before marketing it as a device automation hub.",priority:"Prototype"},
  {rank:19,name:"ARTEMIS",category:"Prototypes",status:"Upstream fork · own contributions need isolation",summary:"A fork of Google's ARTEMIS Android automation project. Only independently authored changes should be attributed as personal engineering work.",stack:["Python","Android","MCP","Automation"],evidence:"GitHub repository metadata identifies google/artemis as the parent and source repository. The upstream README and benchmark claims are not evidence of original authorship.",interview:"Discuss only specific commits, bug fixes, tests or extensions you personally implemented.",next:"Review the fork diff against upstream and document your exact contribution or remove it from the featured portfolio.",priority:"Archive"},
  {rank:20,name:"Intelligence Traffic Management",category:"Prototypes",status:"Repository skeleton · no implementation",summary:"An early repository placeholder for an intelligent traffic-management concept.",stack:["Not established"],evidence:"The current Git tree contains only .gitignore; no application implementation or runnable workflow was found.",interview:"Do not present as a completed project. Discuss only if you later add working code.",next:"Build a small, testable traffic scenario before including it in a project showcase.",priority:"Archive"},
  {rank:21,name:"Mysuru Tourism Enhancement",category:"Prototypes",status:"Repository skeleton · no implementation",summary:"An early repository placeholder for a Mysuru tourism concept.",stack:["Not established"],evidence:"The current Git tree contains only .gitignore; no application implementation or runnable workflow was found.",interview:"Do not present as completed work until there is a demonstrable product.",next:"Define a narrow user problem and implement one complete visitor workflow.",priority:"Archive"},
  {rank:22,name:"Scientific Calculator Game",category:"Prototypes",status:"Empty repository",summary:"A selected repository with no committed implementation available for review.",stack:["Not established"],evidence:"GitHub reports that the repository is empty.",interview:"No defensible engineering claims can be made from the repository yet.",next:"Create the initial implementation and tests before showcasing it.",priority:"Archive"},
  {rank:23,name:"NEXA",category:"Prototypes",status:"Empty repository",summary:"A selected repository with no committed implementation available for review.",stack:["Not established"],evidence:"GitHub reports that the repository is empty.",interview:"No defensible engineering claims can be made from the repository yet.",next:"Create the initial implementation and tests before showcasing it.",priority:"Archive"}
];

const filters: Array<"All" | Category> = ["All","Product","AI & Automation","Systems","Security","Prototypes"];

export default function PortfolioClient() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const filtered = useMemo(() => projects.filter((project) => {
    const matchesCategory = category === "All" || project.category === category;
    const searchable = [project.name, project.summary, project.status, ...project.stack].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(query.toLowerCase());
  }), [category, query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card, .lead-card"));
    const move = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "translateY(-4px) perspective(900px) rotateX(" + (-y * 2.8) + "deg) rotateY(" + (x * 2.8) + "deg)";
    };
    const leave = (event: PointerEvent) => { (event.currentTarget as HTMLElement).style.transform = ""; };
    cards.forEach((card) => {
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
    });
    return () => cards.forEach((card) => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    });
  }, [category, query]);

  const leadProjects = projects.filter((project) => project.priority === "Lead");
  const year = new Date().getFullYear();

  return (
    <main>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="PSP home">
            <span className="brand-mark">PSP</span><span>PUTTA SHANKAR PRASAD Y N</span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={"nav-links" + (menuOpen ? " open" : "")} aria-label="Main navigation">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
            <a href="#explorer" onClick={() => setMenuOpen(false)}>All projects</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
            <a href="#activity" onClick={() => setMenuOpen(false)}>Activity</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a className="nav-cta" href="https://github.com/PSP-YN" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="availability"><i /> SOFTWARE ENGINEERING · PRODUCT BUILDING · APPLIED AI</div>
            <h1>Build with intent.<br /><span>Verify what works.</span></h1>
            <p className="hero-lead">I’m <strong>Putta Shankar Prasad Y N</strong>, a Computer Science and Engineering undergraduate at VVCE, Mysuru. I build practical software across product engineering, AI-assisted workflows, Linux systems and application security—with a focus on working implementations over impressive claims.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">Explore selected work <ArrowRight size={15} /></a>
              <a className="btn btn-ghost" href="https://github.com/PSP-YN" target="_blank" rel="noreferrer"><Github size={15} /> GitHub profile</a>
            </div>
            <div className="hero-meta">
              <span><i /> CSE · VVCE Mysuru</span>
              <span><i /> Aspiring founder</span>
              <span><i /> India · IST</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-editorial">
              <div className="hero-editorial-top"><span>INDEPENDENT ENGINEERING PORTFOLIO</span><span>01 — 07</span></div>
              <div className="hero-editorial-statement">From problem<br />to <em>working product.</em></div>
              <p>Research the need. Design the system. Build the workflow. Validate it in practice.</p>
              <div className="hero-editorial-grid">
                <div className="hero-editorial-item"><small>FOCUS 01</small><strong>Product engineering</strong><span>Web · Mobile · Full-stack</span></div>
                <div className="hero-editorial-item"><small>FOCUS 02</small><strong>Applied intelligence</strong><span>AI · Automation · Systems</span></div>
                <div className="hero-editorial-item"><small>FOCUS 03</small><strong>Trust & reliability</strong><span>Security · Privacy · Testing</span></div>
              </div>
              <div className="hero-editorial-bottom"><span>VVCE · MYSURU, INDIA</span><span>BUILD / VERIFY / IMPROVE</span></div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">Scroll to explore ↓</div>
      </section>

      <div className="signal-strip">
        <div className="wrap signal-inner">
          <span className="signal-label">Current engineering interests</span>
          <div className="signal-items"><span><i /> Full-stack products</span><span><i /> Applied AI</span><span><i /> Developer automation</span><span><i /> AppSec & Linux systems</span></div>
        </div>
      </div>

      <section className="section" id="about">
        <div className="wrap about-grid">
          <aside className="about-aside reveal">
            <span className="eyebrow">01 / About</span>
            <div className="big-mark">PSP.</div>
            <p>Curiosity is the starting point. Verification is part of the job.</p>
          </aside>
          <div className="about-copy reveal">
            <p>I’m a CSE undergraduate at <strong>Vidyavardhaka College of Engineering, Mysuru</strong>, interested in building software that solves specific problems and can be tested in the real world.</p>
            <p>My work spans mobile and web products, local-first AI tools, automation, and security experiments. I use AI-assisted development tools as accelerators—not as substitutes for understanding the architecture, checking the behaviour or owning the result.</p>
            <p>I’m also interested in entrepreneurship: finding a narrow user problem, building a credible first version, validating it with people and improving the product from evidence.</p>
            <div className="fact-grid">
              <div className="fact"><small>Education</small><b>B.E. Computer Science & Engineering</b></div>
              <div className="fact"><small>Academic recognition</small><b>CSE Best Achiever · 2025–26</b></div>
              <div className="fact"><small>Academic record</small><b>8.70 CGPA through Semester II</b></div>
              <div className="fact"><small>Community</small><b>ASPERA · VVCE entrepreneurship club</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head reveal">
            <div><span className="eyebrow">02 / Selected engineering work</span><h2>Start with the strongest evidence.</h2></div>
            <p>These seven projects lead the portfolio because they offer the strongest combination of implementation depth, practical value and interview discussion.</p>
          </div>
          <div className="lead-grid">
            {leadProjects.map((project) => (
              <button className="lead-card reveal" key={project.rank} onClick={() => setSelected(project)}>
                <div className="lead-top"><span className="lead-rank">RANK / {String(project.rank).padStart(2,"0")}</span><span className="lead-status">{project.status}</span></div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="lead-footer">
                  <div className="lead-tags">{project.stack.slice(0,4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="lead-open">Inspect <ArrowUpRight size={14} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="explorer">
        <div className="wrap">
          <div className="section-head reveal">
            <div><span className="eyebrow">03 / Repository explorer</span><h2>The full selected set.</h2></div>
            <p>All 23 repositories you selected, ordered by portfolio value. Search by project or technology, filter by category, and open a card for evidence, interview angles and the next engineering step.</p>
          </div>
          <div className="explorer reveal">
            <div className="explorer-tools">
              <div className="filters" role="group" aria-label="Filter projects">
                {filters.map((item) => <button key={item} className={"filter-btn" + (category === item ? " active" : "")} onClick={() => setCategory(item)}>{item}</button>)}
              </div>
              <label className="search-box"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or stack..." aria-label="Search projects" /></label>
            </div>
            <div className="project-grid">
              {filtered.map((project) => (
                <button className="project-card" key={project.rank} onClick={() => setSelected(project)}>
                  <div className="project-card-top"><small>#{String(project.rank).padStart(2,"0")}</small><span className="project-pill">{project.status}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-card-bottom"><span>{project.category.toUpperCase()}</span><b>Details <ArrowUpRight size={12} /></b></div>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <div className="empty-state">No selected repositories match that search. Try another term or category.</div>}
          </div>
        </div>
      </section>

      <section className="section" id="approach">
        <div className="wrap">
          <div className="section-head reveal">
            <div><span className="eyebrow">04 / Engineering approach</span><h2>Ideas are cheap. Verification isn’t.</h2></div>
            <p>I want the work to stand up to a code review, a live demo and a conversation about trade-offs—not just a polished screenshot.</p>
          </div>
          <div className="method-grid">
            <article className="method-card reveal"><div className="method-icon"><Layers3 size={18} /></div><h3>Design the system</h3><p>Define the user, core workflow, data boundaries and failure cases before adding more features. Prefer clear interfaces over unnecessary complexity.</p></article>
            <article className="method-card reveal"><div className="method-icon"><Code2 size={18} /></div><h3>Build the smallest useful path</h3><p>Implement one complete workflow end to end. Keep prototypes, integrations and planned capabilities clearly separated.</p></article>
            <article className="method-card reveal"><div className="method-icon"><CheckCircle2 size={18} /></div><h3>Verify and communicate</h3><p>Use tests, CI, real-device checks and reproducible demos. State what is working, what is unverified and what remains.</p></article>
          </div>
          <div className="stack-wrap reveal">
            {["C / C++","Python","Rust","TypeScript","JavaScript","Dart","React","Next.js","Flutter","FastAPI","Node.js","PostgreSQL","Supabase","SQLite","Linux","Docker","GitHub Actions","Three.js","MCP"].map((item) => <span className="stack-chip" key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="section" id="learning">
        <div className="wrap">
          <div className="section-head reveal">
            <div><span className="eyebrow">05 / Learning & participation</span><h2>Beyond the repository.</h2></div>
            <p>Academic work, student communities and technical events have helped shape how I approach problems and build with other people.</p>
          </div>
          <div className="education-grid">
            <article className="education-card reveal"><small><GraduationCap size={13} /> Education</small><h3>Vidyavardhaka College of Engineering</h3><p>B.E. Computer Science & Engineering · Mysuru, Karnataka. CSE Best Achiever 2025–26; 8.70 CGPA through Semester II.</p></article>
            <article className="education-card reveal"><small><BriefcaseBusiness size={13} /> Community & events</small><h3>ASPERA and technical participation</h3><p>ASPERA entrepreneurship club, PES Mandya Pioneer / Pioneer 3.0, Infothon 7.0, CODE RED 3.0 (Round 1), SolveCon 2026, Startup Hackathon 3.0, workshops and SIH 2026 problem-statement work. No finalist or win claim is implied.</p></article>
          </div>
          <div className="education-card reveal" style={{marginTop:16}}>
            <small><Sparkles size={13} /> Selected learning credentials</small>
            <div className="credential-list">
              <div className="credential"><span>C Programming Fundamentals · University of California, Santa Cruz</span><span>Certificate</span></div>
              <div className="credential"><span>Artificial Intelligence: An Overview · Politecnico di Milano</span><span>Certificate</span></div>
              <div className="credential"><span>Information & Digital Literacy for University Success · University of Sydney</span><span>Certificate</span></div>
              <div className="credential"><span>Electrical Power Generation — An Industrial Outlook · L&T EduTech</span><span>Certificate</span></div>
            </div>
          </div>
        </div>
      </section>


      <section className="section" id="activity">
        <div className="wrap">
          <div className="section-head reveal">
            <div><span className="eyebrow">06 / GitHub activity & achievements</span><h2>Work you can inspect.</h2></div>
            <p>A concise view of public work, selected projects and verified GitHub achievements.</p>
          </div>
          <div className="activity-stats">
            <article className="activity-stat reveal"><small>Public repositories</small><strong>27</strong><span>Publicly visible projects and experiments</span></article>
            <article className="activity-stat reveal"><small>Selected projects</small><strong>23</strong><span>Curated for this portfolio</span></article>
            <article className="activity-stat reveal"><small>Profile achievements</small><strong>02</strong><span>Pull Shark · YOLO</span></article>
          </div>
          <a className="recent-contribution reveal" href="https://github.com/PSP-YN/CareerOS/pull/2" target="_blank" rel="noreferrer">
            <div><small>Verified public contribution · merged 31 October 2026</small><strong>CareerOS #2 — Refresh CareerOS landing page and product story</strong><span>2 commits · 2 files changed · +60 / −13 lines</span></div>
            <span className="recent-contribution-link">View merged PR <ArrowUpRight size={13} /></span>
          </a>
          <div className="activity-panel reveal">
            <div className="activity-panel-head"><div><span className="eyebrow">Contribution history</span><h3>Consistency over snapshots.</h3></div><a href="https://github.com/PSP-YN" target="_blank" rel="noreferrer">Open GitHub profile <ArrowUpRight size={13} /></a></div>
          </div>
          <div className="achievement-grid">
            <a className="achievement-card reveal" href="https://github.com/PSP-YN?achievement=pull-shark&tab=achievements" target="_blank" rel="noreferrer">
              <img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" alt="GitHub Pull Shark achievement" loading="lazy" />
              <span><small>GitHub achievement</small><strong>Pull Shark</strong><em>Recognises merged pull request activity.</em></span><ArrowUpRight size={15} />
            </a>
            <a className="achievement-card reveal" href="https://github.com/PSP-YN?achievement=yolo&tab=achievements" target="_blank" rel="noreferrer">
              <img src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" alt="GitHub YOLO achievement" loading="lazy" />
              <span><small>GitHub achievement</small><strong>YOLO</strong><em>GitHub profile achievement.</em></span><ArrowUpRight size={15} />
            </a>
          </div>
          <p className="activity-footnote">Repository totals count public repositories only. Project cards describe the work without exposing source links; live product links are shown only where a public website is available.</p>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap">
          <div className="contact-panel reveal">
            <div>
              <span className="eyebrow">07 / Contact</span>
              <h2>Have a real problem worth building for?</h2>
              <p>Open to thoughtful conversations about software engineering, applied AI, product ideas, internships and early-stage collaboration.</p>
            </div>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:psppspyn13@gmail.com"><Mail size={15} /> Email me</a>
              <a className="btn btn-ghost" href="https://linkedin.com/in/pspyn" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a className="btn btn-ghost" href="https://github.com/PSP-YN" target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
              <a className="btn btn-ghost" href="https://x.com/PSP_YN13" target="_blank" rel="noreferrer"><AtSign size={15} /> X <ArrowUpRight size={13} /></a>
              <a className="btn btn-ghost" href="https://www.reddit.com/user/PSP_YN/" target="_blank" rel="noreferrer"><MessageCircle size={15} /> Reddit <ArrowUpRight size={13} /></a>
              <a className="btn btn-ghost" href="https://instagram.com/psp_yn13" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner"><span>© {year} Putta Shankar Prasad Y N · Mysuru, India</span><span>Build with curiosity. Validate with evidence. Ship with intent.</span></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div><span className="eyebrow">Portfolio rank / {String(selected.rank).padStart(2,"0")} · {selected.priority}</span><h2 id="project-title">{selected.name}</h2><span className="project-pill">{selected.status}</span></div>
              <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={17} /></button>
            </div>
            <p>{selected.summary}</p>
            <div className="modal-block"><small>Implementation evidence</small><p>{selected.evidence}</p></div>
            <div className="modal-block"><small>Interview discussion</small><p>{selected.interview}</p></div>
            <div className="modal-block"><small>Next engineering milestone</small><p>{selected.next}</p></div>
            <div className="modal-block"><small>Technology stack</small><div className="lead-tags" style={{marginTop:9}}>{selected.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            <div className="modal-links">{selected.live && <a className="modal-link" href={selected.live} target="_blank" rel="noreferrer">Visit live website <ArrowUpRight size={13} /></a>}</div>
          </section>
        </div>
      )}
    </main>
  );
}