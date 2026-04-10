import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Plus, Check, Filter, X, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { Session } from '../types';

const MOCK_SESSIONS: Session[] = [
  { id: '1', day: 1, time: '08:00-09:00', title: 'Registration and Breakfast', speaker: '', category: 'Networking', type: 'Registration', location: 'Main Hall', description: 'Networking' },
  { id: '2', day: 1, time: '09:00-09:10', title: 'Policy, Capital, and Integrity: Why This Moment Matters', speaker: '', category: 'Policy', type: 'Keynote', location: 'Main Hall', description: 'Opening remarks for ACRS 2026' },
  { id: '3', day: 1, time: '09:10-09:30', title: 'Carbon Removal as Infrastructure: The African Opportunity', speaker: '', category: 'Science', type: 'Address', location: 'Main Hall', description: 'Relevance of the Sub-Saharan Africa geography for CDR' },
  { id: '4', day: 1, time: '09:30-09:45', title: 'Status and Progress of CDR Activities in Kenya and Sub-Saharan Africa', speaker: '', category: 'Science', type: 'Address', location: 'Main Hall', description: 'Overview of current projects, actors and ecosystem maturity' },
  { id: '5', day: 1, time: '09:45-10:00', title: 'Africa Carbon Removal Accelerator (ACRA): Announcement of Cohort 2', speaker: '', category: 'Community', type: 'Address', location: 'Main Hall', description: 'Unveiling African CDR startups selected for the 2026 ACRA cohort' },
  { id: '6', day: 1, time: '10:00-10:30', title: 'How Carbon Removal Works: Pathways, Risks and Realities', speaker: '', category: 'Science', type: 'Address', location: 'Main Hall', description: 'Workshop presentation covering major CDR pathways, their risks, benefits and misconceptions' },
  { id: '7', day: 1, time: '10:30-11:15', title: 'Networking Break', speaker: '', category: 'Networking', type: 'Break', location: 'Networking Area', description: 'Networking' },
  { id: '8', day: 1, time: '11:15-12:15', title: 'Building Carbon Removal: Risks, Standards and Community Trust', speaker: '', category: 'Community', type: 'Panel Discussion', location: 'Main Hall', description: 'A 360° approach of scaling CDR projects' },
  { id: '9', day: 1, time: '12:15-13:00', title: 'Governing Carbon Removal: Policy for Scale and Integrity', speaker: '', category: 'Policy', type: 'Panel Discussion', location: 'Main Hall', description: 'The opportunity for policy to ensure safe deployment and demand creation for CDR' },
  { id: '10', day: 1, time: '13:00-14:00', title: 'Lunch Break', speaker: '', category: 'Networking', type: 'Break', location: 'Dining Area', description: 'Networking' },
  { id: '11', day: 1, time: '14:00-14:45', title: 'Making Carbon Removal Investable: Capital, Structure, and Scale', speaker: '', category: 'Capital', type: 'Panel Discussion', location: 'Main Hall', description: 'A discussion on risk profiles and capital structures by financiers, at pilot versus scale developments' },
  { id: '12', day: 1, time: '14:45-15:15', title: 'Networking Break', speaker: '', category: 'Networking', type: 'Break', location: 'Networking Area', description: 'Networking' },
  { id: '13', day: 1, time: '15:15-16:00', title: 'What Gets Credited, What Gets Bought: The Demand Side of CDR', speaker: '', category: 'Capital', type: 'Panel Discussion', location: 'Main Hall', description: 'Buyers discuss how demand drivers, risk, durability, and reputational considerations shape project design' },
  { id: '14', day: 1, time: '16:00-16:20', title: 'Toward COP 2027: Key Signals from ACRS 2026', speaker: '', category: 'Community', type: 'Address', location: 'Main Hall', description: 'Closing address for ACRS 2026' },
  { id: '15', day: 1, time: '16:20-18:00', title: 'Networking Cocktail', speaker: '', category: 'Networking', type: 'Close', location: 'Lounge', description: 'Networking Session' },
  { id: '16', day: 2, time: '08:00-08:15', title: 'Convene at Pullman Nairobi Upper Hill Hotel: Site Visit Brief and Boarding', speaker: '', category: 'Site Visit', type: 'Briefing', location: 'Pullman Nairobi Upper Hill Hotel', description: '' },
  { id: '17', day: 2, time: '08:15-10:30', title: 'Travel from Nairobi to Rift Valley', speaker: '', category: 'Site Visit', type: 'Travel', location: 'Rift Valley', description: '' },
  { id: '18', day: 2, time: '10:30-11:00', title: 'Arrival at Octavia Carbon and Sirona Technologies (Site 1): Site Check-In and Safety Briefing', speaker: '', category: 'Site Visit', type: 'Briefing', location: 'Octavia Carbon', locationLink: 'https://maps.app.goo.gl/FWs4GvGJareagRq8A', description: '' },
  { id: '19', day: 2, time: '11:00-12:00', title: 'Project Overview Briefing: Guided Site Tour at Octavia Carbon and Sirona Technologies', speaker: '', category: 'Site Visit', type: 'Tour', location: 'Octavia Carbon', locationLink: 'https://maps.app.goo.gl/FWs4GvGJareagRq8A', description: '' },
  { id: '20', day: 2, time: '12:00-12:30', title: 'Transfer to Cella Mineral Storage (Site 2)', speaker: '', category: 'Site Visit', type: 'Travel', location: 'Cella Mineral Storage & Sirona Technologies', locationLink: 'https://maps.app.goo.gl/qSTC6q2viqktSy31A', description: '' },
  { id: '21', day: 2, time: '12:30-13:30', title: 'Site Check-In and Guided Site Tour at Cella Mineral Storage', speaker: '', category: 'Site Visit', type: 'Tour', location: 'Cella Mineral Storage & Sirona Technologies', locationLink: 'https://maps.app.goo.gl/qSTC6q2viqktSy31A', description: '' },
  { id: '22', day: 2, time: '13:30-15:00', title: 'Lunch and Site Visit Debrief', speaker: '', category: 'Site Visit', type: 'Lunch', location: 'Site', description: '' },
  { id: '23', day: 2, time: '15:00-17:30', title: 'Travel Back to Nairobi', speaker: '', category: 'Site Visit', type: 'Travel', location: 'Nairobi', description: '' },
];

