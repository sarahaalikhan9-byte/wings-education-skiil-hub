import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1496065187959-7f07b8353c55',
      title: 'WINGS EDU-SKILL GLOBAL HUB',
      subtitle: 'Education Without Boundaries',
      description: 'Empowering every student with AI, Skills & Global Opportunities'
    },
    {
      image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65',
      title: 'AI-Powered Learning for All',
      subtitle: 'Meet ZIARA — Your Personal AI Teacher',
      description: 'Learn with voice, gestures & smart interaction 24/7'
    },
    {
      image: 'https://images.unsplash.com/photo-1767954561407-7014cb8fb16c',
      title: 'Future-Ready Skills',
      subtitle: 'Robotics • Coding • Career Guidance',
      description: "Building Tomorrow's Innovators Today",
      cta: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-[#0a0a0a]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with optimized sizing */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] scale-110"
            style={{ 
              backgroundImage: `url(${slide.image}?w=1600&q=80)`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
            }}
          />
          
          {/* Royal Purple Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#0a0a0a]" />
          
          {/* Content Container */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10 max-w-6xl mx-auto text-white">
            
            {/* Main Title - Updated to 2xl/4xl for better readability */}
            <h1 className="text-4xl md:text-6xl lg:text-9xl font-black italic uppercase tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-8">
              {slide.title.split(' ')[0]} <span className="text-gold">{slide.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            {/* Subtitle - ZIARA update */}
            <p className="mt-4 text-xl md:text-3xl font-black uppercase tracking-[10px] text-white/90 animate-slide-in italic" style={{animationDelay: '0.2s'}}>
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="mt-8 text-sm md:text-lg font-bold text-white/50 max-w-3xl animate-slide-in leading-relaxed uppercase tracking-[3px]" style={{animationDelay: '0.3s'}}>
              {slide.description}
            </p>
            
            {/* Buttons - Royal Theme */}
            {slide.cta ? (
              <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-in" style={{animationDelay: '0.4s'}}>
                <button className="px-10 py-4 rounded-full bg-gradient-royal text-white font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all border border-white/20">
                  Meet ZIARA
                </button>
                <button className="px-10 py-4 rounded-full border-2 border-gold text-gold font-black uppercase tracking-widest text-sm hover:bg-gold hover:text-royal-dark transition-all">
                  Explore Hubs
                </button>
              </div>
            ) : (
              <div className="mt-10 animate-slide-in" style={{animationDelay: '0.4s'}}>
                 <button className="px-10 py-4 rounded-full bg-gradient-royal text-white font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl border border-white/20">
                  Start Learning
                </button>
              </div>
            )}

            {/* Vision Statement Section */}
            {index === 0 && (
              <div className="mt-12 glass p-6 rounded-3xl border border-gold/30 max-w-2xl animate-slide-in relative overflow-hidden group" style={{animationDelay: '0.5s'}}>
                <div className="absolute inset-0 bg-gold/5 blur-xl group-hover:bg-gold/10 transition-colors" />
                <p className="relative text-xs font-black text-gold uppercase tracking-[4px] mb-2 drop-shadow-sm">
                  Our Vision
                </p>
                <p className="relative text-white md:text-base leading-relaxed font-medium">
                  Inclusive learning powered by <span className="text-gold-light font-bold">AI innovation</span> for every student globally.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Custom Slider Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all duration-500 rounded-full border border-white/20 ${
              index === currentSlide 
                ? 'w-12 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' 
                : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
