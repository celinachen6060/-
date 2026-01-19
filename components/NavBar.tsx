import React from 'react';
import { Home, Compass, Plus } from 'lucide-react';
import { ViewState } from '../types';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 px-10 flex justify-between items-end pb-8 z-50 pointer-events-none bg-gradient-to-t from-[#5D9BEC] via-[#5D9BEC]/80 to-transparent">
      <div className="flex w-full justify-between items-center pointer-events-auto max-w-md mx-auto">
          
          {/* Left: Home Main Page */}
          <button 
            onClick={() => setView(ViewState.HOME)}
            className={`flex flex-col items-center gap-1 transition-transform ${currentView === ViewState.HOME ? 'text-white scale-110 drop-shadow-md' : 'text-white/60'}`}
          >
            <Home size={28} strokeWidth={currentView === ViewState.HOME ? 2.5 : 2} />
            <span className="text-[10px] uppercase tracking-widest font-serif font-bold">Home</span>
          </button>

          {/* Center: Add New Memory (Plus Button) */}
          <button 
            onClick={() => setView(ViewState.ADD_ENTRY)}
            className="flex items-center justify-center w-16 h-16 bg-[#FAE37C] text-[#423E37] rounded-full shadow-xl hover:scale-105 transition-transform -mb-6 border-4 border-white/50"
          >
            <Plus size={32} />
          </button>

          {/* Right: Square / Plaza (Community) */}
          <button 
            onClick={() => setView(ViewState.COMMUNITY)}
            className={`flex flex-col items-center gap-1 transition-transform ${currentView === ViewState.COMMUNITY ? 'text-white scale-110 drop-shadow-md' : 'text-white/60'}`}
          >
            <Compass size={28} strokeWidth={currentView === ViewState.COMMUNITY ? 2.5 : 2} />
            <span className="text-[10px] uppercase tracking-widest font-serif font-bold">Square</span>
          </button>
      </div>
    </div>
  );
};