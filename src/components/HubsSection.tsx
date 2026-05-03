import React from 'react';

const HubsSection = () => {
  const hubs = [
    {
      title: 'AI- ZAIRA',
      description: 'ALL-IN-ONE AI LEARNING HUB: Personalized AI Teacher, Smart Academic Guidance, and Career Counseling',
      image: 'https://customer-assets.emergentagent.com/job_ai-learning-hub-363/artifacts/ioxrs3my_ai-teacher.jpg',
      icon: 'fas fa-user-graduate',
      link: '/ai-tutor'
    },
    {
      title: 'Robotic Lab',
      description: 'Hands-on training in Robotics, AI & Coding. Mastery classes with certification.',
      image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxyb2JvdGljc3xlbnwwfHx8fDE3NzU4NTM4ODF8MA&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-microchip',
      link: '/master-skill-hub'
    },
    {
      title: 'Competitive Hub',
      description: 'Global Excellence: Prepare for IIT-JEE, NEET, and International Olympiads with AI proctoring.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxwcmVwYXJhdGlvbnxlbnwwfHx8fDE3NzU4NTM4ODF8MA&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-medal',
      link: '/competitive-exam'
    },
    {
      title: 'Video Studio',
      description: 'AI Video Engine: Create interactive educational videos and sync directly to YouTube.',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MHx8fHwxNzc1ODUzODgxfDA&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-video',
      link: '/video-creator'
    },
    {
      title: 'Knowledge Vault',
      description: 'Global Digital Library: Access millions of free, open-source, and public domain educational resources.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5fGVufDB8fHx8MTc3NTg1Mzg4MXww&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-book-open',
      link: '/library'
    },
    {
      title: 'Neural Exam',
      description: 'Neuro-Lock Proctoring: Advanced biometric verification for high-stakes certification.',
      image: 'https://images.unsplash.com/photo-1417733566355-634a3630f9a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxzZWN1cml0eXxlbnwwfHx8fDE3NzU4NTM4ODF8MA&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-shield-alt',
      link: '/secure-exam'
    },
    {
      title: 'Creative Sync Lab',
      description: 'Pre-Primary Air Writing: Brain-wave developed creativity for little geniuses.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxwYWludGluZ3xlbnwwfHx8fDE3NzU4NjMxMzh8MA&ixlib=rb-4.1.0&q=85',
      icon: 'fas fa-paint-brush',
      link: '/pre-primary'
    }
  ];

  return (
    <section id="hubs-section" className="relative z-10 py-20 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="gold-label">Specialized Tracks</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-gradient">OUR LEARNING HUBS</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-royal mx-auto rounded-full shadow-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hubs.map((hub, index) => (
            <div
              key={index}
              className="group glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-royal/20 transition-all duration-500 hover:-translate-y-4"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hub.image}
                  alt={hub.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-royal-dark/40 to-transparent opacity-80" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 flex items-center justify-center">
                    <i className={`${hub.icon} text-3xl text-gold-light`} />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/40">
                <h3 className="text-2xl font-display font-bold text-text-main mb-3">
                  {hub.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {hub.description}
                </p>

                <a
                  href={hub.link}
                  className="inline-flex items-center gap-2 text-royal font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all duration-300"
                >
                  ACCESS NOW <i className="fas fa-arrow-right text-gold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HubsSection;
