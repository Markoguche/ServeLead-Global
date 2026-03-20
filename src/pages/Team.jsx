import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import {
  IconBolt, IconHandshake, IconShield, IconCrown, IconTarget, IconCpu,
  IconLeaf, IconDiamond, IconArrowRight,
} from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

// LEADERSHIP — Nathan removed, Daniel Bowman + Joshua Onoja added as per spec
const leadership = [
  {
    name: 'Ijeoma Aladesaye', role: 'GCEO, Servelead Global', dept: 'Executive',
    color: 'var(--lime)', photo: 'staff1.jpg', initial: 'IA',
    bio: 'Visionary founder and Global Chief Executive Officer driving Servelead Global\'s mission to empower African businesses through world-class AI-powered development solutions and strategic partnerships.',
  },
  {
    name: 'Pamela Williams', role: 'Head of Media & Marketing', dept: 'CEO, Aidos Creations',
    color: 'var(--gold)', photo: 'staff2.jpg', initial: 'PW',
    bio: 'Creative and strategic leader overseeing all media, marketing, and brand storytelling initiatives across the Servelead Global group.',
  },
  {
    name: 'Princess Alugwe', role: 'Director of Operations, SHI', dept: 'Community Engagement Expert',
    color: '#7EB8FF', photo: 'staff3.jpg', initial: 'PA',
    bio: 'Operations director leading Servelead Humanitarian Initiative programs and community engagement across key development projects.',
  },
  {
    name: 'Daniel Bowman', role: 'Chief Operations Officer', dept: 'COO — RescueTap',
    color: '#FF9B7A', photo: 'staff4.jpg', initial: 'DB',
    bio: 'COO of RescueTap driving the operational strategy, platform growth, and partnership development for Nigeria\'s leading emergency response tool.',
  },
  {
    name: 'Nesochi Mogbolu', role: 'Chief Operations Officer', dept: 'Operations — Servelead Global',
    color: '#B87EFF', photo: 'staff5.jpg', initial: 'NM',
    bio: 'COO driving operational excellence, systems development, and cross-functional coordination across the entire Servelead Global group.',
  },
  {
    name: 'Joshua Onoja', role: 'Director, RespecTech', dept: 'Technology Leadership',
    color: '#7EFFD4', photo: 'staff6.jpg', initial: 'JO',
    bio: 'Director of RespecTech overseeing tech product development, talent programs, startup acceleration, and the RespecTech Center operations.',
  },
];

// CORE TEAM — Jesse and Joshua removed
const coreTeam = [
  {
    name: 'Patrick Aklo', role: 'Legal Head', dept: 'Legal',
    color: 'var(--lime)', photo: 'staff7.jpg', initial: 'PA',
    bio: 'Legal strategist ensuring all operations, partnerships, and business structures meet regulatory requirements across jurisdictions.',
  },
  {
    name: 'Victor Pius', role: 'Entrepreneur-in-Residence', dept: 'Ventures',
    color: 'var(--gold)', photo: 'staff8.jpg', initial: 'VP',
    bio: 'Startup mentor and entrepreneur supporting early-stage ventures through the Servelead Venture Studio with hands-on operational guidance.',
  },
  {
    name: 'Samson Rotimi', role: 'Workforce & Career Placement Lead', dept: 'Human Capital',
    color: '#FF9B7A', photo: 'staff9.jpg', initial: 'SR',
    bio: 'Connecting trained tech talents to employment opportunities, managing career development programs and employer partnerships.',
  },
  {
    name: 'Allan Agalanga', role: 'Artificial Intelligence Lead', dept: 'AI & Innovation',
    color: '#B87EFF', photo: 'staff10.jpg', initial: 'AA',
    bio: 'AI specialist leading the integration of artificial intelligence into business development services, product offerings, and internal operations.',
  },
];

const cultureItems = [
  { Icon: IconLeaf, title: 'Pan-African Focus', desc: 'Everything we do is grounded in real African business context and challenges.' },
  { Icon: IconHandshake, title: 'Collaboration First', desc: 'We believe the best solutions emerge from diverse teams working in harmony.' },
  { Icon: IconDiamond, title: 'Growth Mindset', desc: 'We invest in every team member\'s professional and personal development.' },
  { Icon: IconBolt, title: 'Move Fast', desc: 'We prototype, test, iterate, and ship solutions at startup speed.' },
  { Icon: IconTarget, title: 'Results Over Activity', desc: 'We measure our work by impact, not hours. Outcomes drive everything.' },
  { Icon: IconCpu, title: 'AI-Native Thinking', desc: 'Every team member is equipped with AI tools and trained to leverage them.' },
  { Icon: IconShield, title: 'Sustainable Impact', desc: 'We build for longevity — ensuring our work creates lasting positive change.' },
  { Icon: IconCrown, title: 'Excellence Always', desc: 'We take immense pride in the quality of everything that leaves our hands.' },
];

