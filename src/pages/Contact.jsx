import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { IconGlobe, IconMail, IconMapPin, IconClock, IconSend, IconArrowRight, IconCheck } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {
      gsap.fromTo('.c-left', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.contact-main', start: 'top 80%', ...bd } });
      gsap.fromTo('.c-right', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.contact-main', start: 'top 80%', ...bd } });
      gsap.fromTo('.faq-card', { y: 32, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: '.faq-wrap', start: 'top 83%', ...bd } });

      // Floating geo shapes
      gsap.to('.c-shape-1', { rotate: 360, duration: 30, repeat: -1, ease: 'none' });
      gsap.to('.c-shape-2', { rotate: -360, duration: 22, repeat: -1, ease: 'none' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    gsap.fromTo('.success-card', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' });
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--white)', fontFamily: 'var(--font-body)',
    fontSize: '0.92rem', padding: '14px 18px', outline: 'none',
    transition: 'border-color 0.3s', borderRadius: 0,
    WebkitAppearance: 'none', appearance: 'none',
  };

  const labelStyle = {
    fontSize: '0.68rem', letterSpacing: '0.13em',
    textTransform: 'uppercase', color: 'var(--gray)',
    display: 'block', marginBottom: '8px', fontWeight: 600,
    fontFamily: 'var(--font-body)',
  };

  return (
    <>
      <Helmet>
        <title>Contact Servelead Global | Start Your Growth Journey</title>
        <meta name="description" content="Get in touch with Servelead Global. Start a discovery call, discuss your project, or explore partnership opportunities." />
        <link rel="canonical" href="https://www.serveleadglobal.net/contact" />
      </Helmet>

      <PageHero
        pageKey="contact"
        tag="Get In Touch"
        title="Let's Build"
        titleEm="Something Great"
        subtitle="Whether you're a startup, an enterprise, or a development partner — we'd love to hear from you."
      />

      <div ref={pageRef}>

        {/* ═══ MAIN CONTACT ═══ */}
        <section className="contact-main section-pad" style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
          {/* Floating geo */}
          <svg className="c-shape-1" viewBox="0 0 100 100" style={{ position: 'absolute', top: '5%', right: '2%', width: 'clamp(80px,12vw,160px)', opacity: 0.04, pointerEvents: 'none' }}>
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="var(--gold)" strokeWidth="2" />
          </svg>
          <svg className="c-shape-2" viewBox="0 0 100 100" style={{ position: 'absolute', bottom: '5%', left: '1%', width: 'clamp(60px,8vw,120px)', opacity: 0.04, pointerEvents: 'none' }}>
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--lime)" strokeWidth="2" />
          </svg>

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(36px,6vw,96px)', alignItems: 'start' }} className="contact-grid">

              {/* Left info */}
              <div className="c-left">
                <div className="tag" style={{ marginBottom: '22px' }}>Contact Details</div>
                <h2 style={{ marginBottom: '20px' }}>
                  Start A<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Conversation</em>
                </h2>
                <p style={{ marginBottom: '40px' }}>Our team typically responds within 24 hours. For urgent inquiries, reach us directly via email or visit our Abuja office.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '44px' }}>
                  {[
                    { Icon: IconGlobe, label: 'Website', value: 'www.serveleadglobal.net', color: 'var(--lime)' },
                    { Icon: IconMail, label: 'Email', value: 'serveleadglobal@gmail.com', color: 'var(--gold)' },
                    { Icon: IconMapPin, label: 'Location', value: 'Plot 265, S.E Asebe Street, Mabushi Abuja.', color: '#7EB8FF' },
                    { Icon: IconClock, label: 'Hours', value: 'Mon–Fri: 8:30AM – 5PM WAT', color: '#FF9B7A' },
                  ].map(({ Icon, label, value, color }) => (
                    <div key={label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ width: '42px', height: '42px', background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={color} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '3px', fontWeight: 600 }}>{label}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--white)', fontWeight: 500 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h6 style={{ ...labelStyle, marginBottom: '14px' }}>We Can Help With</h6>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['AI Integration','Startup Support','Event Management','Training Programs','Fund Readiness','Market Entry','Tech Development','Business Consulting'].map(tag => (
                      <span key={tag} style={{ padding: '5px 12px', border: '1px solid rgba(255,255,255,0.09)', fontSize: '0.76rem', color: 'var(--gray-light)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="c-right">
                {submitted ? (
                  <div className="success-card" style={{ background: 'rgba(184,255,0,0.05)', border: '1px solid rgba(184,255,0,0.25)', padding: 'clamp(40px,6vw,72px)', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(184,255,0,0.1)', border: '1px solid rgba(184,255,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <IconCheck size={28} color="var(--lime)" />
                    </div>
                    <h3 style={{ marginBottom: '14px' }}>Message Sent!</h3>
                    <p style={{ marginBottom: '28px' }}>Thank you for reaching out. Our team will get back to you within 24 hours with next steps.</p>
                    <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', organization: '', service: '', budget: '', message: '' }); }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(28px,4vw,52px)' }}>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: '28px', fontSize: '1.15rem' }}>Send Us a Message</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="form-row-2">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input required name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={labelStyle}>Organization / Company</label>
                      <input name="organization" value={form.organization} onChange={handleChange} placeholder="Your company or organization" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="form-row-2">
                      <div>
                        <label style={labelStyle}>Service Interested In</label>
                        <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        >
                          <option value="" style={{ background: 'var(--dark)' }}>Select a service</option>
                          {['AI-BaaS','Venture Studio','Event Management','Training & Development','Humanitarian Initiative','Strategic Consulting','Other'].map(o => (
                            <option key={o} value={o.toLowerCase().replace(/\s+/g, '-')} style={{ background: 'var(--dark)' }}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Budget Range</label>
                        <select name="budget" value={form.budget} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        >
                          <option value="" style={{ background: 'var(--dark)' }}>Select budget range</option>
                          {[['<5k','Under $5,000'],['5k-20k','$5,000 – $20,000'],['20k-50k','$20,000 – $50,000'],['50k+','$50,000+'],['discuss',"Let's Discuss"]].map(([v,l]) => (
                            <option key={v} value={v} style={{ background: 'var(--dark)' }}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>Tell Us About Your Project *</label>
                      <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Describe your goals, challenges, and how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(184,255,0,0.45)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Send Message <IconSend size={16} />
                    </button>
                    <p style={{ fontSize: '0.74rem', color: 'var(--gray)', textAlign: 'center', marginTop: '14px' }}>
                      We respond within 24 hours. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
          <style>{`
            @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;}}
            @media(max-width:480px){.form-row-2{grid-template-columns:1fr!important;}}
          `}</style>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>FAQ</div>
              <h2>Common <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Questions</em></h2>
            </div>
            <div className="faq-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(14px,2vw,22px)', maxWidth: '1000px', margin: '0 auto' }}>
              {[
                { q: 'What types of businesses do you work with?', a: 'We work with startups, SMEs, NGOs, and established enterprises across all sectors — from agriculture and tech to education and healthcare.' },
                { q: 'How long does a typical engagement last?', a: 'Engagements range from one-time event management (weeks) to long-term business development partnerships (12–24 months).' },
                { q: 'Do you work outside Nigeria?', a: "Yes — while we're headquartered in Abuja, we have active partnerships and projects across Africa and with international organizations globally." },
                { q: "What does 'AI-BaaS' mean in practice?", a: 'AI-BaaS means we integrate AI tools into your actual business operations — marketing, finance, operations, and decision-making — not just training or advice.' },
                { q: 'Can you help us access funding?', a: 'Absolutely. Our Venture Studio service includes investor readiness preparation, pitch deck development, and warm introductions to aligned funders.' },
                { q: 'How do we get started?', a: "Simply fill out the contact form or reach us directly. We'll schedule a free discovery call within 48 hours to explore how we can help." },
              ].map(({ q, a }) => (
                <div key={q} className="card faq-card" style={{ padding: 'clamp(20px,3vw,32px)' }}>
                  <h5 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.96rem', marginBottom: '10px', color: 'var(--white)' }}>{q}</h5>
                  <p style={{ fontSize: '0.84rem', lineHeight: '1.72' }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){.faq-wrap{grid-template-columns:1fr!important;}}`}</style>
        </section>

      </div>
    </>
  );
}
