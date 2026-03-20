import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  IconBolt, IconHandshake, IconShield, IconCrown, IconTarget, IconCpu,
  IconArrowRight, IconTrendingUp, IconAward, IconCheck,
} from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  { Icon: IconBolt, name: 'Excellence', color: '#B8FF00', desc: 'We pursue the highest standards in everything we do, delivering world-class results for every client and partner.' },
  { Icon: IconHandshake, name: 'Service', color: '#B8FF00', desc: 'Placing the needs of our clients and communities at the heart of every decision we make.' },
  { Icon: IconShield, name: 'Integrity', color: '#B8FF00', desc: 'Transparent, honest, and ethical in all our dealings — building trust that lasts a lifetime.' },
  { Icon: IconCrown, name: 'Leadership', color: '#B8FF00', desc: 'Cultivating leaders at every level who inspire change and drive meaningful impact across Africa.' },
  { Icon: IconTarget, name: 'Discipline', color: '#B8FF00', desc: 'Consistent focus, structured execution, and unwavering commitment to delivering on our promises.' },
  { Icon: IconCpu, name: 'Technology', color: '#B8FF00', desc: 'Leveraging AI and cutting-edge tools to unlock efficiency and create scalable solutions for growth.' },
];

const milestones = [
  { year: '2018', event: 'Servelead Global Founded', detail: 'Launched with a vision to transform African business development.' },
  { year: '2020', event: 'RescueTap Launched', detail: "Nigeria's first real-time emergency response and safety platform." },
  { year: '2021', event: 'RespecTech Conference', detail: "Africa's landmark tech-talent conference with 2,000+ attendees." },
  { year: '2022', event: 'Blockchain Developers Summit', detail: "Africa's largest blockchain event — 1,500+ participants at Baze University." },
  { year: '2023', event: 'World Bank Partnership', detail: 'LAICOS Farms becomes implementing partner for L-PRES livestock program.' },
  { year: '2024', event: 'French Embassy Partnership', detail: 'Led the Bilingual & Competitive Project Launch as official implementing partners.' },
  { year: '2025', event: 'AI-BaaS Launch', detail: 'Launched AI-Driven Business Development as a Service across the group.' },
];

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {

      // Story section
      gsap.fromTo('.story-left', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.story-sec', start: 'top 80%', ...bd } });
      gsap.fromTo('.story-right', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.story-sec', start: 'top 80%', ...bd } });

      // Vision / mission cards
      gsap.fromTo('.vm-card', { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.vm-sec', start: 'top 82%', ...bd } });

      // Values alphabet
      gsap.fromTo('.val-letter', { y: 40, opacity: 0, rotateX: -30 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.65, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.vals-alpha', start: 'top 82%', ...bd } });

      // Values cards
      gsap.fromTo('.val-card', { y: 48, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.vals-cards', start: 'top 82%', ...bd } });

      // Milestones
      gsap.fromTo('.timeline-bar', { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: 'power2.out', transformOrigin: 'top', scrollTrigger: { trigger: '.milestones-sec', start: 'top 75%' } });
      gsap.fromTo('.milestone-row', { x: -44, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.milestones-sec', start: 'top 75%', ...bd } });

      // Reach grid
      gsap.fromTo('.reach-item', { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.55, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.reach-grid', start: 'top 82%', ...bd } });

      // Partners
      gsap.fromTo('.partner-box', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, stagger: 0.03, duration: 0.45, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.partners-wrap', start: 'top 83%', ...bd } });

      // Floating ring animation on scroll
      gsap.to('.ring-outer', { rotate: 360, duration: 40, repeat: -1, ease: 'none' });
      gsap.to('.ring-inner', { rotate: -360, duration: 28, repeat: -1, ease: 'none' });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Servelead Global | AI Business Development Africa</title>
        <meta name="description" content="Learn about Servelead Global — our story, vision, mission, values, and the team driving Africa's business development revolution." />
        <link rel="canonical" href="https://www.serveleadglobal.net/about" />
      </Helmet>

      <PageHero
        pageKey="about"
        tag="Our Story"
        title="Building Africa,"
        titleEm="One Startup at a Time"
        subtitle="From idea validation to market entry and global scale — Servelead Global is your end-to-end growth partner."
      />

      <div ref={pageRef}>

        {/* ═══ STORY ═══ */}
        <section className="story-sec section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px,6vw,90px)', alignItems: 'center' }} className="story-grid">
              <div className="story-left">
                <div className="tag" style={{ marginBottom: '22px' }}>Our Origin</div>
                <h2 style={{ marginBottom: '20px' }}>
                  Born from a<br />
                  <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Bold Vision</em>
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  Servelead Global was founded on a simple but powerful belief: African businesses deserve world-class support. We saw talented entrepreneurs with transformative ideas held back not by capability, but by access — to AI tools, to funding, to networks, to knowledge.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  We built Servelead Global to close that gap. As a comprehensive AI-powered business development organization, we take startups from idea validation all the way to market entry, fund readiness, and sustainable scale.
                </p>
                <p style={{ marginBottom: '36px' }}>
                  Today, we operate a group of five organizations — each solving a specific piece of the African business puzzle — under one unified vision: to be the leading catalyst for business collaboration and economic development across the continent.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
                  {['World-class AI-powered support','End-to-end startup development','$350K+ in development funds managed'].map(i => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--gray-light)' }}>
                      <span style={{ color: 'var(--lime)', flexShrink: 0 }}><IconCheck size={15} /></span>{i}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link to="/services" className="btn btn-primary">Our Services <IconArrowRight size={16} /></Link>
                  <Link to="/portfolio" className="btn btn-ghost">View Portfolio</Link>
                </div>
              </div>

              <div className="story-right" style={{ position: 'relative' }}>
                {/* Animated rings backdrop */}
                <div style={{ position: 'absolute', inset: '-10%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
                  <svg className="ring-outer" viewBox="0 0 400 400" style={{ position: 'absolute', width: '90%', opacity: 0.06 }}>
                    <circle cx="200" cy="200" r="180" fill="none" stroke="var(--lime)" strokeWidth="1" strokeDasharray="6 10" />
                  </svg>
                  <svg className="ring-inner" viewBox="0 0 400 400" style={{ position: 'absolute', width: '65%', opacity: 0.08 }}>
                    <circle cx="200" cy="200" r="180" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 8" />
                  </svg>
                </div>
                <div style={{ background: 'var(--green-deep)', padding: 'clamp(28px,4vw,48px)', border: '1px solid rgba(184,255,0,0.1)', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2vw,24px)' }}>
                    {[
                      { num: 6, suffix: '+', label: 'Businesses Built', color: 'var(--lime)' },
                      { num: 103500, suffix: '+', label: 'Lives Impacted', color: 'var(--lime)' },
                      { num: 350, suffix: 'K+', label: 'USD Managed', color: 'var(--lime)' },
                      { num: 40, suffix: '+', label: 'Global Partners', color: 'var(--lime)' },
                    ].map(({ num, suffix, label, color }) => (
                      <div key={label} style={{ textAlign: 'center', padding: 'clamp(16px,2vw,24px) 12px', borderBottom: `2px solid ${color}33` }}>
                        <div className="stat-number" style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', color }}>
                          <AnimatedCounter end={num} suffix={suffix} />
                        </div>
                        <p style={{ fontSize: '0.78rem', marginTop: '6px' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, var(--lime), var(--gold), transparent)' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'var(--dark)', border: '1px solid rgba(184,255,0,0.25)', padding: '14px 18px', animation: 'floatY 5s ease-in-out infinite', zIndex: 2 }}>
                  <div className="stat-number" style={{ fontSize: '1.8rem' }}>6+</div>
                  <p style={{ fontSize: '0.72rem', marginTop: '2px' }}>Years of Impact</p>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.story-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ VISION / MISSION ═══ */}
        <section className="vm-sec section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(20px,3vw,40px)' }} className="vm-grid">
              {[
                { label: 'Vision', Icon: IconTrendingUp, color: 'var(--lime)', bg: 'rgba(184,255,0,0.04)',
                  text: 'To be a leading catalyst for global business collaboration, recognized for transforming opportunities into impactful partnerships that contribute to economic development and prosperity in diverse markets around the world.' },
                { label: 'Mission', Icon: IconAward, color: 'var(--gold)', bg: 'rgba(212,168,67,0.04)',
                  text: 'To empower business by providing development solutions and strategic partnerships that drive growth, enhance market presence and foster sustainable success for local and international stakeholders.' },
              ].map(({ label, Icon, color, bg, text }) => (
                <div key={label} className="vm-card" style={{ background: bg, border: `1px solid ${color}22`, padding: 'clamp(32px,4vw,52px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '52px', height: '52px', background: `${color}15`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={26} color={color} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color, marginBottom: '14px' }}>{label}</h3>
                  <p style={{ fontSize: '1.02rem', lineHeight: '1.78' }}>{text}</p>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: color, opacity: 0.35 }} />
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: `${color}06` }} />
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){.vm-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ CORE VALUES — ALPHABET VISUAL ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)', overflow: 'hidden' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>What Guides Us</div>
              <h2>Our Core <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Values</em></h2>
            </div>

            {/* Large animated letters row */}
            <div className="vals-alpha" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(8px,2vw,24px)', marginBottom: 'clamp(32px,4vw,52px)', flexWrap: 'wrap' }}>
              {coreValues.map(({ name, color }, i) => (
                <div key={name} className="val-letter" style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,7vw,7rem)', fontWeight: 800,
                  color, opacity: 0.22, lineHeight: 1, letterSpacing: '-0.04em',
                  transition: 'opacity 0.3s, transform 0.3s',
                  cursor: 'default',
                  animation: `floatY ${4 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.22'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {name[0]}
                </div>
              ))}
            </div>

            {/* Value cards */}
            <div className="vals-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
              {coreValues.map(({ Icon, name, color, desc }) => (
                <div key={name} className="card val-card" style={{ padding: 'clamp(22px,3vw,36px)', borderColor: `${color}15` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ width: '44px', height: '44px', background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color={color} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color, letterSpacing: '0.02em' }}>{name}</h4>
                  </div>
                  <p style={{ fontSize: '0.86rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.vals-cards{grid-template-columns:1fr 1fr!important;}} @media(max-width:480px){.vals-cards{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ MILESTONES + REACH ═══ */}
        <section className="milestones-sec section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)' }} className="mil-grid">
              {/* Timeline */}
              <div>
                <div className="tag" style={{ marginBottom: '22px' }}>Our Journey</div>
                <h2 style={{ marginBottom: '36px' }}>Key <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Milestones</em></h2>
                <div style={{ position: 'relative', paddingLeft: '28px' }}>
                  <div className="timeline-bar" style={{ position: 'absolute', left: 0, top: 0, width: '1px', height: '100%', background: 'linear-gradient(to bottom, var(--lime), transparent)' }} />
                  {milestones.map(({ year, event, detail }, i) => (
                    <div key={year} className="milestone-row" style={{ paddingBottom: '28px', position: 'relative' }}>
                      <div style={{
                        position: 'absolute', left: '-34px', top: '4px',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: i === milestones.length - 1 ? 'var(--lime)' : 'var(--green-mid)',
                        border: `2px solid ${i === milestones.length - 1 ? 'var(--lime)' : 'rgba(184,255,0,0.3)'}`,
                        boxShadow: i === milestones.length - 1 ? '0 0 12px rgba(184,255,0,0.5)' : 'none',
                      }} />
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--lime)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>{year}</span>
                      <h5 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.98rem', marginBottom: '4px', color: 'var(--white)' }}>{event}</h5>
                      <p style={{ fontSize: '0.84rem' }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collective reach grid */}
              <div>
                <div className="tag" style={{ marginBottom: '22px' }}>Collective Reach</div>
                <h2 style={{ marginBottom: '36px' }}>By the <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Numbers</em></h2>
                <div className="reach-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,1.5vw,16px)' }}>
                  {[
                    { num: 103500, suffix: '+', label: 'People Impacted' },
                    { num: 6, suffix: '+', label: 'Businesses Built' },
                    { num: 6000, suffix: '', label: 'Beneficiaries' },
                    { num: 6200, suffix: '+', label: 'Tech Professionals' },
                    { num: 500, suffix: '+', label: 'Trained Talents' },
                    { num: 350, suffix: '+', label: 'Talents Hired' },
                    { num: 300, suffix: '', label: 'Creative Members' },
                    { num: 75, suffix: '+', label: 'Training Sessions' },
                    { num: 30, suffix: '+', label: 'Conferences' },
                    { num: 10, suffix: '+', label: 'Businesses Set Up' },
                    { num: 3000, suffix: '+', label: 'RescueTap Users' },
                    { num: 150, suffix: '+', label: 'Service Impact' },
                  ].map(({ num, suffix, label }) => (
                    <div key={label} className="reach-item" style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(14px,2vw,20px)', textAlign: 'center', transition: 'border-color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,255,0,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                    >
                      <div className="stat-number" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)' }}>
                        <AnimatedCounter end={num} suffix={suffix} />
                      </div>
                      <p style={{ fontSize: '0.72rem', marginTop: '4px' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.mil-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ PARTNERS ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>Trusted By</div>
              <h2>Our <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Partners</em></h2>
            </div>
            <div className="partners-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
              {[
                'World Bank','UNDP','French Embassy','MacArthur Foundation','NITDA',
                'IREX','AfriLabs','UNESCO','Luminate','JCI Abuja',
                'FCT-DRTS','Convexity','Paxful','Neocloud','DIAL',
                'Kukah Centre','LEAP Africa','Nigeria Jubilee Fellows','CITDA','Hubbon',
              ].map(name => (
                <div key={name} className="partner-box" style={{ background: 'var(--dark)', padding: 'clamp(16px,2.5vw,28px)', textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: 'var(--gray)', letterSpacing: '0.05em', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.background = 'rgba(184,255,0,0.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray)'; e.currentTarget.style.background = 'var(--dark)'; }}
                >{name}</div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.partners-wrap{grid-template-columns:repeat(3,1fr)!important;}} @media(max-width:480px){.partners-wrap{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="section-pad" style={{ background: 'var(--green-deep)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="tag" style={{ margin: '0 auto 26px', justifyContent: 'center' }}>Join Our Mission</div>
            <h2 style={{ maxWidth: '560px', margin: '0 auto 20px' }}>
              Be Part of Africa's<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Growth Story</em>
            </h2>
            <p style={{ maxWidth: '440px', margin: '0 auto 36px' }}>
              Whether you're a startup, an established business, or a development organization — Servelead Global is your partner for sustainable, AI-powered growth.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">Work With Us <IconArrowRight size={16} /></Link>
              <Link to="/services" className="btn btn-outline">Our Services</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
