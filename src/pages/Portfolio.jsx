import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { IconArrowRight, IconAward, IconUsers, IconStar } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 'respectech', category: 'Conference', title: 'RespecTech Conference', subtitle: "Africa's Premier Tech-Talent Event",
    year: '2022–2024', color: 'var(--lime)',
    stats: [{ num: '2,000+', label: 'Attendees' }, { num: '100+', label: 'Job Opportunities' }, { num: '250+', label: 'Scholarships Awarded' }, { num: '10+', label: 'Innovation Booths' }],
    desc: 'The Respectech Conference spanned two impactful days with a diverse audience including government officials from the National Assembly, MDAs, private sector executives, international NGO leaders, and youth stakeholders from the University of Abuja.',
    highlights: ['Panel discussions on tech & innovation','On-the-spot job interviews','Scholarship distribution ceremony','Innovation Garden with 10 booths','Government & private sector collaboration'],
  },
  {
    id: 'blockchain', category: 'Summit', title: 'Domineum Blockchain Developers Summit', subtitle: "Africa's Largest Blockchain Event",
    year: '2022', color: 'var(--gold)',
    stats: [{ num: '1,500+', label: 'Participants' }, { num: '15+', label: 'In-depth Sessions' }, { num: '15', label: 'Networking Sessions' }, { num: '1', label: 'Blockchain-AI Lab' }],
    desc: "Held on July 21–22 at Baze University, Abuja, the summit stood out as Africa's largest blockchain-focused event, drawing over 1,500 participants. Organized with NITDA and BSV Blockchain, featuring 15 in-depth sessions on blockchain technology, cryptocurrency, and real-world use cases.",
    highlights: ['Launch of the Blockchain-AI Lab','NITDA institutional support','Cross-continental blockchain education','Real-world use case demonstrations','Youth talent development focus'],
  },
  {
    id: 'lpres', category: 'Training', title: 'Livestock Capacity Building Training', subtitle: 'World Bank L-PRES Partnership',
    year: '2025', color: '#7EB8FF',
    stats: [{ num: '300+', label: 'Farmers Trained' }, { num: '3', label: 'Kogi Locations' }, { num: '3-Day', label: 'Program' }, { num: '84', label: 'Farmers in Okene' }],
    desc: 'The L-PRES Project conducted a three-day capacity building training on livestock waste management across Lokoja, Anyigba, and Okene in Kogi State. Implemented by LAICOS Farms, the training equipped livestock farmers with practical knowledge on sustainable waste management and waste-to-wealth opportunities.',
    highlights: ['Sustainable waste management training','Environmental protection practices','Public health compliance','Waste-to-wealth opportunities','Biogas generation techniques'],
  },
  {
    id: 'french', category: 'Program Launch', title: 'Bilingual & Competitive Project Launch', subtitle: 'French Embassy Partnership',
    year: '2024', color: '#FF9B7A',
    stats: [{ num: '80+', label: 'Professionals' }, { num: '1', label: 'Official Launch' }, { num: '26', label: 'Partners' }, { num: '∞', label: 'Lasting Impact' }],
    desc: 'Fully organized for the French Embassy, this milestone event reflected our commitment to empowering young people for a truly global future. As official Implementing Partners, we brought together key stakeholders around a shared vision of expanding access to language development and global competencies.',
    highlights: ['Official French Embassy partnership','Language development initiative','Youth global competency building','Long-term collaboration framework','Community engagement at scale'],
  },
  {
    id: 'ywbdlt', category: 'Training', title: "Young Women's Business & Leadership Training", subtitle: 'Empowering Female Entrepreneurs',
    year: '2025', color: '#B87EFF',
    stats: [{ num: '20', label: 'NMSME Owners' }, { num: '5', label: 'Training Modules' }, { num: '2-Day', label: 'Intensive' }, { num: '100%', label: 'Applied Skills' }],
    desc: 'The YWBDLT brought together 20 young female NMSME owners for an intensive capacity-building experience. Practical sessions on Business Development, Digital Marketing, Financial Management, Civic Education, and Leadership for Advocacy.',
    highlights: ['Digital marketing & social media','Financial management & discipline','Business development strategies','Civic participation & advocacy','Peer learning & mentorship'],
  },
  {
    id: 'mandela', category: 'Conference', title: 'Mandela Washington Fellowship Alumni Conference', subtitle: 'Legacy Conference — Pan-African Leadership',
    year: '2024', color: '#7EFFD4',
    stats: [{ num: '650+', label: 'Physical Attendees' }, { num: '15', label: 'Networking Sessions' }, { num: '26', label: 'Countries' }, { num: '1', label: 'Ubuntu Trades App' }],
    desc: "The conference underscored youth leadership as a cornerstone for Africa's long-term growth. A major highlight was the launch of the Ubuntu Trades app — designed to position Mandela Washington Fellows at the forefront of Africa's intra-continental trade via AfCFTA.",
    highlights: ['Launch of Ubuntu Trades App','AfCFTA integration discussions','26 countries represented','Youth-led policy engagement','Cross-border collaboration'],
  },
  {
    id: 'ivolunteer', category: 'Social Impact', title: 'iVolunteer Conferences', subtitle: 'Servelead Humanitarian Initiative',
    year: '2021–2024', color: '#FFD4B8',
    stats: [{ num: '1,500+', label: 'Participants' }, { num: '500+', label: 'Youth Trained' }, { num: '2', label: 'Flagship Events' }, { num: '17', label: 'SDGs Addressed' }],
    desc: 'The ServeLead Humanitarian Initiative empowers volunteers through structured programs promoting leadership, collaboration, and social impact. The iVolunteer Conferences have trained over 500 young people globally, equipping them with essential teamwork skills and SDG knowledge.',
    highlights: ['i-Volunteer 2.0 Camp','TSIC Conference','SDG knowledge building','Global volunteering culture','Youth leadership development'],
  },
];

