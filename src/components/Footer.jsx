import React from 'react';
import { Link } from 'react-router-dom';
import { IconLinkedIn, IconTwitter, IconInstagram, IconArrowRight } from './Icons';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 'clamp(56px,8vw,110px)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 'clamp(28px,4vw,56px)',
          paddingBottom: '56px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }} className="footer-grid">

          {/* Brand col */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img src="/logo.png" alt="Servelead Global" style={{ height: '34px', width: 'auto' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
              />
              <div style={{ display:'none', width:'34px', height:'34px', background:'var(--lime)', clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'var(--dark)', fontWeight:900, fontFamily:'var(--font-display)', fontSize:'0.9rem' }}>S</span>
              </div>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', color:'var(--white)' }}>
                Serve<span style={{ color:'var(--lime)' }}>lead</span>
              </span>
            </Link>
            <p style={{ fontSize:'0.9rem', lineHeight:'1.75', marginBottom:'28px', maxWidth:'280px' }}>
              Africa's premier AI-powered business development organization. Building the future, one startup at a time.
            </p>
            <div style={{ display:'flex', gap:'10px' }}>
              {[
                { icon: <IconLinkedIn size={16} />, label: 'LinkedIn' },
                { icon: <IconTwitter size={16} />, label: 'Twitter' },
                { icon: <IconInstagram size={16} />, label: 'Instagram' },
              ].map(({ icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{
                  width:'36px', height:'36px', border:'1px solid rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'var(--gray)', transition:'all 0.3s', cursor:'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--lime)'; e.currentTarget.style.color='var(--lime)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='var(--gray)'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {[
            { title:'Company', links:[{l:'About Us',to:'/about'},{l:'Our Team',to:'/team'},{l:'Organizations',to:'/organizations'},{l:'Portfolio',to:'/portfolio'}] },
            { title:'Services', links:[{l:'AI-BaaS',to:'/services#aibaas'},{l:'Venture Studio',to:'/services#venture'},{l:'Event Management',to:'/services#events'},{l:'Training',to:'/services#training'}] },
            { title:'Contact', links:[{l:'serveleadglobal@gmail.com',href:'mailto:serveleadglobal@gmail.com'},{l:'Abuja, Nigeria',href:'#'},{l:'serveleadglobal.net',href:'https://www.serveleadglobal.net'},{l:'Get Started',to:'/contact'}] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h6 style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.72rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--lime)', marginBottom:'20px' }}>{title}</h6>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'12px' }}>
                {links.map(({ l, to, href }) => (
                  <li key={l}>
                    {to ? (
                      <Link to={to} style={{ color:'var(--gray)', fontSize:'0.88rem', transition:'color 0.2s', display:'flex', alignItems:'center', gap:'6px', cursor:'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
                        onMouseLeave={e => e.currentTarget.style.color='var(--gray)'}
                      ><IconArrowRight size={12} />{l}</Link>
                    ) : (
                      <a href={href} style={{ color:'var(--gray)', fontSize:'0.88rem', transition:'color 0.2s', display:'flex', alignItems:'center', gap:'6px', cursor:'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
                        onMouseLeave={e => e.currentTarget.style.color='var(--gray)'}
                      >{l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 0', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'0.78rem', color:'var(--gray)' }}>© {new Date().getFullYear()} Servelead Global. All rights reserved.</p>
          <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
            {['Privacy Policy','Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize:'0.78rem', color:'var(--gray)', transition:'color 0.2s', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--lime)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--gray)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
