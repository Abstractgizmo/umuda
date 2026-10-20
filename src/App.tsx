import { useEffect, useState, type ReactNode } from 'react'
import portrait from './assets/ismail-portrait.png'
import CvViewer from './CvViewer'

// ---------------------------------------------------------------------------
// Ismail Çimen — personal site. Trilingual: English, Swiss-standard German
// (Hochdeutsch, no ß / dialect), and Turkish. Content is sourced from the CV
// (2022) and reconciled with the 2026 timeline notes; post-2020 entries follow
// the notes (the PDF was never updated after 2020).
// ---------------------------------------------------------------------------

type Locale = 'en' | 'de'

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
]

const EMAIL = 'ismail.cimen@gmail.com'
const PHONE = '+41 (0) 77 991 86 77'

type Role = {
  years: string
  org: string
  meta?: string
  title: string
  bullets?: string[]
  note?: string
}
type Content = {
  navLabel: string
  headlinePre: string
  headlinePost?: string
  heroKicker: string
  heroLead: string
  heroParas: string[]
  ambassador: string
  sayHello: string
  // ── EDIT PER JOB APPLICATION ──────────────────────────────────────────────
  // The main-stage numbers. Add / reorder freely — the grid flexes to fit.
  stats: [string, string][]
  // ──────────────────────────────────────────────────────────────────────────
  nav: string[]
  sec: Record<'work' | 'education' | 'toolkit', { kicker: string; title: string }>
  work: Role[]
  education: { title: string; place: string; years: string; note: string; main?: boolean }[]
  toolkit: { group: string; items: string }[]
  languages: { lang: string; level: string }[]
  footerKicker: string
  footerPhone: string
  footerXbox: string
  footerBased: string
  footerBasedValue: string
  legal: string
}

