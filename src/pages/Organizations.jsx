import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { IconArrowRight, IconCheck } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

// comp6=Servelead HQ, comp1=LAICOS, comp2=RespecTech, comp3=Aidos, comp4=RescueTap, comp5=Humanitarian
const orgs = [
  {
    id: 'servelead', name: 'Servelead Global', tagline: 'AI-Powered Business Development',
    category: 'Headquarters', color: 'var(--lime)', logo: 'comp6.png', initial: 'SG',
    website: 'www.serveleadglobal.net',
    about: 'Servelead Global is the flagship organization — a world-class AI-powered business development entity that empowers startups and helps businesses build, operate, and scale sustainably. We are the hub connecting all group companies.',
    services: ['AI-BaaS (AI-Driven Business Development)','Venture Studio General Partnership','Strategic Business Consulting','Fund Readiness & Investor Connections'],
    stats: [{ num: '103,500+', label: 'Lives Impacted' }, { num: '$350K+', label: 'Funds Managed' }, { num: '6+', label: 'Years Active' }, { num: '40+', label: 'Partners' }],
  },
  {
    id: 'laicos', name: 'LAICOS Farms', tagline: 'Agroconsultancy / Agri-Business Firm',
    category: 'Agriculture', color: '#7EFFD4', logo: 'comp1.png', initial: 'LF',
    website: 'laicos.com',
    about: "LAICOS Farms is an agricultural enterprise set up to provide safe and affordable foods, reduce hunger, poverty, support orphans and create new jobs for youths in Nigeria and Africa. A strategic partner of the World Bank's L-PRES project.",
    services: ['Agribusiness Consultancy','Farm Setup & Management','Agricultural Training','Farm Surveillance & Security'],
    stats: [{ num: '8,000', label: 'Unit Pond Capacity' }, { num: '2,000+', label: 'Catfish Stocked' }, { num: '500+', label: 'Farmers Trained' }, { num: '1', label: 'Hectare of Land' }],
  },
  {
    id: 'respectech', name: 'RespecTech', tagline: 'Connecting Tech Talent to Global Opportunities',
    category: 'Technology', color: '#FF4444', logo: 'comp2.png', initial: 'RT',
    website: 'respectech.africa',
    about: "RespecTech aims to leverage technology to solve Africa's most troublesome problems by empowering change makers with the knowledge and opportunity to impact change. We build tech companies and connect talent to opportunity.",
    services: ['Tech Product Design & Deployment','Tech Talent Training & Recruitment','Startup Accelerators & Incubation','Physical, Remote & Hybrid Placement'],
    stats: [{ num: '6,000+', label: 'Talents in Pool' }, { num: '500+', label: 'Graduated Talents' }, { num: '200+', label: 'Training Sessions' }, { num: '5+', label: 'Startups Built' }],
    companies: ['RespecTech','Morgen','2Zuri','Timerlane','Gathr'],
  },
  {
    id: 'aidos', name: 'Aidos Creations', tagline: 'Digital Storytelling & Creative Media',
    category: 'Creative', color: '#FF6B35', logo: 'comp3.png', initial: 'AC',
    website: 'aidoscreations.com',
    about: 'Aidos Creations is our creative powerhouse — delivering world-class digital storytelling, brand strategy, and creative media services to businesses that want to stand out and connect with their audiences.',
    services: ['Branding & Strategy Development','Social Media Marketing & Management','Photography, Videography & Documentary','Website Design & Development','Printing & Creative Space Rentals'],
    stats: [{ num: '20,000+', label: 'People Reached' }, { num: '300+', label: 'Community Members' }, { num: '50+', label: 'Brand Projects' }, { num: '5+', label: 'Years Active' }],
  },
  {
    id: 'rescuetap', name: 'RescueTap', tagline: "Nigeria's Leading Emergency Response Tool",
    category: 'Safety Tech', color: '#FF4444', logo: 'comp4.png', initial: 'RT',
    website: 'rescuetap.com',
    about: "RescueTap is a real-time, one-tap safety platform built to transform Nigeria's emergency response landscape. Leveraging mobile connectivity, it delivers instantaneous GPS/location sharing, vehicle verification, and SOS alerts bridging critical gaps in response time and commuter security.",
    services: ['One-Tap Live Location Sharing','Contextual Road Safety Intelligence','Access Control System','Instant SOS Escalation','Voice Recording','Vehicle Pre-Verification Module'],
    stats: [{ num: '1,000+', label: 'Active Users' }, { num: '50+', label: 'Emergency Alerts' }, { num: '10+', label: 'Partners' }, { num: '3,000+', label: 'Total Users' }],
  },
  {
    id: 'humanitarian', name: 'Servelead Humanitarian', tagline: 'Enhancing Educational Outcomes & Managing Development Funds',
    category: 'Nonprofit', color: '#B87EFF', logo: 'comp5.png', initial: 'SHI',
    website: 'serveleadglobal.net/humanitarian',
    about: 'A nonprofit dedicated to improving the socioeconomic status of African communities by enhancing educational outcomes and ensuring development funds deliver measurable impact. The BWB Initiative connects rural learners to urban mentors via solar-powered centers.',
    services: ['The BWB Initiative','NAAS – Nonprofit as a Service','Development Fund Management','Rural Education Programs'],
    stats: [{ num: '$700K+', label: 'Projects Executed' }, { num: '50,000+', label: 'Individuals Reached' }, { num: '500+', label: 'Youth Trained' }, { num: '45%+', label: 'Literacy Boost' }],
  },
];

