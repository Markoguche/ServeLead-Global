import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Each page gets a completely unique hero treatment
const heroVariants = {
  about: {
     accent: 'var(--lime)',
    bg: 'var(--dark-2)',

    shape: (
      <svg viewBox="0 0 400 400" style={{ position: 'absolute', right: '-5%', top: '-10%', width: 'clamp(280px,40vw,500px)', opacity: 0.08, pointerEvents: 'none' }}>
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="8 12" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="var(--lime)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="80" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="var(--lime)" strokeWidth="0.4" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="var(--lime)" strokeWidth="0.4" />
      </svg>
    ),
    decorLeft: <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '4px', height: '60%', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }} />,
  },
  services: {
    accent: 'var(--lime)',
    bg: 'var(--dark-2)',
    shape: (
      <div style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)', top: '50%', transform: 'translateY(-50%)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', opacity: 0.12, pointerEvents: 'none', width: 'clamp(160px,25vw,260px)' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: '100%', paddingBottom: '100%', background: i % 3 === 0 ? 'var(--lime)' : i % 3 === 1 ? 'var(--gold)' : 'rgba(255,255,255,0.3)', animation: `floatY ${2 + (i % 3) * 0.7}s ease-in-out ${i * 0.1}s infinite` }} />
        ))}
      </div>
    ),
    decorLeft: <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--lime), transparent)' }} />,
  },
  portfolio: {
     accent: 'var(--lime)',
    bg: 'var(--dark-2)',

    shape: (
      <svg viewBox="0 0 500 300" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 'clamp(200px,35vw,420px)', opacity: 0.1, pointerEvents: 'none' }}>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={i*90+10} y={180 - i*30} width="70" height={60 + i*30} fill="none" stroke="#7EB8FF" strokeWidth="1.5" />
        ))}
        <polyline points="45,150 135,120 225,80 315,100 405,60" fill="none" stroke="var(--lime)" strokeWidth="2" />
      </svg>
    ),
    decorLeft: <div style={{ position: 'absolute', bottom: 0, left: 'clamp(20px,5vw,80px)', width: '100px', height: '3px', background: 'linear-gradient(90deg, #7EB8FF, transparent)' }} />,
  },
  organizations: {
    accent: 'var(--lime)',
    bg: 'var(--green-deep)',
    shape: (
      <svg viewBox="0 0 400 400" style={{ position: 'absolute', right: '-5%', top: '-5%', width: 'clamp(220px,32vw,380px)', opacity: 0.12, pointerEvents: 'none' }}>
        <polygon points="200,20 380,110 380,290 200,380 20,290 20,110" fill="none" stroke="var(--lime)" strokeWidth="1.5" />
        <polygon points="200,60 340,130 340,270 200,340 60,270 60,130" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <polygon points="200,100 300,150 300,250 200,300 100,250 100,150" fill="none" stroke="var(--lime)" strokeWidth="0.5" />
      </svg>
    ),
    decorLeft: null,
  },
  team: {
     accent: 'var(--lime)',
    bg: 'var(--dark-2)',

    shape: (
      <div style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.15, pointerEvents: 'none' }}>
        {[80,60,100,70,50].map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: `${w}px`, height: '2px', background: i % 2 === 0 ? 'var(--lime)' : '#B87EFF' }} />
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${i % 2 === 0 ? 'var(--lime)' : '#B87EFF'}` }} />
          </div>
        ))}
      </div>
    ),
    decorLeft: <div style={{ position: 'absolute', left: 0, top: '30%', width: '2px', height: '40%', background: 'linear-gradient(to bottom, transparent, #B87EFF, transparent)' }} />,
  },
  contact: {
     accent: 'var(--lime)',
    bg: 'var(--dark-2)',

    shape: (
      <svg viewBox="0 0 300 300" style={{ position: 'absolute', right: 'clamp(20px,5vw,80px)', top: '50%', transform: 'translateY(-50%)', width: 'clamp(160px,25vw,280px)', opacity: 0.1, pointerEvents: 'none' }}>
        <path d="M150,30 L270,90 L270,210 L150,270 L30,210 L30,90 Z" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <path d="M150,70 L230,110 L230,190 L150,230 L70,190 L70,110 Z" fill="none" stroke="var(--lime)" strokeWidth="1" />
        <circle cx="150" cy="150" r="30" fill="none" stroke="var(--gold)" strokeWidth="2" />
        <line x1="150" y1="30" x2="150" y2="270" stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="30" y1="150" x2="270" y2="150" stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="4 6" />
      </svg>
    ),
    decorLeft: null,
  },
};

export default function PageHero({ pageKey = 'about', tag, title, titleEm, subtitle }) {
  const heroRef = useRef(null);
  const v = heroVariants[pageKey] || heroVariants.about;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.ph-tag', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo('.ph-line1', { y: '105%' }, { y: '0%', duration: 0.9 }, 0.35)
        .fromTo('.ph-line2', { y: '105%' }, { y: '0%', duration: 0.9 }, 0.48)
        .fromTo('.ph-sub', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8)
        .fromTo('.ph-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: 'left' }, 0.6)
        .fromTo('.ph-shape', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1 }, 0.3);
    }, heroRef);
    return () => ctx.revert();
  }, [pageKey]);

  return (
    <section
      ref={heroRef}
      style={{
        background: v.bg,
        paddingTop: 'clamp(130px, 15vw, 190px)',
        paddingBottom: 'clamp(56px, 7vw, 90px)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `1px solid rgba(255,255,255,0.05)`,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(184,255,0,0.025) 1px, transparent 1px),linear-gradient(90deg, rgba(184,255,0,0.025) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        pointerEvents: 'none',
      }} />

      {/* Unique shape */}
      <div className="ph-shape" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {v.shape}
        {v.decorLeft}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {tag && <div className="tag ph-tag" style={{ marginBottom: '28px', borderColor: `${v.accent}44`, color: v.accent }}>{tag}</div>}

        <h1 style={{ maxWidth: '860px' }}>
          <span className="split-line">
            <span className="ph-line1" style={{ display: 'block' }}>{title}</span>
          </span>
          {titleEm && (
            <span className="split-line">
              <em className="ph-line2" style={{ display: 'block', color: v.accent, fontStyle: 'italic' }}>{titleEm}</em>
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="ph-sub" style={{
            marginTop: '24px', maxWidth: '540px',
            fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
          }}>
            {subtitle}
          </p>
        )}

        <div className="ph-rule" style={{
          marginTop: '44px', height: '1.5px',
          background: `linear-gradient(90deg, ${v.accent}, transparent)`,
          width: 'clamp(120px, 20vw, 220px)',
        }} />
      </div>
    </section>
  );
}
