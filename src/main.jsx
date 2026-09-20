import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ChevronDown, Clock3, ExternalLink, Facebook,
  Instagram, Mail, MapPin, Menu, Phone, Play, ShieldCheck, Trophy, Users,
  Volleyball, X, CircleDot, Star, Medal, Send
} from "lucide-react";
import "./styles.css";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdfMSJhIMz69WHDhrgB26alNopd4I0-FYVKBNbawwpcwOFvpg/viewform?usp=dialog";

const schedule = [
  { date: "25 SEP", time: "09:00 AM", sport: "Cricket", title: "Opening Match", place: "Boys Hostel Cricket Ground", tag: "DAY 01" },
  { date: "25 SEP", time: "03:30 PM", sport: "Volleyball", title: "League Round 01", place: "Boys Hostel Volleyball Court", tag: "DAY 01" },
  { date: "26 SEP", time: "09:00 AM", sport: "Cricket", title: "League Matches", place: "Boys Hostel Cricket Ground", tag: "DAY 02" },
  { date: "26 SEP", time: "04:00 PM", sport: "Volleyball", title: "Semi Finals", place: "Boys Hostel Volleyball Court", tag: "DAY 02" },
  { date: "27 SEP", time: "10:00 AM", sport: "Cricket", title: "Final", place: "Boys Hostel Cricket Ground", tag: "DAY 03" },
  { date: "27 SEP", time: "04:30 PM", sport: "Both", title: "Finals + Prize Ceremony", place: "Main Ground", tag: "DAY 03" },
];

const committee = [
  {
    name: "LAKSHYA AGARWAL",
    initials: "LA",
    year: "3RD YEAR",
    number: "01",
    photo: "/lakshya.png"
  },
  {
    name: "SAKSHAM GARG",
    initials: "SG",
    year: "3RD YEAR",
    number: "02",
    photo: "/saksham.png"
  },
  {
    name: "SAHIL PARASHAR",
    initials: "SP",
    year: "3RD YEAR",
    number: "03",
    photo: "/sahil.png"
  },
  {
    name: "SHAGUN SHARMA",
    initials: "SS",
    year: "3RD YEAR",
    number: "04",
    photo: "/shagun.png"
  }
];

const rules = [
  ["01", "Team Size", "Cricket squads should have 11 playing members. Volleyball squads should have 6 playing members."],
  ["02", "Reporting", "Teams should report before their allotted match time. Late reporting can affect match eligibility."],
  ["03", "Fair Play", "Respect opponents, officials and the ground. Abusive or unsafe behaviour will not be tolerated."],
  ["04", "Equipment", "Bring your required personal equipment. Match equipment and playing conditions will be communicated by organisers."],
  ["05", "Registration", "Only registered players can take part. Changes to a squad should be cleared with the organisers."],
  ["06", "Decision", "The organisers and match officials have the final say on match-day decisions."],
];

