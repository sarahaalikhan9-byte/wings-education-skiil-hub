import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Book, 
  Search, 
  Download, 
  ExternalLink, 
  Bookmark, 
  ArrowLeft,
  BookOpen,
  Library as LibraryIcon,
  Globe,
  Database,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Library = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Resources", icon: LibraryIcon },
    { id: "ncert", name: "NCERT Vault", icon: Book },
    { id: "classics", name: "Public Classics", icon: BookOpen },
    { id: "oer", name: "Global OER", icon: Globe },
    { id: "ref", name: "Reference", icon: Database },
  ];

  const resources = [
    {
      id: 1,
      title: "Mathematics Class X",
      category: "ncert",
      description: "Official NCERT textbook for Class 10 Mathematics. Free for students.",
      url: "https://ncert.nic.in/textbook.php?jemh1=0-15",
      type: "Textbook",
      source: "NCERT India"
    },
    {
      id: 2,
      title: "Science Class X",
      category: "ncert",
      description: "Comprehensive Science guide for Class 10 covering Physics, Chemistry, and Biology.",
      url: "https://ncert.nic.in/textbook.php?jesc1=0-16",
      type: "Textbook",
      source: "NCERT India"
    },
    {
      id: 3,
      title: "Adventures of Sherlock Holmes",
      category: "classics",
      description: "Sir Arthur Conan Doyle's classic detective series. Public domain.",
      url: "https://www.gutenberg.org/ebooks/1661",
      type: "Literature",
      source: "Project Gutenberg"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      category: "classics",
      description: "Jane Austen's timeless masterpiece of manners and romance.",
      url: "https://www.gutenberg.org/ebooks/1342",
      type: "Literature",
      source: "Project Gutenberg"
    },
    {
      id: 5,
      title: "Introduction to Psychology",
      category: "oer",
      description: "Open educational resource for psychology basics from Saylor Academy.",
      url: "https://saylordotorg.github.io/text_introduction-to-psychology/",
      type: "OER",
      source: "Saylor Academy"
    },
    {
      id: 6,
      title: "MIT OpenCourseWare",
      category: "oer",
      description: "Free access to thousands of MIT courses covering almost all topics.",
      url: "https://ocw.mit.edu/",
      type: "Courseware",
      source: "MIT"
    },
    {
      id: 7,
      title: "Open Library - Science Collection",
      category: "ref",
      description: "Millions of books available for digital borrowing or free reading.",
      url: "https://openlibrary.org/subjects/science",
      type: "Archive",
      source: "Internet Archive"
    },
    {
      id: 8,
      title: "Project Gutenberg Library",
      category: "classics",
      description: "Over 70,000 free eBooks in the public domain.",
      url: "https://www.gutenberg.org/",
      type: "Portal",
      source: "Project Gutenberg"
    },
    {
      id: 9,
      title: "LibriVox Audiobooks",
      category: "classics",
      description: "Free public domain audiobooks read by volunteers from around the world.",
      url: "https://librivox.org/",
      type: "Audiobook",
      source: "LibriVox"
    },
    {
      id: 10,
      title: "Open Culture - Free Textbooks",
      category: "oer",
      description: "Collection of 200 free textbooks on every subject from Art to Economics.",
      url: "https://www.openculture.com/free-textbooks",
      type: "Courseware",
      source: "Open Culture"
    },
    {
      id: 11,
      title: "The Online Books Page",
      category: "ref",
      description: "Listing over 3 million free books on the Web from UPenn.",
      url: "https://onlinebooks.library.upenn.edu/",
      type: "Archive",
      source: "UPenn"
    },
    {
      id: 12,
      title: "Standard Ebooks Collection",
      category: "classics",
      description: "Public domain books formatted for modern readers and devices.",
      url: "https://standardebooks.org/ebooks",
      type: "Literature",
      source: "Standard Ebooks"
    }
  ];

  const externalLinks = [
    { name: "Project Gutenberg", url: "https://www.gutenberg.org/", desc: "70,000+ free public domain books." },
    { name: "Open Library", url: "https://openlibrary.org/", desc: "Over 3 million eBooks to read or borrow." },
    { name: "Feedbooks", url: "https://www.feedbooks.com/publicdomain", desc: "Top-quality public domain books." },
    { name: "ManyBooks", url: "https://manybooks.net/", desc: "50,000+ free eBooks in various formats." },
    { name: "Standard Ebooks", url: "https://standardebooks.org/", desc: "Beautifully formatted public domain editions." },
    { name: "LibriVox", url: "https://librivox.org/", desc: "Free public domain audiobooks." }
  ];

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === "all" || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-midnight-black text-white pt-32 pb-20 px-4 md:px-8 selection:bg-gold selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal rounded-full blur-[180px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              KNOWLEDGE <span className="text-gold">VAULT</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[10px] text-white/30 mt-4">
              Free & Open Educational Resources (Copyright-Free)
            </p>
          </motion.div>
          
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH THE VAULT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-16 py-5 text-sm font-black italic uppercase tracking-widest focus:outline-none focus:border-gold/50 transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-4 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? "bg-gold text-black shadow-2xl shadow-gold/20" 
                    : "glass border border-white/5 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((res, i) => (
              <motion.div
                layout
                key={res.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="glass-strong rounded-[40px] p-8 border border-white/5 bg-white/[0.02] flex flex-col group h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/20 group-hover:text-gold transition-colors">
                  <Bookmark size={20} />
                </div>
                
                <div className="flex-grow">
                  <span className="text-[8px] font-black uppercase tracking-[3px] text-gold mb-2 block">{res.type} // {res.source}</span>
                  <h3 className="text-xl font-black italic uppercase tracking-tight mb-4 group-hover:text-gold transition-colors leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-sm font-medium text-white/40 italic leading-relaxed mb-8">
                    {res.description}
                  </p>
                </div>

                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Access Now <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* External Repositories Section */}
        <div className="glass-strong rounded-[60px] p-12 border border-white/5 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal/5 rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-3xl bg-royal text-white flex items-center justify-center shadow-2xl">
              <Globe size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">GLOBAL FREE REPOSITORIES</h2>
              <p className="text-[10px] font-black uppercase tracking-[5px] text-white/30">External archives for unlimited learning</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalLinks.map((link, i) => (
              <a 
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-8 rounded-[30px] border border-white/5 hover:border-gold/30 hover:bg-white/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-black italic uppercase text-white group-hover:text-gold transition-colors">{link.name}</h4>
                  <ExternalLink size={14} className="text-white/20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <p className="text-xs italic text-white/40 leading-relaxed">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex flex-col md:flex-row items-center gap-6 bg-white/5 border border-white/10 px-8 py-5 rounded-full mb-12"
          >
            <div className="flex items-center gap-3">
              <Info size={16} className="text-gold" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 text-left">
                Content is sourced from public domain archives <br/> and open educational repositories.
              </p>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block" />
            <button
               onClick={() => navigate('/')}
               className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[5px] text-white hover:text-gold transition-colors"
            >
              <ArrowLeft size={16} /> Return to Nexus
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Library;
