import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  FileText,
  GraduationCap,
  Loader2,
  Menu,
  MessageCircle,
  Mic2,
  Palette,
  PenLine,
  Send,
  Sparkles,
  Video,
  X,
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzsehvr7IbPNZTD-fVfPWLv_M-UuaFQCIHbIBBkXv4p5TNDHPI103k3ZiCJ0hXGbRPaQA/exec";

const skillOptions = [
  { label: "Video Editing", icon: Video },
  { label: "Content Writing", icon: PenLine },
  { label: "Public Speaking", icon: Mic2 },
  { label: "Graphic Design", icon: Palette },
  { label: "Event Management", icon: CalendarDays },
];

const benefits = [
  {
    index: "01",
    title: "Earn as you influence",
    text: "Turn your campus network into a real growth channel with affiliate commissions on every successful order.",
    tone: "orange",
  },
  {
    index: "02",
    title: "Read more, for free",
    text: "Get selected titles delivered to your reading list, so your next recommendation comes from experience.",
    tone: "blue",
  },
  {
    index: "03",
    title: "Make it official",
    text: "Leave with an exclusive certificate and a body of campaign work you can take into your next opportunity.",
    tone: "blue",
  },
  {
    index: "04",
    title: "Meet your people",
    text: "Connect with an ambitious community of creators, organisers and future marketing leaders across Bangladesh.",
    tone: "orange",
  },
];

