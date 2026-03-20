import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function SplashScreen({ onDone }) {
  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const splash = splashRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(splash, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: onDone,
          });
        },
      });

      // Logo entrance
      tl.fromTo(logoRef.current,
        { scale: 0.4, opacity: 0, rotate: -15 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.6)' }
      )
      // Text
      .fromTo('.splash-title span',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power4.out' },
        '-=0.3'
      )
      // Progress bar
      .to(progressRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
      }, '-=0.1')
      // Tagline
      .fromTo('.splash-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=1.2'
      )
      // Hold a moment
      .to({}, { duration: 0.3 });

    }, splash);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={splashRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'var(--dark)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated background rings */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {[300, 500, 700, 900].map((size, i) => (
          <div key={size} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: `1px solid rgba(184,255,0,${0.06 - i * 0.01})`,
            animation: `spinSlow ${20 + i * 8}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
          }} />
        ))}
      </div>

      {/* Corner accents */}
      {[
        { top: 0, left: 0, borderTop: '2px solid var(--lime)', borderLeft: '2px solid var(--lime)' },
        { top: 0, right: 0, borderTop: '2px solid var(--lime)', borderRight: '2px solid var(--lime)' },
        { bottom: 0, left: 0, borderBottom: '2px solid var(--lime)', borderLeft: '2px solid var(--lime)' },
        { bottom: 0, right: 0, borderBottom: '2px solid var(--lime)', borderRight: '2px solid var(--lime)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...s, width: '40px', height: '40px' }} />
      ))}

      {/* Center content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div ref={logoRef} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/logo.png"
            alt="Servelead Global"
            style={{ height: '72px', width: 'auto', filter: 'brightness(1.1)' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback hexagon */}
          <div style={{
            display: 'none',
            width: '72px', height: '72px',
            background: 'var(--lime)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'var(--dark)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem' }}>S</span>
          </div>
        </div>

        {/* Title */}
        <div className="splash-title" style={{ overflow: 'hidden' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700, letterSpacing: '-0.03em',
            textAlign: 'center', lineHeight: 1,
            display: 'flex', gap: '0.25em', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {'Servelead Global'.split('').map((ch, i) => (
              <span key={i} style={{ display: 'inline-block' }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <p className="splash-tag" style={{
          fontSize: '0.78rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--gray)',
          textAlign: 'center',
        }}>
          AI-Powered Business Development · Africa
        </p>

        {/* Progress bar */}
        <div style={{ width: 'clamp(240px, 40vw, 360px)', position: 'relative' }}>
          <div style={{
            width: '100%', height: '1px',
            background: 'rgba(255,255,255,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                position: 'absolute', inset: 0,
                background: 'var(--lime)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '8px',
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--lime)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
