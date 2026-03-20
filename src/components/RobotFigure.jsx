import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function RobotFigure({ style = {} }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {

      // ── Entrance: assemble from pieces ──
      gsap.fromTo('#robot-body-group',
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', delay: 0.8 }
      );
      gsap.fromTo('#robot-head',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)', delay: 1.0 }
      );
      gsap.fromTo('#robot-arm-left',
        { opacity: 0, x: -24, rotate: -15, transformOrigin: '90px 160px' },
        { opacity: 1, x: 0, rotate: 0, duration: 0.9, ease: 'back.out(1.4)', delay: 1.1 }
      );
      gsap.fromTo('#robot-arm-right',
        { opacity: 0, x: 24, rotate: 15, transformOrigin: '210px 160px' },
        { opacity: 1, x: 0, rotate: 0, duration: 0.9, ease: 'back.out(1.4)', delay: 1.15 }
      );
      gsap.fromTo('#robot-legs',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );
      gsap.fromTo('.data-line',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 1.4, transformOrigin: 'left' }
      );
      gsap.fromTo('.data-dot',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.05, duration: 0.4, ease: 'back.out(2)', delay: 1.6 }
      );
      gsap.fromTo('.orbit-ring',
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.4)', delay: 1.3 }
      );

      // ── Idle float ──
      gsap.to('#robot-body-group', { y: -14, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // ── Head tilt ──
      gsap.to('#robot-head', { rotate: 3, transformOrigin: '150px 60px', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // ── Eye scan ──
      gsap.to('#eye-scanner', { x: 18, duration: 1.6, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('#eye-glow', { opacity: 0.2, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // ── Core pulse ──
      gsap.to('#core-pulse', { scale: 1.35, opacity: 0.25, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '150px 210px' });
      gsap.to('#core-inner', { scale: 1.15, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '150px 210px' });

      // ── Arms sway ──
      gsap.to('#robot-arm-left', { rotate: -4, transformOrigin: '90px 160px', duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('#robot-arm-right', { rotate: 4, transformOrigin: '210px 160px', duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });

      // ── Circuit traces draw ──
      const circuits = svg.querySelectorAll('.circuit-path');
      circuits.forEach((path, i) => {
        const len = path.getTotalLength ? path.getTotalLength() : 60;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, { strokeDashoffset: 0, duration: 1.5 + i * 0.2, ease: 'power2.out', delay: 1.4 + i * 0.15, repeat: -1, repeatDelay: 3 + i * 0.5 });
      });

      // ── Orbit rings ──
      gsap.to('#orbit-1', { rotate: 360, transformOrigin: '150px 210px', duration: 8, repeat: -1, ease: 'none' });
      gsap.to('#orbit-2', { rotate: -360, transformOrigin: '150px 210px', duration: 12, repeat: -1, ease: 'none' });

      // ── Status bars ──
      gsap.fromTo('#status-bar-1', { scaleX: 0 }, { scaleX: 0.82, duration: 1.8, ease: 'power2.out', delay: 1.8, transformOrigin: 'left' });
      gsap.fromTo('#status-bar-2', { scaleX: 0 }, { scaleX: 0.95, duration: 2.0, ease: 'power2.out', delay: 2.0, transformOrigin: 'left' });
      gsap.fromTo('#status-bar-3', { scaleX: 0 }, { scaleX: 0.60, duration: 1.5, ease: 'power2.out', delay: 2.2, transformOrigin: 'left' });

      // ── Antenna blink ──
      gsap.to('#antenna-tip', { opacity: 0.15, duration: 0.55, repeat: -1, yoyo: true, ease: 'steps(1)' });

      // ── Scan line ──
      gsap.to('#scan-line', { y: 80, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

      // ── Cheek lights ──
      gsap.to('#cheek-left', { opacity: 0.3, duration: 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('#cheek-right', { opacity: 0.3, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });

      // ── Floating dots bob ──
      ['.fp-dot-1','.fp-dot-2','.fp-dot-3','.fp-dot-4','.fp-dot-5','.fp-dot-6'].forEach((sel, i) => {
        gsap.to(sel, { y: i % 2 === 0 ? -10 : 10, duration: 2.5 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 });
      });

    }, svg);

    return () => ctx.revert();
  }, []);

  // ── ALL LIME palette ──
  const lime = '#B8FF00';
  const dark = '#060F09';
  const darkMid = '#0A2E1A';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <svg
        ref={svgRef}
        viewBox="0 0 300 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', maxHeight: '100%', overflow: 'visible' }}
      >
        <defs>
          <filter id="glow-lime" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#163820" />
            <stop offset="100%" stopColor="#081408" />
          </linearGradient>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4228" />
            <stop offset="100%" stopColor="#0a1c0c" />
          </linearGradient>
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={lime} stopOpacity="0.05" />
            <stop offset="50%" stopColor={lime} stopOpacity="1" />
            <stop offset="100%" stopColor={lime} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#163220" />
            <stop offset="100%" stopColor="#060e07" />
          </linearGradient>
          <radialGradient id="coreRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={lime} stopOpacity="1" />
            <stop offset="50%" stopColor={lime} stopOpacity="0.6" />
            <stop offset="100%" stopColor={lime} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={lime} stopOpacity="0.07" />
            <stop offset="100%" stopColor={lime} stopOpacity="0" />
          </radialGradient>
          <clipPath id="eye-clip">
            <rect x="108" y="68" width="84" height="22" rx="4" />
          </clipPath>
        </defs>

        {/* Background ambient glow */}
        <ellipse cx="150" cy="280" rx="130" ry="200" fill="url(#bgGlow)" />

        {/* Orbit rings */}
        <g id="orbit-1" opacity="0.22">
          <ellipse className="orbit-ring" cx="150" cy="210" rx="72" ry="30" fill="none" stroke={lime} strokeWidth="0.7" strokeDasharray="4 7" />
        </g>
        <g id="orbit-2" opacity="0.1">
          <ellipse className="orbit-ring" cx="150" cy="210" rx="98" ry="40" fill="none" stroke={lime} strokeWidth="0.5" strokeDasharray="3 9" />
        </g>

        {/* Ground shadow */}
        <ellipse cx="150" cy="492" rx="72" ry="11" fill={lime} opacity="0.07" />

        {/* ══════ ROBOT ══════ */}
        <g id="robot-body-group">

          {/* LEGS */}
          <g id="robot-legs">
            <rect x="112" y="360" width="28" height="62" rx="9" fill="url(#armGrad)" stroke={lime} strokeWidth="0.7" strokeOpacity="0.35" />
            <rect x="116" y="416" width="20" height="7" rx="2" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.45" />
            <rect x="108" y="420" width="34" height="16" rx="6" fill="url(#armGrad)" stroke={lime} strokeWidth="0.7" strokeOpacity="0.35" />
            <rect x="160" y="360" width="28" height="62" rx="9" fill="url(#armGrad)" stroke={lime} strokeWidth="0.7" strokeOpacity="0.35" />
            <rect x="164" y="416" width="20" height="7" rx="2" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.45" />
            <rect x="158" y="420" width="34" height="16" rx="6" fill="url(#armGrad)" stroke={lime} strokeWidth="0.7" strokeOpacity="0.35" />
            <circle cx="126" cy="362" r="6.5" fill={darkMid} stroke={lime} strokeWidth="0.9" strokeOpacity="0.55" />
            <circle cx="174" cy="362" r="6.5" fill={darkMid} stroke={lime} strokeWidth="0.9" strokeOpacity="0.55" />
            <circle cx="126" cy="362" r="3" fill={lime} opacity="0.45" filter="url(#glow-soft)" />
            <circle cx="174" cy="362" r="3" fill={lime} opacity="0.45" filter="url(#glow-soft)" />
          </g>

          {/* BODY */}
          <rect x="90" y="155" width="120" height="210" rx="18" fill="url(#bodyGrad)" stroke={lime} strokeWidth="0.9" strokeOpacity="0.38" />
          <rect x="100" y="170" width="100" height="1" rx="0.5" fill={lime} opacity="0.14" />
          <rect x="100" y="342" width="100" height="1" rx="0.5" fill={lime} opacity="0.14" />
          <rect x="106" y="180" width="88" height="108" rx="9" fill={dark} stroke={lime} strokeWidth="0.5" strokeOpacity="0.22" />

          {/* CORE */}
          <circle id="core-pulse" cx="150" cy="210" r="30" fill={lime} opacity="0.07" />
          <polygon points="150,190 165,199 165,217 150,226 135,217 135,199" fill="none" stroke={lime} strokeWidth="1.1" opacity="0.65" filter="url(#glow-soft)" />
          <polygon points="150,195 161,202 161,216 150,223 139,216 139,202" fill={lime} opacity="0.06" />
          <circle id="core-inner" cx="150" cy="208" r="11" fill={lime} opacity="0.18" filter="url(#glow-lime)" />
          <circle cx="150" cy="208" r="6" fill={lime} opacity="0.95" filter="url(#glow-strong)" />
          <circle cx="150" cy="208" r="2.5" fill="#ffffff" opacity="0.9" />

          {/* Status bars */}
          <g transform="translate(110, 308)">
            <text x="0" y="0" fontSize="5" fill={lime} opacity="0.5" fontFamily="monospace">AI</text>
            <rect x="12" y="-5" width="68" height="5" rx="2" fill={dark} />
            <rect id="status-bar-1" x="12" y="-5" width="68" height="5" rx="2" fill={lime} opacity="0.85" />
            <text x="0" y="12" fontSize="5" fill={lime} opacity="0.5" fontFamily="monospace">CPU</text>
            <rect x="12" y="7" width="68" height="5" rx="2" fill={dark} />
            <rect id="status-bar-2" x="12" y="7" width="68" height="5" rx="2" fill={lime} opacity="0.65" />
            <text x="0" y="24" fontSize="5" fill={lime} opacity="0.5" fontFamily="monospace">NET</text>
            <rect x="12" y="19" width="68" height="5" rx="2" fill={dark} />
            <rect id="status-bar-3" x="12" y="19" width="68" height="5" rx="2" fill={lime} opacity="0.5" />
          </g>

          {/* Circuit traces */}
          <path className="circuit-path" d="M 120 270 L 120 290 L 140 290" fill="none" stroke={lime} strokeWidth="0.7" opacity="0.45" />
          <path className="circuit-path" d="M 180 270 L 180 290 L 160 290" fill="none" stroke={lime} strokeWidth="0.7" opacity="0.45" />
          <circle cx="140" cy="290" r="2" fill={lime} opacity="0.7" />
          <circle cx="160" cy="290" r="2" fill={lime} opacity="0.7" />

          {/* Corner bolts */}
          {[[90,155],[207,155],[90,362],[207,362]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill={dark} stroke={lime} strokeWidth="0.8" strokeOpacity="0.5" />
          ))}

          {/* LEFT ARM */}
          <g id="robot-arm-left">
            <circle cx="90" cy="175" r="11" fill={darkMid} stroke={lime} strokeWidth="0.9" strokeOpacity="0.5" />
            <circle cx="90" cy="175" r="5.5" fill={lime} opacity="0.28" filter="url(#glow-soft)" />
            <rect x="65" y="170" width="26" height="72" rx="11" fill="url(#armGrad)" stroke={lime} strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="78" cy="245" r="8.5" fill={darkMid} stroke={lime} strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="65" y="242" width="26" height="55" rx="11" fill="url(#armGrad)" stroke={lime} strokeWidth="0.6" strokeOpacity="0.3" />
            <rect x="60" y="294" width="36" height="22" rx="9" fill={darkMid} stroke={lime} strokeWidth="0.7" strokeOpacity="0.42" />
            {[63,72,81,90].map((x,i) => (
              <rect key={i} x={x} y="314" width="7" height="14" rx="3.5" fill="url(#armGrad)" stroke={lime} strokeWidth="0.5" strokeOpacity="0.35" />
            ))}
            <path className="circuit-path" d="M 72 200 L 72 222 L 68 228" fill="none" stroke={lime} strokeWidth="0.6" opacity="0.4" />
            <circle cx="68" cy="228" r="1.5" fill={lime} opacity="0.65" />
          </g>

          {/* RIGHT ARM */}
          <g id="robot-arm-right">
            <circle cx="210" cy="175" r="11" fill={darkMid} stroke={lime} strokeWidth="0.9" strokeOpacity="0.5" />
            <circle cx="210" cy="175" r="5.5" fill={lime} opacity="0.28" filter="url(#glow-soft)" />
            <rect x="209" y="170" width="26" height="72" rx="11" fill="url(#armGrad)" stroke={lime} strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="222" cy="245" r="8.5" fill={darkMid} stroke={lime} strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="209" y="242" width="26" height="55" rx="11" fill="url(#armGrad)" stroke={lime} strokeWidth="0.6" strokeOpacity="0.3" />
            <rect x="204" y="294" width="36" height="22" rx="9" fill={darkMid} stroke={lime} strokeWidth="0.7" strokeOpacity="0.42" />
            {[207,216,225,234].map((x,i) => (
              <rect key={i} x={x} y="314" width="7" height="14" rx="3.5" fill="url(#armGrad)" stroke={lime} strokeWidth="0.5" strokeOpacity="0.35" />
            ))}
            <path className="circuit-path" d="M 228 200 L 228 222 L 232 228" fill="none" stroke={lime} strokeWidth="0.6" opacity="0.4" />
            <circle cx="232" cy="228" r="1.5" fill={lime} opacity="0.65" />
          </g>

          {/* HEAD */}
          <g id="robot-head">
            <rect x="135" y="130" width="30" height="28" rx="7" fill="url(#armGrad)" stroke={lime} strokeWidth="0.6" strokeOpacity="0.3" />
            <rect x="133" y="137" width="34" height="4" rx="2" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.5" />
            <rect x="133" y="144" width="34" height="4" rx="2" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.5" />
            <rect x="100" y="50" width="100" height="82" rx="15" fill="url(#headGrad)" stroke={lime} strokeWidth="1" strokeOpacity="0.42" />
            <rect x="116" y="50" width="68" height="7" rx="3.5" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.4" />
            {/* Antenna */}
            <line x1="150" y1="50" x2="150" y2="21" stroke={lime} strokeWidth="1.1" opacity="0.5" />
            <circle cx="150" cy="17" r="5.5" fill={darkMid} stroke={lime} strokeWidth="1.1" />
            <circle id="antenna-tip" cx="150" cy="17" r="3.5" fill={lime} filter="url(#glow-strong)" />
            {/* Side vents */}
            {[56,64,72].map(y => (
              <React.Fragment key={y}>
                <rect x="100" y={y} width="10" height="3" rx="1.5" fill={dark} stroke={lime} strokeWidth="0.4" strokeOpacity="0.5" />
                <rect x="190" y={y} width="10" height="3" rx="1.5" fill={dark} stroke={lime} strokeWidth="0.4" strokeOpacity="0.5" />
              </React.Fragment>
            ))}
            {/* Eye visor */}
            <rect x="106" y="66" width="88" height="26" rx="7" fill={dark} stroke={lime} strokeWidth="0.8" strokeOpacity="0.55" />
            <rect id="eye-glow" x="108" y="68" width="84" height="22" rx="4" fill={lime} opacity="0.5" filter="url(#glow-lime)" />
            <rect x="108" y="68" width="84" height="22" rx="4" fill="url(#eyeGrad)" clipPath="url(#eye-clip)" />
            <rect id="eye-scanner" x="108" y="68" width="16" height="22" rx="3" fill={lime} opacity="0.88" filter="url(#glow-strong)" />
            {[73,78,83].map(y => (
              <line key={y} x1="108" y1={y} x2="192" y2={y} stroke={lime} strokeWidth="0.3" opacity="0.18" />
            ))}
            {/* Cheek panels */}
            <rect x="104" y="97" width="20" height="18" rx="5" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.42" />
            <rect x="176" y="97" width="20" height="18" rx="5" fill={darkMid} stroke={lime} strokeWidth="0.5" strokeOpacity="0.42" />
            <circle id="cheek-left" cx="114" cy="106" r="3.5" fill={lime} opacity="0.8" filter="url(#glow-soft)" />
            <circle id="cheek-right" cx="186" cy="106" r="3.5" fill={lime} opacity="0.55" filter="url(#glow-soft)" />
            {/* Mouth grille */}
            <rect x="120" y="116" width="60" height="13" rx="5" fill={dark} stroke={lime} strokeWidth="0.5" strokeOpacity="0.4" />
            {[125,133,141,149,157,165,173].map(x => (
              <rect key={x} x={x} y="118" width="4" height="9" rx="1.5" fill={lime} opacity="0.22" />
            ))}
            {/* Forehead bar */}
            <rect x="128" y="54" width="44" height="5" rx="2.5" fill={dark} stroke={lime} strokeWidth="0.4" strokeOpacity="0.5" />
            <rect id="scan-line" x="130" y="55" width="14" height="3" rx="1.5" fill={lime} opacity="0.75" filter="url(#glow-soft)" />
            {/* Head corner accents */}
            <line x1="100" y1="50" x2="112" y2="50" stroke={lime} strokeWidth="1.2" opacity="0.5" />
            <line x1="100" y1="50" x2="100" y2="62" stroke={lime} strokeWidth="1.2" opacity="0.5" />
            <line x1="200" y1="50" x2="188" y2="50" stroke={lime} strokeWidth="1.2" opacity="0.5" />
            <line x1="200" y1="50" x2="200" y2="62" stroke={lime} strokeWidth="1.2" opacity="0.5" />
          </g>

        </g>
        {/* ══════ END ROBOT ══════ */}

        {/* Floating data panels */}
        <g transform="translate(14, 158)" opacity="0.78">
          <rect x="0" y="0" width="58" height="64" rx="7" fill={dark} stroke={lime} strokeWidth="0.6" strokeOpacity="0.42" />
          <line x1="0" y1="0" x2="10" y2="0" stroke={lime} strokeWidth="1.2" />
          <line x1="0" y1="0" x2="0" y2="10" stroke={lime} strokeWidth="1.2" />
          <line x1="58" y1="64" x2="48" y2="64" stroke={lime} strokeWidth="1.2" />
          <line x1="58" y1="64" x2="58" y2="54" stroke={lime} strokeWidth="1.2" />
          <text x="6" y="16" fontSize="5.5" fill={lime} fontFamily="monospace" opacity="0.9">SYSTEM</text>
          <text x="6" y="26" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.45">AI.v4.2</text>
          <rect x="6" y="32" width="46" height="4" rx="2" fill={darkMid} />
          <rect className="data-line" x="6" y="32" width="38" height="4" rx="2" fill={lime} opacity="0.82" />
          <text x="6" y="50" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.45">NEURAL</text>
          <rect x="6" y="54" width="46" height="4" rx="2" fill={darkMid} />
          <rect className="data-line" x="6" y="54" width="44" height="4" rx="2" fill={lime} opacity="0.65" />
        </g>

        <g transform="translate(228, 258)" opacity="0.78">
          <rect x="0" y="0" width="58" height="64" rx="7" fill={dark} stroke={lime} strokeWidth="0.6" strokeOpacity="0.42" />
          <line x1="58" y1="0" x2="48" y2="0" stroke={lime} strokeWidth="1.2" />
          <line x1="58" y1="0" x2="58" y2="10" stroke={lime} strokeWidth="1.2" />
          <line x1="0" y1="64" x2="10" y2="64" stroke={lime} strokeWidth="1.2" />
          <line x1="0" y1="64" x2="0" y2="54" stroke={lime} strokeWidth="1.2" />
          <text x="6" y="16" fontSize="5.5" fill={lime} fontFamily="monospace" opacity="0.9">NETWORK</text>
          <text x="6" y="27" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.45">99.9% UP</text>
          <text x="6" y="42" fontSize="5.5" fill={lime} fontFamily="monospace" opacity="0.9">SYNC</text>
          <text x="6" y="52" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.45">ACTIVE</text>
          <circle className="data-dot" cx="50" cy="46" r="5" fill={dark} stroke={lime} strokeWidth="0.7" />
          <circle cx="50" cy="46" r="3" fill={lime} opacity="0.85" filter="url(#glow-soft)" />
        </g>

        <g transform="translate(198, 28)" opacity="0.72">
          <rect x="0" y="0" width="66" height="34" rx="6" fill={dark} stroke={lime} strokeWidth="0.6" strokeOpacity="0.45" />
          <line x1="0" y1="0" x2="10" y2="0" stroke={lime} strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="9" stroke={lime} strokeWidth="1" />
          <text x="8" y="14" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.5">IMPACT</text>
          <text x="8" y="27" fontSize="8" fill={lime} fontFamily="monospace" fontWeight="bold">103K+</text>
          <polyline points="36,26 40,20 44,23 48,17 52,21 58,14" fill="none" stroke={lime} strokeWidth="0.9" opacity="0.7" />
        </g>

        <g transform="translate(14, 382)" opacity="0.72">
          <rect x="0" y="0" width="66" height="34" rx="6" fill={dark} stroke={lime} strokeWidth="0.6" strokeOpacity="0.45" />
          <line x1="66" y1="34" x2="56" y2="34" stroke={lime} strokeWidth="1" />
          <line x1="66" y1="34" x2="66" y2="25" stroke={lime} strokeWidth="1" />
          <text x="8" y="14" fontSize="5" fill={lime} fontFamily="monospace" opacity="0.5">MANAGED</text>
          <text x="8" y="27" fontSize="8" fill={lime} fontFamily="monospace" fontWeight="bold">$350K+</text>
        </g>

        {/* Connecting dashed lines */}
        <line x1="72" y1="190" x2="90" y2="210" stroke={lime} strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="3 5" />
        <line x1="228" y1="285" x2="209" y2="262" stroke={lime} strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="3 5" />

        {/* Floating data dots */}
        {[
          { cx: 55, cy: 148, cls: 'fp-dot-1', r: 2.5 },
          { cx: 246, cy: 168, cls: 'fp-dot-2', r: 2.0 },
          { cx: 38, cy: 305, cls: 'fp-dot-3', r: 2.0 },
          { cx: 262, cy: 352, cls: 'fp-dot-4', r: 2.5 },
          { cx: 76, cy: 422, cls: 'fp-dot-5', r: 2.0 },
          { cx: 224, cy: 442, cls: 'fp-dot-6', r: 2.0 },
        ].map(({ cx, cy, r, cls }) => (
          <circle key={cls} className={`data-dot ${cls}`} cx={cx} cy={cy} r={r}
            fill={lime} opacity="0.6" filter="url(#glow-soft)" />
        ))}

      </svg>
    </div>
  );
}