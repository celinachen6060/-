import React, { useState } from 'react';
import { ViewState } from '../types';
import { ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import { MOCK_ENTRIES } from '../constants';

interface FlipbookViewProps {
  setView: (view: ViewState) => void;
}

export const FlipbookView: React.FC<FlipbookViewProps> = ({ setView }) => {
  // -1 means the book is open at the very start
  const [flippedIndex, setFlippedIndex] = useState(-1);

  const sheets = [];
  for (let i = 0; i < MOCK_ENTRIES.length; i += 2) {
    sheets.push({
      id: `sheet-${i}`,
      front: MOCK_ENTRIES[i],
      back: MOCK_ENTRIES[i + 1] || null,
    });
  }

  const handleNext = () => {
    if (flippedIndex < sheets.length - 1) {
      setFlippedIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (flippedIndex >= -1) {
      setFlippedIndex(prev => prev - 1);
    }
  };

  return (
    <div className="h-full bg-[#fcf5e5] flex flex-col pt-4 pb-8 relative overflow-hidden text-[#3e2723]">
      {/* Warm Wood/Table Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#f9dcc4]/20 to-[#f0c27b]/10"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2 z-10 text-[#5d4037] px-6">
        <button onClick={() => setView(ViewState.LIBRARY)} className="flex items-center gap-1 hover:text-[#3e2723] transition-colors">
            <ChevronLeft size={24} />
            <span className="font-serif text-sm font-bold">Library</span>
        </button>
        <h2 className="text-xl font-handwriting text-[#3e2723]">2024 Memories</h2>
        <div className="w-16"></div> 
      </div>

      {/* Book Interaction Area */}
      <div className="flex-1 z-10 flex items-center justify-center perspective-[1500px] overflow-visible">
        
        {/* The Book Wrapper */}
        <div className="relative w-[95%] max-w-2xl aspect-[3/2] transition-transform duration-700 transform-style-3d rotate-x-10">
            
            {/* BACK COVER (The base) */}
            <div className="absolute inset-0 bg-[#5d4037] rounded-sm shadow-2xl translate-z-[-2px] flex">
                 <div className="flex-1 border-r border-black/10"></div>
                 <div className="flex-1"></div>
            </div>

            {/* STATIC LEFT PAGE (Inside Front Cover) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#fffbf0] rounded-l-md shadow-inner border-r border-[#e0e0e0] overflow-hidden flex flex-col items-center justify-center p-6 text-center z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
                {/* Binding Shadow */}
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
                
                <h3 className="font-handwriting text-3xl text-[#5d4037] mb-2 relative z-10">This belongs to</h3>
                <div className="font-serif text-xl font-bold text-[#3e2723] border-b-2 border-[#5d4037]/20 pb-1 px-8 relative z-10">
                   Cal Corn
                </div>
                <p className="mt-4 text-xs font-serif italic text-[#5d4037]/60 relative z-10">Started Oct 2023</p>
            </div>

            {/* STATIC RIGHT PAGE (Inside Back Cover) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#fffbf0] rounded-r-md shadow-inner border-l border-[#e0e0e0] overflow-hidden flex flex-col items-center justify-center z-0">
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
                <span className="font-serif italic text-[#5d4037]/40">End of Journal</span>
            </div>

            {/* DYNAMIC SHEETS */}
            {sheets.map((sheet, index) => {
                const isFlipped = index <= flippedIndex;
                // Stacking order:
                // When on Right (not flipped): Top sheets have higher Z-index.
                // When on Left (flipped): Bottom sheets have higher Z-index so they stack correctly on the left pile.
                const zIndex = isFlipped ? index : (sheets.length - index);

                return (
                    <div 
                        key={sheet.id}
                        className="absolute right-0 top-0 w-1/2 h-full origin-left transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                        style={{ 
                            transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                            zIndex: zIndex + 10 
                        }}
                    >
                        {/* FRONT FACE (Right Page) */}
                        <div 
                            onClick={handleNext}
                            className="absolute inset-0 bg-[#fffdf5] rounded-r-md overflow-hidden flex flex-col shadow-md border-l border-[#f0f0f0]"
                            style={{ 
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(0deg) translateZ(0.5px)' 
                            }}
                        >
                            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
                            
                            {/* Inner Binding Shadow */}
                            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20"></div>
                            {/* Outer Page Curl Shadow */}
                            <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-20"></div>

                            {/* CONTENT: 70% Image, 30% Text */}
                            <div className="flex-1 flex flex-col h-full relative z-10 p-3 pb-4">
                                {/* Image Area (70%) */}
                                <div className="flex-[7] w-full bg-white p-1.5 shadow-sm border border-[#e0e0e0] mb-3 overflow-hidden relative">
                                    <img src={sheet.front.imageUrl} alt="Memory" className="w-full h-full object-cover" />
                                    {/* Clear Tape */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#ffffff]/60 border border-white/80 shadow-sm"></div>
                                </div>

                                {/* Text Area (30%) */}
                                <div className="flex-[3] flex flex-col items-center text-center justify-start pt-1 px-1">
                                     <div className="flex items-center gap-2 mb-1 w-full justify-center opacity-80">
                                        <div className="h-[1px] bg-[#5d4037]/20 w-6"></div>
                                        <span className="font-handwriting text-lg text-[#5d4037] font-bold">
                                            {new Date(sheet.front.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                        <div className="h-[1px] bg-[#5d4037]/20 w-6"></div>
                                     </div>
                                     <p className="font-serif text-xs leading-relaxed text-[#3e2723] italic line-clamp-4">
                                        {sheet.front.caption}
                                     </p>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-1 right-3 text-[9px] text-[#8d6e63] font-sans">{index * 2 + 1}</div>
                        </div>

                        {/* BACK FACE (Left Page) */}
                        <div 
                            onClick={handlePrev}
                            className="absolute inset-0 bg-[#fffdf5] rounded-l-md overflow-hidden flex flex-col shadow-md border-r border-[#f0f0f0]"
                            style={{ 
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg) translateZ(0.5px)'
                            }}
                        >
                            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none"></div>
                            
                            {/* Inner Binding Shadow (Right side of this face) */}
                            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20"></div>
                            {/* Outer Page Curl Shadow */}
                            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-20"></div>

                            {/* CONTENT: 70% Image, 30% Text */}
                            {sheet.back ? (
                                <div className="flex-1 flex flex-col h-full relative z-10 p-3 pb-4">
                                    {/* Image Area (70%) */}
                                    <div className="flex-[7] w-full bg-white p-1.5 shadow-sm border border-[#e0e0e0] mb-3 overflow-hidden relative">
                                        <img src={sheet.back.imageUrl} alt="Memory" className="w-full h-full object-cover" />
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#ffffff]/60 border border-white/80 shadow-sm"></div>
                                    </div>

                                    {/* Text Area (30%) */}
                                    <div className="flex-[3] flex flex-col items-center text-center justify-start pt-1 px-1">
                                        <div className="flex items-center gap-2 mb-1 w-full justify-center opacity-80">
                                            <div className="h-[1px] bg-[#5d4037]/20 w-6"></div>
                                            <span className="font-handwriting text-lg text-[#5d4037] font-bold">
                                                {new Date(sheet.back.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                            <div className="h-[1px] bg-[#5d4037]/20 w-6"></div>
                                        </div>
                                        <p className="font-serif text-xs leading-relaxed text-[#3e2723] italic line-clamp-4">
                                            {sheet.back.caption}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center opacity-30">
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-2 border-[#5d4037] rounded-full flex items-center justify-center mb-2 mx-auto">
                                            <span className="font-handwriting text-xl text-[#5d4037]">Log</span>
                                        </div>
                                        <span className="font-serif italic text-[#5d4037]">The End</span>
                                    </div>
                                </div>
                            )}

                             <div className="absolute bottom-1 left-3 text-[9px] text-[#8d6e63] font-sans">{index * 2 + 2}</div>
                        </div>
                    </div>
                );
            })}
            
            {/* CENTRAL BINDING VISUAL */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0 z-30">
                <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#3e2723]/30"></div>
            </div>

        </div>
      </div>

      {/* Controls */}
      <div className="h-16 z-10 flex items-center justify-center gap-8 text-[#5d4037] mb-2">
            <button 
                onClick={handlePrev} 
                disabled={flippedIndex === -1}
                className={`p-2 rounded-full bg-[#3e2723]/10 hover:bg-[#3e2723]/20 transition-all ${flippedIndex === -1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
                <ArrowLeft size={20} />
            </button>
            <span className="text-[10px] opacity-60 font-serif tracking-widest uppercase font-bold">Flip Pages</span>
            <button 
                onClick={handleNext}
                disabled={flippedIndex === sheets.length - 1}
                className={`p-2 rounded-full bg-[#3e2723]/10 hover:bg-[#3e2723]/20 transition-all ${flippedIndex === sheets.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
                <ArrowRight size={20} />
            </button>
      </div>

      <style>{`
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .perspective-\\[1500px\\] {
            perspective: 1500px;
        }
        .rotate-x-10 {
            transform: rotateX(10deg);
        }
        .origin-left {
            transform-origin: left center;
        }
      `}</style>
    </div>
  );
};