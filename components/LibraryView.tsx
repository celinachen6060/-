import React from 'react';
import { ViewState } from '../types';
import { ChevronLeft, Book } from 'lucide-react';

interface LibraryViewProps {
  setView: (view: ViewState) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ setView }) => {
  const years = [2024, 2023, 2022];

  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col pt-12 px-6 relative overflow-hidden text-[#423E37]">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply fixed"></div>

      <div className="flex justify-between items-center mb-8 z-10">
        <button onClick={() => setView(ViewState.HOME)}>
            <ChevronLeft className="text-[#423E37]" size={24} />
        </button>
        <h2 className="text-2xl font-handwriting text-[#423E37]">Memory Library</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 z-10 grid grid-cols-1 gap-6 overflow-y-auto pb-24">
        {years.map((year, index) => (
            <div 
                key={year}
                onClick={() => setView(ViewState.FLIPBOOK)}
                className="group relative cursor-pointer"
            >
                {/* Book Spine / Cover Representation */}
                <div className={`h-32 rounded-r-2xl rounded-l-md shadow-xl flex items-center p-6 relative overflow-hidden transition-transform transform group-hover:-translate-y-1 ${index === 0 ? 'bg-[#423E37] text-[#FAE37C]' : 'bg-white/80 text-[#423E37]'}`}>
                    
                    {/* Spine Detail */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 border-r border-white/10"></div>
                    
                    <div className="ml-4 flex-1">
                        <h3 className="text-3xl font-serif font-bold tracking-widest">{year}</h3>
                        <p className="text-xs opacity-60 uppercase tracking-widest mt-1">
                            {index === 0 ? 'Current Year' : 'Archived'}
                        </p>
                    </div>

                    <Book size={32} strokeWidth={1.5} className="opacity-80" />
                    
                    {/* Texture on Book */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none mix-blend-multiply"></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};