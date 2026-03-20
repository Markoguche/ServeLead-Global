import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { IconMenu, IconX } from './Icons';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/organizations', label: 'Organizations' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileRef = useRef(null);
  const location = useLocation();

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Single source of truth: always restore body scroll ──
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }, []);

  // ── Close on route change — use location.key so even same-route taps fire ──
  useEffect(() => {
    closeMenu();
  }, [location.key, closeMenu]);

  // ── Safety net: always restore scroll on unmount ──
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  // ── Animate open only (close is instant via unmount) ──
  useEffect(() => {
    if (!mobileRef.current || !menuOpen) return;

    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      mobileRef.current,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.5, ease: 'power4.out' }
    );
    gsap.fromTo(
      '.m-link',
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.055, duration: 0.45, delay: 0.12, ease: 'power3.out' }
    );
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '10px 0' : '20px 0',
          background: scrolled ? 'rgba(6,15,9,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'padding 0.4s, background 0.4s, border 0.4s',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            <img
              src="/logo.png"
              alt="Servelead Global"
              style={{ height: '36px', width: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback hexagon */}
            <div style={{
              display: 'none', width: '36px', height: '36px',
              background: 'var(--lime)',
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'var(--dark)', fontWeight: 900, fontFamily: 'var(--font-display)' }}>S</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--white)',
              letterSpacing: '-0.02em', whiteSpace: 'nowrap',
            }}>
              Serve<span style={{ color: 'var(--green-mid)' }}>lead</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            className="desktop-links"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.5vw, 32px)', flexWrap: 'nowrap' }}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Link
              to="/contact"
              className="btn btn-primary cta-btn"
              style={{ padding: '10px 24px', fontSize: '0.78rem' }}
            >
              Get Started
            </Link>

            <button
              className="hamburger-btn"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--white)',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
                borderRadius: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--lime)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
            >
              {menuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={mobileRef}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'var(--dark)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            gap: '4px', padding: '40px 24px',
            overflowY: 'hidden',
            touchAction: 'none',
          }}
        >
          {/* Decorative orb */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,255,0,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="m-link"
              end={to === '/'}
              onClick={closeMenu}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                fontWeight: 700,
                color: isActive ? 'var(--lime)' : 'var(--white)',
                textAlign: 'center',
                padding: '6px 0',
                display: 'block',
                transition: 'color 0.2s, transform 0.2s',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
                WebkitTapHighlightColor: 'transparent',
              })}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--lime)';
                e.currentTarget.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.transform = '';
              }}
            >
              {label}
            </NavLink>
          ))}

          <div style={{
            marginTop: '40px', display: 'flex', gap: '20px',
            flexWrap: 'wrap', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <a
              href="https://www.serveleadglobal.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gray)', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              www.serveleadglobal.net
            </a>
          </div>
        </div>
      )}

      {/* Hamburger hidden on desktop, shown on mobile */}
      <style>{`
        .hamburger-btn { display: none; }
        @media (max-width: 1024px) {
          .desktop-links { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}