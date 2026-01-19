import React from 'react';
import { ViewState, JournalEntry } from '../types';
import { Settings, Calendar, Award } from 'lucide-react';
import { MOCK_ENTRIES, MOCK_USER } from '../constants';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  onSelectEntry: (entry: JournalEntry) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView, onSelectEntry }) => {
  // Mock check-in data (Oct 2023 based on mock entries)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const checkedDays = [1, 2, 3, 5, 6, 8, 9, 12, 13, 15, 20, 22, 24];

  // Helper to find entry for a day
  const getEntryForDay = (day: number) => {
    // Assuming mock data is current month for simplicity
    // In real app, match Year/Month too
    return MOCK_ENTRIES.find(e => {
        const d = new Date(e.date);
        return d.getDate() === day;
    });
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col relative text-[#423E37] overflow-y-auto overflow-x-hidden pb-24">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply fixed"></div>

      {/* Top Header: Profile Intro */}
      <div className="flex justify-between items-start p-6 pt-12 z-10">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden shadow-md">
                <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
                <h1 className="font-handwriting text-3xl text-[#423E37]">{MOCK_USER.name}</h1>
                <p className="font-serif text-xs opacity-80 tracking-wide">{MOCK_USER.bio}</p>
            </div>
        </div>
        <button className="opacity-60 hover:rotate-90 transition-transform text-[#423E37]">
             <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 gap-6 z-10">
        
        {/* Monthly Check-in Card */}
        <div className="bg-white/40 rounded-2xl p-5 border border-white/40 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3 opacity-90">
                <Calendar size={16} className="text-[#423E37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#423E37]">Monthly Check-in</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map(day => {
                    const entry = getEntryForDay(day);
                    const isChecked = checkedDays.includes(day) || !!entry;
                    
                    return (
                        <div key={day} className="flex justify-center">
                            <button 
                                onClick={() => entry && onSelectEntry(entry)}
                                disabled={!entry}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans transition-all
                                ${isChecked ? 'bg-[#FAE37C] text-[#423E37] shadow-sm scale-105' : 'bg-white/30 text-[#423E37]/40'}
                                ${entry ? 'cursor-pointer ring-2 ring-white/50' : 'cursor-default'}`}
                            >
                                {day}
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 text-right">
                 <span className="text-xs font-serif italic opacity-70">12 Day Streak!</span>
            </div>
        </div>

        {/* Yearly Check-in / Progress */}
        <div 
            onClick={() => setView(ViewState.LIBRARY)}
            className="bg-white/60 text-[#423E37] rounded-2xl p-5 shadow-lg relative overflow-hidden backdrop-blur-md cursor-pointer hover:scale-[1.01] transition-transform group"
        >
             {/* Decorative circle */}
             <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#5D9BEC] rounded-full blur-2xl opacity-20"></div>
             
             <div className="flex items-center gap-2 mb-2 relative z-10">
                <Award size={16} className="text-[#423E37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#423E37]">Yearly Progress</span>
            </div>
            <div className="flex items-end justify-between mb-2 relative z-10">
                <span className="text-3xl font-sans font-bold">{MOCK_USER.yearlyDays} / 365</span>
                <span className="text-xs opacity-60 mb-1 group-hover:underline">View Library &rarr;</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden relative z-10">
                <div 
                    className="h-full bg-gradient-to-r from-[#FAE37C] to-[#5D9BEC] rounded-full" 
                    style={{ width: `${(MOCK_USER.yearlyDays / 365) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Cat Photo Storage (Grid) */}
        <div>
            <h3 className="font-serif text-lg text-[#423E37] mb-3 border-b border-[#423E37]/10 pb-1 inline-block">Photo Storage</h3>
            <div className="grid grid-cols-2 gap-3">
                {MOCK_ENTRIES.map((entry) => (
                    <div 
                        key={entry.id} 
                        onClick={() => onSelectEntry(entry)}
                        className="aspect-square bg-white/60 p-1.5 rounded-xl shadow-sm rotate-0 hover:rotate-1 transition-transform cursor-pointer"
                    >
                        <img 
                            src={entry.imageUrl} 
                            alt="Cat Memory" 
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
                {/* Empty slots placeholders */}
                <div className="aspect-square bg-white/20 rounded-xl border-2 border-dashed border-[#423E37]/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <span className="text-3xl opacity-30 text-[#423E37]">+</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};