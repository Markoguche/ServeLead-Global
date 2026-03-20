import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { IconCpu, IconRocket, IconAward, IconBook, IconHeart, IconBriefcase, IconArrowRight, IconCheck } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'aibaas', num: '01',
    title: 'AI-Driven Business Development as a Service',
    short: 'AI-BaaS', Icon: IconCpu, color: 'var(--lime)',
    desc: 'We help companies integrate artificial intelligence into their operations, marketing, finance, and strategic decision-making to drive revenue growth and operational efficiency.',
    features: ['AI strategy development & roadmap','Operations automation & optimization','AI-powered marketing & sales intelligence','Financial modeling & forecasting','Decision-making dashboards','Team training & AI capability building'],
    outcome: 'Companies typically see 30–60% cost reduction and 2x revenue growth within 12 months.',
  },
  {
    id: 'venture', num: '02',
    title: 'Venture Studio Led General Partnership',
    short: 'Venture Studio', Icon: IconRocket, color: 'var(--gold)',
    desc: 'Our venture studio model provides hands-on support for startups — from ideation through market entry, funding, and scale. We become true partners in your growth journey.',
    features: ['Idea validation & market research','Business model development','MVP design & product development','Go-to-market strategy execution','Investor readiness & fundraising support','Long-term growth partnerships'],
    outcome: '6+ businesses built and operating successfully across multiple sectors.',
  },
  {
    id: 'events', num: '03',
    title: 'Event & Program Management',
    short: 'Events', Icon: IconAward, color: '#7EB8FF',
    desc: 'From intimate executive workshops to massive conferences with 2,000+ attendees, we design and execute events that create measurable impact and lasting connections.',
    features: ['Conference design & production','Workshop facilitation','Partnership & stakeholder management','Speaker & agenda curation','On-site logistics & operations','Post-event impact measurement'],
    outcome: '30+ conferences executed with 40+ government, NGO, and private sector partners.',
  },
  {
    id: 'training', num: '04',
    title: 'Training & Capacity Building',
    short: 'Training', Icon: IconBook, color: '#FF9B7A',
    desc: "We build the human capital that drives Africa's growth — through structured training programs, bootcamps, mentorship, and career placement services.",
    features: ['Tech skills training & bootcamps','Business development workshops','Leadership & management programs','Financial literacy training','Career coaching & placement','Train-the-trainer programs'],
    outcome: '500+ tech talents trained, 350+ placed in roles, 75+ sessions delivered.',
  },
  {
    id: 'humanitarian', num: '05',
    title: 'Humanitarian & Social Impact Initiatives',
    short: 'Social Impact', Icon: IconHeart, color: '#B87EFF',
    desc: 'Through our humanitarian arm, we run programs that connect development funds to communities, advance education, and empower youth to contribute to the SDGs.',
    features: ['Development fund management','Community education programs','Youth empowerment initiatives','SDG-aligned project implementation','Nonprofit-as-a-Service (NaaS)','BWB rural learning centers'],
    outcome: '$700,000+ in development projects executed, 50,000+ communities/individuals reached.',
  },
  {
    id: 'consulting', num: '06',
    title: 'Strategic Business Consulting',
    short: 'Consulting', Icon: IconBriefcase, color: '#7EFFD4',
    desc: 'Expert guidance for businesses navigating complex growth challenges — from market entry to organizational restructuring, strategic planning, and international expansion.',
    features: ['Market entry strategy','Organizational design','Partnership development','Competitive positioning','International expansion planning','Board advisory services'],
    outcome: '10+ businesses successfully set up for local and international clients.',
  },
];