function useCountdown(target) {
  const get = () => {
    const d = Math.max(0, new Date(target).getTime() - Date.now());
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      minutes: Math.floor((d / 60000) % 60),
      seconds: Math.floor((d / 1000) % 60)
    };
  };
  const [time, setTime] = useState(get);
  useEffect(() => {
    const id = setInterval(() => setTime(get()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

const pad = n => String(n).padStart(2, "0");

function App() {
  const [menu, setMenu] = useState(false);
  const [sport, setSport] = useState("Cricket");
  const [showRegister, setShowRegister] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [faq, setFaq] = useState(null);
  const countdown = useCountdown("2026-09-25T09:00:00+05:30");

  const filteredSchedule = useMemo(
    () => schedule.filter(x => sport === "All" || x.sport === sport || x.sport === "Both"),
    [sport]
  );

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div className="app">
      <div className="noise" />

      <header className="nav">
        <div className="nav-inner">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand-mark"><Trophy size={25} /></span>
            <span className="brand-text">
              <b>HPL <i>4.0</i></b>
              <small>HOSTEL PREMIER LEAGUE</small>
            </span>
          </button>

          <nav className={menu ? "nav-links open" : "nav-links"}>
            {["home","about","committee","rules","gallery","contact"].map((item, i) => (
              <button key={item} className={i === 0 ? "active" : ""} onClick={() => go(item)}>
                {item}
              </button>
            ))}
          </nav>

          <button className="register-top" onClick={() => setShowRegister(true)}>
            <Users size={17}/> Register Now <ArrowRight size={16}/>
          </button>

          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="eyebrow"><span /> ABES ENGINEERING COLLEGE · BOYS HOSTEL</div>
            <h1><small>ABES PRESENTS</small>HPL <em>4.0</em></h1>
            <h2>MORE THAN A GAME</h2>
            <p>Where hostel teams meet, compete and leave with stories worth talking about.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setShowRegister(true)}>Register Now <ArrowRight size={18}/></button>
              
            </div>

            <div className="countdown-wrap">
              <div className="count-label">TOURNAMENT BEGINS IN</div>
              <div className="countdown">
                {[
                  ["DAYS", countdown.days],
                  ["HOURS", countdown.hours],
                  ["MINUTES", countdown.minutes],
                  ["SECONDS", countdown.seconds]
                ].map(([label, value]) => (
                  <div className="count-box" key={label}><strong>{pad(value)}</strong><span>{label}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-side">
            <div className="scribble">Same<br/>Passion.<br/><b>Bigger</b><br/>Battles.</div>
            <div className="hero-stamp"><span>HPL</span><b>4.0</b><small>EST. 2023</small></div>
          </div>

          <div className="hero-cards">
            <div><Trophy/><b>Exciting Matches</b><span>High intensity games</span></div>
            <div><Users/><b>Team Spirit</b><span>Build lasting bonds</span></div>
            <div><Star/><b>Show Your Talent</b><span>Get noticed</span></div>
            <div><Medal/><b>Win & Celebrate</b><span>Glory awaits</span></div>
          </div>

          <div className="scroll-hint"><ChevronDown size={15}/> SCROLL TO EXPLORE</div>
        </section>

        <div className="ticker">
          <div>CRICKET <span>✦</span> VOLLEYBALL <span>✦</span> TEAM SPIRIT <span>✦</span> HOSTEL PRIDE <span>✦</span> HPL 4.0 <span>✦</span> PLAY · COMPETE · CONNECT <span>✦</span></div>
        </div>

        <section id="about" className="section light">
          <div className="container">
            <div className="section-head">
              <div><label>01 · THE EVENT</label><h2>BUILT BY THE<br/><em>HOSTEL.</em></h2></div>
              <p>HPL is the hostel sports tournament where hostel teams come together to compete, build team spirit and enjoy the game beyond the classroom.</p>
            </div>
            <div className="about-grid">
              <div className="about-card dark"><span>01</span><Trophy/><strong>2 SPORTS</strong><small>CRICKET + VOLLEYBALL</small></div>
              <div className="about-card accent"><span>02</span><Users/><strong>TEAM FIRST</strong><small>PLAYERS · CAPTAINS · SUPPORT</small></div>
              <div className="about-card photo-card"><span>03</span><div className="photo-copy"><b>MEMORIES</b><small>ONE WEEKEND. PLENTY OF STORIES.</small></div></div>
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="container">
            <div className="split-head">
              <div><label>02 · SPORTS</label><h2>CHOOSE YOUR<br/><em>BATTLE.</em></h2></div>
              <p>Pick a sport, build your squad and get ready for match day.</p>
            </div>
            <div className="sports">
              <button className={sport === "Cricket" ? "sport active" : "sport"} onClick={() => setSport("Cricket")}>
                <div className="sport-icon"><CircleDot/></div>
                <div><small>11 PLAYERS · KNOCKOUT</small><h3>CRICKET</h3><p>Bring your XI. Own the pitch, one over at a time.</p></div>
                <strong>₹600 <span>/ team</span></strong>
              </button>
              <button className={sport === "Volleyball" ? "sport active coral" : "sport coral"} onClick={() => setSport("Volleyball")}>
                <div className="sport-icon"><Volleyball/></div>
                <div><small>6 PLAYERS · LEAGUE</small><h3>VOLLEYBALL</h3><p>Fast rallies, loud sidelines and a block worth remembering.</p></div>
                <strong>₹300 <span>/ team</span></strong>
              </button>
            </div>
          </div>
        </section>

        

        <section id="committee" className="section committee-section">
  <div className="container">

    <div className="committee-heading">

      <div>
        <label>04 · THE PEOPLE BEHIND HPL</label>

        <h2>
          MEET THE
          <br />
          <em>COMMITTEE.</em>
        </h2>
      </div>

      <p>
        The team making HPL 4.0 happen—from the first whistle
        to the final celebration.
      </p>

    </div>

    <div className="committee-grid">

      {committee.map((member, index) => (

        <div
          className={`committee-card ${index === 0 ? "featured" : ""}`}
          key={member.name}
        >

          <span className="committee-number">
            {member.number}
          </span>

          <div className="member-photo">
  <img src={member.photo} alt={member.name} />
</div>

          <div className="member-info">

            <h3>{member.name}</h3>

            <strong>{member.year}</strong>

            <small>ORGANISING COMMITTEE</small>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>

        <section id="rules" className="section light">
          <div className="container">
            <div className="section-head">
              <div><label>05 · PLAY FAIR</label><h2>THE<br/><em>RULES.</em></h2></div>
              <p>Simple rules keep the tournament competitive, safe and enjoyable for everyone.</p>
            </div>
            <div className="rules-list">
              {rules.map(([n, title, text], i) => (
                <button className="rule" key={n} onClick={() => setFaq(faq === i ? null : i)}>
                  <span>{n}</span><b>{title}</b><p className={faq === i ? "show" : ""}>{text}</p><ChevronDown className={faq === i ? "rot" : ""}/>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="split-head">
              <div><label>06 · THE VIBE</label><h2>UNDER THE<br/><em>LIGHTS.</em></h2></div>
              <p>One ground. Bright lights. Your team on the field. That's the HPL mood.</p>
            </div>
            <div className="gallery-grid">
              {[0,1,2].map((x, i) => (
                <button key={i} className={"gallery-item gi-" + i} onClick={() => {setActivePhoto(i); setGalleryOpen(true)}}>
                  <img src="/hpl-field.png" alt="HPL night match ground" />
                  <span>{["MATCH NIGHT","TEAM MOMENTS","HOSTEL PRIDE"][i]}</span>
                  <Play size={18}/>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <label>07 · GET IN TOUCH</label>
              <h2>READY TO<br/><em>PLAY?</em></h2>
              <p>For registrations, fixtures or match-day questions, reach out to the HPL organising team.</p>
              <div className="contact-lines">
                <div><MapPin/><span><b>Venue</b>Boys Hostel Sports Ground<br/>ABES Engineering College, Ghaziabad</span></div>
                <div><Mail/><span><b>Email</b>hpl@abes.ac.in</span></div>
                <div><Phone/><span><b>Help Desk</b>HPL Organising Committee</span></div>
              </div>
            </div>
            <div className="contact-box">
              <div className="contact-box-top"><ShieldCheck/><span>REGISTRATION</span></div>
              <h3>Put your team<br/>on the board.</h3>
              <p>Fill the registration form and the organisers will take it from there.</p>
              <button className="btn primary wide" onClick={() => setShowRegister(true)}>Open Registration Form <ExternalLink size={17}/></button>
              <small>Google Form · Takes about 2 minutes</small>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="brand footer-brand"><span className="brand-mark"><Trophy size={24}/></span><span className="brand-text"><b>HPL <i>4.0</i></b><small>HOSTEL PREMIER LEAGUE</small></span></div>
          <p>PLAY · COMPETE · CONNECT</p>
          <div className="socials"><button><Instagram/></button><button><Facebook/></button><button><Send/></button></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 HPL 4.0 · ABES ENGINEERING COLLEGE</span><span>MADE FOR THE HOSTEL COMMUNITY</span></div>
       <div className="developer-credit">
  <span>DESIGNED & DEVELOPED BY</span>
  <strong>SAKSHAM GARG</strong>
</div>
      </footer>

      {showRegister && (
        <div className="modal-backdrop" onClick={() => setShowRegister(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRegister(false)}><X/></button>
            <span className="modal-kicker">HPL 4.0 · REGISTRATION</span>
            <h3>Get your team<br/><em>in the game.</em></h3>
            <p>Open the registration form, fill in your team details and submit it. We'll use the submitted details for tournament coordination.</p>
            <a className="btn primary wide" href={FORM_URL} target="_blank" rel="noreferrer">Open Google Form <ExternalLink size={17}/></a>
            <div className="modal-note"><ShieldCheck size={16}/> Registration is handled through Google Forms.</div>
          </div>
        </div>
      )}

      {galleryOpen && (
        <div className="lightbox" onClick={() => setGalleryOpen(false)}>
          <button className="lightbox-close"><X/></button>
          <img src="/hpl-field.png" alt="HPL night match ground" onClick={e => e.stopPropagation()}/>
          <div className="lightbox-caption">{["MATCH NIGHT","TEAM MOMENTS","HOSTEL PRIDE"][activePhoto]}</div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