const T: Record<Locale, Content> = {
  en: {
    navLabel: 'English',
    headlinePre: 'Call me',
    heroKicker: 'Winterthur · Senior Digital Product Designer — UX/UI · Interaction · Graphic',
    heroLead:
      'Some years ago — never mind how long precisely — having little or no clue and nothing particular to interest me, I thought I would design about a little and see what the fuss is about.',
    heroParas: [
      'Senior product and experience designer with many years of experience developing **digital products, services and user-centred systems**.',
      'Broad experience in **UX/UI, interaction design, product strategy, design systems, research and prototyping** — from first idea to implementation.',
      'Conceptually strong, pragmatic in execution and experienced in **interdisciplinary and international teams**.',
      'Especially drawn to complex challenges where **design, technology and social value** come together — in teams that not only develop good ideas but ship them.',
    ],
    ambassador: 'Xbox Ambassador',
    sayHello: 'Say hello',
    stats: [
      ['Shipped', '100+ designs'],
      ['Reached', '1B+ users'],
      ['Experience', '20+ years'],
      ['Based', 'Winterthur · C-permit'],
      ['Nationality', 'NL / TR'],
      ['Languages', 'EN · NL · TR · DE'],
    ],
    nav: ['Work', 'Education', 'Toolkit'],
    sec: {
      work: { kicker: 'Selected history', title: 'The voyage so far' },
      education: { kicker: 'Where it started', title: 'Education' },
      toolkit: { kicker: 'How I make things', title: 'The toolkit' },
    },
    work: [
      { years: '11/2025 — now', org: 'Stiftung Wisli', meta: 'Winterthur, CH', title: 'Product Design & 3D Printing — Werkatelier / NähWerk', bullets: ['Product design and 3D modelling in Blender, developing functional products from concept to 3D-printed production', 'Iterative prototyping and print optimisation for functionality, quality, material use and production efficiency', 'Custom solutions including modular planters, mounting systems, pallet holders, labels and tokens', 'Creative work with sketching, Zentangle, ink drawing and soapstone carving', 'NähWerk: sewing, textile production, denim upcycling and client-specific products'] },
      { years: '01/2025 — 08/2025', org: 'Läbesruum', meta: 'Winterthur, CH', title: 'Workshop Worker | LEGO Project Lead', bullets: ['Independently managed the LEGO restoration project from sorting to resale preparation', 'Developed a categorisation and storage system for thousands of LEGO components', 'Reconstructed sets, identified missing parts and managed replacements', 'Developed the foundation for a global LEGO donation initiative', 'Woodworking, production and occasional gardening activities'] },
      { years: '08/2022 — 10/2022', org: 'Steiner AG', meta: 'Zürich, CH', title: 'Product / Experience Designer', bullets: ['Designed user experiences for a digital platform in real estate and construction', 'Transformed traditional industry processes into simpler digital workflows', 'Designed solutions for cost estimation, task management, marketing and planning'] },
      { years: '07/2019 — 08/2022', org: 'Various international clients', title: 'Design Contractor / Freelance Designer', bullets: ['UX/UI and interaction design for digital products and websites', 'Information architecture, navigation design and wireframing', 'Graphic design, marketing materials and visual communication', 'Solved complex interface, usability and user-flow challenges'] },
      { years: '07/2018 — 06/2019', org: 'Legartis Technology AG', meta: 'Zürich, CH', title: 'UX Designer', bullets: ['Designed complex legal-tech workflows from wireframes to production-ready UI', 'Co-developed the product with engineers, designers and corporate attorneys', 'Built and maintained design systems across web, marketing and print'] },
      { years: '10/2017 — 01/2018', org: 'DeinDeal AG', meta: 'Zürich, CH', title: 'Senior User Experience Designer', bullets: ['Customer-centred UX design for deindeal.ch and mystore.ch', 'UX/UI concept for web applications', 'Design of the iOS and Android applications', 'Optimisation of user flows and interactions', '[Add user research / testing]', '[Add measurable improvement]'] },
      { years: '06/2016 — 09/2017', org: 'CarHub', meta: 'Beverly Hills, US', title: 'Senior Lead Designer · Founding Member', bullets: ['Built the product from early concept phase to first beta', 'Developed and shipped the first beta within twelve months', 'Ownership of information architecture, UX/UI and visual design', 'Design management and coordination of design-led product development', 'Direct collaboration with and reporting to the CEO', 'Interface between development, sales, data and operations', 'Helped shape a digital marketplace for new and used vehicles'] },
      { years: '11/2011 — 09/2016', org: 'EF Education First', meta: 'Zürich, CH', title: 'Lead Designer — UI/UX, Interaction, Graphic & Information Architecture', bullets: ['Ownership of digital product and experience design', 'UX/UI, interaction design and information architecture', 'Development of design systems, frameworks and visual standards', 'Concept, research, user testing and usability', 'Photography, typography and visual communication', 'Facilitation of workshops and creative working sessions', 'Collaboration with interdisciplinary product and engineering teams', 'Reporting to the VP Digital Marketing'] },
      { years: '12/2011 — 01/2014', org: 'Lost in Reality', meta: 'Zürich, CH', title: 'Designer', bullets: ['Concept of location-based storytelling experiences', 'Co-development of a web-based publishing platform', 'Design of location-aware digital user experiences', 'Product concept from the earliest development phase', 'Connecting storytelling, interaction design and technology'] },
      { years: '09/2009 — 02/2010', org: 'TU Delft — Faculty of Industrial Design', meta: 'Delft, NL', title: 'Teaching Assistant', bullets: ['Guiding and coaching design students through their projects', 'Support across design and development processes', 'Focus on visual identity and design communication', 'Support for collaboration with external project partners'] },
    ],
    education: [
      { title: 'Master of Arts — Design for Interaction', place: 'TU Delft', years: '2007 — 2010', note: 'Diploma', main: true },
      { title: 'Bachelor of Arts — Industrial Design', place: 'TU Eindhoven', years: '2002 — 2006', note: 'Diploma', main: true },
      { title: 'Digital Media Design', place: 'HKU Utrecht', years: '2008 — 2009', note: '2 semesters' },
      { title: 'Master of Philosophy — Kant, Logic & Cognition (course)', place: 'University of Amsterdam (UvA)', years: '2008 — 2009', note: '1 semester' },
      { title: 'Mechanical Engineering', place: 'Fontys Eindhoven', years: '2001 — 2002', note: '1 semester' },
    ],
    toolkit: [
      { group: 'Design & Research', items: 'Design Thinking · Human-Centred Design · UX Strategy · Service Design · Concept Development · Workshop Facilitation · Qualitative & Quantitative Research · User Interviews · Usability & A/B Testing · Journey Mapping · Behavioural & Data Analysis' },
      { group: 'Visual & Interaction Design', items: 'UI/UX Design · Interaction Design · Information Architecture · Design Systems · Graphic Design · Typography · Wireframing · Interactive Prototypes · Developer Handoff & Specifications' },
      { group: 'Engineering & Technology', items: '3D Modelling · Physical Prototyping · 3D Printing · Digital Fabrication · Physical Computing (Arduino, Raspberry Pi) · Creative Coding' },
      { group: 'Tools & Programming', items: 'Figma · Adobe Creative Suite · Sketch · Blender · Autodesk · SolidWorks · Unity · Processing · Principle · Origami · Framer — Foundational: HTML · CSS · JavaScript · Python · C++ · MEL' },
      { group: 'Research & Recognition', items: 'Het Beste Idee van Nederland (2004) — Freeform Cutting, selected for national TV presentation · Design and Escapism, Japan (2005) — organising committee · “Designing Natural User Interfaces for Commercial 3D Modelling Software”, TMCE 2012, Karlsruhe · “Exploring Semantics of Movement in Context”, Dutch HCI 2004' },
    ],
    languages: [
      { lang: 'English', level: 'Native / fluent' },
      { lang: 'Dutch', level: 'Native' },
      { lang: 'Turkish', level: 'Native' },
      { lang: 'German', level: 'B2 / C1 — progressing' },
    ],
    footerKicker: 'Let’s figure out what’s next',
    footerPhone: 'Phone',
    footerXbox: 'Xbox',
    footerBased: 'Based',
    footerBasedValue: 'Winterthur, Switzerland',
    legal: '— «Call me Ishmael.» Built with a fearless design intuition, disciplined by logic.',
  },

  de: {
    navLabel: 'Deutsch',
    headlinePre: 'Call me',
    heroKicker: 'Winterthur · Senior Digital Product Designer — UX/UI · Interaction · Graphic',
    heroLead:
      'Vor einigen Jahren — egal, wie lange genau — mit wenig Ahnung und nichts Besonderem, das mich reizte, dachte ich, ich gestalte ein wenig und schaue, was es damit auf sich hat.',
    heroParas: [
      'Senior Product- und Experience-Designer mit langjähriger Erfahrung in der Entwicklung **digitaler Produkte, Services und nutzerzentrierter Systeme**.',
      'Breite Erfahrung in **UX/UI, Interaction Design, Produktstrategie, Designsystemen, Research und Prototyping** — von der ersten Idee bis zur Umsetzung.',
      'Konzeptionell stark, pragmatisch in der Umsetzung und erfahren in **interdisziplinären und internationalen Teams**.',
      'Besonders reizen mich komplexe Herausforderungen, bei denen **Design, Technologie und gesellschaftlicher Nutzen** zusammenkommen — in Teams, die gute Ideen nicht nur entwickeln, sondern auch umsetzen.',
    ],
    ambassador: 'Xbox Ambassador',
    sayHello: 'Say hi',
    stats: [
      ['Ausgeliefert', '100+ Designs'],
      ['Erreicht', '1 Mrd.+ Nutzer'],
      ['Erfahrung', '20+ Jahre'],
      ['Standort', 'Winterthur · C-Bewilligung'],
      ['Nationalität', 'NL / TR'],
      ['Sprachen', 'EN · NL · TR · DE'],
    ],
    nav: ['Werdegang', 'Ausbildung', 'Werkzeug'],
    sec: {
      work: { kicker: 'Erfahrung', title: 'Erfahrung' },
      education: { kicker: 'Wo es begann', title: 'Ausbildung' },
      toolkit: { kicker: 'Wie ich Dinge mache', title: 'Wie ich Dinge mache' },
    },
    work: [
      { years: '11/2025 — heute', org: 'Stiftung Wisli', meta: 'Winterthur, CH', title: 'Produktdesign & 3D-Druck — Werkatelier / NähWerk', bullets: ['Produktdesign und 3D-Modellierung in Blender – Entwicklung funktionaler Produkte vom Konzept bis zur 3D-gedruckten Produktion', 'Iteratives Prototyping und Druckoptimierung für Funktion, Qualität, Materialeinsatz und Produktionseffizienz', 'Massgeschneiderte Lösungen wie modulare Pflanzgefässe, Halterungssysteme, Palettenhalter, Etiketten und Tokens', 'Kreative Arbeit mit Skizzieren, Zentangle, Tuschezeichnung und Specksteinbearbeitung', 'NähWerk: Nähen, Textilproduktion, Denim-Upcycling und kundenspezifische Produkte'] },
      { years: '01/2025 — 08/2025', org: 'Läbesruum', meta: 'Winterthur, CH', title: 'Werkstattmitarbeiter | Projektleitung LEGO', bullets: ['Selbstständige Leitung des LEGO-Restaurationsprojekts vom Sortieren bis zur Vorbereitung des Wiederverkaufs', 'Entwicklung eines Kategorisierungs- und Lagersystems für Tausende von LEGO-Teilen', 'Rekonstruktion von Sets, Identifikation fehlender Teile und Organisation von Ersatz', 'Grundlage für eine globale LEGO-Spendeninitiative erarbeitet', 'Holzbearbeitung, Produktion und gelegentliche Gartenarbeiten'] },
      { years: '08/2022 — 10/2022', org: 'Steiner AG', meta: 'Zürich, CH', title: 'Product / Experience Designer', bullets: ['Gestaltung von User Experiences für eine digitale Plattform im Immobilien- und Bauumfeld', 'Überführung traditioneller Branchenprozesse in einfachere digitale Workflows', 'Lösungen für Kostenschätzung, Aufgabenmanagement, Marketing und Planung'] },
      { years: '07/2019 — 08/2022', org: 'Verschiedene internationale Auftraggeber', title: 'Design Contractor / Freelance Designer', bullets: ['UX/UI- und Interaction Design für digitale Produkte und Websites', 'Informationsarchitektur, Navigationsdesign und Wireframing', 'Grafikdesign, Marketingmaterialien und visuelle Kommunikation', 'Lösung komplexer Herausforderungen in Interface, Usability und User Flows'] },
      { years: '07/2018 — 06/2019', org: 'Legartis Technology AG', meta: 'Zürich, CH', title: 'UX Designer', bullets: ['Gestaltung komplexer Legal-Tech-Workflows vom Wireframe bis zum produktionsreifen UI', 'Gemeinsame Produktentwicklung mit Engineers, Designern und Unternehmensjuristen', 'Aufbau und Pflege von Designsystemen für Web, Marketing und Print'] },
      { years: '10/2017 — 01/2018', org: 'DeinDeal AG', meta: 'Zürich, CH', title: 'Senior User Experience Designer', bullets: ['Kundenzentriertes UX-Design für deindeal.ch und mystore.ch', 'UX/UI-Konzeption für Web sowie iOS- und Android-Anwendungen'] },
      { years: '06/2016 — 09/2017', org: 'CarHub', meta: 'Beverly Hills, US', title: 'Senior Lead Designer · Founding Member', bullets: ['Aufbau des Produkts von der frühen Konzeptphase bis zur ersten Beta-Version innerhalb von zwölf Monaten', 'Verantwortung für Informationsarchitektur, UX/UI, visuelles Design und Design Management', 'Direkte Zusammenarbeit mit CEO sowie Development, Sales, Data und Operations'] },
      { years: '11/2011 — 09/2016', org: 'EF Education First', meta: 'Zürich, CH', title: 'Lead Designer – UX/UI, Interaction, Graphic & IA', bullets: ['Verantwortung für digitales Produkt- und Experience-Design, UX/UI und Informationsarchitektur', 'Designsysteme, Research, User Testing, Usability und Workshop-Moderation', 'Zusammenarbeit mit interdisziplinären Produkt- und Entwicklungsteams; Reporting an VP Digital Marketing'] },
      { years: '12/2011 — 01/2014', org: 'Lost in Reality', meta: 'Zürich, CH', title: 'Designer', bullets: ['Konzeption ortsbasierter Storytelling-Erlebnisse und einer webbasierten Publishing-Plattform', 'Erstellung eines kompletten Systems für Erlebnisbuchungen'] },
      { years: '09/2009 — 02/2010', org: 'TU Delft — Fakultät Industrial Design', meta: 'Delft, NL', title: 'Tutor', bullets: ['Begleitung und Coaching von Designstudierenden; Schwerpunkt visuelle Identität und Designkommunikation'] },
    ],
    education: [
      { title: 'Master of Arts — Design for Interaction', place: 'TU Delft', years: '2007 — 2010', note: 'Diplom', main: true },
      { title: 'Bachelor of Arts — Industrial Design', place: 'TU Eindhoven', years: '2002 — 2006', note: 'Diplom', main: true },
      { title: 'Digital Media Design', place: 'HKU Utrecht', years: '2008 — 2009', note: '2 Semester' },
      { title: 'Master of Philosophy — Kant, Logic & Cognition (Kurs)', place: 'Universität Amsterdam (UvA)', years: '2008 — 2009', note: '1 Semester' },
      { title: 'Mechanical Engineering', place: 'Fontys Eindhoven', years: '2001 — 2002', note: '1 Semester' },
    ],
    toolkit: [
      { group: 'Design & Research', items: 'Design Thinking · Human-Centred Design · UX-Strategie · Service Design · Konzeptentwicklung · Workshop-Moderation · Qualitative & quantitative Forschung · Nutzerinterviews · Usability- & A/B-Testing · Journey Mapping · Verhaltens- & Datenanalyse' },
      { group: 'Visual & Interaction Design', items: 'UI/UX Design · Interaction Design · Informationsarchitektur · Designsysteme · Grafikdesign · Typografie · Wireframing · Interaktive Prototypen · Developer Handoff & Spezifikationen' },
      { group: 'Engineering & Technologie', items: '3D-Modellierung · Physisches Prototyping · 3D-Druck · Digitale Fabrikation · Physical Computing (Arduino, Raspberry Pi) · Creative Coding' },
      { group: 'Tools & Programmierung', items: 'Figma · Adobe Creative Suite · Sketch · Blender · Autodesk · SolidWorks · Unity · Processing · Principle · Origami · Framer — Grundkenntnisse: HTML · CSS · JavaScript · Python · C++ · MEL' },
      { group: 'Forschung & Anerkennung', items: 'Het Beste Idee van Nederland (2004) — Freeform Cutting, ausgewählt für nationale TV-Präsentation · Design and Escapism, Japan (2005) — Organisationskomitee · «Designing Natural User Interfaces for Commercial 3D Modelling Software», TMCE 2012, Karlsruhe · «Exploring Semantics of Movement in Context», Dutch HCI 2004' },
    ],
    languages: [
      { lang: 'Englisch', level: 'Muttersprache' },
      { lang: 'Niederländisch', level: 'Muttersprache' },
      { lang: 'Türkisch', level: 'Muttersprache' },
      { lang: 'Deutsch', level: 'B2 / C1' },
    ],
    footerKicker: 'Finden wir heraus, was als Nächstes kommt',
    footerPhone: 'Telefon',
    footerXbox: 'Xbox',
    footerBased: 'Standort',
    footerBasedValue: 'Winterthur, Schweiz',
    legal: '— «Call Me Ishmael.»',
  },

}

