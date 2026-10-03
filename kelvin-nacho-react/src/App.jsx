import { useState, useEffect, useRef } from 'react'

const img = (n) => `${import.meta.env.BASE_URL}img/${n}.webp`
const GITHUB = 'https://github.com/Nacho-kelvin'
const EMAIL = 'kelvinnatonia@gmail.com'
const WA = 'https://wa.me/254714188409'

const SLIDES = [
  { src: 'profile', cap: 'Kelvin at his desk', pos: '55% 50%' },
  { src: 'adobe-suite', cap: 'Brand and graphic design in the Adobe suite' },
  { src: 'moodboard-desk', cap: 'Moodboards and colour palettes' },
  { src: 'code-editor', cap: 'Building interfaces in code' },
  { src: 'design-system', cap: 'Design systems and components' },
  { src: 'portfolio-screens', cap: 'Websites across screen sizes' },
  { src: 'laptop-outdoor', cap: 'Remote-friendly, from anywhere' },
]

const SERVICES = [
  ['Brand & graphic design', 'Visual identity that holds up across every touchpoint.', 'Logos and brand identity, business cards and letterheads, social media graphics, flyers and print.'],
  ['Business websites', 'Sites that represent a business well and are simple to maintain.', 'Company and portfolio sites, landing pages, mobile-first builds, basic SEO and performance.'],
  ['Data & dashboards', 'Numbers turned into charts people actually read.', 'Reporting views, chart design, data cleanup and analysis.'],
  ['Front-end development', 'Clean, dependable code behind every screen.', 'Custom UI components, HTML, CSS and JavaScript builds, maintenance and updates.'],
]

const PROJECTS = [
  { id: 'traffic', cat: 'Data viz', title: 'Web Traffic Dashboard', img: 'web-traffic', stack: ['Python', 'Matplotlib', 'Pandas'], text: 'A grouped bar chart breaking down visitors by search, direct and social traffic month over month, built to make traffic-source shifts obvious at a glance.' },
  { id: 'gdp', cat: 'Data viz', title: 'Kenya GDP Growth Analysis', img: 'kenya-gdp', stack: ['Python', 'Matplotlib', 'Data analysis'], text: "A ten-year line chart tracking Kenya's GDP in billions of USD, used to spot the years of sharpest growth and the 2020 slowdown." },
  { id: 'chess', cat: 'Web app', title: 'Browser Chess', img: 'chess', stack: ['JavaScript', 'HTML5', 'CSS Grid'], text: 'A playable chess board for the browser, focused on clean piece rendering and simple, dependable interactions over flashy animation.' },
]

const SKILLS = {
  Design: [['Adobe Photoshop', 90], ['Adobe Illustrator', 85], ['Figma', 80], ['Brand identity', 88]],
  Build: [['HTML & CSS', 95], ['JavaScript', 88], ['React', 75], ['Responsive, accessible UI', 90]],
  Analyze: [['Python', 80], ['Data visualization', 85], ['Git & GitHub', 90], ['UI/UX fundamentals', 78]],
}

const STEPS = [
  ['Understand the goal', 'Before any design, I work out what the screen needs to say and who it is for.'],
  ['Sketch the structure', 'Wireframes and component maps, so layout decisions happen before pixels do.'],
  ['Build in the open', 'Working commits and early previews rather than a single reveal.'],
  ['Test and hand off', 'Cross-device checks, an accessibility pass and clear notes for whoever maintains it next.'],
]

const NAV = [['about', 'About'], ['services', 'Services'], ['projects', 'Projects'], ['skills', 'Skills'], ['process', 'Process'], ['contact', 'Contact']]

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" className="brand"><span className="mark">KN</span>Kelvin Nacho</a>
        <nav className={open ? 'open' : ''} aria-label="Main">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-sm">Start a project</a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  )
}