// Conference image gallery component
function ConfGallery() {
  const confImages = Array.from({ length: 14 }, (_, i) => `conf${i + 1}.jpg`);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
      {confImages.map((img, i) => (
        <div key={img} className="img-zoom" style={{
          aspectRatio: i === 0 || i === 7 ? '16/9' : '1/1',
          gridColumn: i === 0 || i === 7 ? '1 / -1' : 'auto',
          background: 'var(--green-mid)', overflow: 'hidden',
        }}>
          <img src={`/${img}`} alt={`RespecTech Conference ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = `rgba(184,255,0,${0.04 + (i % 3) * 0.02})`;
              e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:80px;color:var(--gray);font-size:0.7rem;font-family:var(--font-body)">Conference ${i+1}</div>`;
            }}
          />
        </div>
      ))}
    </div>
  );
}

// RespecTech Center images
function ResTechCenter() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginTop: '24px' }}>
      {['res1.jpg','res2.jpg','res3.jpg'].map((img, i) => (
        <div key={img} className="img-zoom" style={{ aspectRatio: '4/3', background: 'var(--green-mid)', overflow: 'hidden', border: '1px solid rgba(184,255,0,0.1)' }}>
          <img src={`/${img}`} alt={`RespecTech Center ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:100px;color:var(--gray);font-size:0.75rem;font-family:var(--font-body)">RTC ${i+1}</div>`;
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Oby Ezekwesili featured section
function ObySection() {
  return (
    <div style={{ background: 'var(--dark-2)', border: '1px solid rgba(212,168,67,0.2)', padding: 'clamp(28px,4vw,48px)', position: 'relative', overflow: 'hidden', marginTop: 'clamp(40px,5vw,64px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }} className="oby-grid">
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {['doc1.jpg','doc2.jpg','doc3.jpg'].map((img, i) => (
              <div key={img} className="img-zoom" style={{
                aspectRatio: i === 0 ? '1/1' : '1/1',
                gridColumn: i === 0 ? '1 / -1' : 'auto',
                background: 'var(--green-mid)', overflow: 'hidden',
                border: '1px solid rgba(212,168,67,0.15)',
              }}>
                <img src={`/${img}`} alt={`Oby Ezekwesili at RespecTech ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.minHeight = '120px';
                    e.target.parentNode.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:120px;color:var(--gray);font-size:0.75rem;font-family:var(--font-body)">Featured ${i+1}</div>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="tag" style={{ marginBottom: '20px', borderColor: 'rgba(212,168,67,0.35)', color: 'var(--gold)' }}>Featured Speaker</div>
          <h3 style={{ marginBottom: '16px' }}>Oby Ezekwesili</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 600, marginBottom: '16px', fontStyle: 'italic' }}>
            Economic Policy Expert & Former Minister of Education, Federal Republic of Nigeria
          </p>
          <p style={{ marginBottom: '16px', fontSize: '0.92rem' }}>
            A landmark moment at the RespecTech Conference as Dr. Oby Ezekwesili — globally recognized economist, co-founder of Transparency International, and former World Bank VP — graced our stage as a keynote speaker.
          </p>
          <p style={{ fontSize: '0.92rem' }}>
            Her presence elevated the RespecTech platform to continental significance, bringing world-class economic and policy insights to Africa's next generation of tech leaders.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[{ val: 'Former World Bank VP', label: 'Global Experience' }, { val: 'Transparency International', label: 'Co-founder' }].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold)' }}>{val}</div>
                <p style={{ fontSize: '0.72rem', marginTop: '2px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
      <style>{`@media(max-width:640px){.oby-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const pageRef = useRef(null);
  const filters = ['All', 'Conference', 'Summit', 'Training', 'Program Launch', 'Social Impact'];
  const filtered = activeFilter === 'All' ? events : events.filter(e => e.category === activeFilter);

  useEffect(() => {
    const bd = { toggleActions: 'play reverse play reverse' };
    const ctx = gsap.context(() => {
      gsap.fromTo('.ev-card', { y: 52, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.09, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: '.events-wrap', start: 'top 82%', ...bd } });
      gsap.fromTo('.conf-hdr', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.conf-section', start: 'top 82%', ...bd } });
      gsap.fromTo('.conf-gallery', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.conf-section', start: 'top 80%', ...bd } });
      gsap.fromTo('.agg-num', { y: 32, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.6, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.agg-wrap', start: 'top 84%', ...bd } });
    }, pageRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <>
      <Helmet>
        <title>Portfolio | Servelead Global Events & Programs</title>
        <meta name="description" content="Explore Servelead Global's portfolio of world-class events, conferences, training programs, and social impact initiatives across Africa." />
        <link rel="canonical" href="https://www.serveleadglobal.net/portfolio" />
      </Helmet>

      <PageHero
        pageKey="portfolio"
        tag="Our Work"
        title="Events That"
        titleEm="Create Impact"
        subtitle="From blockchain summits to women's leadership programs — every event we manage leaves a measurable legacy."
      />

      <div ref={pageRef}>

        {/* Filter bar */}
        <section style={{ background: 'var(--dark-2)', padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: '9px 22px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: '1px solid', fontFamily: 'var(--font-body)',
                  borderColor: activeFilter === f ? 'var(--lime)' : 'rgba(255,255,255,0.1)',
                  background: activeFilter === f ? 'var(--lime)' : 'transparent',
                  color: activeFilter === f ? 'var(--dark)' : 'var(--gray)',
                  transition: 'all 0.3s', cursor: 'pointer',
                }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Event cards */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="events-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(20px,3vw,36px)' }}>
              {filtered.map(({ id, category, title, subtitle, year, color, stats, desc, highlights }) => (
                <div key={id} className="ev-card" style={{ background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'border-color 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${color}44`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  <div style={{ background: `${color}10`, borderBottom: `2px solid ${color}2a`, padding: 'clamp(20px,3vw,32px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color, border: `1px solid ${color}44`, padding: '4px 12px', fontWeight: 600 }}>{category}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{year}</span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(1.1rem,1.8vw,1.7rem)', marginBottom: '6px' }}>{title}</h3>
                    <p style={{ fontSize: '0.84rem', color, fontWeight: 600 }}>{subtitle}</p>
                  </div>

                  <div style={{ padding: 'clamp(20px,3vw,32px)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '20px' }}>
                      {stats.map(({ num, label }) => (
                        <div key={label} style={{ background: 'var(--dark)', padding: 'clamp(10px,1.5vw,16px) 6px', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem,1.8vw,1.6rem)', fontWeight: 800, color, lineHeight: 1 }}>{num}</div>
                          <p style={{ fontSize: '0.64rem', marginTop: '3px', lineHeight: 1.3 }}>{label}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.86rem', marginBottom: '16px', lineHeight: 1.72 }}>{desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {highlights.map(h => (
                        <li key={h} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem' }}>
                          <span style={{ color, flexShrink: 0, marginTop: '2px' }}><IconArrowRight size={11} /></span>
                          <span style={{ color: 'var(--gray-light)' }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.events-wrap{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ═══ RESPECTECH CONFERENCE GALLERY ═══ */}
        <section className="conf-section section-pad" style={{ background: 'var(--dark-2)' }}>
          <div className="container">
            <div className="conf-hdr" style={{ marginBottom: 'clamp(28px,4vw,48px)' }}>
              <div className="tag" style={{ marginBottom: '18px' }}>In Pictures</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <h2>RespecTech Conference <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Gallery</em></h2>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {[{ icon: <IconUsers size={16} />, val: '2,000+', label: 'Attendees' }, { icon: <IconStar size={16} />, val: '250+', label: 'Scholarships' }, { icon: <IconAward size={16} />, val: '100+', label: 'Job Opportunities' }].map(({ icon, val, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', color: 'var(--lime)', marginBottom: '4px' }}>{icon}<span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>{val}</span></div>
                      <p style={{ fontSize: '0.72rem' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="conf-gallery"><ConfGallery /></div>

            {/* Oby Ezekwesili Feature */}
            <ObySection />

            {/* RespecTech Center */}
            <div style={{ marginTop: 'clamp(36px,5vw,64px)' }}>
              <div className="tag" style={{ marginBottom: '18px' }}>Our Facility</div>
              <h3 style={{ marginBottom: '8px' }}>The RespecTech <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Center</em></h3>
              <p style={{ maxWidth: '560px', marginBottom: '0', fontSize: '0.92rem' }}>
                A state-of-the-art innovation space where tech talent meets opportunity — housing training facilities, co-working spaces, and an innovation lab designed to nurture Africa's next generation of tech leaders.
              </p>
              <ResTechCenter />
            </div>
          </div>
        </section>

        {/* ═══ AGGREGATE IMPACT ═══ */}
        <section className="section-pad" style={{ background: 'var(--green-deep)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
              <div className="tag" style={{ margin: '0 auto 18px', justifyContent: 'center' }}>Total Impact</div>
              <h2>By The <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Numbers</em></h2>
            </div>
            <div className="agg-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
              {[{ num: '7+', label: 'Flagship Events' }, { num: '6,000+', label: 'Total Participants' }, { num: '26', label: 'Countries Reached' }, { num: '40+', label: 'Partner Organizations' }].map(({ num, label }) => (
                <div key={label} className="agg-num" style={{ background: 'rgba(6,15,9,0.5)', padding: 'clamp(24px,4vw,44px)', textAlign: 'center' }}>
                  <div className="stat-number" style={{ fontSize: 'clamp(2.2rem,4vw,3.8rem)' }}>{num}</div>
                  <p style={{ marginTop: '8px', fontSize: '0.88rem' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){.agg-wrap{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
        </section>

        {/* CTA */}
        <section className="section-pad" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>
              Ready to Plan Your Next<br /><em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Landmark Event?</em>
            </h2>
            <p style={{ maxWidth: '420px', margin: '0 auto 36px' }}>
              Let's co-create an event experience that builds real connections, creates lasting impact, and leaves your audience inspired.
            </p>
            <Link to="/contact" className="btn btn-primary">Discuss Your Event <IconArrowRight size={16} /></Link>
          </div>
        </section>

      </div>
    </>
  );
}
