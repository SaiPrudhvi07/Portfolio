import { useEffect, useState } from "react";
import "./index.css";

const defaultData = {
  name: "Sai Prudhvi",
  title: "Aspiring Data Analyst & AI Enthusiast",
  intro:
    "B.Tech graduate in Artificial Intelligence & Data Science, passionate about Python, data analytics, machine learning and building practical technology solutions.",
  email: "samathamkotasaiprudhvi@gmail.com",
  phone: "+91 9177571645",
  location: "Hyderabad, India",
  linkedin: "https://linkedin.com/in/samathamkotasaiprudhvi",
  github: "https://github.com/Saiprudhvi07",
  about:
    "I am Samatham Kota Sai Prudhvi, a B.Tech graduate in Artificial Intelligence & Data Science with hands-on experience in SQL, Python, Excel, and Power BI. I enjoy data cleaning, dashboard development, data visualization, KPI analysis and working with real-world datasets to discover useful business insights.",
  profileImage: "/profile.jpg",
};

const projects = [
  {
    title: "Fake News Detection & Rewriting",
    category: "AI / Machine Learning",
    description:
      "A Python and GPT-based system for fake news detection and content correction.",
    tech: ["Python", "Machine Learning", "GPT", "NLP"],
  },
  {
    title: "Automated Attendance System",
    category: "AI / Computer Vision",
    description:
      "A Python-based face recognition attendance system with automated attendance tracking and real-time reports.",
    tech: ["Python", "OpenCV", "Machine Learning"],
  },
  {
    title: "Swiggy Sales Analysis",
    category: "Data Analytics",
    description:
      "Cleaned and analyzed 197K+ records using SQL, Excel and Power BI to identify KPIs, restaurant performance and pricing trends.",
    tech: ["Excel", "Power BI", "SQL", "Data Analysis"],
  },
  {
    title: "HR Analytics Dashboard",
    category: "Data Analytics",
    description:
      "Analyzed employee data to identify attrition, workforce and performance trends using Power BI.",
    tech: ["Power BI", "Excel", "Data Visualization"],
  },
  {
    title: "E-Commerce Data Analytics",
    category: "Data Analytics",
    description:
      "Analyzed sales and customer data using SQL, Excel and Power BI to identify business trends.",
    tech: ["SQL", "Excel", "Power BI"],
  },
];

const skills = [
  "Python", "SQL", "MySQL", "Excel", "Power BI", "Tableau",
  "Pandas", "NumPy", "Matplotlib", "Machine Learning",
  "HTML", "CSS", "JavaScript", "React", "Java", "Git & GitHub"
];