// Renders **bold** spans inside a paragraph (odd segments are emphasised).
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((seg, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-paper">
            {seg}
          </strong>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
    </>
  )
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-paper sm:text-5xl">{title}</h2>
    </div>
  )
}

// Shared two-column row: right-aligned meta on the left, left-aligned content on the right.
function Row({ left, children, className = '' }: { left: ReactNode; children: ReactNode; className?: string }) {
  return (
    <li className={`grid grid-cols-1 gap-1 sm:grid-cols-[220px_1fr] sm:gap-10 md:grid-cols-[260px_1fr] ${className}`}>
      <div className="sm:text-right">{left}</div>
      <div>{children}</div>
    </li>
  )
}

export default function App() {
  const [locale, setLocale] = useState<Locale>('de')
  const t = T[locale]
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  if (hash === '#cv-pdf') return <CvViewer initial={locale} />

  const navIds = ['work', 'education', 'toolkit'] as const

  return (
    <div className="min-h-screen bg-ink font-sans text-paper">
      {/* Masthead */}
      <header className="sticky top-0 z-50 border-b border-hair bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 gap-x-[21px] px-6 py-4">
          <a href="#top" className="font-display text-lg font-semibold tracking-tight">
            İsmail Çimen<span className="text-signal">.</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {navIds.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className="label text-paper-dim transition-colors hover:text-paper"
              >
                {t.nav[i]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center rounded-full border border-hair p-0.5">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  aria-pressed={locale === l.code}
                  className={`label rounded-full px-3 py-1.5 transition-colors ${
                    locale === l.code ? 'bg-paper text-ink' : 'text-paper-dim hover:text-paper'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href="#cv-pdf"
              className="label rounded-full border border-hair px-4 py-2 text-paper transition-colors hover:border-paper"
            >
              Download
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="label hidden rounded-full bg-signal px-4 py-2 text-ink transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              {t.sayHello}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-10 px-6 pb-16 pt-[50px] lg:grid-cols-[1fr_360px] lg:gap-12 lg:pb-24">
          <div className="flex flex-col justify-center">
            <p className="label mb-6 text-paper-dim">{t.heroKicker}</p>
            <h1 className="font-display text-6xl font-light italic leading-[0.86] tracking-tight text-paper sm:text-7xl lg:text-8xl">
              {t.headlinePre}
              <br />
              <span className="font-black not-italic text-signal">Ishmael.</span>
              {t.headlinePost ? <span className="font-light italic"> {t.headlinePost}</span> : null}
            </h1>

            {/* Lead — the prominent opening statement */}
            <p className="mt-8 max-w-2xl font-display text-xl leading-snug text-paper sm:text-2xl">
              {t.heroLead}
            </p>

            {/* Supporting statements with emphasised terminology */}
            <div className="mt-6 max-w-2xl space-y-3.5">
              {t.heroParas.map((p, i) => (
                <p key={i} className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] leading-relaxed text-paper-dim">
                  <Rich text={p} />
                </p>
              ))}
            </div>

            {/* Main-stage stats — see the `stats` array (marked EDIT PER JOB APPLICATION) */}
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 pt-2 sm:grid-cols-3">
              {t.stats.map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-paper-dim">{k}</dt>
                  <dd className="mt-1 font-display text-xl text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait — sized to the text column, cropped to keep the face whole */}
          <div className="relative min-h-[420px] overflow-hidden rounded-sm border border-hair bg-ink-soft">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <img
              src={portrait}
              alt="Portrait of İsmail Çimen — flat cap and glasses, looking up and to the right against a moody blue backdrop"
              className="absolute inset-0 h-full w-full object-cover [object-position:78%_center]"
            />
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="bg-ink-soft/40">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-5">
          <SectionHeader kicker={t.sec.work.kicker} title={t.sec.work.title} />
          <ol className="space-y-12">
            {t.work.map((r) => (
              <Row
                key={r.title + r.years}
                left={
                  <>
                    {r.org && <p className="font-semibold text-paper">{r.org}</p>}
                    {r.meta && <p className="text-paper-dim">{r.meta}</p>}
                    <p className="text-paper-dim tabular-nums">{r.years}</p>
                  </>
                }
              >
                <h3 className="font-semibold text-paper">{r.title}</h3>
                {r.note && <p className="mt-2 max-w-2xl leading-relaxed text-paper/80">{r.note}</p>}
                {r.bullets && (
                  <ul className="mt-2 max-w-2xl space-y-1">
                    {r.bullets.map((b, bi) => (
                      <li key={bi} className="leading-relaxed text-paper/75">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </Row>
            ))}
          </ol>
        </div>
      </section>

      {/* Education — completed degrees first, short participations below */}
      <section id="education">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-5">
          <SectionHeader kicker={t.sec.education.kicker} title={t.sec.education.title} />
          <ol className="space-y-8">
            {t.education.filter((e) => e.main).map((e) => (
              <Row
                key={e.title}
                className="my-[10px] gap-y-[39px]"
                left={
                  <>
                    <p className="font-semibold text-paper">{e.place}</p>
                    <p className="text-paper-dim tabular-nums">{e.years}</p>
                  </>
                }
              >
                <h3 className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-semibold text-paper">{e.title}</h3>
                <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-paper/75">{e.note}</p>
              </Row>
            ))}
          </ol>
          <ol className="mt-10 space-y-3 text-sm">
            {t.education.filter((e) => !e.main).map((e) => (
              <Row
                key={e.title}
                left={
                  <>
                    <p className="text-paper-dim">{e.place}</p>
                    <p className="text-paper-dim tabular-nums">{e.years}</p>
                  </>
                }
              >
                <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-paper-dim">
                  {e.title} · {e.note}
                </p>
              </Row>
            ))}
          </ol>
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="bg-ink-soft/40">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-5">
          <SectionHeader kicker={t.sec.toolkit.kicker} title={t.sec.toolkit.title} />
          <ol className="space-y-6">
            {t.toolkit.map((tk) => (
              <Row key={tk.group} left={<p className="font-semibold text-paper">{tk.group}</p>}>
                <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] max-w-2xl text-[14px] leading-relaxed text-paper/75">{tk.items}</p>
              </Row>
            ))}
          </ol>
          <ol className="mt-12 space-y-2">
            {t.languages.map((l) => (
              <Row key={l.lang} left={<p className="font-semibold text-paper">{l.lang}</p>}>
                <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] text-paper/75">{l.level}</p>
              </Row>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer / contact */}
      <footer className="bg-signal text-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="label mb-6">{t.footerKicker}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-4xl font-light italic leading-tight tracking-tight underline decoration-2 underline-offset-8 hover:decoration-ink/40 sm:text-6xl"
          >
            {EMAIL}
          </a>
          <div className="mt-12 grid grid-cols-1 gap-8 gap-x-[22px] border-t border-ink/20 pt-8 sm:grid-cols-2">
            <div>
              <p className="label opacity-60">{t.footerPhone}</p>
              <p className="mt-1 font-mono">{PHONE}</p>
            </div>
            <div>
              <p className="label opacity-60">{t.footerBased}</p>
              <p className="mt-1 font-mono">{t.footerBasedValue}</p>
            </div>
          </div>
          <p className="mt-12 font-mono text-xs opacity-60">
            © {new Date().getFullYear()} İsmail Çimen {t.legal}
          </p>
        </div>
      </footer>
    </div>
  )
}
