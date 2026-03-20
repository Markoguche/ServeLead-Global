import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Organizations from './pages/Organizations';
import Team from './pages/Team';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

// GSAP global defaults for silky smooth feel
gsap.config({ nullTargetWarn: false });

function App() {
  const location = useLocation();
  const curtainRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashDone, setSplashDone] = useState(false);
  const isFirstLoad = useRef(true);

  // Smooth custom cursor
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;
    if (window.innerWidth <= 768) return;

    let mx = 0, my = 0, fx = 0, fy = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const tick = () => {
      fx += (mx - fx) * 0.1;
      fy += (my - fy) * 0.1;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    tick();

    const enter = () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; };
    const leave = () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; };

    const els = document.querySelectorAll('a,button,.btn,[role="button"]');
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [location, splashDone]);

  // Scroll to top on route change + page transition
  useEffect(() => {
    if (!splashDone) return;

    // Instant scroll to top FIRST — before any animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const curtain = curtainRef.current;
    if (!curtain) return;

    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      // No curtain on first load (splash handles that)
      ScrollTrigger.refresh();
      return;
    }

    // Curtain in → render happens → curtain out
    const tl = gsap.timeline();
    tl.set(curtain, { scaleY: 1, transformOrigin: 'bottom', display: 'block' })
      .to(curtain, {
        scaleY: 0,
        duration: 0.7,
        ease: 'power4.inOut',
        transformOrigin: 'top',
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
          ScrollTrigger.refresh();
        },
      });
  // eslint-disable-next-line
  }, [location.pathname, splashDone]);

  const handleSplashDone = () => {
    setShowSplash(false);
    setSplashDone(true);
    ScrollTrigger.refresh();
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      <div ref={curtainRef} className="curtain" style={{ display: 'none' }} />

      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