const responsibilities = [
  {
    number: "01",
    title: "Create the spark",
    text: "Make content that gets your campus talking: short-form video, book recommendations, stories and posts.",
  },
  {
    number: "02",
    title: "Own the moment",
    text: "Organise campus campaigns that feel native to student life, from pop-ups to club collaborations.",
  },
  {
    number: "03",
    title: "Grow the circle",
    text: "Share your unique affiliate link and turn genuine recommendations into measurable growth.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  whatsapp: "",
  university: "",
  department: "",
  currentYear: "",
  club: "",
  leadership: "",
  linkedin: "",
  socialLink: "",
  pitch: "",
};

type FormState = typeof initialForm;

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <CircleDot size={13} strokeWidth={2.5} />
      <span>{children}</span>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  optional,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  optional?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <label className="field" htmlFor={name}>
      <span className="field-label">
        {label} {required && <em>*</em>} {optional && <small>Optional</small>}
      </span>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="field-control"
        />
      )}
    </label>
  );
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const completion = useMemo(() => {
    const requiredFields = [
      form.fullName,
      form.email,
      form.whatsapp,
      form.university,
      form.department,
      form.currentYear,
      form.club,
      form.leadership,
      form.socialLink,
      form.pitch,
    ];
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [form]);

  const updateForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setSkills((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      ...form,
      relevantSkills: skills,
      submittedAt: new Date().toISOString(),
      program: "Rokomari StoryMakers",
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      if (response.ok || response.type === "opaque") {
        setIsSubmitted(true);
      } else {
        throw new Error("Unable to submit");
      }
    } catch {
      setSubmitError("We couldn't send your application just now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <a href="#top" className="brand" aria-label="Rokomari StoryMakers home">
            <LogoMark />
            <span>
              <strong className="brand-bangla">রকমারি</strong>
              <small>storymakers</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#why">Why join</a>
            <a href="#role">Your role</a>
            <a href="#apply">Application</a>
          </nav>
          <button className="nav-cta" type="button" onClick={scrollToForm}>
            Apply now <ArrowUpRight size={16} />
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#why" onClick={() => setMobileOpen(false)}>Why join</a>
            <a href="#role" onClick={() => setMobileOpen(false)}>Your role</a>
            <a href="#apply" onClick={() => setMobileOpen(false)}>Application</a>
            <button type="button" onClick={scrollToForm}>Apply now <ArrowUpRight size={15} /></button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid-texture" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow-pill"><Sparkles size={14} /> Campus ambassador programme · 2025</div>
              <h1>Make your campus <span>impossible</span> to ignore.</h1>
              <p className="hero-lede">
                StoryMakers is where student leaders turn ideas into influence, campaigns into community and every good story into momentum.
              </p>
              <div className="hero-actions">
                <button className="button button-orange" type="button" onClick={scrollToForm}>
                  Start your story <ArrowUpRight size={18} />
                </button>
                <a className="text-link light-link" href="#why">See the opportunity <ArrowDown size={17} /></a>
              </div>
              <div className="hero-footnote">
                <div className="avatar-stack" aria-hidden="true">
                  <span>NA</span><span>SM</span><span>RK</span><span>+</span>
                </div>
                <p>Join a growing network of <strong>student storytellers</strong></p>
              </div>
            </div>

            <div className="hero-visual" aria-label="A visual collage representing books, campus community and creative work">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-card card-note">
                <span className="card-kicker">Your brief</span>
                <strong>Make reading<br />feel social.</strong>
                <span className="card-line" />
                <small>storymakers / 01</small>
              </div>
              <div className="visual-card card-book">
                <div className="book-spine" />
                <div className="book-copy"><span>the</span><strong>power<br />of</strong><i>ideas</i></div>
              </div>
              <div className="visual-card card-sticker"><Sparkles size={17} /> <span>READ<br />CREATE<br />REPEAT</span></div>
              <div className="visual-card card-ticket"><span>ROKOMARI</span><strong>SM</strong><small>Dhaka · Bangladesh</small></div>
              <div className="visual-caption"><span className="caption-dot" /> You bring the energy. We bring the platform.</div>
            </div>
          </div>
          <div className="container hero-metrics">
            <div><strong>01</strong><span>Community-first brief</span></div>
            <div><strong>04</strong><span>Ways to grow with us</span></div>
            <div><strong>∞</strong><span>Room to make it yours</span></div>
            <div className="metrics-note">Built for students who<br /><em>make things happen.</em></div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-inner">
            <p>Not just another campus rep role.</p>
            <div className="intro-rule" />
            <p>It’s your platform to <strong>build, lead and be remembered.</strong></p>
          </div>
        </section>

        <section className="benefits-section" id="why">
          <div className="container">
            <div className="section-heading benefits-heading">
              <div>
                <SectionLabel>Why StoryMakers</SectionLabel>
                <h2>A little ambition<br /><em>goes a long way.</em></h2>
              </div>
              <p>We’re building more than a campus marketing team. We’re building a room for curious people to get better at the work that excites them.</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit) => {
                return (
                  <article className={`benefit-card benefit-${benefit.tone}`} key={benefit.index}>
                    <div className="benefit-top"><span>{benefit.index}</span><span className="benefit-rule" /></div>
                    <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
                    <ArrowUpRight className="card-arrow" size={19} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="role-section" id="role">
          <div className="container role-layout">
            <div className="role-intro">
              <SectionLabel light>Your canvas</SectionLabel>
              <h2>Three things<br /><em>you’ll own.</em></h2>
              <p>There is no one way to be a StoryMaker. There is, however, one shared standard: bring curiosity, consistency and a point of view.</p>
              <div className="role-stamp"><span>SM</span><small>MAKE YOUR<br />MARK</small></div>
            </div>
            <div className="role-list">
              {responsibilities.map((item) => (
                <article className="role-item" key={item.number}>
                  <div className="role-number">{item.number}</div>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  <ArrowUpRight size={21} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="apply-section" id="apply">
          <div className="container apply-layout">
            <aside className="apply-aside">
              <SectionLabel>Make it official</SectionLabel>
              <h2>Every good story<br /><em>starts with a first line.</em></h2>
              <p>Tell us what you want to make happen on your campus. We’re looking for people with initiative, not a perfect CV.</p>
              <div className="aside-details">
                <div><Clock3 size={18} /><span><strong>5 minutes</strong><small>to complete</small></span></div>
                <div><FileText size={18} /><span><strong>No file uploads</strong><small>just your best ideas</small></span></div>
                <div><MessageCircle size={18} /><span><strong>We’ll be in touch</strong><small>after reviewing</small></span></div>
              </div>
              <div className="apply-aside-note"><GraduationCap size={18} /> Open to university students across Bangladesh</div>
            </aside>

            <div className="form-shell">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-topline"><span>APPLICATION / 01</span><span>{completion}% complete</span></div>
                  <div className="progress-track"><span style={{ width: `${Math.max(completion, 4)}%` }} /></div>
                  <div className="form-section">
                    <div className="form-section-heading"><span>01</span><div><h3>Basic information</h3><p>Let’s start with the essentials.</p></div></div>
                    <div className="field-grid">
                      <Field label="Full name" name="fullName" placeholder="Your name" value={form.fullName} onChange={updateForm} required />
                      <Field label="Email address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateForm} required />
                      <Field label="WhatsApp number" name="whatsapp" type="tel" placeholder="+880 1XXX XXXXXX" value={form.whatsapp} onChange={updateForm} required />
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="form-section-heading"><span>02</span><div><h3>Academic profile</h3><p>Where are you learning and leading?</p></div></div>
                    <div className="field-grid field-grid-two">
                      <Field label="University" name="university" value={form.university} onChange={updateForm} required>
                        <div className="select-wrap"><select id="university" name="university" value={form.university} onChange={updateForm} required className="field-control"><option value="">Select your university</option><option>University of Dhaka (DU)</option><option>Institute of Business Administration, University of Dhaka</option><option>Bangladesh University of Engineering and Technology (BUET)</option><option>Jahangirnagar University (JU)</option><option>Jagannath University (JnU)</option><option>University of Rajshahi (RU)</option><option>Chittagong University (CU)</option><option>Bangladesh Agricultural University (BAU)</option><option>Shahjalal University of Science and Technology (SUST)</option><option>Khulna University of Engineering &amp; Technology (KUET)</option><option>Chittagong University of Engineering &amp; Technology (CUET)</option><option>Rajshahi University of Engineering &amp; Technology (RUET)</option><option>Khulna University (KU)</option><option>Bangladesh University of Professionals (BUP)</option><option>North South University (NSU)</option><option>BRAC University (BRACU)</option><option>Independent University, Bangladesh (IUB)</option><option>Ahsanullah University of Science and Technology (AUST)</option><option>East West University (EWU)</option><option>United International University (UIU)</option><option>University of Liberal Arts Bangladesh (ULAB)</option><option>Daffodil International University (DIU)</option></select><ChevronDown size={17} /></div>
                      </Field>
                      <Field label="Department or major" name="department" placeholder="e.g. Marketing" value={form.department} onChange={updateForm} required />
                      <Field label="Current year" name="currentYear" value={form.currentYear} onChange={updateForm} required>
                        <div className="select-wrap"><select id="currentYear" name="currentYear" value={form.currentYear} onChange={updateForm} required className="field-control"><option value="">Select your year</option><option>Freshman</option><option>Sophomore</option><option>Junior</option><option>Senior</option></select><ChevronDown size={17} /></div>
                      </Field>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="form-section-heading"><span>03</span><div><h3>Extracurricular experience</h3><p>The things you do beyond the classroom.</p></div></div>
                    <div className="field-grid field-grid-two">
                      <Field label="Primary club affiliation" name="club" placeholder="Club or organisation name" value={form.club} onChange={updateForm} required />
                      <Field label="Leadership level" name="leadership" value={form.leadership} onChange={updateForm} required>
                        <div className="select-wrap"><select id="leadership" name="leadership" value={form.leadership} onChange={updateForm} required className="field-control"><option value="">Select your level</option><option>General Member</option><option>Core Team</option><option>Executive Committee</option><option>President</option></select><ChevronDown size={17} /></div>
                      </Field>
                    </div>
                    <fieldset className="skills-fieldset">
                      <legend>Relevant skills <small>Select all that apply</small></legend>
                      <div className="skills-grid">
                        {skillOptions.map(({ label, icon: Icon }) => {
                          const selected = skills.includes(label);
                          return <button className={`skill-chip ${selected ? "selected" : ""}`} type="button" key={label} onClick={() => toggleSkill(label)} aria-pressed={selected}><Icon size={16} />{label}{selected && <Check size={14} />}</button>;
                        })}
                      </div>
                    </fieldset>
                  </div>
                  <div className="form-section">
                    <div className="form-section-heading"><span>04</span><div><h3>Digital presence & motivation</h3><p>Show us where your ideas live.</p></div></div>
                    <div className="field-grid field-grid-two">
                      <Field label="LinkedIn profile URL" name="linkedin" type="url" placeholder="linkedin.com/in/you" value={form.linkedin} onChange={updateForm} optional />
                      <Field label="Primary social media link" name="socialLink" type="url" placeholder="instagram.com/you" value={form.socialLink} onChange={updateForm} required />
                    </div>
                    <label className="field" htmlFor="pitch"><span className="field-label">The pitch <em>*</em></span><textarea id="pitch" name="pitch" rows={4} required value={form.pitch} onChange={updateForm} className="field-control" placeholder="How would you promote an upcoming Rokomari book campaign to your specific campus network?" /></label>
                  </div>
                  {submitError && <div className="submit-error" role="alert">{submitError}</div>}
                  <div className="form-submit-row"><p>By submitting, you agree to be contacted about the StoryMakers programme.</p><button className="button button-orange submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={18} className="spin" /> Sending...</> : <>Submit application <Send size={17} /></>}</button></div>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-icon"><CheckCircle2 size={42} /></div>
                  <SectionLabel>Application received</SectionLabel>
                  <h2>Your story is<br /><em>in motion.</em></h2>
                  <p>Thanks for applying to become a Rokomari StoryMaker. We’ve received your details and will be in touch after reviewing your application.</p>
                  <div className="success-signoff"><span>ROKOMARI</span><strong>Keep making<br />good things.</strong></div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#top" className="brand footer-brand"><LogoMark /><span><strong>rokomari</strong><small>storymakers</small></span></a>
          <p>For the readers, makers and movers.</p>
          <a href="#apply" className="footer-link">Become a StoryMaker <ArrowUpRight size={15} /></a>
        </div>
      </footer>
    </div>
  );
}