function Slideshow() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SLIDES.length
  const go = (k) => setI((k + n) % n)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000)
    return () => clearInterval(t)
  }, [paused, n])
  const key = (e) => { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1) }
  return (
    <div className="show" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Photos of Kelvin and his workspace"
      onKeyDown={key} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SLIDES.map((s, k) => (
        <figure key={s.src} className={k === i ? 'slide on' : 'slide'} aria-hidden={k !== i}>
          <img src={img(s.src)} alt={s.cap} style={{ objectPosition: s.pos }} loading={k === 0 ? 'eager' : 'lazy'} />
        </figure>
      ))}
      <div className="show-bar">
        <span aria-live="polite">{SLIDES[i].cap}</span>
        <div className="show-ctl">
          <button onClick={() => go(i - 1)} aria-label="Previous photo">‹</button>
          <button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? '▶' : '❚❚'}</button>
          <button onClick={() => go(i + 1)} aria-label="Next photo">›</button>
        </div>
      </div>
      <div className="dots">
        {SLIDES.map((s, k) => <button key={s.src} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Photo ${k + 1}`} />)}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status"><i />Available for new projects</p>
          <h1>I design brands and build websites that work.</h1>
          <p className="lede">Graphic designer and front-end developer helping businesses look credible and load fast: logos and brand identity on one side, clean, responsive websites and dashboards on the other.</p>
          <div className="actions">
            <a href="#projects" className="btn">View my work</a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </div>
        </div>
        <Slideshow />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div className="wrap split">
        <div>
          <h2>Clarity over decoration</h2>
          <p>I'm Kelvin, a graphic designer and front-end developer who likes problems with a right answer hiding in the data, or the brand, somewhere.</p>
          <p>Before I open Illustrator or a code editor, I want to know what the business is trying to say and who needs to understand it. The best design solves an actual problem, not just looks good doing it.</p>
        </div>
        <dl className="facts">
          <div><dt>Location</dt><dd>Kenya, working remotely</dd></div>
          <div><dt>Focus</dt><dd>Design and web development</dd></div>
          <div><dt>Projects in production</dt><dd>3+</dd></div>
          <div><dt>Typical reply time</dt><dd>Within 24 hours</dd></div>
          <div><dt>GitHub</dt><dd><a href={GITHUB} target="_blank" rel="noopener noreferrer">@Nacho-kelvin</a></dd></div>
        </dl>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="tint">
      <div className="wrap">
        <h2>What I can do for you</h2>
        <p className="sub">Two disciplines, one goal: make a business look credible and easy to deal with.</p>
        <div className="services">
          {SERVICES.map(([t, d, l]) => (
            <article key={t}><h3>{t}</h3><p className="strong">{d}</p><p>{l}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [f, setF] = useState('All')
  const [sel, setSel] = useState(null)
  const cats = ['All', ...new Set(PROJECTS.map((p) => p.cat))]
  const list = PROJECTS.filter((p) => f === 'All' || p.cat === f)
  useEffect(() => {
    if (!sel) return
    const k = (e) => e.key === 'Escape' && setSel(null)
    document.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [sel])
  return (
    <section id="projects">
      <div className="wrap">
        <h2>Selected projects</h2>
        <div className="filters" role="group" aria-label="Filter projects">
          {cats.map((c) => <button key={c} className={f === c ? 'on' : ''} aria-pressed={f === c} onClick={() => setF(c)}>{c}</button>)}
        </div>
        <div className="projects">
          {list.map((p) => (
            <button key={p.id} className="card" onClick={() => setSel(p)}>
              <img src={img(p.img)} alt="" loading="lazy" />
              <span className="meta">{p.cat}</span>
              <strong>{p.title}</strong>
              <span className="more">View details</span>
            </button>
          ))}
        </div>
      </div>
      {sel && (
        <div className="modal" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={sel.title}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={() => setSel(null)} aria-label="Close">×</button>
            <img src={img(sel.img)} alt={sel.title} />
            <div className="sheet-body">
              <span className="meta">{sel.cat}</span>
              <h3>{sel.title}</h3>
              <p>{sel.text}</p>
              <ul className="chips">{sel.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <a className="btn btn-sm" href={GITHUB} target="_blank" rel="noopener noreferrer">View code on GitHub</a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Skills() {
  const tabs = Object.keys(SKILLS)
  const [t, setT] = useState(tabs[0])
  return (
    <section id="skills" className="tint">
      <div className="wrap split">
        <div>
          <h2>Tools I reach for most</h2>
          <p className="sub left">Rated by day-to-day comfort, not certificates.</p>
          <div className="filters" role="tablist">
            {tabs.map((k) => <button key={k} role="tab" aria-selected={t === k} className={t === k ? 'on' : ''} onClick={() => setT(k)}>{k}</button>)}
          </div>
        </div>
        <ul className="bars" key={t}>
          {SKILLS[t].map(([name, v]) => (
            <li key={name}><div><span>{name}</span><span>{v}%</span></div><b><i style={{ '--w': `${v}%` }} /></b></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <h2>How a project moves</h2>
        <ol className="steps">
          {STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const [v, setV] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({})
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const body = `Hi Kelvin, I'm ${v.name}.\n\n${v.message}\n\nReply to: ${v.email}`
  const validate = () => {
    const e = {}
    if (!v.name.trim()) e.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
    if (v.message.trim().length < 10) e.message = 'Tell me a little more (at least 10 characters).'
    setErr(e)
    return !Object.keys(e).length
  }
  const submit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const url = import.meta.env.VITE_FORM_ENDPOINT
    if (url) {
      setMsg('Sending…')
      try {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
        if (!r.ok) throw new Error()
        setMsg('Thanks, your message was sent. I will reply within 24 hours.')
        setV({ name: '', email: '', message: '' })
      } catch { setMsg(`Could not send. Please email ${EMAIL} directly.`) }
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry from ' + v.name)}&body=${encodeURIComponent(body)}`
      setMsg('Your email app should open with the message ready to send.')
    }
  }
  const whats = () => validate() && window.open(`${WA}?text=${encodeURIComponent(body)}`, '_blank', 'noopener')
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }
  const Field = ({ k, label, ...p }) => (
    <label>{label}
      {k === 'message' ? <textarea rows="5" value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} {...p} /> : <input value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} {...p} />}
      {err[k] && <small role="alert">{err[k]}</small>}
    </label>
  )
  return (
    <section id="contact" className="tint">
      <div className="wrap split">
        <div>
          <h2>Let's build something clear</h2>
          <p className="sub left">Have a project, a dashboard or just a question? I read every message myself.</p>
          <ul className="reach">
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a> <button className="link" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></li>
            <li><a href="tel:+254714188409">0714 188 409</a></li>
            <li><a href={WA} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
            <li><a href={GITHUB} target="_blank" rel="noopener noreferrer">github.com/Nacho-kelvin</a></li>
          </ul>
        </div>
        <form onSubmit={submit} noValidate>
          <Field k="name" label="Name" autoComplete="name" />
          <Field k="email" label="Email" type="email" autoComplete="email" />
          <Field k="message" label="Message" placeholder="Tell me a bit about the project" />
          <div className="actions">
            <button className="btn" type="submit">Send message</button>
            <button className="btn btn-ghost" type="button" onClick={whats}>Send on WhatsApp</button>
          </div>
          <p className="form-msg" role="status">{msg}</p>
        </form>
      </div>
    </section>
  )
}

export default function App() {
  const [top, setTop] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const f = () => setTop(window.scrollY > 600)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <div ref={ref}>
      <Header />
      <main>
        <Hero /><About /><Services /><Projects /><Skills /><Process /><Contact />
      </main>
      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} Kelvin Nacho</span>
        <a href="#top">Back to top</a>
      </footer>
      {top && <button className="up" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>}
    </div>
  )
}
