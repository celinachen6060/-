import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ViewState, JournalEntry } from '../types';
import { MOCK_ENTRIES } from '../constants';

interface JournalViewProps {
  setView: (view: ViewState) => void;
  onSelectEntry: (entry: JournalEntry) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ setView, onSelectEntry }) => {
  const currentMonth = "Month"; // Placeholder for dynamic month
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Get the latest entry to show as the featured image
  const featuredEntry = MOCK_ENTRIES[0];

  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col pt-12 px-6 pb-24 overflow-y-auto text-[#423E37]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setView(ViewState.HOME)} className="p-2">
            <ChevronLeft className="text-[#423E37]" size={24} />
        </button>
        <h2 className="text-xl font-semibold">{currentMonth}</h2>
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-[#423E37]/10">
             <img src="https://picsum.photos/id/64/100/100" alt="Profile" className="w-full h-full object-cover"/>
        </div>
      </div>

      {/* Featured Image Card */}
      <div 
        className="w-full aspect-[4/5] bg-white/40 rounded-2xl p-2.5 shadow-lg mb-8 relative transform hover:scale-[1.01] transition-transform duration-300 cursor-pointer backdrop-blur-sm"
        onClick={() => onSelectEntry(featuredEntry)}
      >
        <div className="w-full h-full overflow-hidden rounded-xl relative">
            <img 
                src={featuredEntry.imageUrl} 
                alt="Featured" 
                className="w-full h-full object-cover"
            />
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex-1">
        <h3 className="text-center text-lg font-medium mb-4">Day</h3>
        
        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs opacity-60 font-bold">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
            {days.map(day => {
                const hasEntry = MOCK_ENTRIES.find(e => new Date(e.date).getDate() === day);
                return (
                    <div 
                        key={day} 
                        className={`flex flex-col items-center justify-center cursor-pointer ${hasEntry ? 'font-bold' : 'opacity-50'}`}
                        onClick={() => hasEntry && onSelectEntry(hasEntry)}
                    >
                        <span className={`text-sm font-sans ${hasEntry ? 'text-[#423E37]' : 'text-[#423E37]'}`}>{day}</span>
                        {hasEntry && <div className="w-1.5 h-1.5 bg-[#423E37] rounded-full mt-1"></div>}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};