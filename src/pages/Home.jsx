import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from '../components/AnimatedCounter';
import { IconArrowRight, IconBolt, IconHandshake, IconShield, IconCrown, IconTarget, IconCpu, IconTrendingUp, IconCheck } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  'World Bank','UNDP','French Embassy','MacArthur Foundation','NITDA','IREX','AfriLabs','UNESCO','Luminate','JCI Abuja','FCT-DRTS','Convexity','Paxful','Neocloud','DIAL',
  'World Bank','UNDP','French Embassy','MacArthur Foundation','NITDA','IREX','AfriLabs','UNESCO','Luminate','JCI Abuja','FCT-DRTS','Convexity','Paxful','Neocloud','DIAL',
];

const valueIcons = [
  { Icon: IconBolt, name: 'Excellence', desc: 'We pursue the highest standards in everything we do, delivering world-class results for every client and partner.' },
  { Icon: IconHandshake, name: 'Service', desc: 'Placing the needs of our clients and communities at the heart of every decision we make.' },
  { Icon: IconShield, name: 'Integrity', desc: 'Transparent, honest, and ethical in all our dealings — building trust that lasts a lifetime.' },
  { Icon: IconCrown, name: 'Leadership', desc: 'Cultivating leaders at every level who inspire change and drive meaningful impact across Africa.' },
  { Icon: IconTarget, name: 'Discipline', desc: 'Consistent focus, structured execution, and unwavering commitment to delivering on our promises.' },
  { Icon: IconCpu, name: 'Technology', desc: 'Leveraging AI and cutting-edge tools to unlock efficiency and create scalable solutions for growth.' },
];