export default function Services() {
  const pageRef = useRef(null);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {
      // Service blocks
      services.forEach((s) => {
        gsap.fromTo(`#svc-${s.id}`,
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: `#svc-${s.id}`, start: 'top 84%', ...bd } }
        );
      });

      // Process steps
      gsap.fromTo('.proc-step', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.7, ease: 'back.out(1.3)', scrollTrigger: { trigger: '.proc-wrap', start: 'top 82%', ...bd } });

      // Connecting line between steps
      gsap.fromTo('.proc-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'left', scrollTrigger: { trigger: '.proc-wrap', start: 'top 80%' } });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Services | Servelead Global — AI Business Development</title>
        <meta name="description" content="Explore Servelead Global's comprehensive services: AI-BaaS, Venture Studio, Event Management, Training, Humanitarian Initiatives, and Strategic Consulting." />
        <link rel="canonical" href="https://www.serveleadglobal.net/services" />
      </Helmet>

      <PageHero
        pageKey="services"
        tag="What We Offer"
        title="End-to-End"
        titleEm="Growth Solutions"
        subtitle="Six specialized service pillars designed to take any business from where it is to where it needs to be."
      />

      <div ref={pageRef}>

        {/* ═══ SERVICE BLOCKS ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(20px,2.5vw,36px)' }} className="svc-blocks">
              {services.map(({ id, num, title, short, Icon, color, desc, features, outcome }) => (
                <div
                  key={id}
                  id={`svc-${id}`}
                  style={{ background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(28px,3.5vw,52px)', position: 'relative', transition: 'border-color 0.4s', overflow: 'hidden' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${color}44`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  {/* Watermark num */}
                  <div style={{ position: 'absolute', top: '-16px', right: '-8px', fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem,8vw,8rem)', fontWeight: 900, color, opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>{num}</div>

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                    <div style={{ width: '48px', height: '48px', background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color={color} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.13em', textTransform: 'uppercase', color, fontWeight: 700, display: 'block', marginBottom: '6px' }}>{short}</span>
                      <h3 style={{ fontSize: 'clamp(1.1rem,1.7vw,1.55rem)' }}>{title}</h3>
                    </div>
                  </div>

                  <p style={{ marginBottom: '24px', fontSize: '0.9rem' }}>{desc}</p>

                  <div style={{ marginBottom: '20px' }}>
                    <h6 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '12px' }}>What's Included</h6>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.84rem' }}>
                          <span style={{ color, flexShrink: 0, marginTop: '2px' }}><IconArrowRight size={12} /></span>
                          <span style={{ color: 'var(--gray-light)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: `${color}07`, border: `1px solid ${color}20`, padding: '14px 18px', fontSize: '0.82rem', color: 'var(--gray-light)', fontStyle: 'italic' }}>
                    <span style={{ color, fontStyle: 'normal', fontWeight: 700 }}>Outcome: </span>{outcome}
                  </div>

                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.35 }} />
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.svc-blocks{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ PROCESS ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,64px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>How We Work</div>
              <h2>Our <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Process</em></h2>
            </div>

            <div className="proc-wrap" style={{ position: 'relative' }}>
              {/* Connecting line — desktop only */}
              <div style={{ position: 'absolute', top: '32px', left: '10%', right: '10%', height: '1px', zIndex: 0 }}>
                <div className="proc-line" style={{ height: '100%', background: 'linear-gradient(90deg, var(--lime), var(--gold), var(--lime))' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 'clamp(12px,2vw,24px)', position: 'relative', zIndex: 1 }} className="proc-grid">
                {[
                  { step: '01', title: 'Discovery', desc: 'Deep-dive into your business, goals, challenges, and market context.' },
                  { step: '02', title: 'Strategy', desc: 'Custom AI-powered roadmap tailored to your specific growth objectives.' },
                  { step: '03', title: 'Execution', desc: 'Hands-on implementation with our expert team across all workstreams.' },
                  { step: '04', title: 'Optimization', desc: 'Continuous monitoring, iteration, and data-driven improvement.' },
                  { step: '05', title: 'Scale', desc: 'Connecting you to funding, partnerships, and markets for sustained growth.' },
                ].map(({ step, title, desc }, i) => (
                  <div key={step} className="proc-step" style={{ background: 'var(--dark)', padding: 'clamp(20px,2.5vw,32px) clamp(14px,2vw,24px)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,255,0,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                  >
                    <div style={{ width: '44px', height: '44px', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--dark)' }}>{step}</div>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: '10px', color: 'var(--white)' }}>{title}</h4>
                    <p style={{ fontSize: '0.82rem' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){.proc-grid{grid-template-columns:1fr 1fr!important;}.proc-line{display:none}} @media(max-width:480px){.proc-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="section-pad" style={{ background: 'var(--green-deep)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="tag" style={{ margin: '0 auto 26px', justifyContent: 'center' }}>Let's Begin</div>
            <h2 style={{ maxWidth: '540px', margin: '0 auto 20px' }}>
              Ready to Transform<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Your Business?</em>
            </h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 36px' }}>
              Schedule a free discovery call and let's map out the fastest path to sustainable growth for your organization.
            </p>
            <Link to="/contact" className="btn btn-primary">Book a Discovery Call <IconArrowRight size={16} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
