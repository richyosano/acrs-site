import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Twitter, Linkedin, Facebook, Leaf, Globe, Users, Calendar, PlayCircle, Sprout, Zap, Network, Lightbulb, ShieldCheck, Milestone } from 'lucide-react';
import { Agenda } from './components/Agenda';
import { Gallery } from './components/Gallery';

// --- Assets ---

const PARTNERS = [
  {
    name: "Kuehne Climate Center",
    logo: "https://intro.africa/wp-content/uploads/2025/09/Kuehne.png",
    className: "h-28 md:h-36",
    url: "https://www.kuehne-stiftung.org/areas/climate/climate-center"
  },
  {
    name: "Carbon Removal Kenya",
    logo: "https://images.squarespace-cdn.com/content/v1/66a8e8212d8c4b24a8a2994e/e77dbc9c-1350-48f6-bbbd-454396056681/Logo.png?format=1500w",
    className: "h-20 md:h-24",
    url: "https://www.carbonremovalkenya.com"
  },
  {
    name: "Africa Carbon Removal Accelerator",
    logo: "https://i.postimg.cc/ZqPfx2mb/image.png",
    className: "h-28 md:h-36 scale-110",
    url: "https://www.acra-program.com"
  }
];

// --- Components ---

// Sticky Header with Scroll Spy
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = ['home', 'about', 'agenda', 'recap', 'practical', 'partners'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Program', id: 'agenda' },
    { name: 'Past Events', id: 'recap' },
    { name: 'Practical Info', id: 'practical' },
    { name: 'Partners', id: 'partners' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for sticky header
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
      <div className="px-6">
        <div className="container mx-auto relative">
          <div className="w-full bg-[#FCFCFA] backdrop-blur-xl rounded-full shadow-sm px-6 py-3 flex items-center justify-between transition-all duration-300">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 min-w-[140px] md:min-w-[200px]">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center gap-2 z-50 group">
                {/* Logo Animation */}
                <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30 group-hover:rotate-12 transition-transform duration-300">
                  <Leaf size={20} fill="currentColor" />
                </div>
                <div className="leading-tight flex items-center">
                  <h1 className="font-bold text-stone-800 text-2xl tracking-tight">ACRS</h1>
                </div>
              </a>
            </div>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.id)}
                  className={`px-4 lg:px-6 py-2 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300
                    ${activeSection === link.id 
                      ? 'bg-stone-200 text-stone-900' 
                      : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden flex justify-end flex-1">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-800">
                  {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-24 left-0 right-0 bg-white rounded-3xl p-6 shadow-xl border border-stone-100 flex flex-col gap-4 md:hidden z-40"
              >
                {navLinks.map((link) => (
                  <button 
                    key={link.name} 
                    onClick={() => scrollToSection(link.id)}
                    className={`text-lg font-bold text-left uppercase tracking-wide px-4 py-3 rounded-xl transition-colors
                      ${activeSection === link.id ? 'bg-brand-50 text-brand-700' : 'text-stone-800 hover:bg-stone-50'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// Footer
const Footer = () => (
  <footer id="contact" className="bg-brand-900 text-brand-100 py-10">
    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-6 text-white">
           <Leaf size={24} fill="currentColor" />
           <span className="font-bold text-xl">ACRS 2026</span>
        </div>
        <p className="text-sm leading-relaxed mb-6 opacity-80">
          Advancing climate action through carbon dioxide removal for the sustainable development of economies and societies in Africa.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors" aria-label="ACRS LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
          <li><a href="#agenda" className="hover:text-white transition-colors">ACRS 2026 Programme</a></li>
          <li><a href="#practical" className="hover:text-white transition-colors">ACRS 2026 Practical Info</a></li>
          <li><a href="#recap" className="hover:text-white transition-colors">Past Events</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <div className="space-y-6 text-sm opacity-80">
          <div>
            <a href="https://www.kuehne-stiftung.org/areas/climate/climate-center" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline block mb-1">
              Kuehne Climate Center
            </a>
            <a href="mailto:climate@kuehne-foundation.org" className="hover:text-white transition-colors block mt-1">climate@kuehne-foundation.org</a>
            <a href="https://www.linkedin.com/company/kuehne-foundation-climate-action/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 hover:text-white transition-colors" aria-label="KCC LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div>
            <a href="https://www.carbonremovalkenya.com" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline block mb-1">
              Carbon Removal Kenya
            </a>
            <p>Nairobi, Kenya</p>
            <a href="mailto:hello@carbonremovalkenya.com" className="hover:text-white transition-colors block mt-1">hello@carbonremovalkenya.com</a>
            <a href="https://www.linkedin.com/company/carbon-removal-kenya/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 hover:text-white transition-colors" aria-label="CRK LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-8 pt-6 border-t border-brand-800 text-xs text-center opacity-60">
      © 2026 Carbon Removal Kenya. All rights reserved.
    </div>
  </footer>
);

// Main App Layout
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('venue');
  const [showGallery, setShowGallery] = useState(false);
  
  const practicalTabs = [
    { id: 'venue', label: 'Venue' },
    { id: 'travel', label: 'Travel' },
    { id: 'hotels', label: 'Accommodation' },
    { id: 'weather', label: 'Weather' },
  ];

  const scrollToProgram = () => {
    const el = document.getElementById('agenda');
    if (el) {
       window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
       window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  // If Gallery Mode is active
  if (showGallery) {
    return <Gallery onBack={() => setShowGallery(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-200 selection:text-brand-900 overflow-x-hidden bg-stone-50">
      <Header />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-4 tracking-tight">
                 Africa Carbon Removal Summit
               </h1>
               <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-brand-600 mb-6 tracking-tight">
                 Policy, Capital, <span className="italic">and Integrity</span>
               </h2>
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-100 text-brand-700 font-semibold text-sm mb-6 border border-brand-200">
                 <Calendar size={16} />
                 ACRS 2026 • April 14-15 • Nairobi, Kenya
               </div>
               <div className="text-lg text-stone-600 mb-10 max-w-lg leading-relaxed space-y-4">
                 <p>
                   The Africa Carbon Removal Summit (ACRS) 2026 brings global and local leaders across Kenya and the African continent.
                 </p>
                 <p>
                   Africa’s flagship CDR summit. Don’t miss your seat at the table.
                 </p>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                   onClick={scrollToAbout}
                   className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2"
                 >
                   Learn More <ArrowRight size={18} />
                 </button>
                 <button 
                   onClick={scrollToProgram}
                   className="bg-transparent border border-stone-300 hover:border-brand-500 text-stone-700 hover:text-brand-600 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white flex items-center justify-center gap-2"
                 >
                   View Program
                 </button>
               </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative h-[500px] md:h-[600px] w-full"
            >
               {/* Main Shaped Image */}
               <div className="absolute inset-0 bg-stone-200 rounded-[3rem] overflow-hidden shadow-2xl">
                 <img 
                  src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low/Other%20Images/Getty_Images__Rock.webp" 
                  alt="Layered Rock Formation" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s]" 
                  referrerPolicy="no-referrer"
                 />
                 {/* Gradient Overlay for text readability if needed, though cards are on top */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/20 to-transparent pointer-events-none" />
               </div>

               {/* Floating Card Left - Global Impact */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.6 }}
                 className="absolute top-[20%] -left-4 md:-left-12 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[240px] border border-white/50"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                     <Globe size={20} />
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-stone-900 leading-none">10+</div>
                     <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Countries</div>
                   </div>
                 </div>
                 <p className="text-xs text-stone-500 leading-relaxed">
                   Uniting stakeholders across Africa and the globe to discuss the status and scalability of the CDR sector.
                 </p>
               </motion.div>

               {/* Floating Card Right - Attendees */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="absolute bottom-16 -right-4 md:-right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[260px] border border-white/50"
               >
                 <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                     <Users size={20} />
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-stone-900 leading-none">100</div>
                     <div className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Influential Minds</div>
                   </div>
                 </div>
                 <p className="text-xs text-stone-500 leading-relaxed">
                   Leading CDR experts, developers, policymakers and investors gathering in Nairobi.
                 </p>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-white rounded-t-[3rem] -mt-10 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="sticky top-24">
                 <span className="text-brand-500 font-bold uppercase tracking-wider text-sm">Our Mission</span>
                 <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">Why ACRS?</h2>
                 <p className="text-stone-600 mb-6 leading-relaxed text-lg">
                   The Africa Carbon Removal Summit (ACRS) is Africa’s premier Carbon Dioxide Removal (CDR) event, building on a strong inaugural edition in 2025.
                 </p>
                 <p className="text-stone-600 mb-6 leading-relaxed text-lg">
                   It brings together multi-sector stakeholders to spark ideas, scale solutions, and drive progress across the carbon removal ecosystem in Africa.
                 </p>
                 <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                   Planned and organized through a collaboration between the Kuehne Climate Center, Carbon Removal Kenya, and the Africa Carbon Removal Accelerator, ACRS is evolving into a leading platform for both in-person and digital engagement.
                 </p>
                 <button onClick={scrollToProgram} className="text-brand-600 font-bold hover:underline flex items-center gap-2 text-lg group">
                   Explore ACRS 2026 Program <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Accelerate */}
                <div className="group flex flex-col h-full bg-stone-50 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:bg-amber-500 hover:-translate-y-1">
                   <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                      <Zap size={24} />
                   </div>
                   <h3 className="font-bold text-xl mb-3 text-stone-800 group-hover:text-white transition-colors">Accelerate</h3>
                   <p className="text-sm text-stone-600 leading-relaxed flex-grow group-hover:text-amber-50 transition-colors">Advance science, policy, and responsible deployment of high-integrity CDR solutions across Africa.</p>
                </div>
                
                {/* Convene */}
                <div className="group flex flex-col h-full bg-stone-50 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:bg-blue-500 hover:-translate-y-1">
                   <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                      <Users size={24} />
                   </div>
                   <h3 className="font-bold text-xl mb-3 text-stone-800 group-hover:text-white transition-colors">Convene</h3>
                   <p className="text-sm text-stone-600 leading-relaxed flex-grow group-hover:text-blue-50 transition-colors">Unite policymakers, innovators, researchers, scientists and more to build a cohesive CDR ecosystem.</p>
                </div>
                
                {/* Roadmap */}
                <div className="group flex flex-col h-full bg-stone-50 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:bg-teal-500 hover:-translate-y-1">
                   <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                      <Milestone size={24} />
                   </div>
                   <h3 className="font-bold text-xl mb-3 text-stone-800 group-hover:text-white transition-colors">Roadmap</h3>
                   <p className="text-sm text-stone-600 leading-relaxed flex-grow group-hover:text-teal-50 transition-colors">Chart strategic pathways and clear milestones to guide the responsible growth and scaling of the carbon removal sector.</p>
                </div>

                {/* Steward */}
                <div className="group flex flex-col h-full bg-stone-50 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:bg-indigo-500 hover:-translate-y-1">
                   <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                      <ShieldCheck size={24} />
                   </div>
                   <h3 className="font-bold text-xl mb-3 text-stone-800 group-hover:text-white transition-colors">Steward</h3>
                   <p className="text-sm text-stone-600 leading-relaxed flex-grow group-hover:text-indigo-50 transition-colors">Ensure environmental integrity, transparency, and sustainability in CDR sector development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA SECTION */}
        <section id="agenda" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-900 mb-4">Summit Agenda</h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg">Explore our topics covering Science, Capital, Policy, and Community.</p>
            </div>
            <Agenda />
          </div>
        </section>
        
        {/* PAST EVENTS RECAP SECTION */}
        <section id="recap" className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Text & Timeline */}
              <div>
                <span className="text-brand-600 font-bold uppercase tracking-wider text-sm">Our Legacy</span>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">Building Momentum<br/>Year After Year</h2>
                <p className="text-stone-600 mb-10 leading-relaxed text-lg">
                  Building on the success of our inaugural 2025 gathering, ACRS continues to set the agenda for Carbon Removal in Africa as we look toward our second summit.
                </p>

                {/* Timeline Items */}
                <div className="space-y-10 relative">
                  {/* Continuous Line */}
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-300"></div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-white"></div>
                    <h4 className="font-bold text-xl text-stone-900">2026: Step Up</h4>
                    <p className="text-stone-500 text-sm mt-1 mb-3 font-medium">100 Attendees • 12 Countries</p>
                    <p className="text-stone-600 text-base">Africa’s climate and economic development agenda takes centre stage in the second installment of ACRS. Dialogue will transcend ideas and proposals. The summit will focus on the governance, regulatory, and financing frameworks needed to ensure scaling and responsible deployment of carbon removal across the region.</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-stone-300 ring-4 ring-white"></div>
                    <h4 className="font-bold text-xl text-stone-900">2025: The Foundation</h4>
                    <p className="text-stone-500 text-sm mt-1 mb-3 font-medium">60 Attendees • 8 Countries</p>
                    <p className="text-stone-600 text-base">The first dedicated cross-sectoral gathering bringing together CDR stakeholders from different African countries, establishing the baseline for policy advocacy and cross-sector collaboration. This inaugural edition was hugely successful, underpinning its value as the flagship CDR convening in Africa.</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button 
                    onClick={() => setShowGallery(true)}
                    className="flex items-center gap-2 text-stone-800 font-bold hover:text-brand-600 transition-colors group text-sm uppercase tracking-wide"
                  >
                    View Full Gallery <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Image Grid (Organized) */}
              <div className="grid grid-cols-2 gap-4 relative">
                 {/* Decorative Blur */}
                 <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-100 rounded-full blur-3xl -z-10 opacity-60" />

                 <div className="space-y-4">
                   {/* Image 1: Keyonote */}
                   <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative group">
                      <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/Other%20Images/CC-60.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="2025 Keynote" />
                   </div>

                   {/* Box 3: Growth Stats */}
                   <div className="aspect-[4/3] rounded-2xl shadow-sm bg-brand-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                       <div className="absolute inset-0 bg-brand-900/50 group-hover:bg-brand-900/30 transition-colors"></div>
                       <div className="relative z-10 text-brand-50">
                         <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">66%</div>
                         <div className="text-brand-200/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">Expected Growth in Attendance</div>
                       </div>
                   </div>
                 </div>

                 <div className="space-y-4 pt-8">
                   {/* Image 2: Panel Discussion */}
                   <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative group">
                      <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/Other%20Images/Help-112.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Panel Discussion" />
                   </div>

                   {/* Image 4: Group */}
                   <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative group">
                      <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/Other%20Images/ACR-176.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Group" />
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* PRACTICAL INFO */}
        <section id="practical" className="py-24 bg-stone-50 relative overflow-hidden border-t border-stone-100">
           <div className="absolute top-0 left-0 w-64 h-64 bg-brand-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
           <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-3 gap-12">
               <div className="lg:col-span-1">
                 <h2 className="text-4xl font-bold text-stone-900 mb-6">Practical<br />Information</h2>
                 <p className="text-stone-600 mb-8">Everything you need to know to make your trip to Nairobi smooth and enjoyable.</p>
                 <div className="flex flex-col gap-2">
                    {practicalTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-left px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-between group ${
                          activeTab === tab.id 
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                            : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-100'
                        }`}
                      >
                        {tab.label}
                        <ArrowRight size={16} className={`transition-transform duration-300 ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-50'}`} />
                      </button>
                    ))}
                 </div>
               </div>
               
               <div className="lg:col-span-2">
                  <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 h-full shadow-sm">
                    {activeTab === 'venue' && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-2xl font-bold text-stone-800 mb-4">Pullman Hotel Nairobi</h3>
                        <p className="text-stone-600 mb-8 leading-relaxed">The 2026 summit will be held at the Pullman Hotel in the vibrant heart of Nairobi. Known for its premium hospitality, state-of-the-art conference facilities, and commitment to sustainable practices, it provides the ideal setting for our global gathering.</p>
                        <a href="https://all.accor.com/hotel/C0D4/index.en.shtml" target="_blank" rel="noopener noreferrer" className="block h-80 bg-stone-200 rounded-2xl mb-6 overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow">
                          <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low/Other%20Images/Pullman_Hotel_Ext.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pullman Hotel Nairobi" />
                          <div className="absolute bottom-4 right-4">
                             <span className="bg-white/90 backdrop-blur text-stone-900 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm group-hover:bg-white transition-colors">Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                          </div>
                        </a>
                      </div>
                    )}
                    {activeTab === 'travel' && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-2xl font-bold text-stone-800 mb-6">Getting to the Venue</h3>
                        <div className="space-y-6">
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">✈️</div>
                              <div>
                                <h4 className="font-bold text-stone-900">By Air</h4>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                                  For participants flying in from abroad, <a href="https://jkiairport.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-medium">Jomo Kenyatta International Airport (JKIA)</a> serves as the major transit hub. It offers numerous international connections to ensure a smooth arrival in Nairobi.
                                </p>
                              </div>
                           </div>
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">🚕</div>
                              <div>
                                <h4 className="font-bold text-stone-900">Local Transport</h4>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">
                                  After touching down at JKIA, or for those already in-country, the Pullman Hotel Nairobi is easily and reliably accessed by road. Whether you're coming from the airport or the city center, we recommend using ride-hailing applications such as Uber or Bolt for convenient and safe travel directly to the venue.
                                </p>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'weather' && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-2xl font-bold text-stone-800 mb-4">April Weather in Nairobi</h3>
                        <p className="text-stone-600 mb-6 leading-relaxed">
                          In April, Nairobi is in the middle of its <strong>"Long Rains"</strong> season. While it won't rain all day, expect heavy, predictable downpours, usually in the afternoons or evenings.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                          <div className="bg-brand-50 p-5 rounded-xl border border-brand-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">🌡️</span>
                              <h4 className="font-bold text-stone-900">Temperatures</h4>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">Pleasantly warm days (averaging 24°C–26°C) but quite chilly at night and in the early mornings (dropping to 13°C–15°C).</p>
                          </div>
                          <div className="bg-brand-50 p-5 rounded-xl border border-brand-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">💧</span>
                              <h4 className="font-bold text-stone-900">Humidity</h4>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">High humidity levels make it feel slightly warmer than the thermometer suggests, accompanied by frequent cloud cover.</p>
                          </div>
                        </div>

                        <h4 className="font-bold text-stone-800 mb-5 text-lg border-b border-stone-100 pb-2">Key Travel Considerations</h4>
                        <div className="space-y-5">
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 shadow-sm">🚗</div>
                              <div>
                                <h5 className="font-bold text-stone-900">Traffic Delays</h5>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">Rain causes significant traffic gridlock, especially in the Upper Hill business district. Allow double the usual travel time for airport transfers or off-site dinners.</p>
                              </div>
                           </div>
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 shadow-sm">🧥</div>
                              <div>
                                <h5 className="font-bold text-stone-900">Packing Essentials</h5>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">Bring a sturdy umbrella or a light waterproof jacket. Since conference venues are heavily air-conditioned, layering is key to staying comfortable indoors and outdoors.</p>
                              </div>
                           </div>
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 shadow-sm">🦟</div>
                              <div>
                                <h5 className="font-bold text-stone-900">Health</h5>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">The rainy season can increase mosquitoes. Ensure your accommodation has nets or use repellent, and check if you need updated Yellow Fever or Malaria precautions.</p>
                              </div>
                           </div>
                           <div className="flex gap-4 items-start">
                              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 shadow-sm">🥾</div>
                              <div>
                                <h5 className="font-bold text-stone-900">Footwear</h5>
                                <p className="text-stone-600 text-sm mt-1 leading-relaxed">Some streets can become muddy or have large puddles. Opt for closed-toe, water-resistant shoes rather than suede or light fabric trainers.</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'hotels' && (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Section 1: Main Accommodation */}
                        <div className="mb-10">
                          <h3 className="text-2xl font-bold text-stone-800 mb-4">Pullman Hotel Nairobi</h3>
                          <p className="text-stone-600 mb-6">Our preferred and main accommodation option for the summit.</p>
                          <a href="https://all.accor.com/hotel/C0D4/index.en.shtml#section-rooms" target="_blank" rel="noopener noreferrer" className="block h-72 bg-stone-200 rounded-2xl overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow">
                            <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low/Other%20Images/Pullman_Hotel_Room.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Pullman Hotel Room" />
                            <div className="absolute bottom-4 right-4">
                               <span className="bg-white/90 backdrop-blur text-stone-900 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm group-hover:bg-white transition-colors">View Rooms <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                            </div>
                          </a>
                        </div>

                        {/* Section 2: Nearby Options */}
                        <div>
                          <h3 className="text-xl font-bold text-stone-800 mb-3">Nearby Accommodations</h3>
                          <p className="text-stone-600 mb-6 text-sm leading-relaxed">The Pullman Nairobi Hotel is located in the Upper Hill neighbourhood and the following accommodations provide excellent proximity.</p>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            {/* Mercure Hotel */}
                            <a href="https://all.accor.com/hotel/C0D5/index.en.shtml" target="_blank" rel="noopener noreferrer" className="bg-stone-50 p-5 rounded-xl border border-stone-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow group">
                              <div className="w-full h-40 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                                <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/Other%20Images/Mercure_Hotel_Ext.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mercure Hotel" />
                              </div>
                              <div>
                                <h4 className="font-bold text-stone-900 text-lg group-hover:text-brand-600 group-hover:underline transition-colors">Mercure Nairobi Upper Hill</h4>
                                <p className="text-sm text-stone-600 leading-relaxed mt-2">
                                  This 4-star hotel is located <strong>approximately 210m away</strong> on Longonot Road. It is highly rated and offers a fitness center, restaurant, and bar.
                                </p>
                              </div>
                            </a>

                            {/* Radisson Blu */}
                            <a href="https://www.radissonhotels.com/en-us/hotels/radisson-blu-nairobi-upper-hill" target="_blank" rel="noopener noreferrer" className="bg-stone-50 p-5 rounded-xl border border-stone-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow group">
                              <div className="w-full h-40 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                                <img src="https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/Other%20Images/Radisson_Blu_Hotel_Ext.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Radisson Blu" />
                              </div>
                              <div>
                                <h4 className="font-bold text-stone-900 text-lg group-hover:text-brand-600 group-hover:underline transition-colors">Radisson Blu Hotel, Nairobi Upper Hill</h4>
                                <p className="text-sm text-stone-600 leading-relaxed mt-2">
                                  Located roughly <strong>220m away</strong> on Elgon Road. It is a 5-star option known for high professional standards during multi-day events and offers an outdoor pool.
                                </p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
           </div>
        </section>

        {/* PARTNERS */}
        <section id="partners" className="py-20 bg-white border-t border-stone-200">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-12">Organized in collaboration with</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {PARTNERS.map((partner, i) => (
                <a 
                  key={i} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500 hover:scale-105" 
                  title={partner.name}
                >
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className={`${partner.className} w-auto object-contain`}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default App;
