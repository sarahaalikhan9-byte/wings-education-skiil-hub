import React, { useState, useEffect, useRef } from 'react';

const StatsBar = () => {
  const [stats, setStats] = useState([
    { target: 10000, current: 0, label: 'EMPOWERED STUDENTS', suffix: '+' },
    { target: 80, current: 0, label: 'INTERACTIVE MODULES', suffix: '+' },
    { target: 15, current: 0, label: 'ADVANCED AI TOOLS', suffix: '+' },
    { target: 100, current: 0, label: 'SKILL-ORIENTED', suffix: '%' }
  ]);
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.target / steps;
      const intervalTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.target) {
          start = stat.target;
          clearInterval(timer);
        }
        setStats(prev => {
          const newStats = [...prev];
          newStats[index] = { ...newStats[index], current: Math.floor(start) };
          return newStats;
        });
      }, intervalTime);
    });
  };

  return (
    <section 
      ref={statsRef}
      className="relative z-10 bg-gradient-royal py-16 px-4 md:px-8 rounded-[40px] border border-gold/30 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gold mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                {stat.current.toLocaleString()}{stat.suffix}
              </h2>
              <p className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[3px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