function App() {
  const [data, setData] = useState(() => {
    try {
      return { ...defaultData, ...JSON.parse(localStorage.getItem("saiPortfolioData") || "{}") };
    } catch {
      return defaultData;
    }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("saiPortfolioData", JSON.stringify(data));
  }, [data]);

  const openEditor = () => {
    setDraft(data);
    setEditing(true);
  };

  const saveChanges = () => {
    setData(draft);
    setEditing(false);
  };

  const resetChanges = () => {
    if (window.confirm("Reset your portfolio details to the original version?")) {
      localStorage.removeItem("saiPortfolioData");
      setData(defaultData);
      setDraft(defaultData);
      setEditing(false);
    }
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 5 * 1024 * 1024) return alert("Please choose an image smaller than 5 MB.");

    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, profileImage: reader.result }));
    reader.readAsDataURL(file);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">SP<span>.</span></a>
        <div className="nav-actions">
          <button className="edit-trigger" onClick={openEditor}>✎ Edit Portfolio</button>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        </div>
        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="eyebrow">HELLO, I'M</p>
            <h1>{data.name.split(" ")[0]} <span>{data.name.split(" ").slice(1).join(" ")}</span></h1>
            <h2>{data.title}</h2>
            <p className="hero-description">{data.intro}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary">View My Projects →</a>
              <a href="#contact" className="btn secondary">Contact Me</a>
            </div>
            <div className="social-links">
              <a href={data.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`mailto:${data.email}`}>Email</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="profile-circle">
              <img src={data.profileImage} alt={data.name} />
              <button className="photo-edit-hint" onClick={openEditor} aria-label="Edit profile photo">✎</button>
            </div>
            <div className="floating-card card-one">🐍 Python</div>
            <div className="floating-card card-two">📊 Data Analytics</div>
            <div className="floating-card card-three">🤖 AI / ML</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading"><p>GET TO KNOW ME</p><h2>About <span>Me</span></h2></div>
          <div className="about-grid">
            <div>
              <h3>Turning data into meaningful insights.</h3>
              <p>{data.about}</p>
              <p>I am looking for opportunities where I can apply my analytics and technical skills, learn from experienced professionals and contribute to meaningful projects.</p>
            </div>
            <div className="about-stats">
              <div className="stat"><strong>AI & DS</strong><span>Specialization</span></div>
              <div className="stat"><strong>Python</strong><span>Core Technology</span></div>
              <div className="stat"><strong>Power BI</strong><span>Data Visualization</span></div>
              <div className="stat"><strong>SQL</strong><span>Data Querying</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading"><p>MY TOOLKIT</p><h2>Technical <span>Skills</span></h2></div>
          <div className="skills-container">
            {skills.map((skill) => <div className="skill-card" key={skill}><span>✦</span>{skill}</div>)}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading"><p>MY WORK</p><h2>Featured <span>Projects</span></h2></div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <div className="project-links"><a href={data.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#contact">Contact ↗</a></div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="section-heading"><p>MY JOURNEY</p><h2>Experience & <span>Education</span></h2></div>
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><span className="timeline-date">2022 – 2026</span><h3>B.Tech in Artificial Intelligence & Data Science</h3><h4>DNR College of Engineering and Technology, Bhimavaram</h4><p>JNTUK | CGPA: 7.51</p></div></div>
            <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><span className="timeline-date">Nov 2025 – Jun 2026</span><h3>Data Science & Data Analytics Intern</h3><h4>SURE Trust (AICTE Approved NGO)</h4><p>Analyzed 5,000–20,000+ records using SQL, Excel and Python; tracked KPIs using Power BI dashboards and Excel reports; performed data cleaning, validation and documentation.</p></div></div>
            <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-content"><span className="timeline-date">Projects & Certifications</span><h3>Data Analytics, AI & Software Projects</h3><h4>Python • SQL • Power BI • Excel</h4><p>Built projects in fake news detection, e-commerce analytics, HR analytics, Swiggy sales analysis and automated attendance.</p></div></div>
          </div>
        </section>

        <section className="section certifications-section">
          <div className="section-heading"><p>CREDENTIALS</p><h2>Certifications</h2></div>
          <div className="cert-list">
            <div className="cert-card">Data Analytics — Talent Shine</div>
            <div className="cert-card">MySQL — Great Learning</div>
            <div className="cert-card">Power BI — Microsoft</div>
            <div className="cert-card">Deloitte Data Analytics Job Simulation</div>
            <div className="cert-card">Accenture Software Engineering Job Simulation</div>
            <div className="cert-card">Introduction to Data Science — Cisco</div>
          </div>
        </section>

        <section className="resume-section">
          <div><p className="eyebrow">LOOKING FOR OPPORTUNITIES</p><h2>Let's build something meaningful.</h2><p>Interested in working together or discussing an opportunity?</p></div>
          <a href="/resume.pdf" className="btn primary" download>Download Resume ↓</a>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading"><p>GET IN TOUCH</p><h2>Contact <span>Me</span></h2></div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's connect.</h3>
              <p>I am open to opportunities in Data Analytics, Python, Artificial Intelligence, Machine Learning and Software Development.</p>
              <div className="contact-item"><span>✉</span><div><small>Email</small><a href={`mailto:${data.email}`}>{data.email}</a></div></div>
              <div className="contact-item"><span>⌕</span><div><small>Phone</small><a href={`tel:${data.phone.replace(/\s/g, "")}`}>{data.phone}</a></div></div>
              <div className="contact-item"><span>⌖</span><div><small>Location</small><p>{data.location}</p></div></div>
            </div>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:${data.email}`; }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Your Message" rows="6" required />
              <button className="btn primary" type="submit">Send Message →</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">SP<span>.</span></div>
        <p>© 2026 {data.name}. Built with React.</p>
        <div className="footer-links"><a href="#home">Home</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
      </footer>

      {editing && (
        <div className="editor-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setEditing(false)}>
          <div className="editor-panel">
            <div className="editor-header">
              <div><span className="eyebrow">OWNER MODE</span><h2>Edit Portfolio</h2></div>
              <button className="close-editor" onClick={() => setEditing(false)}>×</button>
            </div>

            <div className="editor-photo">
              <div className="editor-photo-circle"><img src={draft.profileImage} alt="Preview" /></div>
              <div>
                <label className="upload-btn">📷 Change Profile Photo
                  <input type="file" accept="image/*" onChange={handlePhoto} hidden />
                </label>
                <small>JPG, PNG or WEBP • max 5 MB</small>
              </div>
            </div>

            <div className="editor-grid">
              <label>Name<input value={draft.name} onChange={(e) => setDraft({...draft, name:e.target.value})} /></label>
              <label>Headline<input value={draft.title} onChange={(e) => setDraft({...draft, title:e.target.value})} /></label>
              <label>Email<input value={draft.email} onChange={(e) => setDraft({...draft, email:e.target.value})} /></label>
              <label>Phone<input value={draft.phone} onChange={(e) => setDraft({...draft, phone:e.target.value})} /></label>
              <label>Location<input value={draft.location} onChange={(e) => setDraft({...draft, location:e.target.value})} /></label>
              <label>LinkedIn URL<input value={draft.linkedin} onChange={(e) => setDraft({...draft, linkedin:e.target.value})} /></label>
              <label>GitHub URL<input value={draft.github} onChange={(e) => setDraft({...draft, github:e.target.value})} /></label>
              <label className="full">Hero Introduction<textarea rows="3" value={draft.intro} onChange={(e) => setDraft({...draft, intro:e.target.value})} /></label>
              <label className="full">About Me<textarea rows="5" value={draft.about} onChange={(e) => setDraft({...draft, about:e.target.value})} /></label>
            </div>

            <div className="editor-actions">
              <button className="btn danger" onClick={resetChanges}>Reset</button>
              <div><button className="btn secondary" onClick={() => setEditing(false)}>Cancel</button><button className="btn primary" onClick={saveChanges}>Save Changes ✓</button></div>
            </div>
            <p className="editor-note">Your edits are saved in this browser using local storage. They stay on this device/browser and do not automatically update a deployed website for other visitors.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