export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4, a: Math.random() * 0.4 + 0.08,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,255,0,${p.a})`;
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(184,255,0,${0.07 * (1 - d / 110)})`;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 });
      tl.fromTo('.hero-tag', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo('.hero-l1', { y: '110%' }, { y: '0%', duration: 1 }, 0.4)
        .fromTo('.hero-l2', { y: '110%' }, { y: '0%', duration: 1 }, 0.52)
        .fromTo('.hero-l3', { y: '110%' }, { y: '0%', duration: 1 }, 0.64)
        .fromTo('.hero-sub', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
        .fromTo('.hero-btn', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, 1.1)
        .fromTo('.hero-stat', { y: 36, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6 }, 1.2)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.8);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Scroll section animations — bidirectional (toggleActions play reverse play reverse)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const bidirect = { toggleActions: 'play reverse play reverse' };
      const enter = { toggleActions: 'play none none none' };

      // About
      gsap.fromTo('.abt-text', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.abt-sec', start: 'top 80%', ...bidirect } });
      gsap.fromTo('.abt-visual', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.abt-sec', start: 'top 80%', ...bidirect } });

      // Services
      gsap.fromTo('.svc-hdr', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.svc-sec', start: 'top 80%', ...bidirect } });
      gsap.fromTo('.svc-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.svc-grid', start: 'top 82%', ...bidirect } });

      // Stats
      gsap.fromTo('.stat-hdr', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.stats-sec', start: 'top 80%', ...bidirect } });
      gsap.fromTo('.stat-item', { y: 44, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.65, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.stats-grid', start: 'top 83%', ...bidirect } });

      // Values
      gsap.fromTo('.val-card', { y: 48, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.val-sec', start: 'top 80%', ...bidirect } });

      // Ambassador gallery
      gsap.fromTo('.amb-img', { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.amb-sec', start: 'top 80%', ...bidirect } });
      gsap.fromTo('.amb-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.amb-sec', start: 'top 80%', ...bidirect } });

      // CTA
      gsap.fromTo('.cta-inner', { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.cta-sec', start: 'top 82%', ...enter } });

      // Parallax on hero bg
      gsap.to('.hero-bg-grad', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Servelead Global | AI-Powered Business Development for Africa</title>
        <meta name="description" content="Africa's premier AI-powered business development organization empowering startups and businesses to build, operate, and scale sustainably." />
        <link rel="canonical" href="https://www.serveleadglobal.net" />
      </Helmet>

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--dark)' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

        <div className="hero-bg-grad" style={{ position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 70% at 60% 40%, rgba(10,46,26,0.65) 0%, transparent 75%)',
        }} />
        <div style={{ position: 'absolute', right: '-8%', top: '5%', width: 'clamp(300px,45vw,640px)', height: 'clamp(300px,45vw,640px)',
          background: 'radial-gradient(circle, rgba(184,255,0,0.055) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
          animation: 'floatY 8s ease-in-out infinite',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', background: 'linear-gradient(to bottom,transparent,var(--dark))', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '80px', width: '100%' }}>
          <div style={{ maxWidth: '860px' }}>
            <div className="tag hero-tag" style={{ marginBottom: '32px' }}>Africa's #1 AI-Powered Business Development</div>

            <h1 style={{ marginBottom: 0 }}>
              <span className="split-line"><span className="hero-l1" style={{ display: 'block' }}>We Build</span></span>
              <span className="split-line"><em className="hero-l2" style={{ display: 'block', color: 'var(--lime)', fontStyle: 'italic' }}>Africa's</em></span>
              <span className="split-line"><span className="hero-l3" style={{ display: 'block' }}>Future</span></span>
            </h1>

            <p className="hero-sub" style={{ marginTop: '28px', maxWidth: '520px', fontSize: 'clamp(1rem, 1.25vw, 1.2rem)' }}>
              A world-class AI-powered business development organization empowering startups and businesses to build, operate, and scale sustainably across Africa and beyond.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '44px', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn btn-primary hero-btn">
                Explore Services <IconArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline hero-btn">Get in Touch</Link>
            </div>
          </div>

          {/* Stat cards row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px',
            marginTop: '72px', background: 'rgba(255,255,255,0.04)',
          }} className="hero-stats-grid">
            {[
              { num: 103500, suffix: '+', label: 'People Impacted' },
              { num: 6200, suffix: '+', label: 'Tech Professionals' },
              { num: 350, suffix: 'K+', label: 'USD Managed' },
              { num: 6, suffix: '+', label: 'Businesses Built' },
            ].map(({ num, suffix, label }) => (
              <div key={label} className="hero-stat"
                style={{ background: 'rgba(6,15,9,0.88)', padding: 'clamp(16px,3vw,28px)', backdropFilter: 'blur(12px)', borderTop: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderTopColor = 'var(--lime)'}
                onMouseLeave={e => e.currentTarget.style.borderTopColor = 'transparent'}
              >
                <div className="stat-number" style={{ fontSize: 'clamp(1.8rem,3.2vw,3.2rem)' }}>
                  <AnimatedCounter end={num} suffix={suffix} />
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '6px', color: 'var(--gray)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll" style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray)' }}>Scroll</span>
          <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom,var(--lime),transparent)', animation: 'scrollLine 2.2s ease-in-out infinite' }} />
        </div>

        <style>{`
          @media (max-width: 640px) { .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="marquee-wrap" style={{ background: 'var(--dark-2)' }}>
        <div className="marquee-track">
          {partners.map((p, i) => (
            <div key={i} className="marquee-item">
              <span style={{ color: 'var(--lime)', fontWeight: 700, fontSize: '0.6rem' }}>✦</span>
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ ABOUT PREVIEW ══════════════ */}
      <section className="abt-sec section-pad" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,6vw,96px)', alignItems: 'center' }} className="about-grid">
            <div className="abt-text">
              <div className="tag" style={{ marginBottom: '22px' }}>Who We Are</div>
              <h2 style={{ marginBottom: '20px' }}>
                Minimizing Cost,<br />
                <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Maximizing Impact</em>
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Servelead Global is a world-class AI-powered business development organization that empowers startups and helps businesses build, operate, and scale sustainably across Africa.
              </p>
              <p style={{ marginBottom: '36px' }}>
                We assist African businesses to minimize cost and maximize profit through strategic AI integration — taking startups from idea validation to market entry and fund readiness, with end-to-end support.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
                {['AI-powered growth strategies','Venture studio partnerships','End-to-end business support'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.92rem', color: 'var(--gray-light)' }}>
                    <span style={{ color: 'var(--lime)', flexShrink: 0 }}><IconCheck size={16} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary">Learn More</Link>
                <Link to="/portfolio" className="btn btn-ghost">View Portfolio</Link>
              </div>
            </div>

            <div className="abt-visual" style={{ position: 'relative' }}>
              <div style={{ background: 'var(--green-deep)', padding: 'clamp(28px,4vw,48px)', border: '1px solid rgba(184,255,0,0.1)', position: 'relative', overflow: 'hidden' }}>
                {[
                  { label: 'Vision', color: 'var(--lime)', text: 'To be a leading catalyst for global business collaboration, recognized for transforming opportunities into impactful partnerships that contribute to economic development worldwide.' },
                  { label: 'Mission', color: 'var(--gold)', text: 'To empower business by providing development solutions and strategic partnerships that drive growth, enhance market presence and foster sustainable success for local and international stakeholders.' },
                ].map(({ label, color, text }, i) => (
                  <div key={label} style={{ marginBottom: i === 0 ? '28px' : 0, paddingBottom: i === 0 ? '28px' : 0, borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                    <h6 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color, marginBottom: '10px', fontWeight: 700 }}>{label}</h6>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>{text}</p>
                  </div>
                ))}
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '48px', height: '48px', background: 'var(--lime)', clipPath: 'polygon(100% 0,100% 100%,0 0)' }} />
              </div>
              {/* Float badge */}
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'var(--dark)', border: '1px solid rgba(184,255,0,0.25)', padding: '16px 20px', animation: 'floatY 5s ease-in-out infinite' }}>
                <div className="stat-number" style={{ fontSize: '2.2rem' }}>6+</div>
                <p style={{ fontSize: '0.75rem', marginTop: '2px' }}>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){ .about-grid { grid-template-columns: 1fr !important; } .abt-visual { margin-top: 48px; } }`}</style>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="svc-sec section-pad" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="svc-hdr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(36px,5vw,64px)' }}>
            <div>
              <div className="tag" style={{ marginBottom: '18px' }}>What We Do</div>
              <h2>Our Core <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Services</em></h2>
            </div>
            <Link to="/services" className="btn btn-outline">All Services</Link>
          </div>

          <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {[
              { num: '01', title: 'AI-Driven Business Development', sub: 'AI-BaaS', desc: 'Integrating AI into operations, marketing, finance and decision-making to drive revenue and efficiency.', color: 'var(--lime)' },
              { num: '02', title: 'Venture Studio Partnership', sub: 'Venture Studio', desc: 'Helping startups build, go to market, and scale — connecting them to the funding and support they need.', color: 'var(--gold)' },
              { num: '03', title: 'Event & Program Management', sub: 'Events', desc: 'World-class event execution from intimate workshops to 2,000+ person conferences with measurable impact.', color: '#7EB8FF' },
              { num: '04', title: 'Training & Capacity Building', sub: 'Training', desc: 'Empowering talent through 75+ sessions delivered, 500+ trained tech professionals, and career placement.', color: '#FF9B7A' },
            ].map(({ num, title, sub, desc, color }) => (
              <div key={num} className="svc-card"
                style={{ background: 'var(--dark)', padding: 'clamp(28px,4vw,52px)', position: 'relative', transition: 'background 0.35s', overflow: 'hidden', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,255,0,0.025)'; e.currentTarget.querySelector('.svc-line').style.width = '100%'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--dark)'; e.currentTarget.querySelector('.svc-line').style.width = '0%'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color, opacity: 0.12, lineHeight: 1, letterSpacing: '-0.04em' }}>{num}</span>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color, border: `1px solid ${color}33`, padding: '4px 12px', flexShrink: 0 }}>{sub}</span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.2rem,1.8vw,1.8rem)', marginBottom: '14px' }}>{title}</h3>
                <p style={{ fontSize: '0.92rem' }}>{desc}</p>
                <div className="svc-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '2px', background: color, transition: 'width 0.4s var(--transition)' }} />
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){ .svc-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="stats-sec section-pad" style={{ background: 'var(--green-deep)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 85%,rgba(184,255,0,0.07) 0%,transparent 50%),radial-gradient(circle at 85% 15%,rgba(212,168,67,0.05) 0%,transparent 50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="stat-hdr" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>Our Collective Reach</div>
            <h2>Impact That <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Speaks</em></h2>
          </div>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(16px,2.5vw,36px)' }}>
            {[
              { num: 103500, suffix: '+', label: 'People Impacted', detail: 'Trainings, projects & programs' },
              { num: 6200, suffix: '+', label: 'Tech Professionals', detail: 'In our talent pool' },
              { num: 75, suffix: '+', label: 'Training Sessions', detail: 'Delivered across Africa' },
              { num: 350000, suffix: '+', label: 'USD Managed', detail: 'In development funds' },
              { num: 500, suffix: '+', label: 'Trained Talents', detail: 'Graduated and placed' },
              { num: 350, suffix: '+', label: 'Talents Hired', detail: 'By partner organizations' },
              { num: 30, suffix: '+', label: 'Conferences', detail: 'And corporate events' },
              { num: 6000, suffix: '', label: 'Beneficiaries', detail: 'Direct program graduates' },
            ].map(({ num, suffix, label, detail }) => (
              <div key={label} className="stat-item"
                style={{ textAlign: 'center', padding: 'clamp(16px,2.5vw,28px) clamp(8px,1.5vw,16px)', borderBottom: '1px solid rgba(184,255,0,0.1)' }}
              >
                <div className="stat-number" style={{ fontSize: 'clamp(1.8rem,3.5vw,3.8rem)' }}>
                  <AnimatedCounter end={num} suffix={suffix} />
                </div>
                <div style={{ fontWeight: 600, color: 'var(--white)', marginTop: '8px', fontSize: '0.88rem' }}>{label}</div>
                <p style={{ fontSize: '0.72rem', color: 'var(--gray)', marginTop: '3px' }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
      </section>

      {/* ══════════════ US AMBASSADOR GALLERY ══════════════ */}
      <section className="amb-sec section-pad" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }} className="amb-grid">
            <div className="amb-text">
              <div className="tag" style={{ marginBottom: '20px', borderColor: 'rgba(212,168,67,0.4)', color: 'var(--gold)' }}>Recognition</div>
              <h2 style={{ marginBottom: '20px' }}>
                US Ambassador<br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Visits SLG HQ</em>
              </h2>
              <p style={{ marginBottom: '20px' }}>
                A landmark moment for Servelead Global as the United States Ambassador to Nigeria visited our headquarters — a powerful recognition of our impact, mission, and growing influence in Africa's business development landscape.
              </p>
              <p style={{ marginBottom: '32px' }}>
                This visit underscored the international credibility of our work and the global partnerships we continue to build in service of Africa's economic future.
              </p>
              <Link to="/about" className="btn btn-outline" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                Our Story <IconArrowRight size={16} color="var(--gold)" />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['amb1.png','amb2.png','amb3.png','amb4.png','amb5.png','amb6.png','amb7.png','amb8.png'].map((img, i) => (
                <div key={img} className="amb-img img-zoom"
                  style={{
                    aspectRatio: i === 0 ? '16/10' : '1/1',
                    gridColumn: i === 0 ? '1 / -1' : 'auto',
                    background: 'var(--green-mid)', overflow: 'hidden',
                    border: '1px solid rgba(212,168,67,0.15)',
                    animation: `floatY${i % 2 === 0 ? '' : '2'} ${5 + i}s ease-in-out infinite`,
                  }}
                >
                  <img src={`/${img}`} alt={`US Ambassador visit ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = `rgba(${i%2===0?'184,255,0':'212,168,67'},0.08)`;
                      e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--gray);font-size:0.75rem;font-family:var(--font-body);">Ambassador Visit ${i+1}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:768px){ .amb-grid { grid-template-columns: 1fr !important; } }
          @keyframes floatY2 { 0%,100%{transform:translateY(-10px)} 50%{transform:translateY(6px)} }
        `}</style>
      </section>

      {/* ══════════════ CORE VALUES ══════════════ */}
      <section className="val-sec section-pad" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,60px)' }}>
            <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>Our Foundation</div>
            <h2>Core <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Values</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(14px,2vw,22px)' }} className="vals-grid">
            {valueIcons.map(({ Icon, name, desc }, i) => (
              <div key={name} className="card val-card" style={{ textAlign: 'center', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(184,255,0,0.07)', border: '1px solid rgba(184,255,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', borderRadius: '0' }}>
                  <Icon size={24} color="var(--lime)" />
                </div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--lime)', marginBottom: '10px', letterSpacing: '0.02em' }}>{name}</h4>
                <p style={{ fontSize: '0.86rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ .vals-grid { grid-template-columns: 1fr 1fr !important; } } @media(max-width:480px){ .vals-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="cta-sec section-pad" style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 70% at 50% 50%,rgba(184,255,0,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="container cta-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="tag" style={{ margin: '0 auto 26px', justifyContent: 'center' }}>Ready to Scale?</div>
          <h2 style={{ maxWidth: '660px', margin: '0 auto 20px' }}>
            Let's Build Something<br />
            <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Extraordinary</em>
          </h2>
          <p style={{ maxWidth: '480px', margin: '0 auto 44px', fontSize: 'clamp(0.98rem,1.25vw,1.15rem)' }}>
            Whether you're a startup seeking funding, a business looking to integrate AI, or an organization ready to scale — we're your partner for sustainable growth.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Start Your Journey <IconArrowRight size={16} /></Link>
            <Link to="/portfolio" className="btn btn-ghost">See Our Work</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(28px,5vw,56px)', marginTop: '56px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
            {[{ label: '40+', sub: 'Global Partners' }, { label: '10+', sub: 'Businesses Set Up' }, { label: '3K+', sub: 'RescueTap Users' }].map(({ label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, color: 'var(--gold)' }}>{label}</div>
                <p style={{ fontSize: '0.8rem', marginTop: '3px', color: 'var(--gray)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