const CATEGORIES = ['Science', 'Capital', 'Policy', 'Community'];

export const Agenda: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Reset expanded state when day or category changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeDay, selectedCategory]);

  const handleCollapse = () => {
    setIsExpanded(false);
    const element = document.getElementById('agenda');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSessions = MOCK_SESSIONS.filter(
    (s) => s.day === activeDay && (!selectedCategory || s.category === selectedCategory)
  );

  return (
    <div className="relative">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        {/* Day Toggles */}
        <div className="bg-stone-200/50 p-1 rounded-full flex">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day as 1 | 2)}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === day 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        {/* Filters */}
        {activeDay === 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${!selectedCategory ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-stone-200'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
               <button 
               key={cat}
               onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
               className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedCategory === cat ? 'bg-brand-100 text-brand-700 border-brand-200' : 'bg-white text-stone-500 border-stone-200 hover:border-brand-200'}`}
             >
               {cat}
             </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid Container */}
      <div className="relative">
        <div className={`transition-all duration-500 ${!isExpanded ? 'max-h-[600px] overflow-y-auto pr-2' : ''}`}>
          <div className="grid gap-4">
            <AnimatePresence mode='popLayout'>
              {filteredSessions.map((session, index) => (
                <motion.div
                  layout
                  key={session.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-stone-100 transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                >
                  {/* Left Stripe based on category */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    session.category === 'Policy' ? 'bg-blue-400' :
                    session.category === 'Science' ? 'bg-orange-400' :
                    session.category === 'Capital' ? 'bg-emerald-400' :
                    session.category === 'Community' ? 'bg-purple-400' :
                    'bg-stone-300'
                  }`} />

                  <div className="md:w-32 flex flex-col justify-center text-stone-500">
                    <div className="flex items-center gap-2 text-lg font-bold text-stone-800">
                      {session.time}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                         session.category === 'Policy' ? 'bg-blue-50 text-blue-600' :
                         session.category === 'Science' ? 'bg-orange-50 text-orange-600' :
                         session.category === 'Capital' ? 'bg-emerald-50 text-emerald-600' :
                         session.category === 'Community' ? 'bg-purple-50 text-purple-600' :
                         'bg-stone-100 text-stone-600'
                      }`}>
                        {session.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-brand-600 transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                      {session.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-medium text-stone-400 flex-wrap">
                      {session.type && (
                        <span className="flex items-center gap-1"><Tag size={12}/> {session.type}</span>
                      )}
                      {session.speaker && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-stone-300"/>
                          <span>{session.speaker}</span>
                        </>
                      )}
                      {session.location && (
                        <>
                          {(session.type || session.speaker) && <span className="w-1 h-1 rounded-full bg-stone-300"/>}
                          {session.locationLink ? (
                            <a href={session.locationLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                              <MapPin size={12}/> {session.location}
                            </a>
                          ) : (
                            <span className="flex items-center gap-1"><MapPin size={12}/> {session.location}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredSessions.length === 0 && (
              <div className="text-center py-20 text-stone-400">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No sessions found for this filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Fade overlay and Show More button */}
        {!isExpanded && filteredSessions.length > 4 && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent flex items-end justify-center pb-2 pointer-events-none">
            <button 
              onClick={() => setIsExpanded(true)}
              className="pointer-events-auto bg-white border border-stone-200 shadow-sm text-stone-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
              Expand Agenda <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Show Less button */}
      {isExpanded && filteredSessions.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleCollapse}
            className="bg-white border border-stone-200 shadow-sm text-stone-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-stone-50 transition-colors flex items-center gap-2"
          >
            Collapse Agenda <ChevronUp size={16} />
          </button>
        </div>
      )}
    </div>
  );
};