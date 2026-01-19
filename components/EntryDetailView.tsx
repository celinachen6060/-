import React from 'react';
import { ChevronLeft, Share2, MoreHorizontal, Calendar, Heart } from 'lucide-react';
import { ViewState, JournalEntry } from '../types';

interface EntryDetailViewProps {
  entry: JournalEntry;
  setView: (view: ViewState) => void;
}

export const EntryDetailView: React.FC<EntryDetailViewProps> = ({ entry, setView }) => {
  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#fffbf0] to-[#fffbf0] flex flex-col relative text-[#423E37]">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply"></div>

      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-2 z-10">
        <button onClick={() => setView(ViewState.HOME)} className="bg-white/50 p-2 rounded-full shadow-sm hover:bg-white/80 transition-colors">
            <ChevronLeft className="text-[#423E37]" size={20} />
        </button>
        <div className="flex gap-3 text-[#423E37]">
             <button className="bg-white/50 p-2 rounded-full shadow-sm hover:bg-white/80 transition-colors"><Share2 size={18} /></button>
             <button className="bg-white/50 p-2 rounded-full shadow-sm hover:bg-white/80 transition-colors"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 flex flex-col px-6 pb-8 z-10 overflow-y-auto">
        
        {/* Title Date */}
        <div className="flex flex-col items-center mb-4">
             <div className="flex items-center gap-2 opacity-60 mb-1">
                <Calendar size={12} />
                <span className="text-[10px] uppercase tracking-widest font-bold font-sans">{entry.date}</span>
             </div>
             <h1 className="font-handwriting text-3xl">Daily Check-in</h1>
        </div>

        {/* Photo Card - Constrained Height */}
        <div className="w-full shrink-0 relative mb-6">
            <div className="bg-white p-3 shadow-lg rounded-lg rotate-1 transform transition-transform hover:rotate-0">
                <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden rounded-md max-h-[55vh]">
                    <img src={entry.imageUrl} alt="Memory" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center mt-2 px-1 opacity-50">
                    <span className="text-[10px] font-mono">IMG_CAT_00{entry.id}.JPG</span>
                    <Heart size={12} className="fill-current" />
                </div>
            </div>
             {/* Tape effect */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/40 rotate-2 backdrop-blur-sm border border-white/50 shadow-sm"></div>
        </div>

        {/* Text Description */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
            <h3 className="font-serif text-[#423E37] font-bold text-sm mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#A16207] rounded-full"></span>
                Daily Summary
            </h3>
            <p className="font-serif text-sm leading-relaxed text-[#423E37] italic">
                "{entry.caption}"
            </p>
            {entry.mood && (
                <div className="mt-4 pt-4 border-t border-[#423E37]/10 flex gap-2">
                    <span className="text-xs font-bold opacity-60">Mood:</span>
                    <span className="text-xs bg-[#FAE37C] px-2 py-0.5 rounded-full text-[#423E37]">{entry.mood}</span>
                </div>
            )}
            
            {/* Fallback extra text if caption is short to fill space */}
            {!entry.caption || entry.caption.length < 50 ? (
                 <p className="mt-2 text-xs opacity-50 font-sans">
                    The cat was particularly active today, showing great interest in the window view. Food consumption was normal. Nap time exceeded 14 hours.
                 </p>
            ) : null}
        </div>

      </div>
    </div>
  );
};