function MemberCard({ member, large = false }) {
  const { name, role, dept, color, photo, initial, bio } = member;
  const cardRef = useRef(null);
  const bioRef = useRef(null);

  const handleEnter = () => {
    if (bioRef.current) gsap.to(bioRef.current, { maxHeight: 200, opacity: 1, duration: 0.4, ease: 'power3.out' });
    if (cardRef.current) gsap.to(cardRef.current, { borderColor: `${color}55`, duration: 0.3 });
  };
  const handleLeave = () => {
    if (bioRef.current) gsap.to(bioRef.current, { maxHeight: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
    if (cardRef.current) gsap.to(cardRef.current, { borderColor: 'rgba(255,255,255,0.06)', duration: 0.3 });
  };

  return (
    <div ref={cardRef} style={{ background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.06)', padding: large ? 'clamp(24px,3vw,40px)' : 'clamp(20px,2.5vw,32px)', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Photo or initials avatar */}
      <div style={{ width: large ? '76px' : '60px', height: large ? '76px' : '60px', borderRadius: '50%', overflow: 'hidden', background: `${color}1a`, border: `2px solid ${color}55`, marginBottom: '14px', flexShrink: 0 }}>
        <img src={`/${photo}`} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: large ? '1.3rem' : '1rem', color }}>
          {initial}
        </div>
      </div>

      <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: large ? '1.05rem' : '0.95rem', marginBottom: '5px', color: 'var(--white)' }}>{name}</h4>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color, marginBottom: '3px' }}>{role}</div>
      <div style={{ fontSize: '0.68rem', color: 'var(--gray)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{dept}</div>

      {/* Hover bio */}
      <div ref={bioRef} style={{ maxHeight: 0, opacity: 0, overflow: 'hidden', marginTop: 0 }}>
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${color}22` }}>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.68 }}>{bio}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: '0', background: color, transition: 'width 0.4s' }} className="card-accent" />
    </div>
  );
}

export default function Team() {
  const pageRef = useRef(null);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {
      gsap.fromTo('.leader-card', { y: 44, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.leaders-grid', start: 'top 82%', ...bd } });
      gsap.fromTo('.core-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: '.core-grid', start: 'top 83%', ...bd } });
      gsap.fromTo('.cult-item', { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.55, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.cult-grid', start: 'top 83%', ...bd } });

      // Floating animated shapes in hero area
      gsap.to('.team-orb-1', { y: -24, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.team-orb-2', { y: 20, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Team | Servelead Global</title>
        <meta name="description" content="Meet the exceptional team behind Servelead Global — the leaders, specialists, and innovators building Africa's business future." />
        <link rel="canonical" href="https://www.serveleadglobal.net/team" />
      </Helmet>

      <PageHero
        pageKey="team"
        tag="The People"
        title="Meet Our"
        titleEm="Dream Team"
        subtitle="Diverse experts united by a shared mission — to build, scale, and transform African businesses through world-class service."
      />

      <div ref={pageRef}>

        {/* ═══ LEADERSHIP ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative orbs */}
          <div className="team-orb-1" style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,255,0,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div className="team-orb-2" style={{ position: 'absolute', bottom: '10%', left: '3%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,168,67,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ marginBottom: '18px' }}>Senior Leadership</div>
              <h2>Executive <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Team</em></h2>
            </div>
            <div className="leaders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
              {leadership.map(member => (
                <div key={member.name} className="leader-card">
                  <MemberCard member={member} large />
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.leaders-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:480px){.leaders-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ CORE TEAM ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ marginBottom: '18px' }}>Specialists & Leads</div>
              <h2>Core <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Team</em></h2>
            </div>
            <div className="core-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
              {coreTeam.map(member => (
                <div key={member.name} className="core-card">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.core-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:480px){.core-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ CULTURE ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>Life at Servelead</div>
              <h2>Our <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Culture</em></h2>
            </div>
            <div className="cult-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(14px,2vw,22px)' }}>
              {cultureItems.map(({ Icon, title, desc }) => (
                <div key={title} className="card cult-item" style={{ textAlign: 'center', padding: 'clamp(20px,3vw,36px)' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(184,255,0,0.06)', border: '1px solid rgba(184,255,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <Icon size={22} color="var(--lime)" />
                  </div>
                  <h5 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--white)', marginBottom: '8px' }}>{title}</h5>
                  <p style={{ fontSize: '0.8rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.cult-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
        </section>

        {/* ═══ JOIN US ═══ */}
        <section className="section-pad" style={{ background: 'var(--green-deep)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="join-grid">
              <div>
                <div className="tag" style={{ marginBottom: '22px' }}>Join the Team</div>
                <h2 style={{ marginBottom: '20px' }}>
                  Shape Africa's<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Business Future</em>
                </h2>
                <p style={{ marginBottom: '36px' }}>
                  We're always looking for passionate individuals who believe in Africa's potential. Whether you're a technologist, strategist, designer, or business developer — there's a place for you here.
                </p>
                <Link to="/contact" className="btn btn-primary">Explore Opportunities <IconArrowRight size={16} /></Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,1.5vw,18px)' }}>
                {[
                  { dept: 'Technology', openings: '3 Openings', color: '#7EB8FF' },
                  { dept: 'Business Dev', openings: '2 Openings', color: 'var(--lime)' },
                  { dept: 'Marketing', openings: '1 Opening', color: 'var(--gold)' },
                  { dept: 'Operations', openings: '2 Openings', color: '#B87EFF' },
                ].map(({ dept, openings, color }) => (
                  <div key={dept} style={{ background: 'rgba(6,15,9,0.5)', border: `1px solid ${color}33`, padding: 'clamp(16px,2vw,28px)', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: '6px', fontSize: '0.92rem' }}>{dept}</div>
                    <div style={{ fontSize: '0.78rem', color, fontWeight: 600 }}>{openings}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:640px){.join-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

      </div>
    </>
  );
}