function OrgLogo({ logo, initial, color, size = 64 }) {
  return (
    <div style={{ width: size, height: size, background: `${color}18`, border: `2px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
      {logo ? (
        <img src={`/${logo}`} alt={initial} style={{ width: '80%', height: '80%', objectFit: 'contain' }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <span style={{
        display: logo ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 900,
        fontSize: size * 0.3 + 'px', color, width: '100%', height: '100%',
      }}>{initial}</span>
    </div>
  );
}

export default function Organizations() {
  const pageRef = useRef(null);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {
      // Overview hub
      gsap.fromTo('.hub-item', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.hub-wrap', start: 'top 82%', ...bd } });

      // Org blocks alternate left/right
      orgs.forEach((org, i) => {
        const dir = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(`#org-left-${org.id}`, { x: -dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: `#org-${org.id}`, start: 'top 83%', ...bd } });
        gsap.fromTo(`#org-right-${org.id}`, { x: dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: `#org-${org.id}`, start: 'top 83%', ...bd } });
      });

      // Tech company badges
      gsap.fromTo('.tc-badge', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(1.6)', scrollTrigger: { trigger: '#org-respectech', start: 'top 80%', ...bd } });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Organizations | Servelead Global Group</title>
        <meta name="description" content="Explore the Servelead Global Group of companies — LAICOS Farms, RespecTech, Aidos Creations, RescueTap, and Servelead Humanitarian." />
        <link rel="canonical" href="https://www.serveleadglobal.net/organizations" />
      </Helmet>

      <PageHero
        pageKey="organizations"
        tag="Our Group"
        title="Organizations"
        titleEm="We've Built"
        subtitle="Five specialized companies united under one vision — each solving a critical piece of Africa's development puzzle."
      />

      <div ref={pageRef}>

        {/* ═══ OVERVIEW HUB ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>The Group</div>
              <h2>One Vision, <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Five Pillars</em></h2>
            </div>
            <div className="hub-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '0' }}>
              {orgs.filter(o => o.id !== 'servelead').map(({ id, name, category, color, logo, initial }) => (
                <div key={id} className="hub-item" style={{ background: 'var(--dark)', padding: 'clamp(20px,3vw,36px)', textAlign: 'center', transition: 'background 0.3s', cursor: 'default' }}
                  onClick={() => document.getElementById(`org-${id}`)?.scrollIntoView({ behavior: 'smooth' })}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--dark-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--dark)'}
                >
                  <div style={{ margin: '0 auto 14px' }}>
                    <OrgLogo logo={logo} initial={initial} color={color} size={56} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '5px', color: 'var(--white)' }}>{name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{category}</div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.hub-wrap{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
        </section>

        {/* ═══ INDIVIDUAL ORG SECTIONS ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,7vw,100px)' }}>
              {orgs.map(({ id, name, tagline, category, color, logo, initial, website, about, services, stats, companies }, idx) => (
                <div key={id} id={`org-${id}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }} className="org-grid">
                  {/* Left */}
                  <div id={`org-left-${id}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <OrgLogo logo={logo} initial={initial} color={color} size={60} />
                      <div>
                        <span style={{ fontSize: '0.67rem', letterSpacing: '0.13em', textTransform: 'uppercase', color, fontWeight: 700, display: 'block', marginBottom: '4px' }}>{category}</span>
                        <h3 style={{ fontSize: 'clamp(1.3rem,2.2vw,2rem)' }}>{name}</h3>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem,1.2vw,1.1rem)', color: 'var(--gray-light)', fontStyle: 'italic', marginBottom: '18px' }}>{tagline}</p>
                    <p style={{ marginBottom: '28px', fontSize: '0.9rem' }}>{about}</p>
                    <div style={{ marginBottom: '24px' }}>
                      <h6 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '12px' }}>Services</h6>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {services.map(s => (
                          <li key={s} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.86rem' }}>
                            <span style={{ color, flexShrink: 0, marginTop: '2px' }}><IconCheck size={14} /></span>
                            <span style={{ color: 'var(--gray-light)' }}>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={`https://${website}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color, letterSpacing: '0.08em', borderBottom: `1px solid ${color}44`, paddingBottom: '3px', transition: 'border-color 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => e.target.style.borderColor = color}
                      onMouseLeave={e => e.target.style.borderColor = `${color}44`}
                    >
                      ↗ {website}
                    </a>
                  </div>

                  {/* Right */}
                  <div id={`org-right-${id}`}>
                    <div style={{ background: `${color}06`, border: `1px solid ${color}1a`, padding: 'clamp(24px,3vw,40px)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: `${color}14`, marginBottom: companies ? '28px' : '0' }}>
                        {stats.map(({ num, label }) => (
                          <div key={label} style={{ background: `${color}05`, padding: 'clamp(16px,2.5vw,28px)', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.8vw,2.5rem)', fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.03em' }}>{num}</div>
                            <p style={{ fontSize: '0.75rem', marginTop: '5px' }}>{label}</p>
                          </div>
                        ))}
                      </div>
                      {companies && (
                        <div>
                          <h6 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '14px' }}>Tech Companies Built</h6>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {companies.map(c => (
                              <span key={c} className="tc-badge" style={{ padding: '6px 14px', border: `1px solid ${color}44`, fontSize: '0.76rem', color, fontWeight: 600 }}>{c}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: 0, right: 0, width: '36px', height: '36px', background: color, clipPath: 'polygon(100% 0,100% 100%,0 0)', opacity: 0.28 }} />
                    </div>
                  </div>

                  {/* Divider */}
                  {idx < orgs.length - 1 && <div style={{ gridColumn: '1/-1', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)', marginTop: 'clamp(24px,3vw,40px)' }} />}
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.org-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* CTA */}
        <section className="section-pad" style={{ background: 'var(--green-deep)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="tag" style={{ margin: '0 auto 26px', justifyContent: 'center' }}>Partner With Us</div>
            <h2 style={{ maxWidth: '520px', margin: '0 auto 20px' }}>
              Join the Servelead<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Ecosystem</em>
            </h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 36px' }}>
              Whether you want to invest in, partner with, or be supported by any of our organizations — we're ready to connect.
            </p>
            <Link to="/contact" className="btn btn-primary">Get Connected <IconArrowRight size={16} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}