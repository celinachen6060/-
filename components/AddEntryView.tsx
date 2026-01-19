import React, { useState } from 'react';
import { ViewState } from '../types';
import { ChevronLeft, Camera, Check } from 'lucide-react';

interface AddEntryViewProps {
  setView: (view: ViewState) => void;
  onSave: (img: string, text: string) => void;
}

export const AddEntryView: React.FC<AddEntryViewProps> = ({ setView, onSave }) => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (imagePreview && text) {
        onSave(imagePreview, text);
        setView(ViewState.HOME); // Go back to home to see the new entry potentially
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col pt-12 px-6 relative overflow-hidden text-[#423E37]">
       {/* Texture Overlay */}
       <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply"></div>

       <div className="flex justify-between items-center mb-8 z-10">
        <button onClick={() => setView(ViewState.HOME)}>
            <ChevronLeft className="text-[#423E37]" size={24} />
        </button>
        <h2 className="text-xl font-bold font-handwriting">New Memory</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 flex flex-col gap-6 z-10">
        {/* Image Upload Area */}
        <div className="w-full aspect-[3/4] bg-white/50 rounded-2xl border-2 border-dashed border-[#423E37]/20 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner transition-colors hover:bg-white/60">
            {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <>
                    <Camera className="text-[#423E37] opacity-40 mb-3" size={48} />
                    <span className="text-[#423E37] text-sm opacity-50 font-serif">Tap to capture moment</span>
                </>
            )}
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
            />
        </div>

        {/* Text Area */}
        <div className="bg-white/50 rounded-2xl p-4 shadow-sm border border-white/60 backdrop-blur-sm">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a thought..."
                className="w-full bg-transparent border-none outline-none text-[#423E37] placeholder-[#423E37]/40 font-serif resize-none h-24 text-center italic"
            />
        </div>

        <button 
            disabled={!imagePreview || !text}
            onClick={handleSave}
            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${(!imagePreview || !text) ? 'bg-white/30 text-[#423E37]/50' : 'bg-[#423E37] text-[#FAE37C] hover:scale-[1.02]'}`}
        >
            <Check size={20} />
            <span className="font-serif tracking-widest uppercase text-xs">Save Memory</span>
        </button>
      </div>
    </div>
  );
};